import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/users/dto';
import LoginUserDto from 'src/users/dto/login-user.dto';
import { UserEntity } from 'src/users/entities';
import { UsersService } from 'src/users/services/users.service';
import { UserRole } from '../user-role.enum';

export type UserWithoutPassword = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  async login(userDto: LoginUserDto): Promise<string> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<string> {
    userDto.role = UserRole.Student;
    const candidate = await this.usersService.getOneUserBy({
      login: userDto.login,
    });
    if (candidate) {
      throw new HttpException('User with current email already exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser(userDto);

    return this.generateToken(user);
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, process.env.PASSWORD_SALT);
  }

  private generateToken({ login, id, role }: UserEntity): string {
    const payload = { login, id, role };
    const token = this.jwtService.sign(payload);
    return `Bearer ${token}`;
  }

  private async validateUser({ login, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersService.getOneUserBy({ login });
    const isPasswordEquals = user && (await bcrypt.compare(password, user.password));

    if (isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Invalid login or password' });
  }
}

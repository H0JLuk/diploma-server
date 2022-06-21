import { UseGuards } from '@nestjs/common'
import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { UserRoles } from 'src/auth/decorators/user-roles.decorator'
import { UserRolesGuard } from 'src/auth/guards/user-roles.guard'
import { UserRole } from 'src/auth/user-role.enum'

import { CreateUserDto, UpdateUserDto } from '../dto';
import JwtUserDto from '../dto/jwt-user.dto';
import { UserEntity } from '../entities';
import { UsersService } from '../services/users.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity)
  async getMyselfUser(@CurrentUser() user: JwtUserDto): Promise<UserEntity> {
    return await this.usersService.getOneUser(user.id);
  }

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.usersService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

  @UserRoles(UserRole.Admin, UserRole.Methodist)
  @UseGuards(UserRolesGuard)
  @Mutation(() => UserEntity)
  async createUser(@Args('createUser') createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(createUserDto);
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('updateUser') updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.usersService.updateUser(updateUserDto);
  }

  @Mutation(() => Number)
  async removeUser(@Args('id') id: number): Promise<number> {
    return await this.usersService.removeUser(id);
  }

  @Field(() => String)
  password: null;
}

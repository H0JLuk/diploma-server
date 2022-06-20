import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(userDto);
  }

  async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async updateUser(userDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update({ id: userDto.id }, userDto);
    return this.getOneUser(userDto.id);
  }

  async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }
}

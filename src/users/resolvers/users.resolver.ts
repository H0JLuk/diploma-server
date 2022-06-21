import { UseGuards } from '@nestjs/common'
import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'

import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities';
import { UsersService } from '../services/users.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity)
  async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.usersService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

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

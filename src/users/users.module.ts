import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserResolver, UsersService],
})
export class UsersModule {}

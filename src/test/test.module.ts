import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestService } from './services';
import { TestResolver } from './resolvers';
import { TestEntity } from './entities';
import { QuestionsModule } from 'src/question/question.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity]), QuestionsModule, AuthModule],
  providers: [TestResolver, TestService],
})
export class TestModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestService } from './services';
import { TestResolver } from './resolvers';
import { TestEntity } from './entities';
import { QuestionsModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity]), QuestionsModule],
  providers: [TestResolver, TestService],
})
export class TestModule {}

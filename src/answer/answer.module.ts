import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { AnswerService } from './services/answer.service';
import { AnswerResolver } from './resolvers/answer.resolver';
import { QuestionsModule } from 'src/question/question.module';
import { AnswerEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity]),
    forwardRef(() => QuestionsModule),
  ],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}

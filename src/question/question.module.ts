import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionsService } from './services/question.service';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionEntity } from './entities/question.entity';
import { AnswerModule } from 'src/answer/answer.module';
import { AnswerEntity } from 'src/answer/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerEntity]),
    forwardRef(() => AnswerModule),
  ],
  providers: [QuestionResolver, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}

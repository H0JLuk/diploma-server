import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionsService } from './services/question.service';
import { QuestionResolver } from './resolvers/question.resolver';
import { QuestionEntity } from './entities/question.entity';
import { AnswerModule } from 'src/answer/answer.module';
import { AnswerEntity } from 'src/answer/entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, AnswerEntity]), forwardRef(() => AnswerModule), AuthModule],
  providers: [QuestionResolver, QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}

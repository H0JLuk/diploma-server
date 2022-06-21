import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { AnswerService } from './services/answer.service';
import { AnswerResolver } from './resolvers/answer.resolver';
import { QuestionsModule } from 'src/question/question.module';
import { AnswerEntity } from './entities';
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity]),
    forwardRef(() => QuestionsModule),
    AuthModule,
  ],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}

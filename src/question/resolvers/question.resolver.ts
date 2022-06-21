import { forwardRef, Inject } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AnswerEntity } from 'src/answer/entities';
import { AnswerService } from 'src/answer/services/answer.service';

import { CreateQuestionDto, UpdateQuestionDto } from '../dto';
import { QuestionEntity } from '../entities';
import { QuestionsService } from '../services/question.service';

@Resolver(() => QuestionEntity)
export class QuestionResolver {
  @Inject(forwardRef(() => AnswerService))
  private readonly answerService: AnswerService;

  constructor(private readonly questionsService: QuestionsService) {}

  @Query(() => QuestionEntity)
  async getOneQuestion(@Args('id') id: number): Promise<QuestionEntity> {
    return await this.questionsService.getOneQuestion(id);
  }

  @Query(() => [QuestionEntity])
  async getAllQuestions(): Promise<QuestionEntity[]> {
    return await this.questionsService.getAllQuestions();
  }

  @Mutation(() => QuestionEntity)
  async createQuestion(@Args('createQuestion') createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.questionsService.createQuestion(createQuestionDto);
  }

  @Mutation(() => QuestionEntity)
  async updateQuestion(@Args('updateQuestion') updateQuestionDto: UpdateQuestionDto): Promise<QuestionEntity> {
    return await this.questionsService.updateQuestion(updateQuestionDto);
  }

  @Mutation(() => Number)
  async removeQuestion(@Args('id') id: number): Promise<number> {
    return await this.questionsService.removeQuestion(id);
  }

  @ResolveField(() => [AnswerEntity])
  async answers(@Parent() question: QuestionEntity): Promise<AnswerEntity[]> {
    return await this.answerService.getAnswersByQuestionId(question.id);
  }
}

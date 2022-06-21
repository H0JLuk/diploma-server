import { forwardRef, Inject, UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { UserRole } from 'src/auth/user-role.enum';
import { QuestionEntity } from 'src/question/entities';
import { QuestionsService } from 'src/question/services/question.service';
import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { AnswerEntity } from '../entities';
import { AnswerService } from '../services/answer.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => AnswerEntity)
export class AnswerResolver {
  @Inject(forwardRef(() => QuestionsService))
  private readonly questionService: QuestionsService;

  constructor(private readonly answerService: AnswerService) {}

  @Query(() => AnswerEntity)
  async getOneAnswer(@Args('id') id: number): Promise<AnswerEntity> {
    return await this.answerService.getOneAnswer(id);
  }

  @Query(() => [AnswerEntity])
  async getAllAnswers(): Promise<AnswerEntity[]> {
    return await this.answerService.getAllAnswers();
  }

  @Mutation(() => AnswerEntity)
  async createAnswer(@Args('createAnswer') createAnswerDto: CreateAnswerDto): Promise<AnswerEntity> {
    return await this.answerService.createAnswer(createAnswerDto);
  }

  @Mutation(() => AnswerEntity)
  async updateAnswer(@Args('updateAnswer') updateAnswerDto: UpdateAnswerDto): Promise<AnswerEntity> {
    return await this.answerService.updateAnswer(updateAnswerDto);
  }

  @Mutation(() => Number)
  async removeAnswer(@Args('id') id: number): Promise<number> {
    return await this.answerService.removeAnswer(id);
  }

  @ResolveField(() => QuestionEntity)
  async question(@Parent() answer: AnswerEntity): Promise<QuestionEntity> {
    return this.questionService.getOneQuestion(answer.questionId);
  }

  @ResolveField(() => Boolean)
  isRight(@Parent() answer: AnswerEntity, @CurrentUser() currentUser) {
    if (!currentUser || currentUser.role === UserRole.Student) {
      throw new UnauthorizedException('Нет доступа');
      // return false; // TODO: add correct validation
    }
    return answer.isRight;
  }
}

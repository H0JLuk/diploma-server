import { forwardRef, Inject, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Field, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { UserRoles } from 'src/auth/user-roles.decorator';
import { UserRole } from 'src/auth/user-role.enum';
import { UserRolesGuard } from 'src/auth/user-roles.guard';
import { QuestionEntity } from 'src/question/entities';
import { QuestionsService } from 'src/question/services/question.service';
import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { AnswerEntity } from '../entities';
import { AnswerService } from '../services/answer.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UserEntity } from 'src/users/entities';

@Resolver(() => AnswerEntity)
@UseGuards(GqlAuthGuard) // TODO: uncomment line
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

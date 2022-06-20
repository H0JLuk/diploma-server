import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { TestService } from '../services/test.service';
import { TestEntity } from '../entities';
import { CreateTestDto, UpdateTestDto } from '../dto';
import { QuestionEntity } from 'src/question/entities'
import { Inject } from '@nestjs/common'
import { QuestionsService } from 'src/question/services/question.service'

@Resolver(() => TestEntity)
export class TestResolver {
  @Inject(QuestionsService)
  private readonly questionService: QuestionsService;

  constructor(private readonly testService: TestService) {}

  @Query(() => TestEntity)
  async getOneTest(@Args('id') id: number): Promise<TestEntity> {
    return await this.testService.getOneTest(id);
  }

  @Query(() => [TestEntity])
  async getAllTests(): Promise<TestEntity[]> {
    return await this.testService.getAllTests();
  }

  @Mutation(() => TestEntity)
  async createTest(
    @Args('createTest') testDto: CreateTestDto,
  ): Promise<TestEntity> {
    return await this.testService.createTest(testDto);
  }

  @Mutation(() => TestEntity)
  async updateTest(
    @Args('updateTest') testDto: UpdateTestDto,
  ): Promise<TestEntity> {
    return await this.testService.updateTest(testDto);
  }

  @Mutation(() => Number)
  async removeTest(@Args('id') id: number): Promise<number> {
    return await this.testService.removeTest(id);
  }

  @ResolveField(() => [QuestionEntity])
  async questions(@Parent() test: TestEntity): Promise<QuestionEntity[]> {
    const { questions } = await this.testService.getTestWithQuestionsById(test.id);
    return questions;
  }
}

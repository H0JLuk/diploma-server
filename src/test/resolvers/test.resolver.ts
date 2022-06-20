import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TestService } from '../services/test.service';
import { TestEntity } from '../entities';
import { CreateTestDto, UpdateTestDto } from '../dto';

@Resolver(() => TestEntity)
export class TestResolver {
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
}

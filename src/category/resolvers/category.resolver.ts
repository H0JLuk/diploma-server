import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CategoryService } from '../services/category.service';
import { CategoryEntity } from '../entities';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { QuestionEntity } from 'src/question/entities';
import { Inject } from '@nestjs/common';
import { QuestionsService } from 'src/question/services/question.service';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  @Inject(QuestionsService)
  private readonly questionService: QuestionsService;

  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => CategoryEntity)
  async getOneCategory(@Args('id') id: number): Promise<CategoryEntity> {
    return await this.categoryService.getOneCategory(id);
  }

  @Query(() => [CategoryEntity])
  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAllCategories();
  }

  @Mutation(() => CategoryEntity)
  async createCategory(@Args('createCategory') categoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(categoryDto);
  }

  @Mutation(() => CategoryEntity)
  async updateCategory(@Args('updateCategory') categoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.updateCategory(categoryDto);
  }

  @Mutation(() => Number)
  async removeCategory(@Args('id') id: number): Promise<number> {
    return await this.categoryService.removeCategory(id);
  }

  @ResolveField(() => [QuestionEntity])
  async questions(@Parent() category: CategoryEntity): Promise<QuestionEntity[]> {
    const { questions } = await this.categoryService.getOneCategoryWithQuestions(category.id);
    return questions;
  }
}

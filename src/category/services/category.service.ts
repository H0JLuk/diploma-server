import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { CategoryEntity } from '../entities';
import { QuestionsService } from 'src/question/services/question.service';

@Injectable()
export class CategoryService {
  @Inject(forwardRef(() => QuestionsService))
  private readonly questionsService: QuestionsService;

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(categoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const questionList = categoryDto.questions.map((question) => this.questionsService.createQuestion(question));
    categoryDto.questions = await Promise.all(questionList);
    const category = await this.categoryRepository.save(categoryDto);

    return category;
  }

  async getOneCategory(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getOneCategoryWithQuestions(id: number): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      relations: ['questions'],
      where: { id },
    });
  }

  async updateCategory(CategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.categoryRepository.update({ id: CategoryDto.id }, CategoryDto);
    return await this.getOneCategory(CategoryDto.id);
  }

  async removeCategory(id: number): Promise<number> {
    await this.categoryRepository.delete({ id });
    return id;
  }
}

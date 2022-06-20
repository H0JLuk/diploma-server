import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTestDto, UpdateTestDto } from '../dto';
import { TestEntity } from '../entities';
import { QuestionsService } from 'src/question/services/question.service';

@Injectable()
export class TestService {
  @Inject(forwardRef(() => QuestionsService))
  private readonly questionsService: QuestionsService;

  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  async createTest(testDto: CreateTestDto): Promise<TestEntity> {
    const questionList = testDto.questions.map((question) =>
      this.questionsService.createQuestion(question),
    );
    testDto.questions = await Promise.all(questionList);
    const test = await this.testRepository.save(testDto);

    return test;
  }

  async getOneTest(id: number): Promise<TestEntity> {
    return await this.testRepository.findOne({ where: { id } });
  }

  async getAllTests(): Promise<TestEntity[]> {
    return await this.testRepository.find();
  }

  async getTestWithQuestionsById(id: number): Promise<TestEntity> {
    return await this.testRepository.findOne({
      relations: ['questions'],
      where: { id },
    });
  }

  async updateTest(testDto: UpdateTestDto): Promise<TestEntity> {
    await this.testRepository.update({ id: testDto.id }, testDto);
    return await this.getOneTest(testDto.id);
  }

  async removeTest(id: number): Promise<number> {
    await this.testRepository.delete({ id });
    return id;
  }
}

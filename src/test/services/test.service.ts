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
    const test = await this.testRepository.save(testDto);

    for (const question of test.questions || []) {
      console.log('create question');
      await this.questionsService.createQuestion(question);
    }

    return test;
  }

  async getOneTest(id: number): Promise<TestEntity> {
    return await this.testRepository.findOne({ where: { id } });
  }

  async getAllTests(): Promise<TestEntity[]> {
    return await this.testRepository.find();
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

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsService } from 'src/question/services/question.service';
import { Repository } from 'typeorm';

import { CreateAnswerDto, UpdateAnswerDto } from '../dto';
import { AnswerEntity } from '../entities';

@Injectable()
export class AnswerService {
  @Inject(forwardRef(() => QuestionsService))
  private readonly questionsService: QuestionsService;

  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(answerDto: CreateAnswerDto): Promise<AnswerEntity> {
    return await this.answerRepository.save(answerDto);
  }

  async getAnswersByQuestionId(id: number): Promise<AnswerEntity[]> {
    const question = await this.questionsService.getOneQuestion(id);
    return await this.answerRepository.find({ where: { question } });
  }

  async getOneAnswer(id: number): Promise<AnswerEntity> {
    return await this.answerRepository.findOne({ where: { id } });
  }

  // async getAllAnswers(): Promise<AnswerEntity[]> {
  //   return await this.answerRepository.find();
  // }

  async updateAnswer(answerDto: UpdateAnswerDto): Promise<AnswerEntity> {
    await this.answerRepository.update({ id: answerDto.id }, answerDto);
    return this.getOneAnswer(answerDto.id);
  }

  async removeAnswer(id: number): Promise<number> {
    await this.answerRepository.delete({ id });
    return id;
  }
}

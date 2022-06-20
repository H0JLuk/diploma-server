import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/answer/services/answer.service';
import { Repository } from 'typeorm';

import { CreateQuestionDto, UpdateQuestionDto } from '../dto';
import { QuestionEntity } from '../entities';

@Injectable()
export class QuestionsService {
  @Inject(forwardRef(() => AnswerService))
  private readonly answerService: AnswerService;

  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(
    questionDto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    const { image, text, text_answer, answers } = questionDto;

    const question = await this.questionRepository.save({
      image,
      text,
      text_answer,
    });

    const answerList = answers.map((answer) =>
      this.answerService.createAnswer({
        ...answer,
        questionId: question.id,
      }),
    );
    await Promise.all(answerList);

    return question;
  }

  async getOneQuestion(id: number): Promise<QuestionEntity> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  async getOneQuestionWithTests(id: number): Promise<QuestionEntity[]> {
    return await this.questionRepository.find({
      relations: ['tests'],
      where: { id },
    });
  }

  async getOneQuestionWithCategories(id: number): Promise<QuestionEntity[]> {
    return await this.questionRepository.find({
      relations: ['tests'],
      where: { id },
    });
  }

  async getAllQuestions(): Promise<QuestionEntity[]> {
    return await this.questionRepository.find();
  }

  async updateQuestion(
    questionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    await this.questionRepository.update({ id: questionDto.id }, questionDto);
    return this.getOneQuestion(questionDto.id);
  }

  async removeQuestion(id: number): Promise<number> {
    await this.questionRepository.delete({ id });
    return id;
  }
}

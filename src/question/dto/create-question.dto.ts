import { Field, InputType } from '@nestjs/graphql';
import { CreateAnswerDto } from 'src/answer/dto';
import { QuestionType } from '../entities/question.entity';

@InputType()
export class CreateQuestionDto {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  text_answer: string;

  @Field({ nullable: true, defaultValue: QuestionType.single })
  type: QuestionType;

  @Field(() => [CreateAnswerDto], { nullable: true, defaultValue: [] })
  answers: CreateAnswerDto[];
}

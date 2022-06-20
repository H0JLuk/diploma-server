import { Field, InputType, Parent, ResolveField } from '@nestjs/graphql';
import { CreateAnswerDto } from 'src/answer/dto';
import { AnswerEntity } from 'src/answer/entities';
import { QuestionEntity } from '../entities';

@InputType()
export class CreateQuestionDto {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  text_answer: string;

  @Field(() => [CreateAnswerDto], { nullable: true })
  answers: CreateAnswerDto[];
}

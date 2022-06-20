import { Field, ID, InputType } from '@nestjs/graphql';
import { UpdateAnswerDto } from 'src/answer/dto';

@InputType()
export class UpdateQuestionDto {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  text_answer: string;

  @Field(() => [UpdateAnswerDto], { nullable: true })
  answers: UpdateAnswerDto[]; // TODO: add handler to service
}

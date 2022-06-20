import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionDto } from 'src/question/dto';

@InputType()
export class CreateTestDto {
  @Field({ nullable: true, name: 'start_time' })
  startTime: Date;

  @Field({ nullable: true, name: 'end_time' })
  endTime: Date;

  @Field({ nullable: true })
  text_answer: string;

  @Field({ nullable: true })
  duration: number;

  @Field({ nullable: true })
  type: string;

  @Field(() => [CreateQuestionDto], { nullable: true })
  questions: CreateQuestionDto[];
}

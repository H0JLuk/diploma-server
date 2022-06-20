import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTestDto {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true, name: 'start_time' })
  startTime: Date;

  @Field({ nullable: true, name: 'end_time' })
  endTime: string;

  @Field({ nullable: true })
  text_answer: string;

  @Field({ nullable: true })
  duration: number;

  @Field({ nullable: true })
  type: string;
}

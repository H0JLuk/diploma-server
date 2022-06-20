import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerDto {
  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;

  @Field({ defaultValue: false })
  isRight: boolean;

  @Field({ nullable: true })
  questionId: number;
}

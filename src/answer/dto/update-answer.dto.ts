import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerDto {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  isRight: boolean;
}

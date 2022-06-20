import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionDto } from 'src/question/dto';

@InputType()
export class CreateCategoryDto {
  @Field()
  name: string;

  @Field(() => [CreateQuestionDto], { nullable: true, defaultValue: [] })
  questions: CreateQuestionDto[];
}

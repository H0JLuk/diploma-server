import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

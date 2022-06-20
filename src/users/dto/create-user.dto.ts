import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateUserDto {
  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}

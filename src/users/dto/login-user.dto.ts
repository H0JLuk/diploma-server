import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class LoginUserDto {
  @Field()
  login: string;

  @Field()
  password: string;
}

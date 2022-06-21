import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class JwtUserDto {
  @Field()
  id: number;

  @Field()
  login: string;

  @Field()
  password: string;
}

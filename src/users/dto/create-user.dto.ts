import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from 'src/auth/user-role.enum';

@InputType()
export default class CreateUserDto {
  @Field()
  name: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field({ defaultValue: UserRole.Student })
  role: UserRole;
}

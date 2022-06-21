import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { CreateUserDto } from 'src/users/dto';
import LoginUserDto from 'src/users/dto/login-user.dto';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  // @Inject(forwardRef(() => QuestionsService))
  // private readonly questionService: QuestionsService;

  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Number)
  async registration(@Args('userDto') userDto: CreateUserDto, @Context() ctx): Promise<string> {
    const token = await this.authService.registration(userDto);
    ctx.res.cookie('Authorization', token, {
      httpOnly: true,
    });
    return userDto.login;
  }

  @Mutation(() => String)
  async login(@Args('userDto') creds: LoginUserDto, @Context() ctx): Promise<string> {
    const token = await this.authService.login(creds);
    const hours = 3_600_000;
    ctx.res.cookie('Authorization', token, {
      httpOnly: true,
      expires: false,
      maxAge: hours * 24 * 5, // 5 days
    });
    return creds.login;
  }
}

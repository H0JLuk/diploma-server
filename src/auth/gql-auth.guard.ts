import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  @Inject(JwtService)
  jwtService: JwtService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authCookie = ctx.req.cookies.Authorization;
    const [bearer, token] = authCookie.split(' ');

    if (bearer !== 'Bearer' && !token) {
      throw new UnauthorizedException({ message: 'User is not authorize' });
    }

    try {
      ctx.user = this.jwtService.verify(token);
      console.log('ctx.user', ctx.user);
      return true;
    } catch {
      throw new UnauthorizedException({ message: 'User is not authorize' });
    }
  }
}

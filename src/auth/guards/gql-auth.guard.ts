import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ALLOW_UNAUTH_KEY } from '../decorators/allow-unauth.decorator'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  @Inject(JwtService)
  jwtService: JwtService;

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const allowUnauthorizedRequest = this.reflector.get<boolean>(ALLOW_UNAUTH_KEY, context.getHandler());
    console.log('allowUnauthorizedRequest', allowUnauthorizedRequest);
    return allowUnauthorizedRequest || this.validateRequest(ctx);
  }

  private validateRequest(ctx: any): boolean {
    console.log('validateRequest');
    const authCookie = ctx.req.cookies.Authorization || '';
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

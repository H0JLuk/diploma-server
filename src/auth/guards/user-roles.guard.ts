import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ROLES_KEY } from '../decorators/user-roles.decorator';
import { UserRole } from '../user-role.enum';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(_ctx: ExecutionContext): boolean {
    console.log('UserRolesGuard');
    const ctx = GqlExecutionContext.create(_ctx).getContext();
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [_ctx.getHandler(), _ctx.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some((role) => ctx.user.role === role);
  }
}

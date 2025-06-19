import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from 'src/users/entities/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    let user: any;

    // Detect context type
    console.log('Inside Role guard')
    if (context.getType() === 'http') {
      user = context.switchToHttp().getRequest().user;
    } else if (context.getType() as string === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      user = ctx.getContext().req.user;
    }

    return requiredRoles.some((role) => user?.role === role);
  }
}

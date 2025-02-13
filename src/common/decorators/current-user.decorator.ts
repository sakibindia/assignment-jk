import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/entities/users.entity';

export const CurrentUser = createParamDecorator(
  <K extends keyof User | undefined>(
    key: K,
    ctx: ExecutionContext
  ): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    console.log('useee', user, key)
    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }
    return user
    // return (key ? user[key] : user) as K extends keyof User ? User[K] : User;
  },
);
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/entities/users.entity';

/**
 * Custom Decorator: CurrentUser
 * 
 * This decorator is used to extract the current authenticated user from the request object.
 * It can optionally extract a specific property of the user if a key is provided.
 * 
 * Usage Example:
 * ```ts
 * @Get('profile')
 * getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 * 
 * @Get('email')
 * getEmail(@CurrentUser('email') email: string) {
 *   return email;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  /**
   * Extracts the current user from the request object.
   * 
   * @template K - Optional key of the User entity to extract a specific property.
   * @param key - The property of the User entity to extract (optional).
   * @param ctx - The execution context of the request.
   * @returns The current authenticated user or a specific property of the user.
   * @throws UnauthorizedException if no user is found in the request.
   */
  <K extends keyof User | undefined>(
    key: K,
    ctx: ExecutionContext
  ): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    
    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }
    
    // Return the full user object
    return user;

    // Alternatively, return a specific property of the user if a key is provided
    // return (key ? user[key] : user) as K extends keyof User ? User[K] : User;
  },
);

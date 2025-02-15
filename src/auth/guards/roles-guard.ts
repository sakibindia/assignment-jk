import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user-role.enum';

@Injectable()
/**
 * Guard for authorizing user roles.
 * 
 * This guard checks if the current user has the required role(s) 
 * to access the route. Roles are retrieved from custom metadata set 
 * using the `@Roles()` decorator.
 */
export class RolesGuard implements CanActivate {
  /**
   * Initializes the RolesGuard with the Reflector service.
   * @param reflector - Used to access custom metadata defined by decorators.
   */
  constructor(private reflector: Reflector) {}

  /**
   * Determines if the current user is authorized to access the route.
   * 
   * @param context - The execution context of the request.
   * @returns `true` if the user has at least one of the required roles, otherwise `false`.
   */
  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from custom metadata
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    // Get the user from the request object
    const { user } = context.switchToHttp().getRequest();

    // Check if the user has at least one of the required roles
    return requiredRoles.some((role) => user.role === role);
  }
}

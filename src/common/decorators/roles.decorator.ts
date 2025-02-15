// src/common/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user-role.enum';

/**
 * Constant: ROLES_KEY
 * 
 * This is the metadata key used to store role information in route handlers.
 */
export const ROLES_KEY = 'roles';

/**
 * Custom Decorator: Roles
 * 
 * This decorator is used to specify required user roles for accessing a route.
 * It stores the required roles as metadata using the `ROLES_KEY`.
 * 
 * Usage Example:
 * ```ts
 * @Roles(UserRole.Admin)
 * @Get('admin-only')
 * getAdminData() {
 *   return 'Admin Data';
 * }
 * 
 * @Roles(UserRole.Admin, UserRole.User)
 * @Get('multi-role')
 * getMultiRoleData() {
 *   return 'Accessible by Admin and User';
 * }
 * ```
 * 
 * @param roles - A list of user roles required to access a route.
 * @returns A custom decorator that stores roles as metadata.
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

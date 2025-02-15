import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
/**
 * Local Strategy for Authentication
 * 
 * This strategy is used to authenticate users using email and password.
 * It extends Passport's default Local Strategy and integrates with NestJS.
 * 
 * Functionality:
 * - Uses 'email' as the username field.
 * - Validates the user's email and password with the AuthService.
 * - Throws an UnauthorizedException if validation fails.
 */
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor for LocalStrategy
   * 
   * @param authService - The AuthService used to validate user credentials.
   * Configures the strategy to use 'email' instead of 'username'.
   */
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Use 'email' instead of 'username'
  }

  /**
   * Validates the user's credentials.
   * 
   * @param email - User's email for authentication.
   * @param password - User's password for authentication.
   * @returns The user object if validation is successful.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

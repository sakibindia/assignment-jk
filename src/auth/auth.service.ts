import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
/**
 * Authentication Service
 * 
 * This service handles user authentication, including:
 * - Validating user credentials
 * - Generating JWT tokens upon successful login
 * 
 * It interacts with:
 * - UsersService: To fetch user data for validation.
 * - JwtService: To create and sign JWT tokens.
 */
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates the user's credentials.
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns A user object (excluding password) if valid, or null if invalid.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user; // Remove password from the result
      return result;
    }
    return null;
  }

  /**
   * Authenticates the user and returns a JWT token.
   * 
   * @param user - The user object containing email and password
   * @returns An object containing the access token
   * @throws UnauthorizedException - If the email or password is incorrect
   */
  async login(user: any) {
    const loggedUser = await this.validateUser(user.email, user.password)
    if(!loggedUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { email: loggedUser.email, id: loggedUser.id, role: loggedUser.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

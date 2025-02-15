import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
/**
 * Controller for authentication-related operations.
 * 
 * Handles requests related to user authentication, including login.
 */
export class AuthController {
  /**
   * Initializes the AuthController with the AuthService.
   * @param authService - Service for handling authentication logic.
   */
  constructor(private authService: AuthService) {}

  /**
   * User login endpoint.
   * 
   * Authenticates a user using their email and password.
   * 
   * @param req - The request body containing login details.
   * @returns A JWT token on successful authentication.
   */
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Body() req: LoginDto) {
    return this.authService.login(req);
  }
}

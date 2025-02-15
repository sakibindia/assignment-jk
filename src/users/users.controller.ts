// src/users/users.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Get, 
  Request, 
  UseFilters, 
  NotFoundException, 
  UsePipes 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entities/users.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CustomExceptionFilter } from '../common/exceptions/exception.filter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { CreateUserValidationSchema } from './validation/user.validations';
import { JoiValidationPipe } from '../common/pipes/validation.pipe';

/**
 * UsersController handles user-related operations such as signup and profile retrieval.
 * It uses custom exception filters, validation pipes, and guards for authentication and authorization.
 */
@Controller('users')
@UseFilters(CustomExceptionFilter)
export class UsersController {
  /**
   * Constructor to inject required services.
   * @param usersService - Service for user-related database operations.
   * @param logger - Logger service for logging user activities.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: LoggerService
  ) {}

  /**
   * Signup endpoint for creating a new user.
   * 
   * @param createUserDto - Data Transfer Object containing new user details.
   * @returns Newly created user data.
   * 
   * @remarks
   * - Uses `JoiValidationPipe` to validate input data against `CreateUserValidationSchema`.
   * - Returns `201` status on successful user creation.
   * - Returns `400` status for invalid input data.
   */
  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post('signup')
  @UsePipes(new JoiValidationPipe(CreateUserValidationSchema))
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get User Profile endpoint.
   * 
   * @param user - Current authenticated user obtained from custom `CurrentUser` decorator.
   * @returns User profile data.
   * 
   * @remarks
   * - Protected by `JwtAuthGuard` and `RolesGuard`.
   * - Returns `200` status on successful profile retrieval.
   * - Returns `404` status if user not found.
   * - Logs the user details using `LoggerService`.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.info(`Body: ${JSON.stringify(user)}`);
    return user;
  }
}

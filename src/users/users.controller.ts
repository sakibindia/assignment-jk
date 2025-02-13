import { Controller, Post, Body, UseGuards, Get, Request, UseFilters, NotFoundException, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/entities/users.entity';
import { LoggerService } from '../common/logger/logger.service';
import { CustomExceptionFilter } from 'src/common/exceptions/exception.filter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { CreateUserValidationSchema } from './validation/user.validations';
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('users')
@UseFilters(CustomExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly logger: LoggerService
  ) {}

  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post('signup')
  @UsePipes(new JoiValidationPipe(CreateUserValidationSchema))
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    if(!user) {
      throw new NotFoundException(`User not found`);
    }
    this.logger.info(`Body: ${JSON.stringify(user)}`)
    return user 
  }
}
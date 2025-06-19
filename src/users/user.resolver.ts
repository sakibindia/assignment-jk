// src/users/users.resolver.ts
import {
    Resolver,
    Query,
    Mutation,
    Args,
    Context,
  } from '@nestjs/graphql';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UserDTO } from './dto/user.dto'; // This should be a GraphQL object type
  import { UseFilters, UseGuards, UsePipes, NotFoundException, HttpException } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles-guard';
  import { CustomExceptionFilter } from '../common/exceptions/exception.filter';
  import { LoggerService } from '../common/logger/logger.service';
  import { JoiValidationPipe } from '../common/pipes/validation.pipe';
  import { CreateUserValidationSchema } from './validation/user.validations';
import { CreateUserResponse } from './dto/create-user-response';
  
  @Resolver(() => UserDTO)
  @UseFilters(CustomExceptionFilter)
  export class UsersResolver {
    constructor(
      private readonly usersService: UsersService,
      private readonly logger: LoggerService,
    ) {}
  
    /**
     * Mutation to create a new user (Signup).
     */
    @Mutation(() => CreateUserResponse)
    @UsePipes(new JoiValidationPipe(CreateUserValidationSchema))
    async createUser(
        @Args('input') createUserDto: CreateUserDto,
      ): Promise<CreateUserResponse> {
        try {
          // Try creating the user
          return await this.usersService.create(createUserDto);
        } catch (error) {
          // If it's a known HttpException, handle it gracefully
          if (error instanceof HttpException) {
            return {
              success: false,
              message: error.message,
            };
          }
    
          // For unknown errors, return a generic response
          return {
            success: false,
            message: 'Something went wrong. Please try again later.',
          };
        }
      }
  
    /**
     * Query to fetch the current user's profile.
     * Protected by JWT and Role guards.
     */
    @Query(() => UserDTO)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getProfile(@Context('req') req): Promise<UserDTO> {
      const user = req?.user;
      if (!user) throw new NotFoundException('User not found');
      this.logger.info(`User Profile Requested: ${JSON.stringify(user)}`);
      return user;
    }
  }
  
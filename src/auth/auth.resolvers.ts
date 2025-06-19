import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './dto/auth-response.dto'; // DTO returning token and user info
import { LoginInput } from './dto/login-input.dto'; // GraphQL input type (same as LoginDto)

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * GraphQL login mutation
   * 
   * @param loginInput - Contains email and password
   * @returns JWT token and user info
   */
  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}

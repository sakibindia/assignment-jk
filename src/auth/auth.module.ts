import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolvers';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  controllers: [AuthController],
})
/**
 * Authentication Module
 * 
 * This module handles all authentication-related functionality, 
 * including user login, token generation, and validation.
 * 
 * It imports the necessary modules:
 * - UsersModule: For user data management.
 * - PassportModule: To implement authentication strategies.
 * - JwtModule: To issue and validate JWT tokens.
 * 
 * It also provides the following:
 * - AuthService: Contains the authentication business logic.
 * - LocalStrategy: For validating user credentials.
 * - JwtStrategy: For validating JWT tokens.
 * 
 * The module also registers the AuthController for routing.
 */
export class AuthModule {}

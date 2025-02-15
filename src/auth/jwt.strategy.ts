import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
/**
 * JWT Strategy for Authentication
 * 
 * This strategy is used to validate and authorize requests using JWT tokens.
 * It extends Passport's default JWT strategy and integrates with NestJS.
 * 
 * Functionality:
 * - Extracts JWT from the Authorization header as a Bearer token.
 * - Verifies the token's signature using a secret key.
 * - Ensures the token is not expired.
 * - Returns the payload if the token is valid.
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * Validates the JWT payload.
   * 
   * @param payload - The decoded JWT payload containing user details.
   * @returns An object with user details, excluding the password.
   */
  async validate(payload: any) {
    delete payload.password;
    return { ...payload };
  }
}

import { AuthGuard } from "@nestjs/passport";

/**
 * Guard for protecting routes using JWT authentication strategy.
 * 
 * This class extends the default AuthGuard with the 'jwt' strategy, 
 * ensuring that requests are authenticated using a valid JWT token.
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}

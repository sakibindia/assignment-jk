// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for user login
 */
export class LoginDto {
  /**
   * User email
   * @example 'admin@jktech.com'
   */
  @ApiProperty({ example: 'admin@neotech.com', description: 'User email' })
  email: string;

  /**
   * User password
   * @example 'admin123'
   */
  @ApiProperty({ example: 'admin123', description: 'User password' })
  password: string;
}

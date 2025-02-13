// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@jktech.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'admin123', description: 'User password' })
  password: string;
}

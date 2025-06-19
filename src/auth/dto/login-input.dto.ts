// src/auth/dto/login.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

/**
 * InputType for user login (GraphQL)
 */
@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}

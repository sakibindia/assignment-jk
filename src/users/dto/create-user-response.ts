// src/users/dto/create-user-response.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

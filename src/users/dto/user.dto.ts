// src/users/dto/user.dto.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;
}

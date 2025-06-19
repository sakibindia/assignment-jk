import { InputType, Field } from '@nestjs/graphql'; 
/**
 * Data Transfer Object (DTO) for creating a new user.
 * This class is used to define the structure of the request payload
 * when creating a new user in the system.
 */
@InputType()
export class CreateUserDto {
  /**
   * The email address of the user.
   * It should be a valid email format and unique in the system.
   */
  @Field()
  email: string;

  /**
   * The password for the user account.
   * It is recommended to follow security guidelines for password complexity.
   */
  @Field()
  password: string;

  /**
   * The role assigned to the user.
   * This determines the user's permissions and access levels.
   * Example values: 'admin', 'user', 'moderator'.
   */
  @Field()
  role: string;
}

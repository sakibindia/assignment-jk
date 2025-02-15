// src/users/validation/create-user-validation.schema.ts
import * as Joi from 'joi';

/**
 * Validation schema for creating a new user.
 * 
 * This schema validates the following fields:
 * - `email`: Required, must be a valid email format.
 * - `password`: Required, must be between 8 and 20 characters.
 * - `role`: Optional, string type.
 */
export const CreateUserValidationSchema = Joi.object({
  /**
   * Email field validation:
   * - Must be a valid email format.
   * - TLD validation is disabled.
   * - Required field.
   * - Custom error messages for empty and invalid format.
   */
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
    }),

  /**
   * Password field validation:
   * - Must be a string with a length between 8 and 20 characters.
   * - Required field.
   * - Custom error messages for minimum, maximum, and empty cases.
   */
  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot exceed 20 characters',
    }),

  /**
   * Role field validation:
   * - Optional string field.
   * - No specific constraints on the value.
   */
  role: Joi.string().optional(),
});

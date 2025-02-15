import * as Joi from 'joi';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Custom validation pipe that uses Joi schema for request validation.
 * This pipe checks the incoming request data against the provided Joi schema.
 * If validation fails, it throws a BadRequestException with the relevant error message.
 */
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  /**
   * Initializes the validation pipe with the specified Joi schema.
   * @param schema - The Joi schema to be used for validation.
   */
  constructor(private readonly schema: Joi.ObjectSchema) {}

  /**
   * Transforms and validates the incoming request data.
   * If validation fails, a BadRequestException is thrown with the first validation error message.
   * @param value - The incoming request data to be validated.
   * @returns The validated data if no errors are found.
   * @throws BadRequestException - If validation fails.
   */
  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return value;
  }
}

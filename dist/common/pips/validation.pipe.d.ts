import * as Joi from 'joi';
import { PipeTransform } from '@nestjs/common';
export declare class JoiValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: Joi.ObjectSchema);
    transform(value: any): any;
}

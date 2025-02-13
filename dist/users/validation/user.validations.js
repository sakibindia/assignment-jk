"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserValidationSchema = void 0;
const Joi = require("joi");
exports.CreateUserValidationSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password cannot exceed 20 characters',
    }),
    role: Joi.string().optional(),
});
//# sourceMappingURL=user.validations.js.map
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Response } from 'express';
import { LoggerService } from '../../common/logger/logger.service';

/**
 * Custom Exception Filter
 * 
 * This filter catches all `HttpException` errors thrown in the application and customizes the response format.
 * It also logs the error using the custom `LoggerService`.
 * 
 * @usageNotes
 * Apply this filter globally or at the controller/resolver level for consistent error handling and logging.
 * 
 * Example:
 * ```ts
 * @UseFilters(CustomExceptionFilter)
 * @Controller('example')
 * export class ExampleController {}
 * ```
 */
@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  /**
   * Constructor to inject the custom logger service.
   * 
   * @param logger - Instance of the LoggerService for logging errors.
   */
  constructor(private readonly logger: LoggerService) {}

  /**
   * Catch Method
   * 
   * This method is triggered when an `HttpException` is thrown.
   * It supports both HTTP and GraphQL contexts.
   * 
   * @param exception - The caught `HttpException`.
   * @param host - Provides methods to get request/response objects or GraphQL context.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse = exception.getResponse?.() || exception.message;

    // Log the error
    this.logger.error(`Error ${status}: ${JSON.stringify(errorResponse)}`);

    const contextType = host.getType();

    // Handle GraphQL context
    if (contextType as string === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      throw new HttpException(
        {
          success: false,
          message:
            typeof errorResponse === 'string'
              ? errorResponse
              : (errorResponse as any)?.message || 'Unexpected error occurred',
        },
        status,
      );
    }

    // Handle HTTP (REST) context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(status).json({
      success: false,
      message:
        typeof errorResponse === 'string'
          ? errorResponse
          : (errorResponse as any)?.message || 'Unexpected error occurred',
    });
  }
}

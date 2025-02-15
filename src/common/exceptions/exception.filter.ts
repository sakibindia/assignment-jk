import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../../common/logger/logger.service';

/**
 * Custom Exception Filter
 * 
 * This filter catches all `HttpException` errors thrown in the application and customizes the response format.
 * It also logs the error using the custom `LoggerService`.
 * 
 * @usageNotes
 * Apply this filter globally or at the controller level for consistent error handling and logging.
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
   * It extracts the status and response body from the exception,
   * logs the error, and customizes the HTTP response.
   * 
   * @param exception - The caught `HttpException`.
   * @param host - Provides methods to get request and response objects.
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Log the error details
    this.logger.error(`Error ${status}: ${JSON.stringify(errorResponse)}`);

    // Send the custom error response
    response.status(status).json(errorResponse);
  }
}

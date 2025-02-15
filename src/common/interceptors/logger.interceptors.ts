import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

/**
 * LoggingInterceptor
 * 
 * This interceptor logs all incoming requests and outgoing responses, including:
 * - HTTP method and URL
 * - Request headers and body (if present)
 * - Response status and body
 * - Time taken to process the request
 * 
 * @usageNotes
 * Apply this interceptor globally or at the controller level to monitor API requests and responses.
 * 
 * Example:
 * ```ts
 * @UseInterceptors(LoggingInterceptor)
 * @Controller('example')
 * export class ExampleController {}
 * ```
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Constructor to inject the custom logger service.
   * 
   * @param logger - Instance of the LoggerService for logging request and response details.
   */
  constructor(private readonly logger: LoggerService) {}

  /**
   * Intercept Method
   * 
   * This method is triggered for every request to the controller where this interceptor is applied.
   * It logs the request details before passing control to the next handler.
   * After the response is generated, it logs the response details and time taken.
   * 
   * @param context - Provides methods to get request and response objects.
   * @param next - Used to pass control to the next handler in the chain.
   * @returns Observable<any> - The response observable.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;
    const start = Date.now();

    // Log incoming request details
    this.logger.info(`[REQUEST] Method: ${method} | URL: ${url}`);
    this.logger.info(`[REQUEST] Headers: ${JSON.stringify(headers)}`);
    if (body && Object.keys(body).length > 0) {
      this.logger.info(`[REQUEST] Body: ${JSON.stringify(body)}`);
    }

    return next.handle().pipe(
      tap((response) => {
        const timeTaken = Date.now() - start;
        const statusCode = context.switchToHttp().getResponse().statusCode;
        
        // Log outgoing response details
        this.logger.info(
          `[RESPONSE] Method: ${method} | URL: ${url} | Status: ${statusCode} | Time Taken: ${timeTaken}ms`
        );
        this.logger.info(`[RESPONSE] Body: ${JSON.stringify(response)}`);
      }),
    );
  }
}

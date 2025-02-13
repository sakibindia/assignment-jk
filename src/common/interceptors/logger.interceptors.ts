import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { LoggerService } from '../logger/logger.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url, headers, body } = request;
      const start = Date.now();
  
      this.logger.info(`Incoming Request: ${method} ${url}`);
      this.logger.info(`Headers: ${JSON.stringify(headers)}`);
      if(body) {
        this.logger.info(`Body: ${JSON.stringify(body)}`);
      }
      
  
      return next.handle().pipe(
        tap((response) => {
          const timeTaken = Date.now() - start;
          this.logger.info(
            `Response: ${method} ${url} - Status: ${context.switchToHttp().getResponse().statusCode} - Time Taken: ${timeTaken}ms`,
          );
          this.logger.info(`Response Body: ${JSON.stringify(response)}`);
        }),
      );
    }
  }
  
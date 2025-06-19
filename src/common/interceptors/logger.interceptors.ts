import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../logger/logger.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isHttp = context.getType() === 'http';
    const isGraphQL = context.getType() as string === 'graphql';

    const start = Date.now();

    if (isHttp) {
      const request = context.switchToHttp().getRequest();
      const { method, url, headers, body } = request;

      this.logger.info(`[REQUEST] Method: ${method} | URL: ${url}`);
      this.logger.info(`[REQUEST] Headers: ${JSON.stringify(headers)}`);
      if (body && Object.keys(body).length > 0) {
        this.logger.info(`[REQUEST] Body: ${JSON.stringify(body)}`);
      }

      return next.handle().pipe(
        tap((response) => {
          const timeTaken = Date.now() - start;
          const statusCode = context.switchToHttp().getResponse().statusCode;

          this.logger.info(`[RESPONSE] Method: ${method} | URL: ${url} | Status: ${statusCode} | Time: ${timeTaken}ms`);
          this.logger.info(`[RESPONSE] Body: ${JSON.stringify(response)}`);
        }),
      );
    }

    if (isGraphQL) {
      const gqlCtx = GqlExecutionContext.create(context);
      const { operation, fieldName } = gqlCtx.getInfo();

      this.logger.info(`[GRAPHQL REQUEST] Operation: ${operation.operation} | Field: ${fieldName}`);

      return next.handle().pipe(
        tap((response) => {
          const timeTaken = Date.now() - start;
          this.logger.info(`[GRAPHQL RESPONSE] Field: ${fieldName} | Time: ${timeTaken}ms`);
          this.logger.info(`[GRAPHQL RESPONSE] Body: ${JSON.stringify(response)}`);
        }),
      );
    }

    // fallback if neither HTTP nor GraphQL
    return next.handle();
  }
}

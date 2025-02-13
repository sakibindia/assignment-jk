import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '../../common/logger/logger.service';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    this.logger.error(`Error ${status}: ${JSON.stringify(errorResponse)}`);

    response.status(status).json(errorResponse);
  }
}

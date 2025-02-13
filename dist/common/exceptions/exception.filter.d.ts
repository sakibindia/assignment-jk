import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { LoggerService } from '../../common/logger/logger.service';
export declare class CustomExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}

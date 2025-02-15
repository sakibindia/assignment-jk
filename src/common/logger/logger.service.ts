import { Injectable } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';

/**
 * LoggerService
 * 
 * A custom logging service using Winston to handle application-level logging.
 * It supports logging to the console and writing logs to files:
 * - `app.log`: General informational logs.
 * - `errors.log`: Error-specific logs.
 * 
 * @usageNotes
 * This service can be injected into any NestJS service, controller, or interceptor for consistent logging.
 * 
 * Example:
 * ```ts
 * constructor(private readonly logger: LoggerService) {}
 * this.logger.info('This is an info log');
 * this.logger.error('This is an error log');
 * ```
 */
@Injectable()
export class LoggerService {
  /**
   * The Winston logger instance used for logging messages.
   * 
   * @private
   * @type {Logger}
   */
  private logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      }),
    ),
    transports: [  
      new transports.Console(),
      new transports.File({ filename: 'logs/app.log', level: 'info' }),
      new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    ],
  });

  /**
   * Logs informational messages.
   * 
   * @param message - The message to be logged at the 'info' level.
   * 
   * @example
   * ```ts
   * this.logger.info('User created successfully');
   * ```
   */
  info(message: string) {
    this.logger.info(message);
  }

  /**
   * Logs error messages.
   * 
   * @param message - The message to be logged at the 'error' level.
   * 
   * @example
   * ```ts
   * this.logger.error('Failed to connect to the database');
   * ```
   */
  error(message: string) {
    this.logger.error(message);
  }
}

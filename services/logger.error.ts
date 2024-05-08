// logger.service.ts

import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'error', // level info , error ,...
      format: winston.format.printf(
        ({ level, message, timestamp }) => `${message} : ${timestamp}\n`,
      ),
      transports: [
        new winston.transports.File({
          filename: './log/error.log',
          level: 'error',
        }), // Lưu log vào file error.log
      ],
    });
  }

  logError(message: string, error: any) {
    this.logger.error(message, { error });
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'services/logger.error';

//  handle error
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.loggerService.logError('Server error', exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Kiểm tra nếu ngoại lệ là một HTTP exception
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof SyntaxError) {
      // Nếu có lỗi cú pháp
      status = HttpStatus.BAD_REQUEST;
      message = 'Syntax error occurred';
    } else if (exception instanceof TypeError) {
      // Nếu có lỗi sai định dạng dữ liệu
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid data format';
    }

    return response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

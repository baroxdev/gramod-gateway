import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class ExceptionHandler implements GqlExceptionFilter, ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const status = exception?.status || 400;
    const message =
      exception?.response?.message || exception?.message || exception;
    return {
      status: status,
      message: message,
    };
  }
  //   catch(exception: any, host: ArgumentsHost) {
  //     console.log(exception);
  //     // super.catch(exception, host);
  //   }
}

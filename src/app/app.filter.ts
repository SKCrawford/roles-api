import {
  ArgumentsHost,
  Catch,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

import { PGCODES } from '@lib/utils';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    super.catch(exception, gqlHost);
  }
}

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
  public catch(err: any, host: ArgumentsHost) {
    // Convert typeorm NotFoundEntityError to HTTP 404
    if (err.name && err.name === 'EntityNotFound') {
      return new NotFoundException();

    // Convert postgres QueryFailedError unique constraint violation
    } else if (err.name === 'QueryFailedError' && err.code === PGCODES.UNIQUE_VIOLATION) {
      return new ConflictException();
    }

    // Unhandled server error
    return new InternalServerErrorException(null, err);
  }
}

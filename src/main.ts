import { ExceptionFilter, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { ConfigService, Logger } from '@lib/core';

import {
  AllExceptionsFilter,
  AppModule,
  HttpExceptionFilter,
} from './app';

async function bootstrap() {
  // Generate app
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.apiPort;

  // Secure app
  // Defend against origin (see app declaration above)
  app.use(helmet()); // Clickjacking, MIME sniffing, XSS, headers
  app.use(compression()); // Compress response body

  // Attach in-bound DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );

  // Attach error-handling/exception filters
  const httpAdapter = app.getHttpAdapter();
  const filters: ExceptionFilter[] = [
    new HttpExceptionFilter(httpAdapter),
    new AllExceptionsFilter(),
  ];
  app.useGlobalFilters(...filters);

  // Start app
  await app.listen(port);
  logger.log(`Server available at: *:${port}`, 'NestApplication');
}
bootstrap();

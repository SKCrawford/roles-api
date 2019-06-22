import { Module } from '@nestjs/common';

import { PrismaModule } from '@lib/prisma';
import { ConfigModule } from './config';
import { Logger } from './logger.service';

@Module({
  exports: [
    ConfigModule,
    PrismaModule,
    Logger,
  ],
  imports: [
    ConfigModule,
    PrismaModule,
  ],
  providers: [Logger],
})
export class CoreModule {}

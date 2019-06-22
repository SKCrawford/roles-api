import { Module } from '@nestjs/common';

import { CoreModule } from '@lib/core';
import { PrismaModule } from '@lib/prisma';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  imports: [
    CoreModule,
    PrismaModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}

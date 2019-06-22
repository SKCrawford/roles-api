import { Module } from '@nestjs/common';

import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

@Module({
  exports: [ConfigService],
  providers: [ConfigProvider],
})
export class ConfigModule {}

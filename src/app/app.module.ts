import { Module } from '@nestjs/common';

import { BundledModule } from '../modules';

@Module({
  imports: [BundledModule],
})
export class AppModule {}

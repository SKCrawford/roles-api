import { Module } from '@nestjs/common';

import { AuthnModule } from './authn';

@Module({
  imports: [
    AuthnModule,
  ],
})
export class UserAuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService, CoreModule } from '@lib/core';
import { UsersModule } from '../users';
import { AuthnResolver } from './authn.resolver';
import { AuthnService } from './authn.service';

/**
 * Module responsible for authenticating new and existing users.
 * Depends on nestjs' passport and jwt modules.
 */
@Module({
  exports: [AuthnService],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.jwtKey,
        signOptions: {
          expiresIn: config.jwtExpiresInSeconds,
        },
      }),
    }),
  ],
  providers: [AuthnService, AuthnResolver],
})
export class AuthnModule {}

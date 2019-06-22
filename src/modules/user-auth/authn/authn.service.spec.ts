import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { UserCreateInput } from '@lib/prisma';
import { UsersService } from '../users';
import { AuthnService } from './authn.service';

describe('AuthnService', () => {
  let service: AuthnService;
  const mockUsersService = {
    createUser: (data: UserCreateInput) => true,
    findByEmailOrFail: (id: string) => true,
    findByIdOrFail: (id: string) => true,
  };
  const mockJwtService = {
    decode: (token: string) => true,
    signAsync: (payload: Record<string, any>) => true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthnService, JwtService, UsersService],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthnService>(AuthnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

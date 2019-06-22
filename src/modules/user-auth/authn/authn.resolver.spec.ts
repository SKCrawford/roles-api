import { Test, TestingModule } from '@nestjs/testing';

import { AuthnResolver } from './authn.resolver';
import { AuthnService } from './authn.service';

describe('AuthnResolver', () => {
  let resolver: AuthnResolver;
  const mockService = {
    login: (email: string, password: string) => true,
    register: (email: string, password: string) => true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthnResolver, AuthnService],
    })
      .overrideProvider(AuthnService)
      .useValue(mockService)
      .compile();

    resolver = module.get<AuthnResolver>(AuthnResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { AuthnModule } from './authn.module';

describe('AuthnModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthnModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});

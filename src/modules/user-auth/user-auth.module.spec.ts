import { Test, TestingModule } from '@nestjs/testing';

import { UserAuthModule } from './user-auth.module';

describe('UserAuthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserAuthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});

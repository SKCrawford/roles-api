import { Test, TestingModule } from '@nestjs/testing';

import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigProvider],
    }).compile();

    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('retrieves the port value from the store', () => {
    const port = config.apiPort;
    expect(port).toBeTruthy();
  });
});

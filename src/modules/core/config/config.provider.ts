import { ConfigService } from './config.service';

const envFilePath = `${process.cwd()}/.env`;

export const ConfigProvider = {
  provide: ConfigService,
  useValue: new ConfigService(envFilePath),
};

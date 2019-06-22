import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { Logger } from '../logger.service';
import { ConfigStore, createStore } from './config.store';

// Source: https://docs.nestjs.com/techniques/configuration
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private store: ConfigStore;

  constructor(envFilePath: Readonly<string>) {
    try {
      // Read env file if it exists
      const buffer = fs.readFileSync(envFilePath);
      const parsed = dotenv.parse(buffer);
      this.store = createStore(parsed);
      this.logger.log('Loading .env variables');
    } catch (err) {
      // Create default store
      this.logger.warn('.env file not found. Loading defaults.');
      this.store = createStore();
    }
  }

  public get apiPort(): number {
    return this.store.API_PORT;
  }

  public get jwtKey(): string {
    return this.store.JWT_KEY;
  }

  public get jwtExpiresInSeconds(): number {
    return this.store.JWT_EXPIRES_IN_SECONDS;
  }

  public get saltRounds(): number {
    return this.store.SALT_ROUNDS;
  }
}

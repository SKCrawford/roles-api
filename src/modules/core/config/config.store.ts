import { ClassTransformOptions, Expose, plainToClass } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

export const defaults: ConfigStore = {
  API_PORT: 8001,
  JWT_EXPIRES_IN_SECONDS: 60 * 60,
  JWT_KEY: 'supersecretjwtkey923810%(491)',
  SALT_ROUNDS: 8,
};

export class ConfigStore {
  @Expose()
  @IsInt()
  @IsPositive()
  public API_PORT: number;

  @Expose()
  @IsInt()
  @IsPositive()
  public JWT_EXPIRES_IN_SECONDS: number;

  @Expose()
  @IsString()
  public JWT_KEY: string;

  @Expose()
  @IsInt()
  @IsPositive()
  public SALT_ROUNDS: number;
}

const transformOptions: ClassTransformOptions = {
  // Use class-validator decorators for transformation
  enableImplicitConversion: true,
  // Remove all properties not decorated with @Expose()
  excludeExtraneousValues: true,
};

/** Create a new ConfigStore instance with env validation and defaults. */
export function createStore(parsed?: Record<string, string>): ConfigStore {
  if (!parsed) {
    return plainToClass(ConfigStore, defaults, transformOptions);
  }

  const customized = { ...defaults, ...parsed };
  return plainToClass(ConfigStore, customized, transformOptions);
}

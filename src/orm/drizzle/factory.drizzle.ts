import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { DrizzlePostgres } from './drizzle.postgres.orm';

export const TOKEN__DRIZZLE_FACTORY = 'TOKEN__DRIZZLE_FACTORY';

export const drizzleFactory = {
  provide: TOKEN__DRIZZLE_FACTORY,
  inject: [ConfigService, ModuleRef],
  useFactory(configService: ConfigService, moduleRef: ModuleRef) {
    const DATABASE_TYPE = configService.get('DATABASE_TYPE') as string;

    switch (DATABASE_TYPE) {
      case 'POSTGRES':
        return moduleRef.create(DrizzlePostgres);
      default:
        throw new DrizzleFactoryError('Invalid database type');
    }
  },
};

class DrizzleFactoryError extends Error {
  constructor(message: string) {
    super(message);
  }
}

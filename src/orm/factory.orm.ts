import { ConfigService } from '@nestjs/config';
import { TDrizzleOrm } from './drizzle/extenders/base.extender.drizzle.orm';
import { TOKEN__DRIZZLE_FACTORY } from './drizzle/factory.drizzle';

export const TOKEN__ORM_FACTORY = 'TOKEN__ORM_FACTORY';

export const ormFactory = {
  provide: TOKEN__ORM_FACTORY,
  inject: [ConfigService, { token: TOKEN__DRIZZLE_FACTORY, optional: false }],
  useFactory(
    configService: ConfigService,
    drizzleWithChosenDBDriver: TDrizzleOrm,
  ) {
    const ORM_SERVICE = configService.get('ORM_SERVICE') as string;

    switch (ORM_SERVICE) {
      case 'DRIZZLE':
        return drizzleWithChosenDBDriver;
      default:
        throw new OrmError('Invalid orm option');
    }
  },
};

class OrmError extends Error {
  constructor(message: string) {
    super(message);
  }
}

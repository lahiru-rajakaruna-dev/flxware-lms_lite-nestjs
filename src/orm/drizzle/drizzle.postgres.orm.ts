import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TOKEN__LOGGER_FACTORY } from '../../logger/factory.logger';
import type { ILoggerService } from '../../logger/interface.logger';
import { BaseOrm } from '../base.orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../../drizzle/schema';

@Injectable()
export class DrizzlePostgres extends BaseOrm {
  private readonly drizzleDriver: ReturnType<typeof drizzle<typeof schema>>;

  constructor(
    @Inject(TOKEN__LOGGER_FACTORY) logger: ILoggerService,
    configService: ConfigService,
  ) {
    super(logger);
    const dbUrl = configService.get('DATABASE_URL') as string;
    this.drizzleDriver = drizzle(dbUrl, { schema });
  }

  getDriver() {
    return this.drizzleDriver;
  }
}

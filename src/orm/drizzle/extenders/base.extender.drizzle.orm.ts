import { ILoggerService } from '../../../logger/interface.logger';
import { DrizzlePostgres } from '../drizzle.postgres.orm';

export type TDrizzleOrm = DrizzlePostgres;

export abstract class BaseDrizzleOrmExtender {
  protected readonly drizzleOrm: TDrizzleOrm;
  protected readonly logger: ILoggerService;

  constructor(drizzleOrm: DrizzlePostgres, logger: ILoggerService) {
    this.drizzleOrm = drizzleOrm;
    this.logger = logger;
  }
}

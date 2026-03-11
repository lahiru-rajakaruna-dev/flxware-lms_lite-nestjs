import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  TInsertUser,
  TSelectUser,
  TUpdateUser,
  users,
} from '../../../../drizzle/schema';
import { TOKEN__LOGGER_FACTORY } from '../../../logger/factory.logger';
import type { ILoggerService } from '../../../logger/interface.logger';
import { IUserManageable } from '../../interface.orm';
import { DrizzlePostgres } from '../drizzle.postgres.orm';
import { TOKEN__DRIZZLE_FACTORY } from '../factory.drizzle';
import { BaseDrizzleOrmExtender } from './base.extender.drizzle.orm';

export class DrizzleUserExtender
  extends BaseDrizzleOrmExtender
  implements IUserManageable
{
  constructor(
    @Inject(TOKEN__LOGGER_FACTORY) logger: ILoggerService,
    @Inject(TOKEN__DRIZZLE_FACTORY) drizzleOrm: DrizzlePostgres,
  ) {
    super(drizzleOrm, logger);
  }

  async createUser(data: TInsertUser): Promise<TSelectUser> {
    const result = await this.drizzleOrm
      .getDriver()
      .insert(users)
      .values(data)
      .returning();

    return this.logger.logAndReturn(result[0], 'INFO');
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.drizzleOrm.getDriver().delete(users).where(eq(users.id, id));

    return this.logger.logAndReturn(true, 'INFO');
  }

  async getUser(id: number): Promise<TSelectUser> {
    const result = await this.drizzleOrm.getDriver().query.users.findFirst({
      where(columns) {
        return eq(columns.id, id);
      },
    });

    return this.logger.logAndReturn(result!, 'INFO');
  }

  async updateUser(id: number, updates: TUpdateUser): Promise<TSelectUser> {
    const result = await this.drizzleOrm
      .getDriver()
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();

    return this.logger.logAndReturn(result[0], 'INFO');
  }
}

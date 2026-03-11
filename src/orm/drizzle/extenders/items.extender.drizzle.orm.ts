import { Inject } from '@nestjs/common';
import { and, eq, ilike } from 'drizzle-orm';
import {
  items,
  TInsertItem,
  TSelectItem,
  TUpdateItem,
  users,
} from '../../../../drizzle/schema';
import { TOKEN__LOGGER_FACTORY } from '../../../logger/factory.logger';
import { type ILoggerService } from '../../../logger/interface.logger';
import { type IItemManageable } from '../../interface.orm';
import { TOKEN__DRIZZLE_FACTORY } from '../factory.drizzle';
import {
  BaseDrizzleOrmExtender,
  type TDrizzleOrm,
} from './base.extender.drizzle.orm';

export class DrizzleItemsExtender
  extends BaseDrizzleOrmExtender
  implements IItemManageable
{
  constructor(
    @Inject(TOKEN__DRIZZLE_FACTORY) drizzleOrm: TDrizzleOrm,
    @Inject(TOKEN__LOGGER_FACTORY) logger: ILoggerService,
  ) {
    super(drizzleOrm, logger);
  }

  async createItem(data: TInsertItem): Promise<TSelectItem> {
    const result = await this.drizzleOrm
      .getDriver()
      .insert(items)
      .values(data)
      .returning();

    return this.logger.logAndReturn(result[0], 'INFO');
  }

  async deleteItem(id: number): Promise<boolean> {
    await this.drizzleOrm.getDriver().delete(users).where(eq(users.id, id));

    return this.logger.logAndReturn(false, 'INFO');
  }

  async getAllItems(filters?: Partial<TSelectItem>): Promise<TSelectItem[]> {
    const result = await this.drizzleOrm.getDriver().query.items.findMany({
      where(columns) {
        return and(
          filters?.id ? eq(columns.id, filters.id) : undefined,
          filters?.code_id ? eq(columns.code_id, filters.code_id) : undefined,
          filters?.created_at
            ? eq(columns.created_at, filters.created_at)
            : undefined,
          filters?.updated_at
            ? eq(columns.updated_at, filters.updated_at)
            : undefined,
          filters?.serial ? eq(columns.serial, filters.serial) : undefined,
          filters?.storage_place_id
            ? eq(columns.storage_place_id, filters.storage_place_id)
            : undefined,
          filters?.type ? eq(columns.type, filters.type) : undefined,
          filters?.status ? eq(columns.status, filters.status) : undefined,
          filters?.name ? ilike(columns.name, filters.name) : undefined,
        );
      },
    });

    return this.logger.logAndReturn(result, 'INFO');
  }

  async getItem(id: number): Promise<TSelectItem> {
    const result = await this.drizzleOrm.getDriver().query.items.findFirst({
      where(columns) {
        return eq(columns.id, id);
      },
    });

    return this.logger.logAndReturn(result!, 'INFO');
  }

  async updateItem(id: number, updates: TUpdateItem): Promise<TSelectItem> {
    const result = await this.drizzleOrm
      .getDriver()
      .update(items)
      .set(updates)
      .where(eq(items.id, id))
      .returning();

    return this.logger.logAndReturn(result[0], 'INFO');
  }
}

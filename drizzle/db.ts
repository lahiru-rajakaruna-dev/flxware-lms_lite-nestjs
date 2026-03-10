import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export class DrizzleDriver {
  private static instance: ReturnType<typeof drizzle> | undefined;

  public static getInstance() {
    if (!this.instance) {
      const DB_STRING = process.env.DATABASE_URL;

      if (!DB_STRING) {
        throw new Error('Database connection string not found');
      } else {
        const sql = neon(DB_STRING);
        this.instance = drizzle(sql, { schema });
      }
    }

    return this.instance;
  }
}

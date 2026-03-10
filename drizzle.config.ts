//DONT FORGET TO LOAD env variables
import { defineConfig } from 'drizzle-kit';

//Configured for PostgreSQL with Neon
export default defineConfig({
  dialect: 'postgresql',
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  strict: true,
  verbose: true,
});

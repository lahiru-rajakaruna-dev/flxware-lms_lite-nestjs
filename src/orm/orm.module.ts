import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';
import { DrizzlePostgres } from './drizzle/drizzle.postgres.orm';
import { drizzleFactory } from './drizzle/factory.drizzle';
import { ormFactory, TOKEN__ORM_FACTORY } from './factory.orm';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [DrizzlePostgres, drizzleFactory, ormFactory],
  exports: [TOKEN__ORM_FACTORY],
})
export class OrmModule {}

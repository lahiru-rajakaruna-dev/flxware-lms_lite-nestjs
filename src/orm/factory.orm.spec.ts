import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { LoggerModule } from '../logger/logger.module';
import { DrizzlePostgres } from './drizzle/drizzle.postgres.orm';
import { drizzleFactory } from './drizzle/factory.drizzle';
import { ormFactory } from './factory.orm';

describe('OrmFactory', () => {
  let provider: DrizzlePostgres;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), './.env'),
        }),
        LoggerModule,
      ],
      providers: [ormFactory, drizzleFactory],
    }).compile();

    provider = module.get<ReturnType<typeof ormFactory.useFactory>>(
      ormFactory.provide,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

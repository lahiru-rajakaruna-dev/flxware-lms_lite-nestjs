import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { LoggerModule } from '../../logger/logger.module';
import { DrizzlePostgres } from './drizzle.postgres.orm';

describe('Drizzle', () => {
  let provider: DrizzlePostgres;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), './.env'),
        }),
        LoggerModule,
      ],
      providers: [DrizzlePostgres],
    }).compile();

    provider = module.get<DrizzlePostgres>(DrizzlePostgres);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

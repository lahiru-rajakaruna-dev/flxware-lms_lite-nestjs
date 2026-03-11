import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { CacheModule } from '../cache/cache.module';
import { SessionMiddleware } from './session.middleware';
import { v4 as _uuid } from 'uuid';

jest.mock('uuid', () => {
  return { _uuid: () => Uint8Array.from('mocked') };
});

describe('SessionMiddleware', () => {
  let service: SessionMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), '.env'),
          isGlobal: true,
        }),
        CacheModule,
      ],
      providers: [SessionMiddleware],
    }).compile();

    service = module.get<SessionMiddleware>(SessionMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

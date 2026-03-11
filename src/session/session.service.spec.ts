import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { CacheModule } from '../cache/cache.module';
import { SessionModule } from './session.module';
import { SessionService } from './session.service';
import { v4 as _uuid } from 'uuid';
jest.mock('uuid', () => ({ _uuid: () => Uint8Array.from('mocked') }));

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), '.env'),
          isGlobal: true,
        }),
        SessionModule,
        CacheModule,
      ],
      providers: [SessionService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

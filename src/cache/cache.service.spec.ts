import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { NodeCacheService } from './node_cache.cache.service';

describe('CacheService', () => {
  let service: NodeCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), '.env'),
          isGlobal: true,
        }),
      ],
      providers: [NodeCacheService],
    }).compile();

    service = module.get<NodeCacheService>(NodeCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

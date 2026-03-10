import { Test, TestingModule } from '@nestjs/testing';
import { NodeCacheService } from './node_cache.cache.service';

describe('CacheService', () => {
  let service: NodeCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeCacheService],
    }).compile();

    service = module.get<NodeCacheService>(NodeCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

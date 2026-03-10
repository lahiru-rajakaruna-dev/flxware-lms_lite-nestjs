import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { ICacheService } from './interface.cache';
import { NodeCacheService } from './node_cache.cache.service';

export const TOKEN__CACHE_FACTORY = 'TOKEN__CACHE_FACTORY';

export const cacheFactory = {
  provide: TOKEN__CACHE_FACTORY,
  useFactory: function (
    configService: ConfigService,
    moduleRef: ModuleRef,
  ): ICacheService {
    const cacheServiceOption = configService.get('CACHE_SERVICE') as string;

    switch (cacheServiceOption) {
      case 'NODE_CACHE':
        return moduleRef.get(NodeCacheService);
      default:
        throw new CacheFactoryError('Invalid options');
    }
  },
  inject: [ConfigService, ModuleRef],
};

class CacheFactoryError extends Error {
  constructor(message: string) {
    super(message);
  }
}

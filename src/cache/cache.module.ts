import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cacheFactory } from './factory.cache';
import { NodeCacheService } from './node_cache.cache.service';

@Module({
  imports: [ConfigModule],
  providers: [NodeCacheService, cacheFactory],
  exports: [cacheFactory],
})
export class CacheModule {}

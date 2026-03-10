import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeCache from 'node-cache';
import { ICacheService, TCacheValue } from './interface.cache';

@Injectable()
export class NodeCacheService implements ICacheService {
  private readonly nodeCacheDriver: NodeCache;

  constructor(configService: ConfigService) {
    this.nodeCacheDriver = new NodeCache({
      stdTTL: configService.get('SESSION_TTL'),
      checkperiod: configService.get('SESSION_CLEANUP_INTERVAL'),
      maxKeys: configService.get('MAX_SESSION_LIMIT'),
      deleteOnExpire: true,
    });
  }

  get(key: string): TCacheValue {
    return this.nodeCacheDriver.get(key);
  }

  set(key: string, value: TCacheValue): boolean {
    return this.nodeCacheDriver.set(key, value);
  }
}

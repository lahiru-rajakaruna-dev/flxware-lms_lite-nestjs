import { Inject, Injectable } from '@nestjs/common';
import { TOKEN__CACHE_FACTORY } from '../cache/factory.cache';
import { type ICacheService, TCacheValue } from '../cache/interface.cache';
import { ISessionService } from './interface.session.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SessionService implements ISessionService {
  private readonly cacheService: ICacheService;

  constructor(@Inject(TOKEN__CACHE_FACTORY) cacheService: ICacheService) {
    this.cacheService = cacheService;
  }

  getSession(sessionKey: string): TCacheValue | undefined {
    return this.cacheService.get(sessionKey);
  }

  setSession(payload: Omit<TCacheValue, 'undefined'>): string {
    const sessionKey = uuid();
    this.cacheService.set(sessionKey, payload);
    return sessionKey;
  }
}

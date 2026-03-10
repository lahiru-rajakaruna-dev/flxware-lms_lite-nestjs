import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { TSelectUser } from '../../drizzle/schema';
import { global } from '../../global';
import NestRequest = global.NestRequest;
import * as JWT from 'jsonwebtoken';
import { TOKEN__CACHE_FACTORY } from '../cache/factory.cache';
import { type ICacheService } from '../cache/interface.cache';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly cacheService: ICacheService;

  constructor(@Inject(TOKEN__CACHE_FACTORY) cacheService: ICacheService) {
    this.cacheService = cacheService;
  }

  public use(req: NestRequest, res: Request, next: (error?: any) => void): any {
    const token = req.cookies['authorization'];

    if (!token) {
      throw new SessionError('Token not found');
    }

    const decodedJWT = JWT.decode(token, {
      json: true,
      complete: true,
    });

    if (!decodedJWT || !decodedJWT.payload) {
      throw new SessionError('Invalid token');
    }

    const sessionToken = decodedJWT.payload as string;

    if (!sessionToken) {
      throw new SessionError('Empty payload');
    }

    const user = this.cacheService.get(sessionToken) as TSelectUser | undefined;

    if (!user) {
      throw new SessionError('Session expired');
    }

    req.user = user;

    return next();
  }
}

class SessionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

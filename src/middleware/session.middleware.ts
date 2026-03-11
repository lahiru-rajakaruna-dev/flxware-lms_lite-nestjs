import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TSelectUser } from '../../drizzle/schema';
import { e } from '../../global';
import NestRequest = e.NestRequest;
import * as JWT from 'jsonwebtoken';
import { ISessionService } from '../session/interface.session.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private readonly sessionService: ISessionService;
  private readonly configService: ConfigService;

  constructor(sessionService: SessionService, configService: ConfigService) {
    this.sessionService = sessionService;
    this.configService = configService;
  }

  public use(req: NestRequest, res: Request, next: (error?: any) => void): any {
    const sessionKey = req.cookies['sessionKey'];

    if (!sessionKey) {
      throw new SessionError('Key not found');
    }

    const user = this.sessionService.getSession(sessionKey);

    if (!user) {
      throw new SessionError('Session expired');
    }

    req.user = user as TSelectUser;

    return next();
  }
}

class SessionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

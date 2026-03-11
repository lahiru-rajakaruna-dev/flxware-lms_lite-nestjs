import { NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { e } from '../../global';
import NestRequest = e.NestRequest;
import * as JWT from 'jsonwebtoken';
import { AuthenticationError } from '../auth/auth.service';

export class AuthMiddleware implements NestMiddleware {
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  public use(
    req: NestRequest,
    res: Response,
    next: (error?: any) => void,
  ): any {
    const authToken = req.cookies['token'];

    if (!authToken) {
      throw new AuthError('Unauthenticated');
    }

    const JWT_SECRET_KEY = this.configService.get('JWT_SECRET_KEY') as string;

    const sessionKey = JWT.verify(authToken, JWT_SECRET_KEY, {
      complete: true,
    }).payload;

    if (!sessionKey) {
      throw new AuthenticationError('Invalid token');
    }

    req.sessionKey = sessionKey as string;

    return next();
  }
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

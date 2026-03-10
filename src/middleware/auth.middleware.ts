import { NestMiddleware } from '@nestjs/common';
import { global } from '../../global';
import NestRequest = global.NestRequest;

export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  public use(
    req: NestRequest,
    res: Response,
    next: (error?: any) => void,
  ): any {
    const authToken = req.cookies['authorization'];

    if (!authToken) {
      throw new AuthError('Unauthenticated');
    }

    return next();
  }
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
  }
}

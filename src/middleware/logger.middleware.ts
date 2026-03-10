import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { global } from '../../global';
import { TOKEN__LOGGER_FACTORY } from '../logger/factory.logger';
import { type ILoggerService } from '../logger/interface.logger';
import NestRequest = global.NestRequest;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: ILoggerService;

  constructor(@Inject(TOKEN__LOGGER_FACTORY) logger: ILoggerService) {
    this.logger = logger;
  }

  use(req: NestRequest, res: Response, next: (error?: any) => void): any {
    this.logger.log(req, 'INFO');
    return next();
  }
}

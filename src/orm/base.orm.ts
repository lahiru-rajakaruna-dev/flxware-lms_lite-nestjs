import { ILoggerService } from '../logger/interface.logger';

export abstract class BaseOrm {
  protected readonly logger: ILoggerService;

  constructor(logger: ILoggerService) {
    this.logger = logger;
  }

  abstract getDriver(): unknown;
}

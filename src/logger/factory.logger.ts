import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { ConsoleLogger } from './console.logger.service';
import { type ILoggerService } from './interface.logger';

export const TOKEN__LOGGER_FACTORY = 'TOKEN__LOGGER_FACTORY';

export const loggerFactory = {
  provide: TOKEN__LOGGER_FACTORY,
  useFactory: function (
    configService: ConfigService,
    moduleRef: ModuleRef,
  ): ILoggerService {
    const loggerOptions = configService.get('LOGGER_SERVICE') as string;

    switch (loggerOptions) {
      case 'CONSOLE':
        return moduleRef.get(ConsoleLogger);
      default:
        throw new LoggerFactoryError('Invalid logger option');
    }
  },
  inject: [ConfigService, ModuleRef],
};

class LoggerFactoryError extends Error {
  constructor(message: string) {
    super(message);
  }
}

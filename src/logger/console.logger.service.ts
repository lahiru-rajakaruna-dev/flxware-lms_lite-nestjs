import { Injectable } from '@nestjs/common';
import * as Console from 'node:console';
import { ILoggerService, TLogLevel } from './interface.logger';

@Injectable()
export class ConsoleLogger implements ILoggerService {
  private readonly transporter: Console;
  constructor() {
    this.transporter = Console;
  }

  log(buffer: any, level: TLogLevel = 'INFO'): void {
    switch (level) {
      case 'LOG':
        return this.transporter.log(buffer);
      case 'INFO':
        return this.transporter.info(buffer);
      case 'WARN':
        return this.transporter.warn(buffer);
      case 'ERROR':
        return this.transporter.error(buffer);
      default:
        return this.transporter.log(buffer);
    }
  }

  logAndReturn<T>(buffer: T, level: TLogLevel = 'INFO'): T {
    this.log(buffer, level);
    return buffer;
  }
}

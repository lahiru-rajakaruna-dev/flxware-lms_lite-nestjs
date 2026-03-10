import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleLogger } from './console.logger.service';
import { loggerFactory } from './factory.logger';

@Module({
  imports: [ConfigModule],
  providers: [loggerFactory, ConsoleLogger],
  exports: [loggerFactory],
})
export class LoggerModule {}

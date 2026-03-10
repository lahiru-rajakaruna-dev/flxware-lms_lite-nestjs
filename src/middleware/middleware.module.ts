import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { LoggerModule } from '../logger/logger.module';
import { AuthMiddleware } from './auth.middleware';
import { LoggerMiddleware } from './logger.middleware';
import { SessionMiddleware } from './session.middleware';

@Module({
  imports: [CacheModule, LoggerModule],
  providers: [AuthMiddleware, SessionMiddleware, LoggerMiddleware],
  exports: [AuthMiddleware, SessionMiddleware, LoggerMiddleware],
})
export class MiddlewareModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../cache/cache.module';
import { LoggerModule } from '../logger/logger.module';
import { SessionModule } from '../session/session.module';
import { AuthMiddleware } from './auth.middleware';
import { LoggerMiddleware } from './logger.middleware';
import { SessionMiddleware } from './session.middleware';

@Module({
  imports: [ConfigModule, CacheModule, LoggerModule, SessionModule],
  providers: [AuthMiddleware, SessionMiddleware, LoggerMiddleware],
  exports: [AuthMiddleware, SessionMiddleware, LoggerMiddleware],
})
export class MiddlewareModule {}

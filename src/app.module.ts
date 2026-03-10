import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
import { LoggerModule } from './logger/logger.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MiddlewareModule } from './middleware/middleware.module';
import { SessionMiddleware } from './middleware/session.middleware';

@Module({
  imports: [
    CacheModule,
    LoggerModule,
    MiddlewareModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, SessionMiddleware, LoggerMiddleware)
      .exclude('/health')
      .forRoutes('*');
  }
}

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
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { RepositoryModule } from './repository/repository.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    CacheModule,
    LoggerModule,
    MiddlewareModule,
    ConfigModule.forRoot(),
    AuthModule,
    SessionModule,
    RepositoryModule,
    OrmModule,
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

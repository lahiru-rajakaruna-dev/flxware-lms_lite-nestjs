import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '../cache/cache.module';
import { SessionService } from './session.service';

@Module({
  imports: [ConfigModule, CacheModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

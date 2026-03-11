import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import path from 'node:path';
import { RepositoryModule } from '../repository/repository.module';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { v4 as _uuid } from 'uuid';
import { AuthService } from './auth.service';

jest.mock('uuid', () => ({ _uuid: () => Uint8Array.from('mocked') }));

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.resolve(process.cwd(), '.env'),
          isGlobal: true,
        }),
        SessionModule,
        RepositoryModule,
      ],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

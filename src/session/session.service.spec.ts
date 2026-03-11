import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionModule } from './session.module';
import { SessionService } from './session.service';
import { v4 as _uuid } from 'uuid';
jest.mock('uuid', () => ({ _uuid: () => Uint8Array.from('mocked') }));

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, SessionModule],
      providers: [SessionService],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

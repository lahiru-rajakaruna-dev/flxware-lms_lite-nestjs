import { Test, TestingModule } from '@nestjs/testing';
import { SessionMiddleware } from './session.middleware';

describe('SessionMiddleware', () => {
  let service: SessionMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionMiddleware],
    }).compile();

    service = module.get<SessionMiddleware>(SessionMiddleware);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

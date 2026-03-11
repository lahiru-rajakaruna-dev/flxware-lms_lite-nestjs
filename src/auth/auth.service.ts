import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';
import type {
  TInsertUser,
  TSelectUser,
  TUpdateUser,
} from '../../drizzle/schema';
import { type ISessionService } from '../session/interface.session.service';
import { type IAuthService } from './interface.auth';

@Injectable()
export class AuthService implements IAuthService {
  private readonly sessionService: ISessionService;
  private readonly userRepository: IUserRepository;
  private readonly configService: ConfigService;

  constructor(
    sessionService: ISessionService,
    userRepository: IUserRepository,
    configService: ConfigService,
  ) {
    this.sessionService = sessionService;
    this.userRepository = userRepository;
    this.configService = configService;
  }

  async authenticate(nic: string, password: string): Promise<string> {
    const user = await this.userRepository.getUser(nic, { password: password });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const sessionKey = this.sessionService.setSession(user);
    const JWT_SECRET_KEY = this.configService.get('JWT_SECRET_KEY') as string;

    const jwt = JWT.sign(sessionKey, JWT_SECRET_KEY, {
      issuer: 'flxware-lms-lite',
      algorithm: 'ES384',
      allowInsecureKeySizes: false,
      mutatePayload: false,
    });

    return jwt;
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

interface IUserRepository {
  getUser(nic: string, filters: Partial<TSelectUser>): Promise<TSelectUser>;
  updateUser(id: number, updates: TUpdateUser): Promise<TSelectUser>;
  deleteUser(id: number): Promise<boolean>;
  createUser(data: TInsertUser): Promise<TSelectUser>;
}

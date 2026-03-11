import { Injectable } from '@nestjs/common';
import { TInsertUser, TSelectUser, TUpdateUser } from '../../../drizzle/schema';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  createUser(data: TInsertUser): Promise<TSelectUser> {
    return Promise.resolve(undefined);
  }

  deleteUser(id: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  getUser(nic: string, filters: Partial<TSelectUser>): Promise<TSelectUser> {
    return Promise.resolve(undefined);
  }

  updateUser(id: number, updates: TUpdateUser): Promise<TSelectUser> {
    return Promise.resolve(undefined);
  }
}

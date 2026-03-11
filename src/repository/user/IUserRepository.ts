import type {
  TInsertUser,
  TSelectUser,
  TUpdateUser,
} from '../../../drizzle/schema';

export interface IUserRepository {
  getUser(nic: string, filters: Partial<TSelectUser>): Promise<TSelectUser>;
  updateUser(id: number, updates: TUpdateUser): Promise<TSelectUser>;
  deleteUser(id: number): Promise<boolean>;
  createUser(data: TInsertUser): Promise<TSelectUser>;
}

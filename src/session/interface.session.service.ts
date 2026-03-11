import { TCacheValue } from '../cache/interface.cache';

export interface ISessionService {
  setSession(payload: Omit<TCacheValue, 'undefined'>): string;
  getSession(sessionKey: string): TCacheValue | undefined;
}

export interface ICacheService {
  get(key: string): TCacheValue;
  set(key: string, value: Omit<TCacheValue, 'undefined'>): boolean;
}

export type TCacheValue =
  | string
  | number
  | Record<string, string | number>
  | undefined;

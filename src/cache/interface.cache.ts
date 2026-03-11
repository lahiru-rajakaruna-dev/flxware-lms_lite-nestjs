export interface ICacheService {
  get(key: string): TCacheValue;
  set(key: string, value: Omit<TCacheValue, 'undefined'>): boolean;
}

export type TCacheValue = string | number | TObject | undefined;

export type TObject = {
  [k: string]: string | number | Date | TObject;
};

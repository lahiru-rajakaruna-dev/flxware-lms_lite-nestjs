import { TSelectUser } from './drizzle/schema';

declare namespace global {
  export interface NestRequest extends Request {
    cookies: Record<string, string>;
    user: TSelectUser | undefined;
  }
}

import { TSelectUser } from './drizzle/schema';

declare namespace e {
  export interface NestRequest extends Request {
    cookies: Record<string, string | undefined>;
    user: TSelectUser | undefined;
    sessionKey: string | undefined;
  }
}

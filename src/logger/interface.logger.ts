export interface ILoggerService {
  log(buffer: any, level: TLogLevel): void;
  logAndReturn<T>(buffer: T, level: TLogLevel): T;
}

export type TLogLevel = 'LOG' | 'INFO' | 'WARN' | 'ERROR';

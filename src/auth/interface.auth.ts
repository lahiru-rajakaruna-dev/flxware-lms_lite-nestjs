export interface IAuthService {
  authenticate(nic: string, password: string): Promise<string>;
}

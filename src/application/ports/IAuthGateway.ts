import type { AuthState } from '@/domain/types';

export interface IAuthGateway {
  validatePin(input: string, stored: string): boolean;
  createSession(): AuthState;
  clearSession(): AuthState;
  isExpired(auth: AuthState): boolean;
}

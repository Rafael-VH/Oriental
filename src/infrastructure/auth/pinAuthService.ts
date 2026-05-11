import type { AuthState } from '@/domain/types';
import type { IAuthGateway } from '@/application/ports/IAuthGateway';

const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export const pinAuthService: IAuthGateway = {
  validatePin(input: string, stored: string): boolean {
    return input === stored;
  },

  createSession(): AuthState {
    return { isAuthenticated: true, loginTimestamp: Date.now() };
  },

  clearSession(): AuthState {
    return { isAuthenticated: false, loginTimestamp: null };
  },

  isExpired(auth: AuthState): boolean {
    if (!auth.isAuthenticated || !auth.loginTimestamp) return true;
    return Date.now() - auth.loginTimestamp > SESSION_DURATION;
  },
};

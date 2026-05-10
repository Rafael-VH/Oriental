import type { AuthState } from '@/domain/types';

export const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export function validatePin(inputPin: string, storedPin: string): boolean {
  return inputPin === storedPin;
}

export function createAuthState(): AuthState {
  return { isAuthenticated: true, loginTimestamp: Date.now() };
}

export function clearAuthState(): AuthState {
  return { isAuthenticated: false, loginTimestamp: null };
}

export function isSessionExpired(auth: AuthState): boolean {
  if (!auth.isAuthenticated || !auth.loginTimestamp) return true;
  return Date.now() - auth.loginTimestamp > SESSION_DURATION;
}

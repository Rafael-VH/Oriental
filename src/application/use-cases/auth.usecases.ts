import type { AppState } from '@/domain/types';
import type { IAuthGateway } from '../ports/IAuthGateway';
import type { IPersistenceRepository } from '../ports/IPersistenceRepository';

export function createLoginUseCase(
  authGateway: IAuthGateway,
  persistenceRepo: IPersistenceRepository,
) {
  return (pin: string, getState: () => AppState, setState: (s: AppState) => void): boolean => {
    const state = getState();
    if (authGateway.validatePin(pin, state.general.pin)) {
      const newState = { ...state, auth: authGateway.createSession() };
      setState(newState);
      persistenceRepo.save(newState);
      return true;
    }
    return false;
  };
}

export function createLogoutUseCase(
  authGateway: IAuthGateway,
  persistenceRepo: IPersistenceRepository,
) {
  return (getState: () => AppState, setState: (s: AppState) => void): void => {
    const state = getState();
    const newState = { ...state, auth: authGateway.clearSession() };
    setState(newState);
    persistenceRepo.save(newState);
  };
}

export function createCheckSessionUseCase(authGateway: IAuthGateway) {
  return (getState: () => AppState, onExpired: () => void): boolean => {
    const state = getState();
    if (authGateway.isExpired(state.auth)) {
      if (state.auth.isAuthenticated) onExpired();
      return false;
    }
    return true;
  };
}

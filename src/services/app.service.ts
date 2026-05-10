import { useStore } from '@/data/useStore';
import { defaultAppState, defaultGeneral } from '@/data/defaults';
import { validatePin, createAuthState, clearAuthState, isSessionExpired } from './auth.service';
import { loadState, saveState } from './persistence.service';

export function hydrateStore(): void {
  const saved = loadState({ defaultState: defaultAppState, defaultGeneral });
  useStore.setState(saved);
}

export function login(pin: string): boolean {
  const state = useStore.getState();
  if (validatePin(pin, state.general.pin)) {
    useStore.setState({ ...state, auth: createAuthState() });
    saveState(useStore.getState());
    return true;
  }
  return false;
}

export function logout(): void {
  const state = useStore.getState();
  useStore.setState({ ...state, auth: clearAuthState() });
  saveState(useStore.getState());
}

export function checkSession(): boolean {
  const state = useStore.getState();
  if (isSessionExpired(state.auth)) {
    if (state.auth.isAuthenticated) logout();
    return false;
  }
  return true;
}

export function saveAll(): void {
  saveState(useStore.getState());
  useStore.getState().clearUnsavedChanges();
}

export function resetToDefaults(): void {
  useStore.setState({ ...defaultAppState });
  saveState(useStore.getState());
}

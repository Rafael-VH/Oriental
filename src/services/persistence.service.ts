import type { AppState, GeneralSettings } from '@/domain/types';

const STORAGE_KEY = 'estudio_oriental_cms';

export function getStorageKey(): string {
  return STORAGE_KEY;
}

interface LoadStateOptions {
  defaultState: AppState;
  defaultGeneral: GeneralSettings;
}

export function loadState(options: LoadStateOptions): AppState {
  const { defaultState, defaultGeneral } = options;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...defaultState,
        ...parsed,
        general: { ...defaultGeneral, ...parsed.general },
        sections: parsed.sections || defaultState.sections,
        ui: { ...defaultState.ui, ...parsed.ui },
        auth: { ...defaultState.auth, ...parsed.auth },
      };
    }
  } catch {
    // ignore parse errors
  }
  return defaultState;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

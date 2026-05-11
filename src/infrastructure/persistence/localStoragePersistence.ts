import type { IPersistenceRepository } from '@/application/ports/IPersistenceRepository';

const STORAGE_KEY = 'estudio_oriental_cms';

export const localStoragePersistence: IPersistenceRepository = {
  async load(defaultState) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultState,
          ...parsed,
          general: { ...defaultState.general, ...parsed.general },
          sections: parsed.sections || defaultState.sections,
          ui: { ...defaultState.ui, ...parsed.ui },
          auth: { ...defaultState.auth, ...parsed.auth },
        };
      }
    } catch {
      // ignore parse errors
    }
    return { ...defaultState };
  },

  save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  },
};

export function getStorageKey(): string {
  return STORAGE_KEY;
}

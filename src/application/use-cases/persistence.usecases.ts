import type { AppState } from '@/domain/types';
import type { IPersistenceRepository } from '../ports/IPersistenceRepository';

export function createHydrateStoreUseCase(persistenceRepo: IPersistenceRepository) {
  return async (defaults: AppState): Promise<AppState> => {
    return await persistenceRepo.load(defaults);
  };
}

export function createSaveAllUseCase(persistenceRepo: IPersistenceRepository) {
  return (state: AppState, clearUnsaved: () => void): void => {
    persistenceRepo.save(state);
    clearUnsaved();
  };
}

export function createResetToDefaultsUseCase(persistenceRepo: IPersistenceRepository) {
  return (defaults: AppState, setState: (s: AppState) => void): void => {
    setState({ ...defaults });
    persistenceRepo.save({ ...defaults });
  };
}

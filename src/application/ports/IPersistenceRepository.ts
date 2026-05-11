import type { AppState } from '@/domain/types';

export interface IPersistenceRepository {
  load(defaults: AppState): AppState;
  save(state: AppState): void;
}

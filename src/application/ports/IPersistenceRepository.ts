import type { AppState } from '@/domain/types';

export interface IPersistenceRepository {
  load(defaults: AppState): Promise<AppState>;
  save(state: AppState): void;
}

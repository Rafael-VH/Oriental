import type { AppState, GeneralSettings } from '@/domain/types';

export function updateGeneralUseCase(
  field: keyof GeneralSettings,
  value: unknown,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  setState({ ...state, general: { ...state.general, [field]: value } });
}

export function updateGeneralObjectUseCase(
  updates: Partial<GeneralSettings>,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  setState({ ...state, general: { ...state.general, ...updates } });
}

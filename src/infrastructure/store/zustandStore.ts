import { create } from 'zustand';
import type { AppState, GeneralSettings, Section, SectionContent } from '@/domain/types';
import { defaultAppState } from './defaults';
import { localStoragePersistence } from '../persistence/localStoragePersistence';
import { pinAuthService } from '../auth/pinAuthService';
import { createLoginUseCase, createLogoutUseCase, createCheckSessionUseCase } from '@/application/use-cases/auth.usecases';
import { createHydrateStoreUseCase, createSaveAllUseCase, createResetToDefaultsUseCase } from '@/application/use-cases/persistence.usecases';
import { updateGeneralUseCase, updateGeneralObjectUseCase } from '@/application/use-cases/general.usecases';
import { updateSectionUseCase, updateSectionContentUseCase } from '@/application/use-cases/section.usecases';
import {
  addItemUseCase,
  removeItemUseCase,
  updateItemUseCase,
  reorderItemsUseCase,
  toggleOfferActiveUseCase,
} from '@/application/use-cases/items.usecases';

const loginUseCase = createLoginUseCase(pinAuthService, localStoragePersistence);
const logoutUseCase = createLogoutUseCase(pinAuthService, localStoragePersistence);
const checkSessionUseCase = createCheckSessionUseCase(pinAuthService);
const hydrateStoreUseCase = createHydrateStoreUseCase(localStoragePersistence);
const saveAllUseCase = createSaveAllUseCase(localStoragePersistence);
const resetToDefaultsUseCase = createResetToDefaultsUseCase(localStoragePersistence);

interface AppActions {
  updateGeneral: (field: keyof GeneralSettings, value: unknown) => void;
  updateGeneralObject: (updates: Partial<GeneralSettings>) => void;
  updateSection: (sectionId: number, updates: Partial<Section>) => void;
  updateSectionContent: (sectionId: number, content: Partial<SectionContent>) => void;
  addItem: (sectionId: number, itemType: string, item: unknown) => void;
  removeItem: (sectionId: number, itemType: string, itemId: string) => void;
  updateItem: (sectionId: number, itemType: string, itemId: string, updates: Record<string, unknown>) => void;
  reorderItems: (sectionId: number, itemType: string, newOrder: string[]) => void;
  toggleOfferActive: (sectionId: number, offerId: string) => void;
  setActiveDashboardTab: (tab: string) => void;
  toggleSidebar: () => void;
  setPreviewMode: (mode: boolean) => void;
  addUnsavedChange: (key: string) => void;
  clearUnsavedChanges: () => void;
}

export const useStore = create<AppState & AppActions>((set, get) => {
  const initial = hydrateStoreUseCase(defaultAppState);

  return {
    ...initial,

    // General
    updateGeneral: (field, value) => {
      updateGeneralUseCase(field, value, get, set);
    },

    updateGeneralObject: (updates) => {
      updateGeneralObjectUseCase(updates, get, set);
    },

    // Sections
    updateSection: (sectionId, updates) => {
      updateSectionUseCase(sectionId, updates, get, set);
    },

    updateSectionContent: (sectionId, content) => {
      updateSectionContentUseCase(sectionId, content, get, set);
    },

    // Items CRUD
    addItem: (sectionId, itemType, item) => {
      addItemUseCase(sectionId, itemType, item, get, set);
    },

    removeItem: (sectionId, itemType, itemId) => {
      removeItemUseCase(sectionId, itemType, itemId, get, set);
    },

    updateItem: (sectionId, itemType, itemId, updates) => {
      updateItemUseCase(sectionId, itemType, itemId, updates, get, set);
    },

    reorderItems: (sectionId, itemType, newOrder) => {
      reorderItemsUseCase(sectionId, itemType, newOrder, get, set);
    },

    toggleOfferActive: (sectionId, offerId) => {
      toggleOfferActiveUseCase(sectionId, offerId, get, set);
    },

    // UI
    setActiveDashboardTab: (tab) => {
      set((state) => ({ ...state, ui: { ...state.ui, activeDashboardTab: tab } }));
    },

    toggleSidebar: () => {
      set((state) => ({ ...state, ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed } }));
    },

    setPreviewMode: (mode) => {
      set((state) => ({ ...state, ui: { ...state.ui, previewMode: mode } }));
    },

    addUnsavedChange: (key) => {
      set((state) => {
        if (state.ui.unsavedChanges.includes(key)) return state;
        return { ...state, ui: { ...state.ui, unsavedChanges: [...state.ui.unsavedChanges, key] } };
      });
    },

    clearUnsavedChanges: () => {
      set((state) => ({ ...state, ui: { ...state.ui, unsavedChanges: [] } }));
    },
  };
});

// Imperative actions (for use outside React hooks — e.g., callbacks, effects)
export function login(pin: string): boolean {
  return loginUseCase(pin, useStore.getState, useStore.setState);
}

export function logout(): void {
  logoutUseCase(useStore.getState, useStore.setState);
}

export function checkSession(): boolean {
  return checkSessionUseCase(useStore.getState, () => logout());
}

export function saveAll(): void {
  saveAllUseCase(useStore.getState(), () => useStore.getState().clearUnsavedChanges());
}

export function resetToDefaults(): void {
  resetToDefaultsUseCase(defaultAppState, useStore.setState);
}

export function hydrateStore(): void {
  const saved = hydrateStoreUseCase(defaultAppState);
  useStore.setState(saved);
}

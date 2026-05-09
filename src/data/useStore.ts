// ============================================
// DATA LAYER - Zustand Store (State Management)
// ============================================

import { create } from 'zustand';
import type { AppState, GeneralSettings, Section, SectionContent, OfferItem } from '@/domain/types';
import { defaultAppState, loadState, saveState } from './defaults';

interface AppActions {
  // General
  updateGeneral: (field: keyof GeneralSettings, value: unknown) => void;
  updateGeneralObject: (updates: Partial<GeneralSettings>) => void;

  // Sections
  updateSection: (sectionId: number, updates: Partial<Section>) => void;
  updateSectionContent: (sectionId: number, content: Partial<SectionContent>) => void;

  // Items CRUD
  addItem: (sectionId: number, itemType: string, item: unknown) => void;
  removeItem: (sectionId: number, itemType: string, itemId: string) => void;
  updateItem: (sectionId: number, itemType: string, itemId: string, updates: Record<string, unknown>) => void;
  reorderItems: (sectionId: number, itemType: string, newOrder: string[]) => void;

  // Offer toggle
  toggleOfferActive: (sectionId: number, offerId: string) => void;

  // UI
  setActiveDashboardTab: (tab: string) => void;
  toggleSidebar: () => void;
  setPreviewMode: (mode: boolean) => void;
  addUnsavedChange: (key: string) => void;
  clearUnsavedChanges: () => void;

  // Auth
  login: (pin: string) => boolean;
  logout: () => void;
  checkSession: () => boolean;

  // Persistence
  saveAll: () => void;
  resetToDefaults: () => void;

  // Upload
  uploadImage: (sectionId: number, field: string, file: File) => Promise<string>;
}

const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

const initialState = loadState();

export const useStore = create<AppState & AppActions>((set, get) => ({
  ...initialState,

  // General
  updateGeneral: (field, value) => {
    set((state) => {
      const newState = {
        ...state,
        general: { ...state.general, [field]: value },
      };
      saveState(newState);
      return newState;
    });
  },

  updateGeneralObject: (updates) => {
    set((state) => {
      const newState = {
        ...state,
        general: { ...state.general, ...updates },
      };
      saveState(newState);
      return newState;
    });
  },

  // Sections
  updateSection: (sectionId, updates) => {
    set((state) => {
      const newSections = state.sections.map((s) =>
        s.id === sectionId ? { ...s, ...updates, lastModified: Date.now() } : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  updateSectionContent: (sectionId, content) => {
    set((state) => {
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, ...content }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  // Items CRUD
  addItem: (sectionId, itemType, item) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof SectionContent] as unknown[]) || [];
      const newItems = [...currentItems, item];
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, [itemType]: newItems }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  removeItem: (sectionId, itemType, itemId) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      const newItems = currentItems.filter((i) => i.id !== itemId);
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, [itemType]: newItems }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  updateItem: (sectionId, itemType, itemId, updates: Record<string, unknown>) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      const newItems = currentItems.map((i) =>
        i.id === itemId ? { ...i, ...updates } : i
      );
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, [itemType]: newItems }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  reorderItems: (sectionId, itemType, newOrder) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      const itemMap = new Map(currentItems.map((i) => [i.id, i]));
      const newItems = newOrder.map((id) => itemMap.get(id)).filter(Boolean) as Array<{ id: string }>;
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, [itemType]: newItems }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  toggleOfferActive: (sectionId, offerId) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const offers = (section.content.offers || []) as OfferItem[];
      const newOffers = offers.map((o) =>
        o.id === offerId ? { ...o, active: !o.active } : o
      );
      const newSections = state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, offers: newOffers }, lastModified: Date.now() }
          : s
      );
      const newState = { ...state, sections: newSections };
      saveState(newState);
      return newState;
    });
  },

  // UI
  setActiveDashboardTab: (tab) => {
    set((state) => {
      const newState = { ...state, ui: { ...state.ui, activeDashboardTab: tab } };
      saveState(newState);
      return newState;
    });
  },

  toggleSidebar: () => {
    set((state) => {
      const newState = { ...state, ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed } };
      saveState(newState);
      return newState;
    });
  },

  setPreviewMode: (mode) => {
    set((state) => ({ ...state, ui: { ...state.ui, previewMode: mode } }));
  },

  addUnsavedChange: (key) => {
    set((state) => {
      if (state.ui.unsavedChanges.includes(key)) return state;
      const newState = {
        ...state,
        ui: { ...state.ui, unsavedChanges: [...state.ui.unsavedChanges, key] },
      };
      return newState;
    });
  },

  clearUnsavedChanges: () => {
    set((state) => {
      const newState = { ...state, ui: { ...state.ui, unsavedChanges: [] } };
      return newState;
    });
  },

  // Auth
  login: (pin) => {
    const state = get();
    if (pin === state.general.pin) {
      const newState = {
        ...state,
        auth: { isAuthenticated: true, loginTimestamp: Date.now() },
      };
      set(newState);
      saveState(newState);
      return true;
    }
    return false;
  },

  logout: () => {
    const state = get();
    const newState = {
      ...state,
      auth: { isAuthenticated: false, loginTimestamp: null },
    };
    set(newState);
    saveState(newState);
  },

  checkSession: () => {
    const state = get();
    if (!state.auth.isAuthenticated || !state.auth.loginTimestamp) return false;
    const elapsed = Date.now() - state.auth.loginTimestamp;
    if (elapsed > SESSION_DURATION) {
      get().logout();
      return false;
    }
    return true;
  },

  // Persistence
  saveAll: () => {
    const state = get();
    saveState(state);
    get().clearUnsavedChanges();
  },

  resetToDefaults: () => {
    const newState = { ...defaultAppState };
    set(newState);
    saveState(newState);
  },

  // Upload - converts file to base64 for localStorage persistence
  uploadImage: (_sectionId, _field, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('File too large. Max 5MB.'));
        return;
      }
      reader.readAsDataURL(file);
    });
  },
}));

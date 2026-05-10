import { create } from 'zustand';
import type { AppState, GeneralSettings, Section, SectionContent, OfferItem } from '@/domain/types';
import { defaultAppState } from './defaults';

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

export const useStore = create<AppState & AppActions>((set) => ({
  ...defaultAppState,

  // General
  updateGeneral: (field, value) => {
    set((state) => ({ ...state, general: { ...state.general, [field]: value } }));
  },

  updateGeneralObject: (updates) => {
    set((state) => ({ ...state, general: { ...state.general, ...updates } }));
  },

  // Sections
  updateSection: (sectionId, updates) => {
    set((state) => ({
      ...state,
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, ...updates, lastModified: Date.now() } : s
      ),
    }));
  },

  updateSectionContent: (sectionId, content) => {
    set((state) => ({
      ...state,
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, content: { ...s.content, ...content }, lastModified: Date.now() }
          : s
      ),
    }));
  },

  // Items CRUD
  addItem: (sectionId, itemType, item) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof SectionContent] as unknown[]) || [];
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, [itemType]: [...currentItems, item] }, lastModified: Date.now() }
            : s
        ),
      };
    });
  },

  removeItem: (sectionId, itemType, itemId) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, [itemType]: currentItems.filter((i) => i.id !== itemId) }, lastModified: Date.now() }
            : s
        ),
      };
    });
  },

  updateItem: (sectionId, itemType, itemId, updates) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, [itemType]: currentItems.map((i) => (i.id === itemId ? { ...i, ...updates } : i)) }, lastModified: Date.now() }
            : s
        ),
      };
    });
  },

  reorderItems: (sectionId, itemType, newOrder) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const currentItems = (section.content[itemType as keyof typeof section.content] as Array<{ id: string }> | undefined) || [];
      const itemMap = new Map(currentItems.map((i) => [i.id, i]));
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, [itemType]: newOrder.map((id) => itemMap.get(id)).filter(Boolean) as Array<{ id: string }> }, lastModified: Date.now() }
            : s
        ),
      };
    });
  },

  toggleOfferActive: (sectionId, offerId) => {
    set((state) => {
      const section = state.sections.find((s) => s.id === sectionId);
      if (!section) return state;
      const offers = (section.content.offers || []) as OfferItem[];
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === sectionId
            ? { ...s, content: { ...s.content, offers: offers.map((o) => (o.id === offerId ? { ...o, active: !o.active } : o)) }, lastModified: Date.now() }
            : s
        ),
      };
    });
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
}));

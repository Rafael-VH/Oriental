import type { AppState, Section, SectionContent } from '@/domain/types';

export function updateSectionUseCase(
  sectionId: number,
  updates: Partial<Section>,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId ? { ...s, ...updates, lastModified: Date.now() } : s,
    ),
  });
}

export function updateSectionContentUseCase(
  sectionId: number,
  content: Partial<SectionContent>,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, ...content }, lastModified: Date.now() }
        : s,
    ),
  });
}

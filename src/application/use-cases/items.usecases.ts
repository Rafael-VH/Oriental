import type { AppState, SectionContent, OfferItem } from '@/domain/types';

export function addItemUseCase(
  sectionId: number,
  itemType: string,
  item: unknown,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return;
  const currentItems = (section.content[itemType as keyof SectionContent] as unknown[]) || [];
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, [itemType]: [...currentItems, item] }, lastModified: Date.now() }
        : s,
    ),
  });
}

export function removeItemUseCase(
  sectionId: number,
  itemType: string,
  itemId: string,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return;
  const currentItems = (section.content[itemType as keyof SectionContent] as Array<{ id: string }> | undefined) || [];
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, [itemType]: currentItems.filter((i) => i.id !== itemId) }, lastModified: Date.now() }
        : s,
    ),
  });
}

export function updateItemUseCase(
  sectionId: number,
  itemType: string,
  itemId: string,
  updates: Record<string, unknown>,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return;
  const currentItems = (section.content[itemType as keyof SectionContent] as Array<{ id: string }> | undefined) || [];
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, [itemType]: currentItems.map((i) => (i.id === itemId ? { ...i, ...updates } : i)) }, lastModified: Date.now() }
        : s,
    ),
  });
}

export function reorderItemsUseCase(
  sectionId: number,
  itemType: string,
  newOrder: string[],
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return;
  const currentItems = (section.content[itemType as keyof SectionContent] as Array<{ id: string }> | undefined) || [];
  const itemMap = new Map(currentItems.map((i) => [i.id, i]));
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, [itemType]: newOrder.map((id) => itemMap.get(id)).filter(Boolean) as Array<{ id: string }> }, lastModified: Date.now() }
        : s,
    ),
  });
}

export function toggleOfferActiveUseCase(
  sectionId: number,
  offerId: string,
  getState: () => AppState,
  setState: (s: AppState) => void,
): void {
  const state = getState();
  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return;
  const offers = (section.content.offers || []) as OfferItem[];
  setState({
    ...state,
    sections: state.sections.map((s) =>
      s.id === sectionId
        ? { ...s, content: { ...s.content, offers: offers.map((o) => (o.id === offerId ? { ...o, active: !o.active } : o)) }, lastModified: Date.now() }
        : s,
    ),
  });
}

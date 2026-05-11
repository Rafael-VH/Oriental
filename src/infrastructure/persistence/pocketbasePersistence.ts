import type { IPersistenceRepository } from '@/application/ports/IPersistenceRepository';
import type { Section } from '@/domain/types';
import {
  authenticate,
  getGeneralRecord,
  createGeneralRecord,
  updateGeneralRecord,
  getSectionRecords,
  createSectionRecord,
  updateSectionRecord,
} from './pocketbaseClient';

let generalRecordId: string | null = null;
const sectionRecordIds = new Map<number, string>();

export const pocketbasePersistence: IPersistenceRepository = {
  async load(defaultState) {
    await authenticate();

    const existingGeneral = await getGeneralRecord();
    if (!existingGeneral) {
      const id = await createGeneralRecord(defaultState.general as unknown as Record<string, unknown>);
      generalRecordId = id;
      for (const section of defaultState.sections) {
        const sectionId = await createSectionRecord({
          sectionId: section.id,
          title: section.title,
          subtitle: section.subtitle,
          backgroundImage: section.backgroundImage,
          content: section.content,
          isVisible: section.isVisible,
        });
        sectionRecordIds.set(section.id, sectionId);
      }
      return { ...defaultState };
    }

    generalRecordId = existingGeneral.id as string;
    const general = {
      ...defaultState.general,
      ...(existingGeneral as Partial<typeof defaultState.general>),
    };

    const existingSections = await getSectionRecords();
    sectionRecordIds.clear();
    const sections: Section[] = existingSections.map((rec: Record<string, unknown>) => {
      const sectionId = Number(rec.sectionId ?? 0);
      sectionRecordIds.set(sectionId, rec.id as string);
      const defaults = defaultState.sections.find((s) => s.id === sectionId);
      return {
        ...defaults,
        ...rec,
        id: sectionId,
        content: { ...defaults?.content, ...(rec.content as Record<string, unknown>) },
      } as Section;
    });

    if (sections.length === 0) {
      for (const section of defaultState.sections) {
        const sectionId = await createSectionRecord({
          sectionId: section.id,
          title: section.title,
          subtitle: section.subtitle,
          backgroundImage: section.backgroundImage,
          content: section.content,
          isVisible: section.isVisible,
        });
        sectionRecordIds.set(section.id, sectionId);
        sections.push({ ...section });
      }
    }

    return { ...defaultState, general, sections };
  },

  save(state) {
    (async () => {
      try {
        if (generalRecordId) {
          const { pin, ...generalData } = state.general;
          await updateGeneralRecord(generalRecordId, { ...generalData } as Record<string, unknown>);
        }
        for (const section of state.sections) {
          const recordId = sectionRecordIds.get(section.id);
          if (recordId) {
            await updateSectionRecord(recordId, {
              title: section.title,
              subtitle: section.subtitle,
              backgroundImage: section.backgroundImage,
              content: section.content,
              isVisible: section.isVisible,
            });
          }
        }
      } catch {
        // fire-and-forget: silently ignore errors
      }
    })();
  },
};

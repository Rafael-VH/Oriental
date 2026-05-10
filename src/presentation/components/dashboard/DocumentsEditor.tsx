import { Plus, Trash2, GripVertical } from "lucide-react";
import { useStore } from "@/data/useStore";
import type { Section, DocumentItem } from "@/domain/types";
import { toast } from "sonner";
import SectionTextEditor from "./SectionTextEditor";

interface Props {
  section: Section;
}

export default function DocumentsEditor({ section }: Props) {
  const updateSectionContent = useStore((s) => s.updateSectionContent);
  const saveAll = useStore((s) => s.saveAll);
  const documents = (section.content.documents || []) as DocumentItem[];

  const handleAdd = () => {
    const newItem: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: "Nuevo Documento",
      requirements: "Requisitos del documento",
      price: 15000,
      processingTime: "10 minutos",
      icon: "FileText",
    };
    updateSectionContent(section.id, { documents: [...documents, newItem] });
    saveAll();
    toast.success("Documento agregado");
  };

  const handleUpdate = (id: string, updates: Partial<DocumentItem>) => {
    const updated = documents.map((d) =>
      d.id === id ? { ...d, ...updates } : d,
    );
    updateSectionContent(section.id, { documents: updated });
    saveAll();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este documento?")) return;
    const updated = documents.filter((d) => d.id !== id);
    updateSectionContent(section.id, { documents: updated });
    saveAll();
    toast.success("Documento eliminado");
  };

  return (
    <div className="space-y-6">
      <SectionTextEditor section={section} sectionId={section.id} />

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-dashboard text-base font-semibold text-[#2D3748]">
            Tipos de Documentos ({documents.length})
          </h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border border-[#E8E4E0] rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <GripVertical className="w-4 h-4 text-[#8B8680] mt-2 cursor-grab" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="dashboard-input"
                      value={doc.name}
                      onChange={(e) =>
                        handleUpdate(doc.id, { name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Tiempo de proceso
                    </label>
                    <input
                      type="text"
                      className="dashboard-input"
                      value={doc.processingTime}
                      onChange={(e) =>
                        handleUpdate(doc.id, { processingTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Requisitos
                    </label>
                    <textarea
                      className="dashboard-textarea w-full"
                      rows={2}
                      value={doc.requirements}
                      onChange={(e) =>
                        handleUpdate(doc.id, { requirements: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      className="dashboard-input"
                      value={doc.price}
                      onChange={(e) =>
                        handleUpdate(doc.id, { price: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="text-[#C0392B] hover:bg-[#C0392B]/10 p-1 rounded transition-colors mt-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

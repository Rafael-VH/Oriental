import { Plus, Trash2, GripVertical } from "lucide-react";
import { useStore } from "@/data/useStore";
import type { Section, PrintSizeItem } from "@/domain/types";
import { saveAll } from "@/services/app.service";
import { toast } from "sonner";
import SectionTextEditor from "./SectionTextEditor";

interface Props {
  section: Section;
}

export default function PrintsEditor({ section }: Props) {
  const updateSectionContent = useStore((s) => s.updateSectionContent);
  const printSizes = (section.content.printSizes || []) as PrintSizeItem[];

  const handleAdd = () => {
    const newItem: PrintSizeItem = {
      id: `ps-${Date.now()}`,
      name: "Nuevo Tamaño",
      width: 10,
      height: 15,
      unit: "cm",
      price: 5000,
    };
    updateSectionContent(section.id, { printSizes: [...printSizes, newItem] });
    saveAll();
    toast.success("Tamaño agregado");
  };

  const handleUpdate = (id: string, updates: Partial<PrintSizeItem>) => {
    const updated = printSizes.map((p) =>
      p.id === id ? { ...p, ...updates } : p,
    );
    updateSectionContent(section.id, { printSizes: updated });
    saveAll();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este tamaño?")) return;
    const updated = printSizes.filter((p) => p.id !== id);
    updateSectionContent(section.id, { printSizes: updated });
    saveAll();
    toast.success("Tamaño eliminado");
  };

  return (
    <div className="space-y-6">
      <SectionTextEditor section={section} sectionId={section.id} />

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-dashboard text-base font-semibold text-[#2D3748]">
            Tamaños de Impresión ({printSizes.length})
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
          {printSizes.map((item) => (
            <div
              key={item.id}
              className="border border-[#E8E4E0] rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <GripVertical className="w-4 h-4 text-[#8B8680] mt-2 cursor-grab" />
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="dashboard-input"
                      value={item.name}
                      onChange={(e) =>
                        handleUpdate(item.id, { name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Ancho
                    </label>
                    <input
                      type="number"
                      className="dashboard-input"
                      value={item.width}
                      onChange={(e) =>
                        handleUpdate(item.id, { width: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Alto
                    </label>
                    <input
                      type="number"
                      className="dashboard-input"
                      value={item.height}
                      onChange={(e) =>
                        handleUpdate(item.id, {
                          height: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Unidad
                    </label>
                    <select
                      className="dashboard-input"
                      value={item.unit}
                      onChange={(e) =>
                        handleUpdate(item.id, {
                          unit: e.target.value as "cm" | "in",
                        })
                      }
                    >
                      <option value="cm">cm</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      className="dashboard-input"
                      value={item.price}
                      onChange={(e) =>
                        handleUpdate(item.id, { price: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
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

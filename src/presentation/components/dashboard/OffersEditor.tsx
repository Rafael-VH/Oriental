import {
  Plus,
  Trash2,
  GripVertical,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useStore } from "@/data/useStore";
import type { Section, OfferItem } from "@/domain/types";
import { saveAll } from "@/services/app.service";
import { toast } from "sonner";
import SectionTextEditor from "./SectionTextEditor";

interface Props {
  section: Section;
}

const badgeColorOptions = [
  { value: "golden", label: "Dorado" },
  { value: "navy", label: "Azul Marino" },
  { value: "green", label: "Verde" },
  { value: "red", label: "Rojo" },
];

export default function OffersEditor({ section }: Props) {
  const updateSectionContent = useStore((s) => s.updateSectionContent);
  const offers = (section.content.offers || []) as OfferItem[];

  const handleAdd = () => {
    const newItem: OfferItem = {
      id: `off-${Date.now()}`,
      title: "Nueva Oferta",
      description: "Descripción de la oferta",
      badge: "NUEVO",
      badgeColor: "golden",
      originalPrice: 0,
      promotionalPrice: 0,
      validityType: "always",
      conditions: "",
      whatsappMessage: "",
      active: true,
    };
    updateSectionContent(section.id, { offers: [...offers, newItem] });
    saveAll();
    toast.success("Oferta agregada");
  };

  const handleUpdate = (id: string, updates: Partial<OfferItem>) => {
    const updated = offers.map((o) => (o.id === id ? { ...o, ...updates } : o));
    updateSectionContent(section.id, { offers: updated });
    saveAll();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta oferta?")) return;
    const updated = offers.filter((o) => o.id !== id);
    updateSectionContent(section.id, { offers: updated });
    saveAll();
    toast.success("Oferta eliminada");
  };

  const toggleActive = (id: string) => {
    const updated = offers.map((o) =>
      o.id === id ? { ...o, active: !o.active } : o,
    );
    updateSectionContent(section.id, { offers: updated });
    saveAll();
    toast.success("Estado actualizado");
  };

  return (
    <div className="space-y-6">
      <SectionTextEditor section={section} sectionId={section.id} />

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-dashboard text-base font-semibold text-[#2D3748]">
            Ofertas ({offers.length})
          </h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`border rounded-lg p-4 ${offer.active ? "border-[#E8E4E0]" : "border-[#E8E4E0] opacity-60"}`}
            >
              <div className="flex items-start gap-3">
                <GripVertical className="w-4 h-4 text-[#8B8680] mt-1 cursor-grab" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {offer.active ? (
                        <ToggleRight
                          className="w-5 h-5 text-[#27AE60] cursor-pointer"
                          onClick={() => toggleActive(offer.id)}
                        />
                      ) : (
                        <ToggleLeft
                          className="w-5 h-5 text-[#8B8680] cursor-pointer"
                          onClick={() => toggleActive(offer.id)}
                        />
                      )}
                      <span
                        className={`text-xs font-medium ${offer.active ? "text-[#27AE60]" : "text-[#8B8680]"}`}
                      >
                        {offer.active ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="text-[#C0392B] hover:bg-[#C0392B]/10 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">
                        Título
                      </label>
                      <input
                        type="text"
                        className="dashboard-input"
                        value={offer.title}
                        onChange={(e) =>
                          handleUpdate(offer.id, { title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">
                        Badge
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="dashboard-input flex-1"
                          value={offer.badge}
                          onChange={(e) =>
                            handleUpdate(offer.id, { badge: e.target.value })
                          }
                        />
                        <select
                          className="dashboard-input w-28"
                          value={offer.badgeColor}
                          onChange={(e) =>
                            handleUpdate(offer.id, {
                              badgeColor: e.target
                                .value as OfferItem["badgeColor"],
                            })
                          }
                        >
                          {badgeColorOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Descripción
                    </label>
                    <textarea
                      className="dashboard-textarea w-full"
                      rows={2}
                      value={offer.description}
                      onChange={(e) =>
                        handleUpdate(offer.id, { description: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">
                        Precio original
                      </label>
                      <input
                        type="number"
                        className="dashboard-input"
                        value={offer.originalPrice}
                        onChange={(e) =>
                          handleUpdate(offer.id, {
                            originalPrice: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">
                        Precio promo
                      </label>
                      <input
                        type="number"
                        className="dashboard-input"
                        value={offer.promotionalPrice}
                        onChange={(e) =>
                          handleUpdate(offer.id, {
                            promotionalPrice: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-[#718096] mb-1 block">
                        Vigencia
                      </label>
                      <select
                        className="dashboard-input"
                        value={offer.validityType}
                        onChange={(e) =>
                          handleUpdate(offer.id, {
                            validityType: e.target.value as
                              | "always"
                              | "daterange",
                          })
                        }
                      >
                        <option value="always">Siempre activa</option>
                        <option value="daterange">Rango de fechas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Condiciones
                    </label>
                    <textarea
                      className="dashboard-textarea w-full"
                      rows={2}
                      value={offer.conditions}
                      onChange={(e) =>
                        handleUpdate(offer.id, { conditions: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">
                      Mensaje WhatsApp
                    </label>
                    <textarea
                      className="dashboard-textarea w-full"
                      rows={2}
                      value={offer.whatsappMessage}
                      onChange={(e) =>
                        handleUpdate(offer.id, {
                          whatsappMessage: e.target.value,
                        })
                      }
                      placeholder="Mensaje predefinido para WhatsApp"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

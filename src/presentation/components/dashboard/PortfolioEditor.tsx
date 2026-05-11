import { Plus, Trash2, Star } from "lucide-react";
import { useStore, saveAll } from "@/infrastructure/store/zustandStore";
import type { Section, PortfolioImage } from "@/domain/types";
import { toast } from "sonner";
import SectionTextEditor from "./SectionTextEditor";

interface Props {
  section: Section;
}

export default function PortfolioEditor({ section }: Props) {
  const updateSectionContent = useStore((s) => s.updateSectionContent);
  const images = (section.content.portfolioImages || []) as PortfolioImage[];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} es muy grande. Máx 5MB`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const newImage: PortfolioImage = {
          id: `pf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          src: reader.result as string,
          category: "General",
          featured: false,
        };
        const updated = [...images, newImage];
        if (updated.length > 12) {
          toast.warning("Máximo 12 imágenes alcanzado");
          return;
        }
        updateSectionContent(section.id, { portfolioImages: updated });
        saveAll();
        toast.success("Imagen agregada");
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdate = (id: string, updates: Partial<PortfolioImage>) => {
    const updated = images.map((img) =>
      img.id === id ? { ...img, ...updates } : img,
    );
    updateSectionContent(section.id, { portfolioImages: updated });
    saveAll();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    const updated = images.filter((img) => img.id !== id);
    updateSectionContent(section.id, { portfolioImages: updated });
    saveAll();
    toast.success("Imagen eliminada");
  };

  return (
    <div className="space-y-6">
      <SectionTextEditor section={section} sectionId={section.id} />

      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-dashboard text-base font-semibold text-[#2D3748]">
            Galería ({images.length}/12)
          </h2>
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors cursor-pointer">
            <Plus className="w-4 h-4" />
            Agregar imágenes
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 text-[#718096]">
            <p>No hay imágenes en el portafolio</p>
            <p className="text-sm mt-1">
              Suba imágenes para mostrar en la galería
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-lg overflow-hidden border border-[#E8E4E0]"
              >
                <img
                  src={img.src}
                  alt={img.category}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                  <input
                    type="text"
                    className="dashboard-input text-xs py-1 text-center"
                    value={img.category}
                    onChange={(e) =>
                      handleUpdate(img.id, { category: e.target.value })
                    }
                    placeholder="Categoría"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdate(img.id, { featured: !img.featured })
                      }
                      className={`p-1.5 rounded ${img.featured ? "bg-[#D4A056] text-[#1E1E1E]" : "bg-white/20 text-white"}`}
                      title="Destacada"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-1.5 rounded bg-[#C0392B] text-white"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {img.featured && (
                  <div className="absolute top-2 right-2 bg-[#D4A056] text-[#1E1E1E] text-[9px] font-bold px-1.5 py-0.5 rounded">
                    DESTACADA
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

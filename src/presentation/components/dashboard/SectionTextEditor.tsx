import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useStore } from "@/data/useStore";
import type { Section } from "@/domain/types";
import { saveAll } from "@/services/app.service";
import { toast } from "sonner";

interface Props {
  section: Section;
  sectionId: number;
  extraFields?: { key: string; label: string; type: "text" | "textarea" }[];
}

export default function SectionTextEditor({
  section,
  sectionId,
  extraFields = [],
}: Props) {
  const updateSection = useStore((s) => s.updateSection);
  const updateSectionContent = useStore((s) => s.updateSectionContent);

  const [title, setTitle] = useState(section.title);
  const [subtitle, setSubtitle] = useState(section.subtitle);
  const [bgImage, setBgImage] = useState(section.backgroundImage);
  const [extras, setExtras] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    extraFields.forEach((f) => {
      map[f.key] =
        (section.content[f.key as keyof typeof section.content] as string) ||
        "";
    });
    return map;
  });

  useEffect(() => {
    setTitle(section.title);
    setSubtitle(section.subtitle);
    setBgImage(section.backgroundImage);
    const map: Record<string, string> = {};
    extraFields.forEach((f) => {
      map[f.key] =
        (section.content[f.key as keyof typeof section.content] as string) ||
        "";
    });
    setExtras(map);
  }, [section, extraFields]);

  const handleSave = () => {
    updateSection(sectionId, { title, subtitle, backgroundImage: bgImage });
    const contentUpdates: Record<string, unknown> = {};
    extraFields.forEach((f) => {
      contentUpdates[f.key] = extras[f.key];
    });
    if (Object.keys(contentUpdates).length > 0) {
      updateSectionContent(sectionId, contentUpdates);
    }
    saveAll();
    toast.success(`Sección ${sectionId} guardada`);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagen demasiado grande. Máx 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result as string);
      toast.success("Imagen cargada");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-dashboard text-xl font-semibold text-[#2D3748]">
            {section.title}
          </h1>
          <p className="text-sm text-[#718096]">
            Editar contenido de la sección
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          Guardar
        </button>
      </div>

      {/* Text Content */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Contenido de texto
        </h2>
        <div className="space-y-4">
          <div>
            <label className="dashboard-label">Título</label>
            <input
              type="text"
              className="dashboard-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="dashboard-label">Subtítulo</label>
            <textarea
              className="dashboard-textarea w-full"
              rows={2}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          {extraFields.map((field) => (
            <div key={field.key}>
              <label className="dashboard-label">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  className="dashboard-textarea w-full"
                  rows={3}
                  value={extras[field.key] || ""}
                  onChange={(e) =>
                    setExtras((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              ) : (
                <input
                  type="text"
                  className="dashboard-input"
                  value={extras[field.key] || ""}
                  onChange={(e) =>
                    setExtras((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background Image */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Imagen de fondo
        </h2>
        <div className="space-y-4">
          {bgImage && (
            <div className="relative rounded-lg overflow-hidden max-h-48">
              <img
                src={bgImage}
                alt="Fondo"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setBgImage("")}
                className="absolute top-2 right-2 bg-[#C0392B] text-white text-xs px-2 py-1 rounded hover:bg-[#a93226] transition-colors"
              >
                Eliminar
              </button>
            </div>
          )}
          <label className="upload-zone cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="text-center py-6">
              <p className="text-sm text-[#718096]">
                Arrastre o haga clic para subir imagen
              </p>
              <p className="text-xs text-[#718096] mt-1">Máx 5MB</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useStore, saveAll } from "@/infrastructure/store/zustandStore";
import type { Section, ScheduleDay } from "@/domain/types";
import { toast } from "sonner";

interface Props {
  section: Section;
}

export default function LocationEditor({ section }: Props) {
  const updateSection = useStore((s) => s.updateSection);
  const updateSectionContent = useStore((s) => s.updateSectionContent);

  const [title, setTitle] = useState(section.title);
  const [subtitle, setSubtitle] = useState(section.subtitle);
  const [bgImage, setBgImage] = useState(section.backgroundImage);
  const [mapUrl, setMapUrl] = useState(section.content.mapUrl || "");
  const [landmark, setLandmark] = useState(section.content.landmark || "");
  const [schedule, setSchedule] = useState<ScheduleDay[]>(
    section.content.schedule || [],
  );

  useEffect(() => {
    setTitle(section.title);
    setSubtitle(section.subtitle);
    setBgImage(section.backgroundImage);
    setMapUrl(section.content.mapUrl || "");
    setLandmark(section.content.landmark || "");
    setSchedule(section.content.schedule || []);
  }, [section]);

  const handleSave = () => {
    updateSection(section.id, { title, subtitle, backgroundImage: bgImage });
    updateSectionContent(section.id, { mapUrl, landmark, schedule });
    saveAll();
    toast.success("Sección de ubicación guardada");
  };

  const handleScheduleChange = (
    index: number,
    field: keyof ScheduleDay,
    value: string | boolean,
  ) => {
    const updated = schedule.map((day, i) =>
      i === index ? { ...day, [field]: value } : day,
    );
    setSchedule(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagen demasiado grande");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result as string);
      toast.success("Imagen cargada");
    };
    reader.readAsDataURL(file);
  };

  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-dashboard text-xl font-semibold text-[#2D3748]">
            {section.title}
          </h1>
          <p className="text-sm text-[#718096]">
            Editar información de ubicación y horarios
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
          Contenido
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
        </div>
      </div>

      {/* Map */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Mapa
        </h2>
        <div className="space-y-4">
          <div>
            <label className="dashboard-label">
              URL de Google Maps (embed)
            </label>
            <input
              type="url"
              className="dashboard-input"
              value={mapUrl}
              onChange={(e) => setMapUrl(e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>
          {mapUrl && (
            <div className="rounded-lg overflow-hidden border border-[#E8E4E0]">
              <iframe
                src={mapUrl}
                className="w-full h-48 border-0"
                title="Vista previa del mapa"
              />
            </div>
          )}
          <div>
            <label className="dashboard-label">Punto de referencia</label>
            <textarea
              className="dashboard-textarea w-full"
              rows={2}
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Cerca de..."
            />
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Horario de atención
        </h2>
        <div className="space-y-2">
          {days.map((day, index) => {
            const daySchedule = schedule[index] || {
              day,
              openTime: "08:00",
              closeTime: "18:00",
              closed: false,
            };
            return (
              <div
                key={day}
                className="flex items-center gap-3 py-2 border-b border-[#E8E4E0] last:border-0"
              >
                <span className="w-24 text-sm text-[#2D3748] font-medium">
                  {day}
                </span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E8E4E0] accent-[#D4A056]"
                    checked={daySchedule.closed}
                    onChange={(e) =>
                      handleScheduleChange(index, "closed", e.target.checked)
                    }
                  />
                  <span className="text-xs text-[#718096]">Cerrado</span>
                </label>
                {!daySchedule.closed && (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      className="dashboard-input w-28"
                      value={daySchedule.openTime}
                      onChange={(e) =>
                        handleScheduleChange(index, "openTime", e.target.value)
                      }
                    />
                    <span className="text-[#718096]">-</span>
                    <input
                      type="time"
                      className="dashboard-input w-28"
                      value={daySchedule.closeTime}
                      onChange={(e) =>
                        handleScheduleChange(index, "closeTime", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Image */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Imagen de fondo
        </h2>
        {bgImage && (
          <div className="relative rounded-lg overflow-hidden max-h-48 mb-4">
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
  );
}

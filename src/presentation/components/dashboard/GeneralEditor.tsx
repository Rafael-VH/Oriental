import { useState } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";
import { useStore, saveAll, resetToDefaults } from "@/infrastructure/store/zustandStore";
import { toast } from "sonner";

export default function GeneralEditor() {
  const general = useStore((s) => s.general);
  const updateGeneral = useStore((s) => s.updateGeneral);

  const [form, setForm] = useState({
    studioName: general.studioName,
    phone: general.phone,
    whatsappNumber: general.whatsappNumber,
    email: general.email,
    address: general.address,
    instagram: general.socialMedia?.instagram || "",
    facebook: general.socialMedia?.facebook || "",
    autoScrollInterval: general.autoScrollInterval,
    pin: general.pin,
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateGeneral("studioName", form.studioName);
    updateGeneral("phone", form.phone);
    updateGeneral("whatsappNumber", form.whatsappNumber);
    updateGeneral("email", form.email);
    updateGeneral("address", form.address);
    updateGeneral("socialMedia", {
      instagram: form.instagram,
      facebook: form.facebook,
    });
    updateGeneral("autoScrollInterval", Number(form.autoScrollInterval));
    updateGeneral("pin", form.pin);
    saveAll();
    toast.success("Configuración general guardada");
  };

  const handleReset = () => {
    if (
      confirm(
        "¿Restaurar todos los valores predeterminados? Se perderán todos los cambios.",
      )
    ) {
      resetToDefaults();
      toast.info("Valores restaurados");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-[#D4A056]" />
          <div>
            <h1 className="font-dashboard text-xl font-semibold text-[#2D3748]">
              Configuración General
            </h1>
            <p className="text-sm text-[#718096]">
              Información básica del estudio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#C0392B] border border-[#C0392B]/20 rounded-md hover:bg-[#C0392B]/5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restaurar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors font-medium"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      </div>

      {/* Studio Info */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Información del Estudio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="dashboard-label">Nombre del estudio</label>
            <input
              type="text"
              className="dashboard-input"
              value={form.studioName}
              onChange={(e) => handleChange("studioName", e.target.value)}
            />
          </div>
          <div>
            <label className="dashboard-label">Teléfono principal</label>
            <input
              type="text"
              className="dashboard-input"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+57 300 123 4567"
            />
          </div>
          <div>
            <label className="dashboard-label">Número WhatsApp</label>
            <input
              type="text"
              className="dashboard-input"
              value={form.whatsappNumber}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="573001234567"
            />
          </div>
          <div>
            <label className="dashboard-label">Correo electrónico</label>
            <input
              type="email"
              className="dashboard-input"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="dashboard-label">Dirección</label>
            <textarea
              className="dashboard-textarea w-full"
              rows={2}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Redes Sociales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="dashboard-label">Instagram URL</label>
            <input
              type="url"
              className="dashboard-input"
              value={form.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="https://instagram.com/estudiooriental"
            />
          </div>
          <div>
            <label className="dashboard-label">Facebook URL</label>
            <input
              type="url"
              className="dashboard-input"
              value={form.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
              placeholder="https://facebook.com/estudiooriental"
            />
          </div>
        </div>
      </div>

      {/* Advanced */}
      <div className="dashboard-card">
        <h2 className="font-dashboard text-base font-semibold text-[#2D3748] mb-5">
          Configuración Avanzada
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="dashboard-label">
              Intervalo auto-scroll (segundos)
            </label>
            <input
              type="number"
              className="dashboard-input"
              min={5}
              max={15}
              value={form.autoScrollInterval}
              onChange={(e) =>
                handleChange("autoScrollInterval", Number(e.target.value))
              }
            />
            <p className="text-xs text-[#718096] mt-1">
              Tiempo entre transiciones automáticas de sección
            </p>
          </div>
          <div>
            <label className="dashboard-label">
              PIN de acceso al dashboard
            </label>
            <input
              type="password"
              className="dashboard-input"
              value={form.pin}
              onChange={(e) => handleChange("pin", e.target.value)}
              placeholder="****"
            />
            <p className="text-xs text-[#718096] mt-1">
              Código para acceder al panel de administración
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

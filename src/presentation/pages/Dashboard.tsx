import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Lock } from "lucide-react";
import {
  useStore,
  login,
  checkSession,
} from "@/infrastructure/store/zustandStore";
import DashboardSidebar from "@/presentation/components/dashboard/DashboardSidebar";
import GeneralEditor from "@/presentation/components/dashboard/GeneralEditor";
import SectionTextEditor from "@/presentation/components/dashboard/SectionTextEditor";
import ServicesEditor from "@/presentation/components/dashboard/ServicesEditor";
import PrintsEditor from "@/presentation/components/dashboard/PrintsEditor";
import DocumentsEditor from "@/presentation/components/dashboard/DocumentsEditor";
import PortfolioEditor from "@/presentation/components/dashboard/PortfolioEditor";
import OffersEditor from "@/presentation/components/dashboard/OffersEditor";
import LocationEditor from "@/presentation/components/dashboard/LocationEditor";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = useStore((s) => s.auth.isAuthenticated);
  const activeTab = useStore((s) => s.ui.activeDashboardTab);
  const setActiveDashboardTab = useStore((s) => s.setActiveDashboardTab);
  const sections = useStore((s) => s.sections);
  const sidebarCollapsed = useStore((s) => s.ui.sidebarCollapsed);

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const valid = checkSession();
    if (!valid && isAuthenticated) {
      toast.error("Sesión expirada");
    }
    setChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!pin.trim()) {
      setError("Ingrese el PIN");
      return;
    }
    const success = login(pin);
    if (success) {
      toast.success("Bienvenido al panel de administración");
    } else {
      setError("PIN incorrecto");
      toast.error("PIN incorrecto");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
        <div className="text-[#8B8680]">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg border border-[#E8E4E0] p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#D4A056]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-[#D4A056]" />
              </div>
              <h1 className="font-display text-2xl text-[#1E1E1E] mb-1">
                Estudio Oriental
              </h1>
              <p className="text-sm text-[#8B8680]">Panel de Administración</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="dashboard-label text-center block">
                  Ingrese su PIN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8680]" />
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="dashboard-input pl-10 text-center text-lg tracking-[0.5em]"
                    placeholder="****"
                    maxLength={6}
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-xs text-[#C0392B] mt-1 text-center">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-center justify-center py-3"
              >
                Ingresar al Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-[#8B8680] hover:text-[#D4A056] transition-colors"
              >
                Volver al sitio público
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get section for current tab
  const getSectionForTab = () => {
    if (activeTab.startsWith("section-")) {
      const sectionId = parseInt(activeTab.replace("section-", ""));
      return sections.find((s) => s.id === sectionId);
    }
    return undefined;
  };

  const currentSection = getSectionForTab();

  const renderEditor = () => {
    switch (activeTab) {
      case "general":
        return <GeneralEditor />;
      case "section-1":
        return currentSection ? (
          <SectionTextEditor
            section={currentSection}
            sectionId={1}
            extraFields={[
              { key: "ctaText", label: "Texto del botón CTA", type: "text" },
              {
                key: "whatsappMessage",
                label: "Mensaje de WhatsApp",
                type: "textarea",
              },
            ]}
          />
        ) : null;
      case "section-2":
        return currentSection ? (
          <ServicesEditor section={currentSection} />
        ) : null;
      case "section-3":
        return currentSection ? (
          <PrintsEditor section={currentSection} />
        ) : null;
      case "section-4":
        return currentSection ? (
          <DocumentsEditor section={currentSection} />
        ) : null;
      case "section-5":
        return currentSection ? (
          <PortfolioEditor section={currentSection} />
        ) : null;
      case "section-6":
        return currentSection ? (
          <OffersEditor section={currentSection} />
        ) : null;
      case "section-7":
        return currentSection ? (
          <LocationEditor section={currentSection} />
        ) : null;
      default:
        return <GeneralEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-dashboard">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveDashboardTab}
      />
      <main
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 60 : 280 }}
      >
        <div className="p-6 lg:p-8 max-w-5xl">{renderEditor()}</div>
      </main>
    </div>
  );
}

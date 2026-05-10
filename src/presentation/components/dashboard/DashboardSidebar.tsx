import {
  Settings,
  Home,
  Camera,
  Printer,
  FileText,
  Image,
  Tag,
  MapPin,
  Eye,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useStore } from "@/data/useStore";
import { logout } from "@/services/app.service";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "section-1", label: "Sección 1 - Inicio", icon: Home, sectionId: 1 },
  {
    id: "section-2",
    label: "Sección 2 - Servicios",
    icon: Camera,
    sectionId: 2,
  },
  {
    id: "section-3",
    label: "Sección 3 - Impresión",
    icon: Printer,
    sectionId: 3,
  },
  {
    id: "section-4",
    label: "Sección 4 - Trámites",
    icon: FileText,
    sectionId: 4,
  },
  {
    id: "section-5",
    label: "Sección 5 - Portafolio",
    icon: Image,
    sectionId: 5,
  },
  { id: "section-6", label: "Sección 6 - Ofertas", icon: Tag, sectionId: 6 },
  {
    id: "section-7",
    label: "Sección 7 - Ubicación",
    icon: MapPin,
    sectionId: 7,
  },
];

export default function DashboardSidebar({ activeTab, onTabChange }: Props) {
  const sidebarCollapsed = useStore((s) => s.ui.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const unsavedChanges = useStore((s) => s.ui.unsavedChanges);
  const sections = useStore((s) => s.sections);

  const hasUnsaved = (itemId: string) => {
    if (itemId.startsWith("section-")) {
      const sectionId = parseInt(itemId.replace("section-", ""));
      const section = sections.find((s) => s.id === sectionId);
      if (section) {
        return unsavedChanges.includes(`section-${sectionId}`);
      }
    }
    return unsavedChanges.includes(itemId);
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full bg-[#1E1E1E] z-50 flex flex-col transition-all duration-300"
      style={{ width: sidebarCollapsed ? 60 : 280 }}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 w-6 h-6 bg-[#D4A056] rounded-full flex items-center justify-center text-[#1E1E1E] hover:bg-[#e0b068] transition-colors z-10"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Logo */}
      <div
        className={`pt-6 pb-4 px-4 border-b border-white/10 ${sidebarCollapsed ? "text-center" : ""}`}
      >
        {sidebarCollapsed ? (
          <div className="text-[#D4A056] font-display text-lg font-bold">
            EO
          </div>
        ) : (
          <div>
            <div className="text-white font-display text-lg font-bold leading-tight">
              CMS Estudio
            </div>
            <div className="text-[#D4A056] font-display text-sm">Oriental</div>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const hasChanges = hasUnsaved(item.id);

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 relative ${
                    isActive
                      ? "bg-[#D4A056]/15 text-white border-l-[3px] border-[#D4A056]"
                      : "text-[#A0AEC0] hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                  {hasChanges && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4A056] rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom buttons */}
      <div
        className={`p-3 border-t border-white/10 space-y-2 ${sidebarCollapsed ? "px-1" : ""}`}
      >
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-[#A0AEC0] hover:bg-white/5 hover:text-white transition-all text-sm ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
          title={sidebarCollapsed ? "Ver sitio" : undefined}
        >
          <Eye className="w-4 h-4" />
          {!sidebarCollapsed && <span>Ver sitio</span>}
        </a>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-[#A0AEC0] hover:bg-white/5 hover:text-white transition-all text-sm ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
          title={sidebarCollapsed ? "Cerrar sesión" : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!sidebarCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}

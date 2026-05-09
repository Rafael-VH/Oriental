import { Plus, Trash2, Camera, Users, Building2, Heart, GripVertical } from 'lucide-react';
import { useStore } from '@/data/useStore';
import type { Section, ServiceItem } from '@/domain/types';
import { toast } from 'sonner';
import SectionTextEditor from './SectionTextEditor';

interface Props {
  section: Section;
}

const iconOptions = [
  { value: 'Camera', label: 'Cámara', Icon: Camera },
  { value: 'Users', label: 'Personas', Icon: Users },
  { value: 'Building2', label: 'Edificio', Icon: Building2 },
  { value: 'Heart', label: 'Corazón', Icon: Heart },
];

export default function ServicesEditor({ section }: Props) {
  const updateSectionContent = useStore((s) => s.updateSectionContent);
  const saveAll = useStore((s) => s.saveAll);
  const services = (section.content.services || []) as ServiceItem[];

  const handleAdd = () => {
    const newService: ServiceItem = {
      id: `svc-${Date.now()}`,
      name: 'Nuevo Servicio',
      description: 'Descripción del servicio',
      icon: 'Camera',
    };
    updateSectionContent(section.id, { services: [...services, newService] });
    saveAll();
    toast.success('Servicio agregado');
  };

  const handleUpdate = (id: string, updates: Partial<ServiceItem>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    updateSectionContent(section.id, { services: updated });
    saveAll();
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    const updated = services.filter((s) => s.id !== id);
    updateSectionContent(section.id, { services: updated });
    saveAll();
    toast.success('Servicio eliminado');
  };

  return (
    <div className="space-y-6">
      <SectionTextEditor
        section={section}
        sectionId={section.id}
      />

      {/* Services List */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-dashboard text-base font-semibold text-[#2D3748]">Servicios ({services.length})</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#D4A056] text-[#1E1E1E] rounded-md hover:bg-[#e0b068] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="border border-[#E8E4E0] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <GripVertical className="w-4 h-4 text-[#8B8680] mt-1 cursor-grab" />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">Nombre</label>
                      <input
                        type="text"
                        className="dashboard-input"
                        value={service.name}
                        onChange={(e) => handleUpdate(service.id, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">Ícono</label>
                      <select
                        className="dashboard-input"
                        value={service.icon}
                        onChange={(e) => handleUpdate(service.id, { icon: e.target.value })}
                      >
                        {iconOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#718096] mb-1 block">Descripción</label>
                    <textarea
                      className="dashboard-textarea w-full"
                      rows={2}
                      value={service.description}
                      onChange={(e) => handleUpdate(service.id, { description: e.target.value })}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-[#C0392B] hover:bg-[#C0392B]/10 p-1 rounded transition-colors"
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

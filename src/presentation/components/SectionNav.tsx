import { useEffect, useState } from 'react';
import { MessageCircle, Calendar, ChevronDown } from 'lucide-react';
import { useStore } from '@/data/useStore';

interface SectionNavProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

const sectionNames = [
  'Inicio',
  'Servicios',
  'Impresión',
  'Trámites',
  'Portafolio',
  'Ofertas',
  'Ubicación',
];

export default function SectionNav({ activeSection, onNavigate }: SectionNavProps) {
  const general = useStore((s) => s.general);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleWhatsApp = () => {
    const message = 'Hola, me interesa conocer más sobre sus servicios fotográficos';
    const url = `https://wa.me/${general.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E1E1E]/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around py-2 px-1">
          {sectionNames.map((name, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-all ${
                activeSection === i ? 'text-[#D4A056]' : 'text-[#8B8680]'
              }`}
            >
              <span className="text-[10px] font-medium">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[9px]">{name.slice(0, 6)}</span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] z-50 bg-[#F4F1EC]/95 backdrop-blur-md border-r border-[#E8E4E0] flex flex-col">
      {/* Logo */}
      <div className="pt-8 pb-4 px-6">
        <div className="font-display text-[28px] leading-tight text-[#1E1E1E]">
          <div className="font-medium tracking-wide">ESTUDIO</div>
          <div className="font-medium tracking-wide text-[#D4A056]">ORIENTAL</div>
        </div>
        <div className="mt-3 h-px bg-[#E8E4E0]" />
      </div>

      {/* Section list */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {sectionNames.map((name, i) => (
            <li key={i}>
              <button
                onClick={() => onNavigate(i)}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                  activeSection === i
                    ? 'bg-[#D4A056]/10'
                    : 'hover:bg-black/5'
                }`}
              >
                <span
                  className={`text-xs font-mono transition-colors ${
                    activeSection === i ? 'text-[#D4A056]' : 'text-[#8B8680]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-sm font-medium transition-colors ${
                    activeSection === i ? 'text-[#1E1E1E]' : 'text-[#8B8680] group-hover:text-[#1E1E1E]'
                  }`}
                >
                  {name}
                </span>
                <div
                  className={`ml-auto nav-dot ${activeSection === i ? 'active' : ''}`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom CTAs */}
      <div className="px-4 pb-6 pt-2 border-t border-[#E8E4E0]">
        <button
          onClick={handleWhatsApp}
          className="w-full btn-primary flex items-center justify-center gap-2 text-sm py-3 mb-3"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={() => onNavigate(6)}
          className="w-full flex items-center justify-center gap-2 text-sm py-2.5 rounded-full border-2 border-[#1E1E1E] text-[#1E1E1E] hover:bg-[#1E1E1E] hover:text-white transition-all duration-300"
        >
          <Calendar className="w-4 h-4" />
          Agendar
        </button>
        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#8B8680]">{general.phone}</p>
          <p className="text-[11px] text-[#8B8680]">{general.email}</p>
        </div>
        <button
          onClick={() => onNavigate(0)}
          className="w-full mt-3 flex items-center justify-center text-[#8B8680] hover:text-[#D4A056] transition-colors"
        >
          <ChevronDown className="w-4 h-4 rotate-180" />
          <span className="text-[10px] ml-1">Volver arriba</span>
        </button>
      </div>
    </aside>
  );
}

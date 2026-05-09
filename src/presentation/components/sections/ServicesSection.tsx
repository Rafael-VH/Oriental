import { useEffect, useRef } from 'react';
import { Camera, Users, Building2, Heart } from 'lucide-react';
import type { Section } from '@/domain/types';

interface Props {
  section: Section;
  isActive: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Users,
  Building2,
  Heart,
  GraduationCap: Users,
  Baby: Heart,
  Ring: Heart,
  PartyPopper: Users,
};

export default function ServicesSection({ section, isActive }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      const els = contentRef.current.querySelectorAll('.animate-item');
      els.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = '0';
        htmlEl.style.transform = 'translateY(20px)';
        setTimeout(() => {
          htmlEl.style.transition = 'all 0.5s ease-out';
          htmlEl.style.opacity = '1';
          htmlEl.style.transform = 'translateY(0)';
        }, 300 + i * 100);
      });
    }
  }, [isActive]);

  const services = section.content.services || [];

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={section.backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#F4F1EC]/85" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-8 lg:px-16 py-16" style={{ marginLeft: '260px' }}>
        <div className="max-w-4xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">02</span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-[#1E1E1E] mb-4">{section.title}</h2>
          <p className="animate-item text-lg text-[#8B8680] mb-12">{section.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const IconComponent = iconMap[service.icon] || Camera;
              return (
                <div
                  key={service.id}
                  className="animate-item bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#E8E4E0] hover:border-[#D4A056] hover:shadow-lg transition-all duration-300 group"
                  style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-[#D4A056]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4A056]/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-[#D4A056]" />
                  </div>
                  <h3 className="font-medium text-lg text-[#1E1E1E] mb-2">{service.name}</h3>
                  <p className="text-sm text-[#8B8680] leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

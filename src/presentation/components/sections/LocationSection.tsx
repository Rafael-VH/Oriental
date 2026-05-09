import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';
import { useStore } from '@/data/useStore';
import type { Section, ScheduleDay } from '@/domain/types';

interface Props {
  section: Section;
  isActive: boolean;
}

export default function LocationSection({ section, isActive }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const general = useStore((s) => s.general);

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
        }, 300 + i * 80);
      });
    }
  }, [isActive]);

  const schedule = section.content.schedule || [];
  const mapUrl = section.content.mapUrl;
  const landmark = section.content.landmark;

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={section.backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#F4F1EC]/90" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-8 lg:px-16 py-16" style={{ marginLeft: '260px' }}>
        <div className="max-w-5xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">07</span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-[#1E1E1E] mb-4">{section.title}</h2>
          <p className="animate-item text-lg text-[#8B8680] mb-10">{section.subtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="animate-item">
              <div className="bg-white rounded-xl border border-[#E8E4E0] overflow-hidden">
                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    className="w-full h-64 lg:h-80 border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-80 bg-[#F5F5F5] flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-[#8B8680]" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D4A056] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-[#1E1E1E] font-medium">{general.address}</p>
                      {landmark && (
                        <p className="text-xs text-[#8B8680] mt-1">{landmark}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Schedule */}
              <div className="animate-item bg-white rounded-xl p-5 border border-[#E8E4E0]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#D4A056]" />
                  <h3 className="font-semibold text-[#1E1E1E]">Horario de atención</h3>
                </div>
                <div className="space-y-2">
                  {schedule.map((day: ScheduleDay) => (
                    <div key={day.day} className="flex items-center justify-between text-sm">
                      <span className="text-[#1E1E1E] w-28">{day.day}</span>
                      {day.closed ? (
                        <span className="text-[#C0392B] font-medium text-xs">Cerrado</span>
                      ) : (
                        <span className="text-[#8B8680]">{day.openTime} - {day.closeTime}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="animate-item bg-white rounded-xl p-5 border border-[#E8E4E0]">
                <h3 className="font-semibold text-[#1E1E1E] mb-4">Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-[#D4A056]" />
                    <span className="text-[#1E1E1E]">{general.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-[#D4A056]" />
                    <span className="text-[#1E1E1E]">{general.email}</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="animate-item flex items-center gap-4">
                {general.socialMedia?.instagram && (
                  <a
                    href={general.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center text-white hover:bg-[#D4A056] transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {general.socialMedia?.facebook && (
                  <a
                    href={general.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center text-white hover:bg-[#D4A056] transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="animate-item mt-12 pt-6 border-t border-[#E8E4E0]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8B8680]">
              <p>© {new Date().getFullYear()} {general.studioName}. Todos los derechos reservados.</p>
              <a href="/admin" className="hover:text-[#D4A056] transition-colors">
                Panel de administración
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import type { Section } from '@/domain/types';

interface Props {
  section: Section;
  isActive: boolean;
}

export default function DocumentsSection({ section, isActive }: Props) {
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
        }, 300 + i * 80);
      });
    }
  }, [isActive]);

  const documents = section.content.documents || [];

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={section.backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#F4F1EC]/90" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-8 lg:px-16 py-16" style={{ marginLeft: '260px' }}>
        <div className="max-w-4xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">04</span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-[#1E1E1E] mb-4">{section.title}</h2>
          <p className="animate-item text-lg text-[#8B8680] mb-12">{section.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="animate-item bg-white rounded-xl p-6 border border-[#E8E4E0] hover:border-[#D4A056] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#2C3E50]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2C3E50]/20 transition-colors">
                    <FileText className="w-5 h-5 text-[#2C3E50]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[#1E1E1E] mb-1">{doc.name}</h3>
                    <p className="text-xs text-[#8B8680] mb-2">{doc.requirements}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#D4A056]">${doc.price.toLocaleString()}</span>
                      <span className="text-[11px] text-[#8B8680]">{doc.processingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-item flex items-center gap-3 bg-[#27AE60]/10 rounded-lg px-5 py-4 border border-[#27AE60]/20">
            <CheckCircle2 className="w-5 h-5 text-[#27AE60] shrink-0" />
            <p className="text-sm text-[#1E1E1E]">Aprobación garantizada en entidades gubernamentales</p>
          </div>
        </div>
      </div>
    </section>
  );
}

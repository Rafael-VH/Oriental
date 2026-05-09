import { useEffect, useRef, useState } from 'react';
import type { Section } from '@/domain/types';

interface Props {
  section: Section;
  isActive: boolean;
}

export default function PortfolioSection({ section, isActive }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  const images = section.content.portfolioImages || [];

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={section.backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#1E1E1E]/80" />
      </div>

      <div ref={contentRef} className="relative z-10 w-full px-8 lg:px-16 py-16" style={{ marginLeft: '260px' }}>
        <div className="max-w-5xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">05</span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-white mb-4 text-shadow">{section.title}</h2>
          <p className="animate-item text-lg text-white/70 mb-12">{section.subtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div
                key={img.id}
                className={`animate-item relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer group ${
                  i === 0 || i === 3 ? 'md:aspect-[3/4]' : 'md:aspect-square'
                }`}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img
                  src={img.src}
                  alt={img.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-[#1E1E1E]/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="text-white font-medium text-lg">{img.category}</span>
                </div>
                {img.featured && (
                  <div className="absolute top-3 right-3 bg-[#D4A056] text-[#1E1E1E] text-[10px] font-bold px-2 py-1 rounded-full">
                    DESTACADA
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Ruler } from "lucide-react";
import type { Section } from "@/domain/types";

interface Props {
  section: Section;
  isActive: boolean;
}

export default function PrintsSection({ section, isActive }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      const els = contentRef.current.querySelectorAll(".animate-item");
      els.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = "0";
        htmlEl.style.transform = "translateY(20px)";
        setTimeout(
          () => {
            htmlEl.style.transition = "all 0.5s ease-out";
            htmlEl.style.opacity = "1";
            htmlEl.style.transform = "translateY(0)";
          },
          300 + i * 80,
        );
      });
    }
  }, [isActive]);

  const printSizes = section.content.printSizes || [];

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={section.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#F4F1EC]/90" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full px-8 lg:px-16 py-16"
        style={{ marginLeft: "260px" }}
      >
        <div className="max-w-5xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">
            03
          </span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-[#1E1E1E] mb-4">
            {section.title}
          </h2>
          <p className="animate-item text-lg text-[#8B8680] mb-12">
            {section.subtitle}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {printSizes.map((size) => (
              <div
                key={size.id}
                className="animate-item bg-white rounded-xl p-5 border border-[#E8E4E0] hover:border-[#D4A056] hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4A056]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4A056]/20 transition-colors">
                  <Ruler className="w-5 h-5 text-[#D4A056]" />
                </div>
                <div className="text-sm font-semibold text-[#1E1E1E] mb-1">
                  {size.name}
                </div>
                <div className="text-xs text-[#8B8680] mb-2">
                  {size.width}x{size.height} {size.unit}
                </div>
                <div className="text-sm font-bold text-[#D4A056]">
                  ${size.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { useStore } from "@/infrastructure/store/zustandStore";
import type { Section } from "@/domain/types";

interface Props {
  section: Section;
  isActive: boolean;
}

export default function HeroSection({ section, isActive }: Props) {
  const general = useStore((s) => s.general);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && contentRef.current) {
      const els = contentRef.current.querySelectorAll(".animate-item");
      els.forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = "0";
        htmlEl.style.transform = "translateY(30px)";
        setTimeout(
          () => {
            htmlEl.style.transition = "all 0.6s ease-out";
            htmlEl.style.opacity = "1";
            htmlEl.style.transform = "translateY(0)";
          },
          200 + i * 150,
        );
      });
    }
  }, [isActive]);

  const handleWhatsApp = () => {
    const message =
      section.content.whatsappMessage ||
      "Hola, me interesa conocer más sobre sus servicios fotográficos";
    const url = `https://wa.me/${general.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="section-full relative flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={section.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-overlay" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-8 max-w-2xl"
        style={{ marginLeft: "260px" }}
      >
        {section.content.showLogo && (
          <div className="animate-item mb-6">
            <MessageCircle
              className="w-10 h-10 text-[#D4A056] mx-auto"
              strokeWidth={1.5}
            />
          </div>
        )}

        <h1 className="animate-item font-display text-5xl md:text-7xl lg:text-[100px] text-white text-shadow leading-tight mb-6">
          {section.title}
        </h1>

        <p className="animate-item text-lg md:text-xl text-white/90 text-shadow-light mb-10 max-w-md mx-auto">
          {section.subtitle}
        </p>

        <div className="animate-item flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="btn-primary flex items-center gap-2 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            {section.content.ctaText || "Contáctanos por WhatsApp"}
          </button>
        </div>

        <div className="animate-item mt-8">
          <a
            href="#services"
            className="inline-flex items-center gap-1 text-white/70 hover:text-[#D4A056] transition-colors text-sm"
          >
            Ver servicios
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/data/useStore";
import type { Section, OfferItem } from "@/domain/types";

interface Props {
  section: Section;
  isActive: boolean;
}

const badgeColorMap: Record<string, string> = {
  golden: "bg-[#D4A056] text-[#1E1E1E]",
  navy: "bg-[#2C3E50] text-white",
  green: "bg-[#27AE60] text-white",
  red: "bg-[#C0392B] text-white",
};

export default function OffersSection({ section, isActive }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const general = useStore((s) => s.general);

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
          300 + i * 100,
        );
      });
    }
  }, [isActive]);

  const offers = (section.content.offers || []).filter(
    (o: OfferItem) => o.active,
  );

  const handleOfferCTA = (offer: OfferItem) => {
    const message =
      offer.whatsappMessage || `Hola, me interesa la oferta: ${offer.title}`;
    const url = `https://wa.me/${general.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="section-full relative flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={section.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#F4F1EC]/88" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full px-8 lg:px-16 py-16"
        style={{ marginLeft: "260px" }}
      >
        <div className="max-w-4xl">
          <span className="animate-item block text-sm text-[#8B8680] mb-2">
            06
          </span>
          <h2 className="animate-item font-display text-5xl md:text-6xl lg:text-7xl text-[#1E1E1E] mb-4">
            {section.title}
          </h2>
          <p className="animate-item text-lg text-[#8B8680] mb-12">
            {section.subtitle}
          </p>

          <div className="space-y-6">
            {offers.map((offer: OfferItem) => (
              <div
                key={offer.id}
                className="animate-item bg-white rounded-xl p-6 md:p-8 border border-[#E8E4E0] hover:border-[#D4A056] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    {offer.badge && (
                      <span
                        className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-3 ${badgeColorMap[offer.badgeColor] || badgeColorMap.golden}`}
                      >
                        {offer.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      {offer.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#8B8680] line-through">
                      ${offer.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-2xl font-bold text-[#D4A056]">
                      ${offer.promotionalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#8B8680] mb-4 leading-relaxed">
                  {offer.description}
                </p>

                {offer.conditions && (
                  <p className="text-xs text-[#8B8680] mb-4 italic">
                    *{offer.conditions}
                  </p>
                )}

                <button
                  onClick={() => handleOfferCTA(offer)}
                  className="btn-primary flex items-center gap-2 text-sm py-3 px-6"
                >
                  <MessageCircle className="w-4 h-4" />
                  Aprovechar ahora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

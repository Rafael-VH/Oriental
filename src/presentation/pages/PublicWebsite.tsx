import { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '@/data/useStore';
import SectionNav from '@/presentation/components/SectionNav';
import HeroSection from '@/presentation/components/sections/HeroSection';
import ServicesSection from '@/presentation/components/sections/ServicesSection';
import PrintsSection from '@/presentation/components/sections/PrintsSection';
import DocumentsSection from '@/presentation/components/sections/DocumentsSection';
import PortfolioSection from '@/presentation/components/sections/PortfolioSection';
import OffersSection from '@/presentation/components/sections/OffersSection';
import LocationSection from '@/presentation/components/sections/LocationSection';

export default function PublicWebsite() {
  const sections = useStore((s) => s.sections);
  const autoScrollInterval = useStore((s) => s.general.autoScrollInterval);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastScrollTime = useRef(Date.now());

  const visibleSections = sections.filter((s) => s.isVisible);

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= visibleSections.length || isScrolling) return;
    setIsScrolling(true);
    setActiveSection(index);
    lastScrollTime.current = Date.now();

    const el = document.getElementById(`section-${visibleSections[index].id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => setIsScrolling(false), 1000);
  }, [visibleSections, isScrolling]);

  // Auto-advance timer
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) return; // Disable auto-scroll on mobile
        const elapsed = Date.now() - lastScrollTime.current;
        if (elapsed >= autoScrollInterval * 1000) {
          const next = (activeSection + 1) % visibleSections.length;
          goToSection(next);
        }
      }, 1000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSection, autoScrollInterval, visibleSections.length, goToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const next = (activeSection + 1) % visibleSections.length;
        goToSection(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = (activeSection - 1 + visibleSections.length) % visibleSections.length;
        goToSection(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, visibleSections.length, goToSection]);

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      for (let i = 0; i < visibleSections.length; i++) {
        const el = document.getElementById(`section-${visibleSections[i].id}`);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top - vh / 2 && scrollY < bottom - vh / 2) {
            if (activeSection !== i) {
              setActiveSection(i);
              lastScrollTime.current = Date.now();
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections, activeSection]);

  const renderSection = (section: typeof visibleSections[0], index: number) => {
    const isActive = index === activeSection;
    const props = { section, isActive };

    switch (section.id) {
      case 1: return <HeroSection key={section.id} {...props} />;
      case 2: return <ServicesSection key={section.id} {...props} />;
      case 3: return <PrintsSection key={section.id} {...props} />;
      case 4: return <DocumentsSection key={section.id} {...props} />;
      case 5: return <PortfolioSection key={section.id} {...props} />;
      case 6: return <OffersSection key={section.id} {...props} />;
      case 7: return <LocationSection key={section.id} {...props} />;
      default: return null;
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#F4F1EC]">
      {/* Navigation Sidebar */}
      <SectionNav
        activeSection={activeSection}
        onNavigate={goToSection}
      />

      {/* Sections */}
      <main className="ml-0 md:ml-[260px]">
        {visibleSections.map((section, index) => (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className="snap-start"
          >
            {renderSection(section, index)}
          </div>
        ))}
      </main>

      {/* Mobile padding for bottom nav */}
      <div className="h-16 md:hidden" />
    </div>
  );
}

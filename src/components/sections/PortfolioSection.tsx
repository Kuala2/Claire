import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const interiorImages = [
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
];

const workImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
];

/** Returns how many items are visible based on container width, matching Tailwind breakpoints */
const getVisibleCount = (containerWidth: number): number => {
  if (containerWidth >= 768) return 3; // md and above
  if (containerWidth >= 640) return 2; // sm
  return 1; // mobile
};

const Carousel = ({ images, title, colorClass, type }: { images: string[], title: string, colorClass: string, type: 'sq' | 'rect' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Dynamically detect how many cards are visible
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setVisibleCount(getVisibleCount(width));
    });
    observer.observe(el);
    // Initial measure
    setVisibleCount(getVisibleCount(el.clientWidth));
    return () => observer.disconnect();
  }, []);

  // Number of "pages" the user can scroll to = total items − visible at once
  const dotCount = Math.max(1, images.length - visibleCount + 1);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      if (totalWidth <= 0) return;

      const itemWidth = totalWidth / (dotCount - 1 || 1);
      const index = Math.round(scrollLeft / itemWidth);
      if (index !== activeIndex && index >= 0 && index < dotCount) {
        setActiveIndex(index);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const totalWidth = scrollWidth - clientWidth;
      const itemWidth = totalWidth / (dotCount - 1 || 1);

      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const next = () => {
    if (activeIndex < dotCount - 1) {
      scrollTo(activeIndex + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    }
  };

  return (
    <div className="mb-24">
      <div className="flex items-center gap-4 mb-10 px-4 sm:px-0">
        <span className={`w-2 h-10 ${colorClass} rounded-full`}></span>
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
      </div>

      <div className="relative group px-4 sm:px-0">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white disabled:opacity-30 disabled:hover:scale-100"
        >
          <ChevronLeft className="w-9 h-9" />
        </button>
        <button
          onClick={next}
          disabled={activeIndex >= dotCount - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-30 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white disabled:opacity-30 disabled:hover:scale-100"
        >
          <ChevronRight className="w-9 h-9" />
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[50%] md:auto-cols-[33.333%] gap-0 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth relative z-10"
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`snap-start px-3 py-2 ${type === 'sq' ? 'aspect-square' : 'aspect-[4/3]'}`}
            >
              <div className="w-full h-full overflow-hidden rounded-[2.5rem] shadow-lg">
                <img
                  src={src}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: dotCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                  ? `w-8 ${colorClass}`
                  : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Взгляд изнутри
          </h2>
          <p className="mt-4 text-lg text-gray-600">Познакомьтесь с нами ближе</p>
        </div>

        <Carousel
          images={interiorImages}
          title="Наш интерьер"
          colorClass="bg-primary"
          type="rect"
        />

        <Carousel
          images={workImages}
          title="Наши работы"
          colorClass="bg-primary"
          type="sq"
        />
      </div>
    </section>
  );
};

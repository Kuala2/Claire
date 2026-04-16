import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allPortfolioImages = [
  "/assets/Portfolio/p1.jpg", "/assets/Portfolio/p2.jpg", "/assets/Portfolio/p3.jpg", "/assets/Portfolio/p4.jpg", "/assets/Portfolio/p5.jpg", "/assets/Portfolio/p6.jpg", "/assets/Portfolio/p7.jpg",
  "/assets/Portfolio/n1.jpg", "/assets/Portfolio/n2.jpg", "/assets/Portfolio/n3.jpg", "/assets/Portfolio/n4.jpg", "/assets/Portfolio/n5.jpg", "/assets/Portfolio/n6.jpg",
  "/assets/Portfolio/m1.jpg", "/assets/Portfolio/m2.jpg", "/assets/Portfolio/m3.jpg", "/assets/Portfolio/m4.jpg",
  "/assets/Portfolio/pm1.jpg", "/assets/Portfolio/pm2.jpg", "/assets/Portfolio/pm3.jpg", "/assets/Portfolio/pm4.jpg", "/assets/Portfolio/pm5.jpg",
  "/assets/Portfolio/c1.jpg", "/assets/Portfolio/c2.jpg", "/assets/Portfolio/c3.jpg", "/assets/Portfolio/c4.jpg", "/assets/Portfolio/c5.jpg",
];

const categories = [
  { id: 'all', label: 'Все работы', prefix: '' },
  { id: 'hair', label: 'Парикмахерские услуги', prefix: 'p' },
  { id: 'nails', label: 'Ногтевой сервис', prefix: 'n' },
  { id: 'cosm', label: 'Косметология', prefix: 'm' },
  { id: 'perm', label: 'Перманентный макияж', prefix: 'pm' },
  { id: 'pierce', label: 'Пирсинг', prefix: 'c' },
];

/** Returns how many items are visible based on container width, matching Tailwind breakpoints */
const getVisibleCount = (containerWidth: number): number => {
  if (containerWidth >= 768) return 3; // md and above
  if (containerWidth >= 640) return 2; // sm
  return 1; // mobile
};

const Carousel = ({ images, type }: { images: string[], type: 'sq' | 'rect' }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Reset scroll on images change
  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 });
    }
  }, [images]);

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
              <div className="w-full h-full overflow-hidden rounded-[2.5rem] shadow-lg bg-gray-100">
                <img
                  src={src}
                  alt="Portfolio"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
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
                  ? 'w-8 bg-primary'
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState<string[]>([]);

  useEffect(() => {
    let list = allPortfolioImages;
    if (activeCategory !== 'all') {
      const cat = categories.find(c => c.id === activeCategory);
      if (cat) {
        list = allPortfolioImages.filter(img => {
          const filename = img.split('/').pop() || '';
          // Special case for hair vs permanent makeup prefix collision
          if (cat.id === 'hair') {
            return filename.startsWith('p') && !filename.startsWith('pm');
          }
          return filename.startsWith(cat.prefix);
        });
      }
    }
    // Shuffle the result to maintain "random" feel within category
    setFilteredImages([...list].sort(() => Math.random() - 0.5));
  }, [activeCategory]);

  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Наши работы
          </h2>
          <p className="mt-4 text-lg text-gray-600">Результаты наших мастеров</p>
          
          {/* Category Filter Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
                  activeCategory === cat.id
                    ? 'bg-primary border-primary text-white shadow-lg scale-105'
                    : 'border-gray-100 text-gray-600 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <Carousel
          images={filteredImages}
          type="sq"
        />
      </div>
    </section>
  );
};

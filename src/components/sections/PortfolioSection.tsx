import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allPortfolioImages = [
  "/assets/Portfolio/p1.webp", "/assets/Portfolio/p2.webp", "/assets/Portfolio/p3.webp", "/assets/Portfolio/p4.webp", "/assets/Portfolio/p5.webp", "/assets/Portfolio/p6.webp", "/assets/Portfolio/p7.webp",
  "/assets/Portfolio/n1.webp", "/assets/Portfolio/n2.webp", "/assets/Portfolio/n3.webp", "/assets/Portfolio/n4.webp", "/assets/Portfolio/n5.webp", "/assets/Portfolio/n6.webp",
  "/assets/Portfolio/m1.webp", "/assets/Portfolio/m2.webp", "/assets/Portfolio/m3.webp", "/assets/Portfolio/m4.webp",
  "/assets/Portfolio/pm1.webp", "/assets/Portfolio/pm2.webp", "/assets/Portfolio/pm3.webp", "/assets/Portfolio/pm4.webp", "/assets/Portfolio/pm5.webp",
  "/assets/Portfolio/c1.webp", "/assets/Portfolio/c2.webp", "/assets/Portfolio/c3.webp", "/assets/Portfolio/c4.webp", "/assets/Portfolio/c5.webp",
];

const categories = [
  { id: "all", label: "\u0412\u0441\u0435 \u0440\u0430\u0431\u043e\u0442\u044b", prefix: "" },
  { id: "hair", label: "\u041f\u0430\u0440\u0438\u043a\u043c\u0430\u0445\u0435\u0440\u0441\u043a\u0438\u0435 \u0443\u0441\u043b\u0443\u0433\u0438", prefix: "p" },
  { id: "nails", label: "\u041d\u043e\u0433\u0442\u0435\u0432\u043e\u0439 \u0441\u0435\u0440\u0432\u0438\u0441", prefix: "n" },
  { id: "cosm", label: "\u041a\u043e\u0441\u043c\u0435\u0442\u043e\u043b\u043e\u0433\u0438\u044f", prefix: "m" },
  { id: "perm", label: "\u041f\u0435\u0440\u043c\u0430\u043d\u0435\u043d\u0442\u043d\u044b\u0439 \u043c\u0430\u043a\u0438\u044f\u0436", prefix: "pm" },
  { id: "pierce", label: "\u041f\u0438\u0440\u0441\u0438\u043d\u0433", prefix: "c" },
];

const getPortfolioAlt = (src: string): string => {
  const filename = src.split("/").pop() ?? "";
  const match = filename.match(/^([a-z]+)(\d+)\.(?:webp|jpg|jpeg|png)$/i);
  const prefix = match?.[1]?.toLowerCase() ?? "";
  const index = match?.[2] ?? "";

  const baseByPrefix: Record<string, string> = {
    p: "\u041f\u0430\u0440\u0438\u043a\u043c\u0430\u0445\u0435\u0440\u0441\u043a\u0438\u0435 \u0443\u0441\u043b\u0443\u0433\u0438 \u0432 \u0441\u0430\u043b\u043e\u043d\u0435 \u041a\u043b\u044d\u0440 \u0432 \u041d\u0438\u0436\u043d\u0435\u043c \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0435",
    n: "\u041d\u043e\u0433\u0442\u0435\u0432\u043e\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0432 \u0441\u0430\u043b\u043e\u043d\u0435 \u041a\u043b\u044d\u0440 \u0432 \u041d\u0438\u0436\u043d\u0435\u043c \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0435",
    m: "\u041a\u043e\u0441\u043c\u0435\u0442\u043e\u043b\u043e\u0433\u0438\u044f \u0432 \u0441\u0430\u043b\u043e\u043d\u0435 \u041a\u043b\u044d\u0440 \u0432 \u041d\u0438\u0436\u043d\u0435\u043c \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0435",
    pm: "\u041f\u0435\u0440\u043c\u0430\u043d\u0435\u043d\u0442\u043d\u044b\u0439 \u043c\u0430\u043a\u0438\u044f\u0436 \u0432 \u0441\u0430\u043b\u043e\u043d\u0435 \u041a\u043b\u044d\u0440 \u0432 \u041d\u0438\u0436\u043d\u0435\u043c \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0435",
    c: "\u041f\u0438\u0440\u0441\u0438\u043d\u0433 \u0432 \u0441\u0430\u043b\u043e\u043d\u0435 \u041a\u043b\u044d\u0440 \u0432 \u041d\u0438\u0436\u043d\u0435\u043c \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434\u0435",
  };

  const base = baseByPrefix[prefix] ?? "\u041f\u0440\u0438\u043c\u0435\u0440 \u0440\u0430\u0431\u043e\u0442\u044b \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u0432 \u0441\u0430\u043b\u043e\u043d\u0430 \u041a\u043b\u044d\u0440";
  return index ? `${base}, \u043f\u0440\u0438\u043c\u0435\u0440 ${index}` : base;
};

const getVisibleCount = (containerWidth: number): number => {
  if (containerWidth >= 768) return 3;
  if (containerWidth >= 640) return 2;
  return 1;
};

const Carousel = ({ images, type }: { images: string[]; type: "sq" | "rect" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setActiveIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0 });
  }, [images]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setVisibleCount(getVisibleCount(entry.contentRect.width));
    });
    observer.observe(el);
    setVisibleCount(getVisibleCount(el.clientWidth));
    return () => observer.disconnect();
  }, []);

  const dotCount = Math.max(1, images.length - visibleCount + 1);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalWidth = scrollWidth - clientWidth;
    if (totalWidth <= 0) return;
    const itemWidth = totalWidth / (dotCount - 1 || 1);
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== activeIndex && index >= 0 && index < dotCount) setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const totalWidth = scrollWidth - clientWidth;
    const itemWidth = totalWidth / (dotCount - 1 || 1);
    scrollRef.current.scrollTo({ left: index * itemWidth, behavior: "smooth" });
  };

  return (
    <div className="mb-24">
      <div className="relative group px-4 sm:px-0">
        <button
          onClick={() => activeIndex > 0 && scrollTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-30 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-white disabled:opacity-30 disabled:hover:scale-100"
        >
          <ChevronLeft className="w-9 h-9" />
        </button>
        <button
          onClick={() => activeIndex < dotCount - 1 && scrollTo(activeIndex + 1)}
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
            <div key={idx} className={`snap-start px-3 py-2 ${type === "sq" ? "aspect-square" : "aspect-[4/3]"}`}>
              <div className="w-full h-full overflow-hidden rounded-[2.5rem] shadow-lg bg-gray-100">
                <img
                  src={src}
                  alt={getPortfolioAlt(src)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
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
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-primary" : "w-2 bg-gray-200 hover:bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState<string[]>([]);

  useEffect(() => {
    let list = allPortfolioImages;
    if (activeCategory !== "all") {
      const cat = categories.find((c) => c.id === activeCategory);
      if (cat) {
        list = allPortfolioImages.filter((img) => {
          const filename = img.split("/").pop() || "";
          if (cat.id === "hair") return filename.startsWith("p") && !filename.startsWith("pm");
          return filename.startsWith(cat.prefix);
        });
      }
    }
    setFilteredImages([...list].sort(() => Math.random() - 0.5));
  }, [activeCategory]);

  return (
    <section className="py-24 bg-white" id="portfolio">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {"\u041f\u0440\u0438\u043c\u0435\u0440\u044b \u0440\u0430\u0431\u043e\u0442 \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u0432 \u0441\u0430\u043b\u043e\u043d\u0430 \u041a\u043b\u044d\u0440"}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{"\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b \u043d\u0430\u0448\u0438\u0445 \u043c\u0430\u0441\u0442\u0435\u0440\u043e\u0432"}</p>

          <div className="mt-10 sm:mt-12 flex sm:flex-wrap sm:justify-center overflow-x-auto no-scrollbar gap-3 sm:gap-4 mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 border-2 whitespace-nowrap snap-center ${
                  activeCategory === cat.id
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-white border-gray-100 text-slate-600 hover:bg-gray-50 hover:border-primary/30 hover:text-primary transition-all duration-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <Carousel images={filteredImages} type="sq" />
      </div>
    </section>
  );
};

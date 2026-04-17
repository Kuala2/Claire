import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { servicesContent } from "../../data/content";
import { useServices } from "../../hooks/useServices";
import { cn } from "../../lib/utils";

export const ServicesPricingSection = () => {
  const { data: categories, loading } = useServices();
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (idx: number) => {
    setExpandedCategories(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-background overflow-hidden min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium italic">Загружаем услуги...</p>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12">
            {servicesContent.title}
          </h2>

          {/* Category Tabs */}
          <div className="flex sm:flex-wrap sm:justify-center overflow-x-auto no-scrollbar gap-3 sm:gap-4 mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryIdx(idx)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 border-2 whitespace-nowrap snap-center",
                  activeCategoryIdx === idx
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                    : "bg-white border-gray-100 text-slate-600 hover:bg-gray-50 hover:border-primary/30 hover:text-primary transition-all duration-300"
                )}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <AnimatePresence mode="wait">
            {categories.map((category, idx) => {
              if (idx !== activeCategoryIdx) return null;

              const isExpanded = expandedCategories.includes(idx);
              const visibleServices = isExpanded ? category.services : category.services.slice(0, 4);
              const hasMore = category.services.length > 4;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
                >
                  <div className="h-64 sm:h-80 md:h-[450px] w-full overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-10 lg:p-12 bg-white">
                    <div className="space-y-2 sm:space-y-4">
                      {visibleServices.map((service, s_idx) => (
                        <motion.div
                          key={s_idx}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 pb-4 mb-4 border-b border-gray-200 last:border-0 last:pb-0 last:mb-0 hover:bg-gray-50/20 transition-colors rounded-xl px-2 sm:px-4 -mx-1 sm:-mx-4"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (s_idx * 0.05) }}
                        >
                          {/* Блок с названием услуги */}
                          <div className="flex-1 text-[13px] sm:text-lg font-semibold text-gray-800 leading-tight min-w-0">
                            {service.name}
                          </div>

                          {/* Блок с ценой и кнопкой */}
                          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-8 shrink-0">
                            <div className="text-gray-900 font-bold text-[13px] sm:text-xl whitespace-nowrap">
                              {service.price}
                            </div>
                            <Button
                              href="#booking"
                              size="sm"
                              variant="outline"
                              className="rounded-full px-4 py-1.5 h-auto text-[11px] sm:text-sm font-bold border-primary/20 text-primary hover:bg-primary hover:text-white transition-all whitespace-nowrap shadow-sm"
                            >
                              Запись
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {hasMore && (
                      <div className="mt-10 text-center border-t border-gray-50 pt-8">
                        <Button
                          variant="ghost"
                          onClick={() => toggleCategory(idx)}
                          className="text-primary hover:text-primary-hover font-bold text-lg underline underline-offset-8 decoration-2 decoration-primary/30 hover:decoration-primary transition-all"
                        >
                          {isExpanded ? "Скрыть полный прайс" : "Показать все услуги"}
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};


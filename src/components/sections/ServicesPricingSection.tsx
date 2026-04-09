import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { servicesContent } from "../../data/content";
import { cn } from "../../lib/utils";

export const ServicesPricingSection = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (idx: number) => {
    setExpandedCategories(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-12">
            {servicesContent.title}
          </h2>
          
          {/* Category Tabs */}
          {/* Category Tabs - Horizontal scroll on mobile */}
          <div className="flex sm:flex-wrap sm:justify-center overflow-x-auto no-scrollbar gap-3 sm:gap-4 mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
            {servicesContent.items.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryIdx(idx)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 border-2 whitespace-nowrap snap-center",
                  activeCategoryIdx === idx 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105" 
                    : "bg-white border-gray-100 text-gray-500 hover:border-primary/30 hover:text-primary"
                )}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <AnimatePresence mode="wait">
            {servicesContent.items.map((category, idx) => {
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
                  className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col"
                >
                  <div className="h-64 sm:h-80 md:h-[450px] w-full overflow-hidden relative">
                    <img 
                      src={category.image} 
                      alt={category.category} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <motion.h3 
                      className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {('fullTitle' in category && category.fullTitle) ? category.fullTitle : category.category}
                    </motion.h3>
                  </div>
                  
                  <div className="p-4 sm:p-10 lg:p-12 bg-white">
                    <div className="space-y-2 sm:space-y-4">
                      {visibleServices.map((service, s_idx) => (
                        <motion.div 
                          key={s_idx} 
                          className="flex items-center gap-4 sm:gap-8 py-4 sm:py-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors rounded-xl px-4 -mx-2 sm:-mx-4"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (s_idx * 0.05) }}
                        >
                          <span className="text-gray-800 font-semibold text-sm sm:text-lg flex-1 leading-tight">{service.name}</span>
                          <span className="text-gray-900 font-bold text-sm sm:text-xl whitespace-nowrap min-w-[80px] sm:min-w-[160px] text-right">
                            {service.price}
                          </span>
                          <Button href="#booking" size="sm" variant="outline" className="hidden sm:inline-flex rounded-full px-6 h-10 text-sm font-bold">
                            Запись
                          </Button>
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

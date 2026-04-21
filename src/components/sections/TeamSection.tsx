import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { teamContent } from "../../data/content";

export const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalItems = teamContent.members.length;
      // Precision calculation for active index
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      
      const index = Math.round((scrollLeft / maxScroll) * (totalItems - 1));
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden relative" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
          >
            {teamContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {teamContent.subtitle}
          </motion.p>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-12 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory no-scrollbar"
          >
            {teamContent.members.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.15, duration: 0.7 }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-full snap-center group flex flex-col h-full"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shadow-sm group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Status Badge */}
                  {member.name === "Лябина Елена" && (
                    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-white py-3 text-center backdrop-blur-sm z-10 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                       <span className="text-sm font-bold uppercase tracking-widest">Руководитель студии</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {member.experience}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow min-h-[120px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium whitespace-pre-line leading-snug text-sm lg:text-[15px]">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-4 lg:hidden">
            {teamContent.members.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
                }`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

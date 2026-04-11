import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "../ui/Button";
import { heroContent } from "../../data/content";

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with optimized blur for atmosphere */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Heavy overlay for maximum focus on text */}
      {/* 1. Subtle top gradient for header readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-[1] h-32" />
      {/* 2. Heavy black mask for text contrast */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3 rounded-[2rem] sm:rounded-full bg-white border-2 border-primary/20 text-gray-900 mb-6 sm:mb-10 shadow-2xl"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
          </div>
          <span className="text-xs sm:text-lg font-bold tracking-tight text-center max-w-[200px] sm:max-w-none">
            {heroContent.badgeText}
          </span>
        </motion.div>

        <motion.h1
          className="mx-auto max-w-5xl font-sans text-4xl sm:text-7xl font-extrabold tracking-tight text-white pb-2 leading-[1.1] sm:leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {heroContent.h1}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 sm:mt-8 text-lg sm:text-3xl leading-relaxed text-white max-w-3xl font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ваш идеальный образ: от стрижки (от 500 ₽) до косметологии. Мастера с опытом от 6 лет.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button href="#booking" size="lg" className="w-full sm:w-auto shadow-xl hover:scale-105 transition-transform duration-300">
            {heroContent.ctaText}
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

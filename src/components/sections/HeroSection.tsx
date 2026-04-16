import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "../ui/Button";
import { heroContent } from "../../data/content";
import { useBooking } from "../../context/BookingContext";

export const HeroSection = () => {
  const { openBookingModal } = useBooking();

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with optimized blur for atmosphere */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-[position:70%_top] sm:bg-[position:30%_20%]"
        style={{
          backgroundImage: 'url("/assets/Background.png")',
        }}
      />

      {/* Heavy overlay for maximum focus on text */}
      {/* 1. Top gradient ONLY for nav readability, avoiding covering the whole photo */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent z-[1] h-40" />
      
      {/* 2. Soft horizontal gradient to darken the area under the text (especially right side where hair is light) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 z-[1]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-10 sm:py-20">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 sm:gap-4 px-2 py-1 sm:px-6 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 sm:mb-10 shadow-lg"
        >
          <div className="flex items-center gap-0.5 sm:gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 sm:w-5 sm:h-5 text-[#f59e0b] fill-[#f59e0b]" />
              ))}
            </div>
          </div>

          <div className="h-3 w-[1px] bg-white/20 sm:h-5 mx-0.5" />

          <span className="text-[10px] sm:text-base font-medium tracking-tight text-white/95 leading-none">
            Лучший салон 2025
          </span>

          <div className="flex items-center gap-1 bg-black/20 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded border border-white/10">
            <img src="/assets/2gis_logo.png" alt="2GIS" className="h-2.5 w-2.5 sm:h-4 sm:w-4 object-contain" />
            <span className="text-white font-bold text-[10px] sm:text-sm tracking-tighter">2ГИС</span>
          </div>
        </motion.div>

        <div className="relative group">
          {/* Soft radial glow behind the text that doesn't affect layout */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_rgba(0,0,0,0.2)_50%,_transparent_70%)] -z-10 blur-2xl" />

          <motion.h1
            className="mx-auto max-w-5xl font-sans text-3xl sm:text-7xl font-extrabold tracking-tight text-white pb-2 leading-[1.1] sm:leading-tight drop-shadow-md sm:drop-shadow-2xl px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ваше <span className="text-primary">идеальное преображение</span> рядом с метро Ленинская
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 sm:mt-10 text-base sm:text-3xl leading-relaxed text-white max-w-3xl font-bold drop-shadow-sm sm:drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroContent.subtitle}
          </motion.p>
        </div>

        <motion.div
          className="mt-8 sm:mt-10 flex items-center justify-center gap-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button onClick={openBookingModal} size="lg" className="w-full sm:w-auto shadow-xl hover:scale-105 transition-transform duration-300">
            {heroContent.ctaText}
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

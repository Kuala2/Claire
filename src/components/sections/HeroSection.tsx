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
          backgroundImage: 'image-set(url("/assets/Background.webp") type("image/webp"), url("/assets/Background.png") type("image/png"))',
        }}
      />

      {/* Heavy overlay for maximum focus on text */}
      {/* 1. Top gradient ONLY for nav readability, avoiding covering the whole photo */}
      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent z-[1] h-40" />

      {/* 2. Global darkening overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full min-h-[100dvh] text-center pt-24 pb-10 sm:py-20 lg:pt-36 lg:pb-16 flex flex-col items-center">
        <div className="relative group">
          {/* Soft radial glow behind the text that doesn't affect layout */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_rgba(0,0,0,0.2)_50%,_transparent_70%)] -z-10 blur-2xl" />

          <motion.h1
            className="mx-auto mt-10 sm:mt-12 lg:mt-20 max-w-5xl font-sans text-3xl sm:text-7xl font-extrabold tracking-tight text-white pb-2 leading-[1.1] sm:leading-tight drop-shadow-md sm:drop-shadow-2xl px-2 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            Ваше <span className="text-primary">преображение</span> рядом с метро Ленинская
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mt-5 sm:mt-6 inline-flex items-center gap-2 sm:gap-5 px-3 py-1.5 sm:px-7 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
          >
            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-6 sm:h-6 text-[#f59e0b] fill-[#f59e0b]" />
                ))}
              </div>
            </div>

            <div className="h-4 w-[1px] bg-white/20 sm:h-6 mx-0.5" />

            <span className="text-xs sm:text-lg font-medium tracking-tight text-white/95 leading-none">
              Лучший салон 2025
            </span>

            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded border border-white/10">
              <img
                src="/assets/2gis_logo.webp"
                alt="2GIS"
                width={20}
                height={20}
                fetchPriority="high"
                decoding="async"
                className="h-3 w-3 sm:h-5 sm:w-5 object-contain"
              />
              <span className="text-white font-bold text-xs sm:text-base tracking-tighter">2ГИС</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 w-full flex items-center justify-center gap-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <Button onClick={openBookingModal} size="lg" className="w-full sm:w-auto lg:h-16 lg:px-14 lg:text-xl shadow-xl hover:scale-105 transition-transform duration-300">
              {heroContent.ctaText}
            </Button>
            <p className="text-sm sm:text-base font-semibold text-white/95 drop-shadow-sm px-4 text-center">
              Скидка 10% студентам и именинникам
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

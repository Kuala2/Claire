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
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Heavy overlay for maximum focus on text */}
      {/* 1. Subtle top gradient for header readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-[1] h-48" />
      {/* 2. Heavy black mask for text contrast with subtle blur */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] z-[1]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-900 mb-8 shadow-2xl overflow-hidden"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
            ))}
          </div>
          <div className="h-5 w-[1px] bg-gray-200 mx-1 hidden sm:block" />
          <span className="text-base sm:text-lg font-black tracking-tight text-gray-950">
            Лучший салон красоты 2025 по версии
          </span>
          <div className="flex items-center gap-1.5 bg-[#66cc33]/15 px-3 py-1 rounded-lg border border-[#66cc33]/30">
            <img src="/assets/2gis_logo.png" alt="2GIS" className="h-5 w-5 object-contain" />
            <span className="text-[#166534] font-black text-lg tracking-tighter">2ГИС</span>
          </div>
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
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-x-6"
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

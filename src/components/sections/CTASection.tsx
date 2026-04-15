import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { companyInfo } from "../../data/content";
import { useBooking } from "../../context/BookingContext";

export const CTASection = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="booking" className="py-20 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary/5 rounded-[2.5rem] sm:rounded-[3rem] p-6 py-12 sm:p-20 border border-primary/10 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -ml-32 -mb-32" />

          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight px-2">
            Готовы к преображению?
          </h2>
          <p className="text-base sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-4">
            Запишитесь прямо сейчас и доверьте свой образ профессионалам нашего салона.
          </p>
          <div className="flex flex-col gap-8 justify-center items-center">
            <Button onClick={openBookingModal} size="lg" className="w-full sm:w-auto h-16 px-12 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Записаться онлайн
            </Button>

            <div className="flex items-center gap-6">
              <a 
                href="https://vk.com/id504464826" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#0077FF] text-white hover:scale-110 transition-all duration-300 shadow-lg" 
                title="Написать ВКонтакте"
              >
                <svg className="w-11 h-11 fill-white" viewBox="0 0 24 24">
                  <path d="M13.162 18.994c-6.09 0-9.564-4.172-9.71-11.117h3.047c.105 5.106 2.355 7.27 4.134 7.716V7.877h2.864v4.406c1.751-.186 3.608-2.186 4.232-4.406h2.864c-.463 2.768-2.511 4.768-4.004 5.811 1.493.687 3.847 2.418 4.774 5.306h-3.13c-.727-2.264-2.536-3.994-4.735-4.217v4.217h-1.136z" />
                </svg>
              </a>
              <a href="#" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white overflow-hidden hover:scale-110 transition-all duration-300 shadow-sm border border-gray-100" title="Национальный мессенджер Макс">
                <img src="/assets/Max.png" alt="Макс" className="w-full h-full object-cover" />
              </a>
            </div>

            <a
              href={`tel:${companyInfo.phone}`}
              className="text-lg sm:text-xl font-bold text-gray-900 hover:text-primary transition-colors text-center px-4 underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary"
            >
              Или позвоните нам:<br className="sm:hidden" /> {companyInfo.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

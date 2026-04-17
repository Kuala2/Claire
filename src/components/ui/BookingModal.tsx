import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { companyInfo } from "../../data/content";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const vkLink = "https://vk.com/im/convo/504464826";
  const maxLink = "https://max.ru/u/f9LHodD0cOKshNQKE7nF-JksmpTaVOEdjamLbywwhNPVRrG8RVbj8O-jJvw";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Записаться онлайн</h3>
            <p className="text-gray-600 mb-8">Выберите удобный способ для связи с салоном</p>

            <div className="flex justify-center gap-8 mb-8">
              <a
                href={vkLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#0077FF] text-white shadow-lg shadow-[#0077FF]/20 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 fill-white" viewBox="0 0 24 24">
                    <path d="M13.162 18.994c-6.09 0-9.564-4.172-9.71-11.117h3.047c.105 5.106 2.355 7.27 4.134 7.716V7.877h2.864v4.406c1.751-.186 3.608-2.186 4.232-4.406h2.864c-.463 2.768-2.511 4.768-4.004 5.811 1.493.687 3.847 2.418 4.774 5.306h-3.13c-.727-2.264-2.536-3.994-4.735-4.217v4.217h-1.136z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">ВКонтакте</span>
              </a>

              <a
                href={maxLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white overflow-hidden shadow-lg border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                  <img src="/assets/Max.png" alt="Макс" className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-gray-700">Макс</span>
              </a>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-2">Или позвоните нам</p>
              <a
                href={`tel:${companyInfo.phone}`}
                className="text-xl font-bold text-gray-900 hover:text-primary transition-colors"
              >
                {companyInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

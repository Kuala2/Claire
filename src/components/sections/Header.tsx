import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "../../data/content";
import { Button } from "../ui/Button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Преимущества", href: "#benefits" },
    { name: "Услуги", href: "#services" },
    { name: "Специалисты", href: "#team" },
    { name: "Работы", href: "#portfolio" },
    { name: "Вопросы", href: "#faq" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <>
      <header className="absolute top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex py-2 items-center justify-between">
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                src="/assets/Logo.png"
                alt={companyInfo.name}
                width={96}
                height={96}
                fetchPriority="high"
                decoding="async"
                className="h-14 sm:h-24 w-auto object-contain transition-transform hover:scale-105"
              />
              <span className="text-xl sm:text-3xl font-serif font-medium tracking-wide text-white">
                {companyInfo.name}
              </span>
            </div>

            <nav className="hidden md:flex gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm lg:text-base font-display font-semibold text-gray-100 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center">
              <a href={`tel:${companyInfo.phone}`} className="hidden md:block text-2xl font-display font-bold text-white hover:text-primary transition-colors">
                {companyInfo.phone}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white md:hidden hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Premium Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] md:hidden bg-gray-950/80 backdrop-blur-2xl flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-[10000]"
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center w-full max-w-xs">
              {/* Logo section - more compact */}
              <div className="mb-8 text-center">
                <img
                  src="/assets/Logo.png"
                  alt={companyInfo.name}
                  width={64}
                  height={64}
                  decoding="async"
                  className="h-16 w-auto mx-auto mb-2"
                />
                <h2 className="text-lg font-serif font-medium text-white/50 tracking-[0.2em] uppercase">
                  {companyInfo.name}
                </h2>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col items-center space-y-3 mb-6">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.07 }}
                    className="text-2xl font-display font-bold text-white hover:text-primary transition-all active:scale-95"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full mb-5"
              >
                <Button href="#booking" onClick={() => setIsOpen(false)} size="lg" className="w-full">
                  Записаться онлайн
                </Button>
              </motion.div>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4 pt-6 border-t border-white/10 w-full"
              >
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-2xl font-bold text-white hover:text-primary transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

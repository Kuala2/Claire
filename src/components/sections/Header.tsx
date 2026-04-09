import { Button } from "../ui/Button";
import { companyInfo, heroContent } from "../../data/content";

export const Header = () => {
  return (
    <header className="absolute top-0 z-50 w-full border-b border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex py-2 items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src="/assets/Logo.png" alt={companyInfo.name} className="h-24 sm:h-28 w-auto object-contain transition-transform hover:scale-105" />
            <span className="text-3xl font-serif font-medium tracking-wide text-white">
              {companyInfo.name}
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-base font-display font-semibold text-gray-100 hover:text-primary transition-colors">Услуги</a>
            <a href="#benefits" className="text-base font-display font-semibold text-gray-100 hover:text-primary transition-colors">Почему мы</a>
            <a href="#faq" className="text-base font-display font-semibold text-gray-100 hover:text-primary transition-colors">Частые вопросы</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href={`tel:${companyInfo.phone}`} className="hidden md:block text-lg font-display font-bold text-white hover:text-primary transition-colors">
              {companyInfo.phone}
            </a>
            <Button href="#booking" size="md" className="hidden sm:inline-flex font-display">{heroContent.ctaText}</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent-v1";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(CONSENT_KEY);
      if (consent !== "accepted") {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // Ignore storage errors and still hide banner for this session.
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-2 z-[10001] px-2 sm:bottom-4 sm:px-4">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:rounded-2xl sm:p-4">
        <p className="text-xs leading-snug text-gray-800 sm:text-sm sm:leading-relaxed">
          {isExpanded
            ? "Мы используем cookie, Яндекс.Метрику и Яндекс.Карты для корректной работы сайта, анализа посещаемости и отображения информации о местоположении салона. Продолжая пользоваться сайтом, вы соглашаетесь с обработкой данных в соответствии с Политикой."
            : "Мы используем cookie, Яндекс.Метрику и Яндекс.Карты для работы сайта и анализа посещаемости."}
        </p>
        <div className="mt-3 flex items-center gap-2 sm:mt-4 sm:justify-end">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg px-2 py-2 text-xs font-medium text-gray-700 underline underline-offset-2 transition-colors hover:text-gray-900 sm:text-sm"
          >
            {isExpanded ? "Свернуть" : "Подробнее"}
          </button>
          <a
            href="/politics.html"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            Политика
          </a>
          <button
            onClick={handleAccept}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-hover sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};

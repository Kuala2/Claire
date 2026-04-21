import { MapPin, Phone } from "lucide-react";
import { companyInfo } from "../../data/content";

export const FooterSection = () => {
  return (
    <footer id="contacts" className="bg-gray-900 text-white pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-gray-800">
          <div>
            <span className="text-2xl font-bold tracking-tight mb-6 inline-block">
              {companyInfo.name}
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Салон красоты в Нижнем Новгороде: парикмахерские услуги, маникюр, педикюр, брови, перманентный макияж, депиляция, пирсинг, ресницы, эстетическая косметология и массаж. 5 минут от метро Ленинская.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Пл. Комсомольская, рядом с ТЦ «Комсомолка».
            </p>

          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group">
                <MapPin size={20} className="flex-shrink-0 text-primary mt-1" />
                <a 
                  href="https://yandex.com/maps/47/nizhny-novgorod/?ll=43.941473%2C56.295453&mode=poi&poi%5Bpoint%5D=43.941242%2C56.295449&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D137128585624&z=19.6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed"
                >
                  {companyInfo.address}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <Phone size={20} className="flex-shrink-0 text-primary" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-white transition-colors font-medium">
                  Запись по телефону: {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Режим работы</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between items-center gap-4">
                <span className="text-sm">Пн – Пт:</span>
                <span className="font-bold text-gray-200 tabular-nums min-w-[100px] text-right">10:00–19:00</span>
              </li>
              <li className="flex justify-between items-center gap-4">
                <span className="text-sm">Сб – Вс:</span>
                <span className="font-bold text-gray-200 tabular-nums min-w-[100px] text-right">10:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {companyInfo.name}. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="/politics.html" target="_blank" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { companyInfo } from "../../data/content";

export const MapSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 sm:gap-12">
          <motion.div
            className="w-full lg:w-1/3 flex"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col justify-between w-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 shrink-0" />

              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-primary w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {"\u0416\u0434\u0435\u043c \u0432\u0430\u0441 \u0432 \u0433\u043e\u0441\u0442\u0438"}
                    </h3>
                    <p className="text-primary font-semibold text-sm uppercase tracking-widest mt-1">
                      {"\u041d\u0438\u0436\u043d\u0438\u0439 \u041d\u043e\u0432\u0433\u043e\u0440\u043e\u0434"}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                      {"\u041d\u0430\u0448 \u0430\u0434\u0440\u0435\u0441"}
                    </p>
                    <a
                      href="https://yandex.com/maps/47/nizhny-novgorod/?ll=43.941473%2C56.295453&mode=poi&poi%5Bpoint%5D=43.941242%2C56.295449&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D137128585624&z=16"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gray-50 text-gray-900 border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-center group"
                    >
                      <span className="block text-lg font-bold mb-2">{companyInfo.address}</span>
                      <span className="text-primary group-hover:text-primary/80 font-medium transition-colors">
                        {"\u041f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043c\u0430\u0440\u0448\u0440\u0443\u0442"}
                      </span>
                    </a>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                      {"\u0420\u0435\u0436\u0438\u043c \u0440\u0430\u0431\u043e\u0442\u044b"}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-sm sm:text-base">
                          {"\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a - \u041f\u044f\u0442\u043d\u0438\u0446\u0430"}
                        </span>
                        <span className="font-bold text-gray-900 text-sm sm:text-base">{companyInfo.workingHoursWeekday}</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium text-sm sm:text-base">
                          {"\u0421\u0443\u0431\u0431\u043e\u0442\u0430 - \u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435"}
                        </span>
                        <span className="font-bold text-gray-900 text-sm sm:text-base">{companyInfo.workingHoursWeekend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 min-h-[400px] h-auto lg:h-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-8 border-white bg-gray-100 relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=43.941128,56.295530&z=16&pt=43.941128,56.295530,pm2rdm"
              width="100%"
              height="100%"
              style={{ minHeight: "450px", border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Yandex Maps - Salon Claire"
              className="grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

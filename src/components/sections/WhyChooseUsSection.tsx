import { motion } from "framer-motion";
import { Trophy, Users, Sparkles } from "lucide-react";
import { benefitsContent } from "../../data/content";

const getIcon = (index: number) => {
  switch (index) {
    case 0: return <Trophy size={24} strokeWidth={1.5} />;
    case 1: return <Users size={24} strokeWidth={1.5} />;
    case 2: return <Sparkles size={24} strokeWidth={1.5} />;
    default: return <Sparkles size={24} strokeWidth={1.5} />;
  }
};

export const WhyChooseUsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {benefitsContent.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitsContent.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-background rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/5 text-primary border border-primary/10">
                {getIcon(idx)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

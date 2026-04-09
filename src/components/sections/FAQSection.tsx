import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqContent } from "../../data/content";
import { cn } from "../../lib/utils";

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {faqContent.title}
          </h2>
        </div>
        <div className="space-y-4">
          {faqContent.questions.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={cn(
                  "border border-gray-100 rounded-2xl bg-white overflow-hidden transition-colors",
                  isOpen ? "border-primary/20" : ""
                )}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown 
                    className={cn(
                      "text-gray-400 transition-transform duration-200", 
                      isOpen ? "transform rotate-180 text-primary" : ""
                    )} 
                    size={24} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

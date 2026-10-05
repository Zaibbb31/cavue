"use client";

import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What does your agency do?",
    answer:
      "We are a full-service creative agency that helps brands build, launch, and grow. Our expertise spans web design, development, brand identity, and digital marketing—giving you a unified approach to brand building.",
  },
  {
    id: 2,
    question: "How much do your services cost?",
    answer:
      "Our pricing is tailored to your specific needs. Since every project is unique, we provide custom quotes based on the scope, complexity, and timeline of your requirements after our initial discovery call.",
  },
  {
    id: 3,
    question: "Do you work on one-off projects or long-term partnerships?",
    answer:
      "We do both! We can dive into intensive one-off projects to help you launch something new, or we can act as a dedicated extension of your team through long-term retainers.",
  },
  {
    id: 4,
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive suite of digital services including UI/UX Design, Web Development, Brand Strategy & Identity, Social Media Management, Content Creation, and Performance Marketing.",
  },
  {
    id: 5,
    question: "How long does a project take?",
    answer:
      "Timelines vary depending on the scope and complexity of the project. A standard website design and development project typically takes 4 to 8 weeks, while smaller branding sprints can be completed much faster.",
  },
  {
    id: 6,
    question: "How do we get started?",
    answer:
      "It's simple! Reach out to us through our contact form. We'll schedule a brief discovery call to understand your goals, define the scope, and craft a tailored proposal to kick things off.",
  },
];

export default function FAQSection() {
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-[#FAFAFA] text-[#0C3852] relative z-20 border-t border-black/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 block">
            / QUICK ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase mb-4 sm:mb-6">
            QUESTIONS? <br />
            WE&apos;VE GOT ANSWERS.
          </h2>
          <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mx-auto">
             Everything you might want to know before we get to work.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="bg-white p-6 sm:p-10 border border-black/[0.04] shadow-sm">
          {/* Accordion List */}
          <div className="space-y-3.5 sm:space-y-4">
            {faqData.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className="bg-[#F5F7FA] p-5 sm:p-7 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group select-none"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-bold text-base sm:text-lg text-[#0C3852] pr-4 transition-colors group-hover:text-[#2575A5]">
                      {faq.question}
                    </h3>
                    
                    {/* Smooth morphing + / — indicator */}
                    <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 text-[#0C3852] group-hover:text-[#2575A5] transition-colors">
                      {/* Horizontal bar */}
                      <span className="absolute w-4 h-[2px] bg-current rounded-full transition-transform duration-300" />
                      {/* Vertical bar (scales to 0 and fades out when open) */}
                      <span
                        className={`absolute h-4 w-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "scale-y-0 opacity-0 rotate-90"
                            : "scale-y-100 opacity-100 rotate-0"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Smooth Collapsible Content via CSS Grid rows */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4 pt-3 border-t border-black/[0.05]"
                        : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[#476B82] text-xs sm:text-sm md:text-[15px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

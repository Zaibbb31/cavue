"use client";

import React, { useState } from "react";

interface FAQItem {
  id: number;
  category: "General" | "Pricing" | "Process" | "Results";
  question: string;
  answer: string;
}

const categories = ["General", "Pricing", "Process", "Results"] as const;
type Category = (typeof categories)[number];

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What exactly does your agency do?",
    answer:
      "We help brands build, launch, and grow through social media management, performance marketing, content production, AI-generated video, brand identity, founder-led marketing, and web design & development. Instead of treating these as separate pieces, we connect them into one clear brand experience.",
  },
  {
    id: 2,
    category: "General",
    question: "What types of brands do you work with?",
    answer:
      "We partner with ambitious startups, fast-growing scale-ups, and established enterprises across technology, luxury, consumer goods, fashion, lifestyle, and B2B sectors who are ready to make a bold impact.",
  },
  {
    id: 3,
    category: "General",
    question: "Do you work with startups or established brands?",
    answer:
      "Both! We tailor our collaborative approach depending on your stage—helping early-stage companies find product-market narrative fit, and guiding established brands through high-impact digital transformation and creative repositioning.",
  },
  {
    id: 4,
    category: "General",
    question: "Why work with you instead of a traditional agency?",
    answer:
      "Unlike traditional agencies with bloated timelines and fragmented communication, we operate as an agile, multidisciplinary extension of your core team. We combine high-velocity execution with world-class design standards and data-driven results.",
  },
  {
    id: 5,
    category: "Pricing",
    question: "How do you structure your project pricing and retainers?",
    answer:
      "We offer transparent, scope-based project sprints and monthly dedicated partnership retainers tailored to your roadmap, goals, and growth speed.",
  },
  {
    id: 6,
    category: "Process",
    question: "What does the onboarding and kickoff process look like?",
    answer:
      "Our onboarding is streamlined: we start with an intensive discovery and alignment workshop, define the core milestones and deliverables within 48 hours, and begin iterative design and execution immediately.",
  },
  {
    id: 7,
    category: "Results",
    question: "How do you measure and report performance?",
    answer:
      "We establish clear measurable KPIs before kickoff—ranging from engagement velocity, brand recall, customer conversion, and organic acquisition growth—with transparent live reporting dashboards.",
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("General");
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const filteredFaqs = faqData.filter(
    (faq) => faq.category === activeCategory
  );

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
            We believe great collaboration starts with clarity. Find answers to
            the questions we hear most about our process, services, timelines,
            and creative partnerships.
          </p>
        </div>

        {/* Main Content Box */}
        <div className="bg-white p-6 sm:p-10 border border-black/[0.04] shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    const firstInCat = faqData.find((f) => f.category === cat);
                    if (firstInCat) setOpenIds([firstInCat.id]);
                  }}
                  className={`px-6 py-2.5 text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#2575A5] text-white font-medium shadow-md shadow-[#2575A5]/25"
                      : "bg-transparent text-[#0C3852] hover:text-[#2575A5] font-normal"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5 sm:space-y-4">
            {filteredFaqs.map((faq) => {
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

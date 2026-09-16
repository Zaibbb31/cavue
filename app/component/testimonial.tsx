"use client";

import React from "react";
import Image from "next/image";

interface TestimonialItem {
  id: number;
  stars: number;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

const testimonialsRow1: TestimonialItem[] = [
  {
    id: 1,
    stars: 5,
    quote:
      "“The Neonix team brought our ideas to life with precision. They created a dynamic experience that engages audiences and leaves impressions across platforms.”",
    name: "EMILY R",
    role: "CTO at NovoTech.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    stars: 5,
    quote:
      "“The Neonix team brought our ideas to life with precision. They created a dynamic experience that engages audiences and leaves impressions across platforms.”",
    name: "EMILY R",
    role: "CTO at NovoTech.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
];

const testimonialsRow2: TestimonialItem[] = [
  {
    id: 3,
    stars: 5,
    quote:
      "“The Neonix team brought our ideas to life with precision. They created a dynamic experience that engages audiences and leaves impressions across platforms.”",
    name: "EMILY R",
    role: "CTO at NovoTech.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    stars: 5,
    quote:
      "“The Neonix team brought our ideas to life with precision. They created a dynamic experience that engages audiences and leaves impressions across platforms.”",
    name: "EMILY R",
    role: "CTO at NovoTech.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    stars: 5,
    quote:
      "“The Neonix team brought our ideas to life with precision. They created a dynamic experience that engages audiences and leaves impressions across platforms.”",
    name: "EMILY R",
    role: "CTO at NovoTech.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
];

function Stars() {
  return (
    <div className="flex items-center space-x-1.5 text-[#211747] mb-5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-[#FAFAFA] text-[#0C3852] relative z-20 border-t border-black/[0.04]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18 md:mb-20">
          <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 block">
            / TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase mb-4 sm:mb-6">
            WORDS FROM THE <br />
            PEOPLE WE&apos;VE CREATED 
            WITH
          </h2>
          <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mx-auto">
            From first ideas to final launches, our collaborators trust us to
            turn ambitious visions into work that makes an impact.
          </p>
        </div>

        {/* Testimonials Grid Container */}
        <div className="space-y-6 sm:space-y-8">
          {/* Row 1: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonialsRow1.map((item) => (
              <div
                key={item.id}
                className="bg-white p-7 sm:p-9 md:p-10 flex flex-col justify-between border border-black/[0.04] shadow-sm transition-all duration-300"
              >
                <div>
                  <Stars />
                  <p className="text-[#1E1245] text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-8">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3.5 pt-4 border-t border-black/[0.04]">
                  <div className="relative w-11 h-11 rounded-lg border-2 border-rose-400/80 p-0.5 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatar!}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1E1245] uppercase tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#52778E]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonialsRow2.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 sm:p-8 flex flex-col justify-between border border-black/[0.04] shadow-sm transition-all duration-300"
              >
                <div>
                  <Stars />
                  <p className="text-[#1E1245] text-sm sm:text-base md:text-[17px] font-medium leading-relaxed mb-8">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3.5 pt-4 border-t border-black/[0.04]">
                  <div className="relative w-10 h-10 rounded-lg border-2 border-rose-400/80 p-0.5 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.avatar!}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1E1245] uppercase tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#52778E]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

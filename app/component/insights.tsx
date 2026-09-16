import React from "react";
import Image from "next/image";
import Link from "next/link";

interface InsightPost {
  id: number;
  date: string;
  title: string;
  image: string;
  category?: string;
  slug?: string;
}

const insightsData: InsightPost[] = [
  {
    id: 1,
    date: "January 27, 2026",
    title: "Why Social Media Is Never a One Person Job",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    date: "January 27, 2026",
    title: "Why Social Media Is Never a One Person Job",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    date: "January 27, 2026",
    title: "Why Social Media Is Never a One Person Job",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
  },
];

export default function InsightsSection() {
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-[#FAFAFA] text-[#0C3852] relative z-20 border-t border-black/[0.04]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16 md:mb-20">
          {/* Left Column: Subtitle & Headline */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 block">
              / INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase">
              IDEAS WORTH <br />
              TALKING ABOUT
            </h2>
          </div>

          {/* Right Column: Paragraph Copy & CTA Button */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:pt-4">
            <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed mb-6 sm:mb-8">
              Explore our latest thoughts on branding, marketing, design, and
              digital experiences. Fresh ideas, practical insights, and creative
              perspectives to help your brand move forward.
            </p>
            <Link
              href="/insights"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-b from-[#125883] via-[#0C4568] to-[#083550] text-white font-medium text-sm sm:text-base border-t border-white/25 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.45)] hover:opacity-95 transition-opacity"
            >
              Explore Insights
            </Link>
          </div>
        </div>

        {/* 3-Column Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {insightsData.map((post) => (
            <Link
              key={post.id}
              href={`/insights`}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[4/3] bg-[#EBF0F5] overflow-hidden mb-4 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Meta & Title */}
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-[#6B899E] mb-2">
                  {post.date}
                </span>
                <h3 className="font-bold text-lg sm:text-xl md:text-[22px] text-[#0C3852] leading-snug group-hover:text-[#2575A5] transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

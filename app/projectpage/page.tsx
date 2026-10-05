"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/navbar";
import FAQSection from "../component/faq";
import Footer from "../component/footer";

interface ProjectCardData {
  id: number;
  slug: string;
  title: string;
  category: string;
  categoryColor?: string;
  statNumber: string;
  statLabel: string;
  image: string;
  accentColor?: string; // Color of the popout tab (e.g. purple #A28CFF)
  backColor?: string; // Color of the deep background card (e.g. sage green #D5E2D7)
}

const projects: ProjectCardData[] = [
  {
    id: 1,
    slug: "novaskin",
    title: "NovaSkin",
    category: "Beauty",
    categoryColor: "bg-[#A28CFF] text-[#111827]",
    statNumber: "6.2%",
    statLabel: "Average Engagement Rate",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#9C84FF]",
    backColor: "bg-[#D2E2D4]",
  },
  {
    id: 2,
    slug: "aura-botanical",
    title: "Aura Botanical",
    category: "Skincare",
    categoryColor: "bg-[#FCA5A5] text-[#111827]",
    statNumber: "3.4x",
    statLabel: "ROAS on Performance Media",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#FDA4AF]",
    backColor: "bg-[#E2E8F0]",
  },
  {
    id: 3,
    slug: "verve-eyewear",
    title: "Verve Eyewear",
    category: "Lifestyle",
    categoryColor: "bg-[#93C5FD] text-[#111827]",
    statNumber: "4.8M",
    statLabel: "Organic Social Impressions",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#86B7FE]",
    backColor: "bg-[#EAE0D5]",
  },
  {
    id: 4,
    slug: "lumina-glow",
    title: "Lumina Glow",
    category: "Beauty",
    categoryColor: "bg-[#A28CFF] text-[#111827]",
    statNumber: "+185%",
    statLabel: "Direct-to-Consumer Growth",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#9C84FF]",
    backColor: "bg-[#D8E6DE]",
  },
  {
    id: 5,
    slug: "solstice-studio",
    title: "Solstice Studio",
    category: "Fashion",
    categoryColor: "bg-[#FDE047] text-[#111827]",
    statNumber: "12.4K",
    statLabel: "Community Members Added",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#FACC15]",
    backColor: "bg-[#EDE9FE]",
  },
  {
    id: 6,
    slug: "kinetic-sound",
    title: "Kinetic Sound",
    category: "Tech & Audio",
    categoryColor: "bg-[#86EFAC] text-[#111827]",
    statNumber: "88%",
    statLabel: "Brand Sentiment Uplift",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
    accentColor: "bg-[#6EE7B7]",
    backColor: "bg-[#F3E8FF]",
  },
];

const filterCategories = ["All", "Beauty", "Skincare", "Fashion", "Lifestyle", "Tech & Audio"] as const;

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Subtitle Bar */}
          <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 mb-8 sm:mb-12">
            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider">
              / SELECTED WORK
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#6B899E] tracking-wide">
              Portfolio — 2026
            </span>
          </div>

          {/* Hero Heading & Description */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium text-[#0C3852] tracking-tight leading-[1.08]">
                Brands We’ve Built With. <br className="hidden sm:inline" />
                A Little of What We Do.
              </h1>
            </div>
            <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] max-w-xl leading-relaxed">
              Every brand has a different story to tell. Here’s a look at some of the brands, ideas and experiences we’ve helped bring to life. Different industries. Different challenges. Different ways of thinking. Here’s some of our work.
            </p>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-12 sm:mb-16 pb-2">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-none text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#0C4568] text-white shadow-sm"
                      : "bg-white text-[#476B82] hover:text-[#0C3852] hover:bg-white/80 border border-black/[0.05]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 2-Columns Cards Grid */}
          <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 sm:gap-y-14 md:gap-x-10 lg:gap-x-16 items-stretch">
            {filteredProjects.map((project) => (
              <Link
                href={`/projectpage/${project.slug}`}
                key={project.id}
                className="group relative cursor-pointer select-none perspective-1000 max-w-[440px] mx-auto w-full block"
              >
                {/* 1. Deepest Background Card (Sage green/Mint layer) */}
                <div
                  className={`absolute inset-0 rounded-none ${
                    project.backColor || "bg-[#D2E2D4]"
                  } pointer-events-none transition-all duration-500 ease-out z-0
                    opacity-0 scale-95 translate-x-0 translate-y-0 rotate-0
                    group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-3.5 sm:group-hover:translate-x-5 group-hover:-translate-y-2.5 sm:group-hover:-translate-y-3 group-hover:rotate-[3deg]`}
                />

                {/* 2. Middle Purple / Accent Layer with "VIEW PROJECT" Vertical Text Tab */}
                <div
                  className={`absolute inset-0 rounded-none ${
                    project.accentColor || "bg-[#9C84FF]"
                  } pointer-events-none transition-all duration-500 ease-out z-10
                    opacity-0 scale-95 translate-x-0 translate-y-0 rotate-0
                    group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-7 sm:group-hover:translate-x-10 group-hover:translate-y-2 sm:group-hover:translate-y-2.5 group-hover:rotate-[6deg] shadow-lg`}
                >
                  {/* Vertical "VIEW PROJECT" label positioned on the protruding right edge */}
                  <div className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span
                      className="text-[#111827] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap select-none"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      VIEW PROJECT
                    </span>
                  </div>
                </div>

                {/* 3. Front Main Card (NovaSkin White Card) */}
                <div
                  className="relative z-20 bg-white rounded-none p-3 sm:p-3.5 md:p-4 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-transform duration-500 ease-out
                    group-hover:-rotate-[3deg] group-hover:-translate-x-1.5 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)]"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3.5] sm:aspect-[4/3.4] w-full rounded-none overflow-hidden bg-[#EAEFF4] mb-3.5 sm:mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority={project.id <= 2}
                    />

                    {/* Category Badge on Top-Right */}
                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10">
                      <span
                        className={`inline-block px-3.5 py-1 rounded-none text-[11px] sm:text-xs font-semibold shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                          project.categoryColor || "bg-[#A28CFF] text-[#111827]"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom-Left Media / Gallery Icon Button */}
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-black/65 backdrop-blur-md text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:bg-black/80 group-hover:scale-110">
                        {/* Camera / Multi-image Icon */}
                        <svg
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Content: Title & Stats */}
                  <div className="px-1 sm:px-1.5 pt-0.5 pb-1">
                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-medium text-[#111827] tracking-tight mb-1 group-hover:text-[#0C4568] transition-colors">
                      {project.title}
                    </h3>

                    {/* Stat / Metric Line */}
                    <p className="text-xs sm:text-[13.5px] text-[#6B7280] flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-[#374151]">
                        {project.statNumber}
                      </span>
                      <span>{project.statLabel}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

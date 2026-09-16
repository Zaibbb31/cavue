import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./component/navbar";
import AboutScrollSection from "./component/about-scroll-section";
import TestimonialSection from "./component/testimonial";
import FAQSection from "./component/faq";
import InsightsSection from "./component/insights";
import Footer from "./component/footer";





interface CarouselCard {
  id: number;
  title: string;
  category: string;
  image: string;
  bgColor: string;
}

const carouselItems: CarouselCard[] = [
  {
    id: 1,
    title: "Aura Brand Identity",
    category: "Branding & Strategy",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#EAEFF4]",
  },
  {
    id: 2,
    title: "Verve Digital Campaign",
    category: "Social & Performance",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#F3F4F6]",
  },
  {
    id: 3,
    title: "Kinetic Web Experience",
    category: "Design & Interaction",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#E9F1F7]",
  },
  {
    id: 4,
    title: "Lumina Packaging",
    category: "Packaging & 3D",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#ECEFF3]",
  },
  {
    id: 5,
    title: "Studio Nexus Launch",
    category: "Creative Direction",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#EFF3F6]",
  },
  {
    id: 6,
    title: "Echo Sound Visuals",
    category: "Art Direction",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#EAF0F6]",
  },
];

const workCol1: WorkProject[] = [
  {
    id: 1,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
  },
];

const workCol2: WorkProject[] = [
  {
    id: 4,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
  },
];

const workCol3: WorkProject[] = [
  {
    id: 6,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "NOVA HOUSE",
    category: "Branding, Web Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80",
  },
];


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-12 md:pt-16 lg:pt-20 pb-12 overflow-hidden mt-15">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Subtitle / Category Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider block">
              / A CREATIVE MARKETING AGENCY FOR BOLD IDEAS
            </span>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
            {/* Main Headline (Left Column) */}
            <div className="lg:col-span-7 flex flex-col">
              <h1 className="text-2xl sm:text-[32px] md:text-[44px] lg:text-[63px] xl:text-[68px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase">
                WE MAKE BRANDS{" "}
                <span className="font-gochi text-[#3CA8D9] font-normal lowercase tracking-normal text-[1.2em] inline-block -rotate-2 transform">
                  impossible
                </span>{" "}
                TO IGNORE.
              </h1>

              {/* Social Proof / Reliable Fun-Maker */}
              <div className="mt-8 sm:mt-10 flex items-center gap-4">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-3 items-center">
                  <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-11 h-11 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Rating / Stat Info */}
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-[#0C3852] leading-tight">
                    210 +
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#4A728A]">
                    Reliable Fun-Maker!
                  </span>
                </div>
              </div>
            </div>

            {/* Description & CTA (Right Column) */}
            <div className="lg:col-span-5 flex flex-col justify-start lg:pt-4">
              <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed mb-6 sm:mb-8 max-w-lg">
                We turn ambitious ideas into bold brands, memorable campaigns,
                and digital experiences that get people talking.
              </p>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-b from-[#125883] via-[#0C4568] to-[#083550] text-white font-medium text-sm sm:text-base border-t border-white/25 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.45)]"
                >
                  Let&apos;s Make It Happen
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Animated Image Carousel */}
        <div className="w-full relative mt-4 overflow-hidden py-4">
          <div className="animate-marquee flex gap-6 sm:gap-8 items-center">
            {/* First Set of Items */}
            {carouselItems.map((item) => (
              <div
                key={`item-1-${item.id}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] aspect-[4/3] overflow-hidden bg-zinc-200/80 shadow-sm transition-transform duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 420px"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#3CA8D9] font-bold mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              </div>
            ))}

            {/* Duplicate Set for Seamless Loop */}
            {carouselItems.map((item) => (
              <div
                key={`item-2-${item.id}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] aspect-[4/3] overflow-hidden bg-zinc-200/80 shadow-sm transition-transform duration-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 420px"
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-[#3CA8D9] font-bold mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands / Impact Section */}
      <section className="w-full py-12 sm:py-14 md:py-16 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10">
          <h2 className="text-[#0C4568] font-semibold text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase">
            CREATING IMPACT WITH BRANDS THAT LEAD
          </h2>
        </div>

        {/* Animated Infinite Logos Carousel */}
        <div className="w-full relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee-logos flex gap-12 sm:gap-16 md:gap-20 items-center">
            {/* Repeat 4 sets to ensure seamless infinite animation loop across wide displays */}
            {[0, 1, 2, 3].map((setIndex) => (
              <React.Fragment key={`logo-set-${setIndex}`}>
                {/* Logo 1: Network Nodes */}
                <div className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-200">
                  <svg className="h-6 sm:h-7 md:h-8 w-auto text-black" viewBox="0 0 160 36" fill="currentColor">
                    <circle cx="8" cy="8" r="4" />
                    <circle cx="20" cy="8" r="4" />
                    <circle cx="8" cy="20" r="4" />
                    <circle cx="20" cy="20" r="4" />
                    <circle cx="14" cy="14" r="5" />
                    <circle cx="26" cy="14" r="4" />
                    <circle cx="2" cy="14" r="3" />
                    <circle cx="14" cy="26" r="3.5" />
                    <text x="36" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="19" letterSpacing="-0.5">logoipsum</text>
                  </svg>
                </div>

                {/* Logo 2: 3D Block */}
                <div className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-200">
                  <svg className="h-7 sm:h-8 md:h-8.5 w-auto text-black" viewBox="0 0 120 40" fill="currentColor">
                    <path d="M10 12 L45 12 L40 32 L5 32 Z" fill="#222" />
                    <path d="M12 14 L42 14 L38 30 L8 30 Z" fill="#fff" />
                    <path d="M17 18 L27 18 L25 26 L15 26 Z" fill="#111" />
                    <path d="M30 18 L40 18 L38 26 L28 26 Z" fill="#111" />
                    <path d="M43 6 L55 6 L52 14 L40 14 Z" fill="#111" />
                    <path d="M45 10 L52 10 L50 28 L43 28 Z" fill="#111" />
                  </svg>
                </div>

                {/* Logo 3: Bold Serif Script Logoipsum */}
                <div className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-200">
                  <svg className="h-7 sm:h-8 md:h-8.5 w-auto text-black" viewBox="0 0 170 36" fill="currentColor">
                    <text x="0" y="24" fontFamily="serif, system-ui" fontWeight="900" fontStyle="italic" fontSize="26" letterSpacing="-1">
                      Logoipsum
                    </text>
                    <path d="M22 28 L40 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Logo 4: Circle Swirl + Logoipsum */}
                <div className="flex-shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity duration-200">
                  <svg className="h-6 sm:h-7 md:h-8 w-auto text-black" viewBox="0 0 160 36" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16C28 15 27.8 14.1 27.5 13.2L20 15C20 17.2 18.2 19 16 19C13.8 19 12 17.2 12 15C12 12.8 13.8 11 16 11V4Z" />
                    <text x="36" y="22" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="19" letterSpacing="-0.5">Logoipsum</text>
                  </svg>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Scroll-Driven #3886AD About Us Section */}
      <AboutScrollSection />

      {/* Our Work Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 bg-[#FAFAFA] text-[#0C3852] relative z-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col">
              <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 block">
                / OUR WORK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase">
                IDEAS WE&apos;VE <br />
                BROUGHT TO LIFE.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed">
                From bold brand identities to digital experiences and campaigns,
                we create work that turns strategy into meaningful impact and makes
                brands impossible to ignore.
              </p>
            </div>
          </div>

          {/* 3-Column Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Column 1 */}
            <div className="flex flex-col space-y-10 sm:space-y-12">
              {workCol1.map((item) => (
                <div key={`col1-${item.id}`} className="flex flex-col group cursor-pointer">
                  <div className="relative w-full aspect-[4/3.8] bg-[#E9EEF3] overflow-hidden mb-3.5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-between px-1">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#0C3852] uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#52778E]">
                        {item.category}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#52778E]">
                      {item.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Middle - Offset with Quote Card) */}
            <div className="flex flex-col space-y-10 sm:space-y-12 md:pt-14">
              {/* Top Card in Col 2 */}
              <div className="flex flex-col group cursor-pointer">
                <div className="relative w-full aspect-[4/4.4] bg-[#E9EEF3] overflow-hidden mb-3.5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
                  <Image
                    src={workCol2[0].image}
                    alt={workCol2[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between px-1">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0C3852] uppercase tracking-wide">
                      {workCol2[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52778E]">
                      {workCol2[0].category}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#52778E]">
                    {workCol2[0].year}
                  </span>
                </div>
              </div>

              {/* Centered Quote Block */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center my-4 sm:my-8">
                <p className="text-[#38607A] text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xs">
                  &ldquo;Great design isn&apos;t just what you see, it&apos;s what you feel, remember, and talk about long after.&rdquo;
                </p>
              </div>

              {/* Bottom Card in Col 2 */}
              <div className="flex flex-col group cursor-pointer">
                <div className="relative w-full aspect-[4/4.4] bg-[#E9EEF3] overflow-hidden mb-3.5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm mt-15">
                  <Image
                    src={workCol2[1].image}
                    alt={workCol2[1].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline justify-between px-1">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0C3852] uppercase tracking-wide">
                      {workCol2[1].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52778E]">
                      {workCol2[1].category}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#52778E]">
                    {workCol2[1].year}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-10 sm:space-y-12">
              {workCol3.map((item) => (
                <div key={`col3-${item.id}`} className="flex flex-col group cursor-pointer">
                  <div className="relative w-full aspect-[4/3.8] bg-[#E9EEF3] overflow-hidden mb-3.5 transition-transform duration-300 group-hover:-translate-y-1 shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-between px-1">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#0C3852] uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#52778E]">
                        {item.category}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#52778E]">
                      {item.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Button */}
          <div className="flex justify-center mt-16 sm:mt-20">
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-b from-[#125883] via-[#0C4568] to-[#083550] text-white font-medium text-sm sm:text-base border-t border-white/25 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.45)]"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 sm:py-20 md:py-28 bg-[#FAFAFA] text-[#0C3852] relative z-20 border-t border-black/[0.04]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="flex flex-col">
              <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 block">
                / SERVICES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-medium text-[#0C3852] tracking-tight leading-[1.08] uppercase">
                WE TURN CREATIVITY <br />
                INTO REAL IMPACT.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[#38607A] text-sm sm:text-base md:text-[17px] leading-relaxed">
                From strategy and branding to digital experiences and campaigns,
                we combine creative thinking with smart execution to help ambitious
                brands stand out and grow.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Top Row: 2 Squares */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Brand Strategy (Orange) */}
                <div className="group relative bg-[#FFA26B] p-7 sm:p-8 flex flex-col justify-between aspect-square cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                  {/* Top Row: Icon + Arrow */}
                  <div className="flex items-center justify-between">
                    {/* Clover Geometric Icon */}
                    <div className="w-9 h-9 flex items-center justify-center text-[#0C3852]">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="11" cy="11" r="5" />
                        <circle cx="21" cy="11" r="5" />
                        <circle cx="11" cy="21" r="5" />
                        <circle cx="21" cy="21" r="5" />
                      </svg>
                    </div>

                    {/* Circular Arrow Button */}
                    <div className="w-10 h-10 rounded-full bg-[#0C3852] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                      <svg className="w-4 h-4 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0C3852] tracking-tight uppercase leading-tight">
                    BRAND STRATEGY
                  </h3>
                </div>

                {/* Content Marketing (Yellow) */}
                <div className="group relative bg-[#FFE635] p-7 sm:p-8 flex flex-col justify-between aspect-square cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                  {/* Top Row: Icon + Arrow */}
                  <div className="flex items-center justify-between">
                    {/* Targeted Box Icon */}
                    <div className="w-9 h-9 flex items-center justify-center text-[#0C3852]">
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                        <rect x="7" y="7" width="18" height="18" rx="2" />
                        <circle cx="16" cy="16" r="3.5" fill="#FFE635" />
                        <rect x="14" y="3" width="4" height="4" />
                        <rect x="14" y="25" width="4" height="4" />
                        <rect x="3" y="14" width="4" height="4" />
                        <rect x="25" y="14" width="4" height="4" />
                      </svg>
                    </div>

                    {/* Circular Arrow Button */}
                    <div className="w-10 h-10 rounded-full bg-[#0C3852] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                      <svg className="w-4 h-4 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#0C3852] tracking-tight uppercase leading-tight">
                    CONTENT <br />
                    MARKETING
                  </h3>
                </div>
              </div>

              {/* Bottom Wide Card: SEO Marketing (Sky Blue) */}
              <div className="group relative bg-[#96D6F2] p-7 sm:p-8 sm:py-9 flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-1 flex-1">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-8 sm:mb-10">
                  {/* Modern L-Box Icon */}
                  <div className="w-9 h-9 flex items-center justify-center text-[#1C2052]">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                      <path d="M4 4H16V10H10V28H4V4Z" />
                      <rect x="16" y="12" width="12" height="16" rx="1" />
                    </svg>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-10 h-10 rounded-full bg-[#1A77A2] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45">
                    <svg className="w-4 h-4 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0C3852] tracking-tight uppercase leading-tight mb-1">
                    SEO MARKETING
                  </h3>
                  <p className="font-gochi text-[#0C3852] text-base sm:text-lg mb-3">
                    Get found. Get noticed. Grow.
                  </p>
                  <p className="text-xs sm:text-sm text-[#275975] leading-relaxed max-w-lg mb-6">
                    We build smart SEO strategies that improve your visibility,
                    attract the right traffic, and turn searches into meaningful business opportunities.
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    <span className="px-4 py-1.5 rounded-full bg-[#C2E7F8]/80 text-[#0C3852] text-xs font-medium">
                      SEO Strategy
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#C2E7F8]/80 text-[#0C3852] text-xs font-medium">
                      Keyword Research
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-[#C2E7F8]/80 text-[#0C3852] text-xs font-medium">
                      Organic Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Columns (Image Showcase) */}
            <div className="lg:col-span-6 relative overflow-hidden min-h-[420px] lg:min-h-full bg-[#E9EEF3] group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80"
                alt="Creative Services"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Video / Showreel Section */}
      <section className="w-full pt-16 sm:pt-20 md:pt-28 pb-0 bg-[#FFFFFF] text-[#0C3852] relative z-20 overflow-hidden">
        {/* Centered Headline */}
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium text-[#0C3852] tracking-tight leading-[1.25] uppercase">
            WE TURN BOLD IDEAS INTO BRANDS THAT{" "}
            <span className="font-gochi text-[#3CA8D9] font-normal lowercase tracking-normal text-[1.2em] inline-block">
              capture attention
            </span>
            ,{" "}
            <span className="font-gochi text-[#3CA8D9] font-normal lowercase tracking-normal text-[1.2em] inline-block">
              spark curiosity
            </span>
            , AND STAY MEMORABLE.
          </h2>
        </div>

        {/* Video / Image Container with max-w-8xl and reduced height */}
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-28">
          <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[380px] md:min-h-[460px] max-h-[520px] bg-[#E2E8F0] overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1920&auto=format&fit=crop&q=80"
              alt="Brand Showreel Video"
              fill
              sizes="(max-width: 1536px) 100vw, 1440px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 text-[#0C3852] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}




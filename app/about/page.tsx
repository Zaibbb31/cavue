"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/navbar";
import MeetTeamScrollSection from "../component/meet-team-scroll";
import FAQSection from "../component/faq";
import InsightsSection from "../component/insights";
import Footer from "../component/footer";

export default function AboutPage() {
  const [activeCard, setActiveCard] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const heroCards = [
    {
      id: 0,
      type: "orange",
      title: "Empowering creators to own their reach",
      subtitle: "No algorithms, no gatekeepers. Direct connection to your audience.",
      tag: "Direct Reach",
    },
    {
      id: 1,
      type: "image",
      image: "/images/creator_podcast_host.jpg",
      alt: "Creator hosting a podcast with microphone",
      name: "Marcus Vance",
      role: "Podcast Host & Creator",
    },
    {
      id: 2,
      type: "dark",
      stat: "20M+",
      statLabel: "Delivered",
      description: "Messages sent with purpose by creators, not spam.",
    },
    {
      id: 3,
      type: "image",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80",
      alt: "Creator in studio",
      name: "Elena Rostova",
      role: "Visual Artist & Founder",
    },
  ];

  const scrollToCard = (index: number) => {
    setActiveCard(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[index]) {
        const cardElement = cards[index] as HTMLElement;
        const containerWidth = container.offsetWidth;
        const cardWidth = cardElement.offsetWidth;
        const cardLeft = cardElement.offsetLeft;
        const scrollTarget = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        container.scrollTo({
          left: Math.max(0, scrollTarget),
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollCenter = container.scrollLeft + container.offsetWidth / 2;
    const cards = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeCard && closestIndex >= 0 && closestIndex < heroCards.length) {
      setActiveCard(closestIndex);
    }
  };

  useEffect(() => {
    // Center the center podcast creator card on mount
    const timer = setTimeout(() => {
      scrollToCard(1);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#348DBF] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 lg:pb-32 bg-[#FAFAFA] overflow-hidden">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-[#348DBF]/10 via-[#0C3852]/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* ========================================================================= */}
        {/* DESKTOP HERO VIEW (md:block) - Preserved exactly as previous design       */}
        {/* ========================================================================= */}
        <div className="hidden md:block max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Center-aligned Hero Content */}
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center mb-16 sm:mb-20 md:mb-24">
            <span className="font-gochi text-[#348DBF] text-base sm:text-xl tracking-wider mb-3 block">
              / ABOUT CAVUE
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-medium text-[#0C3852] tracking-[-0.03em] leading-[1.06]">
              We Build What Fits <br /> Your Brand.
            </h1>
            <p className="mt-5 sm:mt-7 text-slate-600 text-base sm:text-lg md:text-[19px] leading-relaxed max-w-2xl mx-auto font-normal">
              From strategy to storytelling, we create thoughtful digital solutions shaped around your goals, audience and stage of growth.

            </p>
          </div>

          {/* ================= FANNED / OVERLAPPING CARDS ROW ================= */}
          <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center pt-4 sm:pt-8 pb-10">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center -space-y-4 lg:space-y-0 lg:-space-x-5 xl:-space-x-8">
              
              {/* CARD 1: Dark Navy Blue (#0C3852) - CAVUE Meaning */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[325px] h-[390px] sm:h-[430px] md:h-[460px] bg-[#0C3852] text-white p-7 sm:p-8 flex flex-col justify-between transform -rotate-4 sm:-rotate-6 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-10 group cursor-pointer">
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight">
                    Ceiling And <br />
                    Visibility Unlimited
                  </h3>
                </div>
                <p className="text-white/85 text-[11px] sm:text-xs md:text-[13px] font-normal leading-relaxed mt-auto max-w-full">
                  CAVUE takes its name from CAVU: “Ceiling And Visibility Unlimited,” an aviation term that describes the clearest conditions to fly. CAVUE is a tribute to our aviation roots and a reflection of our passion for creating brands with clarity, direction and limitless possibility.
                </p>
              </div>

              {/* CARD 2: Smiling Creator with Podcast Mic */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[325px] h-[390px] sm:h-[430px] md:h-[460px] overflow-hidden transform -rotate-1 sm:-rotate-2 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-20 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                  alt="Creator hosting a podcast"
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#348DBF] block mb-1">
                    Creator First
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold">Ryan Mitchell</h4>
                  <p className="text-white/80 text-xs sm:text-sm">Podcast Host & Creator</p>
                </div>
              </div>

              {/* CARD 3: Bright Accent Blue (#348DBF) - Agency Partner */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[325px] h-[390px] sm:h-[430px] md:h-[460px] bg-[#348DBF] text-white p-7 sm:p-8 flex flex-col justify-between transform rotate-2 sm:rotate-3 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-30 group cursor-pointer">
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight pr-4">
                    You Don’t Need Another Agency. You Need Someone in Your Corner.
                  </h3>
                </div>
                <p className="text-white/95 text-[11px] sm:text-xs md:text-[13px] font-normal leading-relaxed mt-auto max-w-full">
                  We deliberately keep our roster for selected brands so we can stay close to the brands we work with. We become an extension of your team, bringing hands-on expertise, personal attention and clear direction to brands navigating the shift from traditional to digital, doing it all themselves, or building something entirely new.
                </p>
              </div>

              {/* CARD 4: Bearded Creator with Headphones and Silver Mic at Desk */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[325px] h-[390px] sm:h-[430px] md:h-[460px] overflow-hidden transform rotate-4 sm:rotate-6 hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-20 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80"
                  alt="Creator at studio desk"
                  fill
                  sizes="350px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#348DBF] block mb-1">
                    Global Reach
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold">Evan Brooks</h4>
                  <p className="text-white/80 text-xs sm:text-sm">Content Strategist & Founder</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE HERO VIEW (block md:hidden) - Exact reference layout with G2 & CTA */}
        {/* ========================================================================= */}
        <div className="block md:hidden max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Top Hero Content: Left-aligned as in reference */}
          <div className="max-w-2xl text-left mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight leading-[1.12]">
              Where Creators Build Audiences That Last
            </h1>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              We built Cavue to help creators own their audience, strengthen their voice, and grow without depending on changing algorithms or rented platforms.
            </p>

            
          </div>

          {/* ================= HORIZONTAL CARD CAROUSEL ================= */}
          <div className="relative w-full mt-4">
            
            {/* Scroll Container with Touch/Mouse Drag and Snap */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex items-center gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* CARD 0: Orange Accent Card - Agency Partner */}
              <div
                onClick={() => scrollToCard(0)}
                className={`relative w-[260px] h-[330px] bg-[#FF4F18] text-white p-6 flex flex-col justify-end shadow-md flex-shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                  activeCard === 0 ? "scale-100 ring-2 ring-[#FF4F18]/50 shadow-xl" : "scale-[0.98] opacity-90"
                }`}
              >
                <h3 className="text-[17px] font-bold tracking-tight text-white leading-tight mb-2">
                  You Don’t Need Another Agency. You Need Someone in Your Corner.
                </h3>
                <p className="text-white/90 text-[10px] mt-2.5 leading-relaxed">
                  We deliberately keep our roster for selected brands so we can stay close to the brands we work with. We become an extension of your team, bringing hands-on expertise, personal attention and clear direction to brands navigating the shift from traditional to digital, doing it all themselves, or building something entirely new.
                </p>
              </div>

              {/* CARD 1: Smiling Creator with Podcast Mic (Center active card) */}
              <div
                onClick={() => scrollToCard(1)}
                className={`relative w-[260px] h-[330px] overflow-hidden shadow-lg flex-shrink-0 snap-center bg-slate-100 transition-all duration-300 cursor-pointer ${
                  activeCard === 1 ? "scale-100 ring-2 ring-[#348DBF]/50 shadow-xl" : "scale-[0.98] opacity-90"
                }`}
              >
                <Image
                  src="/images/creator_podcast_host.jpg"
                  alt="Creator hosting a podcast with microphone"
                  fill
                  sizes="260px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* CARD 2: Dark Navy Stat Card - CAVUE Meaning */}
              <div
                onClick={() => scrollToCard(2)}
                className={`relative w-[260px] h-[330px] bg-[#111827] text-white p-6 flex flex-col justify-between shadow-md flex-shrink-0 snap-center transition-all duration-300 cursor-pointer ${
                  activeCard === 2 ? "scale-100 ring-2 ring-[#0C3852]/50 shadow-xl" : "scale-[0.98] opacity-90"
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                    Ceiling And <br />
                    Visibility Unlimited
                  </h3>
                </div>
                <p className="text-white/80 text-[10px] leading-relaxed mt-auto">
                  CAVUE takes its name from CAVU: “Ceiling And Visibility Unlimited,” an aviation term that describes the clearest conditions to fly. CAVUE is a tribute to our aviation roots and a reflection of our passion for creating brands with clarity, direction and limitless possibility.
                </p>
              </div>

              {/* CARD 3: Second Creator Studio Photo */}
              <div
                onClick={() => scrollToCard(3)}
                className={`relative w-[260px] h-[330px] overflow-hidden shadow-lg flex-shrink-0 snap-center bg-slate-100 transition-all duration-300 cursor-pointer ${
                  activeCard === 3 ? "scale-100 ring-2 ring-[#348DBF]/50 shadow-xl" : "scale-[0.98] opacity-90"
                }`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                  alt="Creator in studio"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>

            </div>

            {/* Pagination Dots (4 Dots matching cards) */}
            <div className="flex justify-center items-center gap-2 mt-3">
              {heroCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCard === index
                      ? "w-6 bg-[#111827]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Bottom Narrative Copy & Blue Tone CTA Button */}
          <div className="max-w-2xl text-left mt-8">
            <p className="text-slate-700 text-sm leading-relaxed font-normal">
              Cavue is the{" "}
              <strong className="font-semibold text-slate-900">
                email platform built for creators
              </strong>{" "}
              — every feature is crafted and tested to help you grow with confidence, so you can focus on what truly matters: connecting with your audience.
            </p>

            {/* CTA Button in Requested Blue Tone */}
            <div className="relative inline-block mt-6">
              {/* Soft Ambient Blue Glow */}
              <div className="absolute inset-0 bg-[#348DBF]/35 blur-xl rounded-full transform scale-95 pointer-events-none" />

              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#348DBF] hover:bg-[#2879a6] text-white font-medium text-sm shadow-lg shadow-[#348DBF]/30 hover:shadow-xl hover:shadow-[#348DBF]/45 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <span>Grow With Cavue</span>
                <svg
                  className="w-4 h-4 text-white fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Empowering Creators Section: Our Mission & Our Vision */}
      <section className="w-full py-20 sm:py-28 md:py-36 bg-[#FAFAFA] text-[#111827]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-24 md:mb-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#0C3852] tracking-tight leading-[1.12]">
              Our Mission & Our Vision
            </h2>
          </div>

          <div className="flex flex-col space-y-20 sm:space-y-28 md:space-y-36">
            
            {/* ROW 1: OUR MISSION (Image Left, Content Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
              
              {/* Left Column: Image with rounded corners */}
              <div className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80"
                  alt="Creator working at desk on tools that matter"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Right Column: Mission Content */}
              <div className="lg:col-span-6 flex flex-col justify-center lg:pl-4 xl:pl-8">
                <h3 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#111827] tracking-tight mb-4 sm:mb-5">
                  Our Mission
                </h3>
                <h4 className="text-xl sm:text-2xl font-semibold text-[#0C3852] mb-3">
                  Create with clarity. Move with purpose.
                </h4>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                  We work closely with a group of brands to bring clarity to their challenges, creativity to their communication and momentum to their growth.
                </p>
              </div>

            </div>

            {/* ROW 2: OUR VISION (Content Left, Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
              
              {/* Left Column: Vision Content */}
              <div className="lg:col-span-6 flex flex-col justify-center lg:pr-4 xl:pr-8">
                <h3 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#111827] tracking-tight mb-4 sm:mb-5">
                  Our Vision
                </h3>
                <h4 className="text-xl sm:text-2xl font-semibold text-[#0C3852] mb-3">
                  No ceiling. Unlimited visibility.
                </h4>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                  Inspired by Ceiling And Visibility Unlimited, we want to create a world where brands have the clarity to see what's possible and the creative courage to go there.
                </p>
              </div>

              {/* Right Column: Image */}
              <div className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1200&auto=format&fit=crop&q=80"
                  alt="Creator recording video on smartphone tripod"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

            </div>


          </div>

        </div>
      </section>

      {/* Number that speaks Section */}
      <section className="w-full relative h-[720px] sm:h-[820px] md:h-[880px] lg:h-[920px] flex flex-col justify-end pb-10 sm:pb-14 lg:pb-16 bg-[#0E1117] text-white overflow-hidden">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&auto=format&fit=crop&q=80"
            alt="Founders and team discussing metrics"
            fill
            sizes="100vw"
            className="object-cover object-[50%_0%] opacity-95"
            priority
          />
          {/* Gradient: completely transparent across upper 55%, dark only near the cards */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1117] from-15% via-[#0E1117]/85 via-45% to-transparent" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center w-full">
          
          {/* Centered Heading */}
          <h3 className="text-white text-base sm:text-lg md:text-xl font-medium tracking-tight text-center mb-6 sm:mb-8">
            Number that speaks
          </h3>

          {/* 4 Stat Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Stat 1 */}
            <div className="bg-[#18181B]/95 backdrop-blur-md border border-white/10 p-7 sm:p-8 l flex flex-col justify-start transition-transform duration-300">
              <span className="text-4xl sm:text-5xl lg:text-[54px] font-regular text-white tracking-tight leading-none mb-4">
                1M+
              </span>
              <p className="text-white/80 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                Creators and teams using Cavue to grow their audience.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#18181B]/95 backdrop-blur-md border border-white/10 p-7 sm:p-8 flex flex-col justify-start transition-transform duration-300">
              <span className="text-4xl sm:text-5xl lg:text-[54px] font-regular text-white tracking-tight leading-none mb-4">
                120+
              </span>
              <p className="text-white/80 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                Countries where Cavue-powered emails are delivered daily.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#18181B]/95 backdrop-blur-md border border-white/10 p-7 sm:p-8 flex flex-col justify-start transition-transform duration-300">
              <span className="text-4xl sm:text-5xl lg:text-[54px] font-regular text-white tracking-tight leading-none mb-4">
                25+
              </span>
              <p className="text-white/80 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                Team members building tools creators truly love.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#18181B]/95 backdrop-blur-md border border-white/10 p-7 sm:p-8 flex flex-col justify-start transition-transform duration-300">
              <span className="text-4xl sm:text-5xl lg:text-[54px] font-regular text-white tracking-tight leading-none mb-4">
                3
              </span>
              <p className="text-white/80 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed">
                Global locations where our team collaborates and creates.
              </p>
            </div>

          </div>

        </div>
      </section>

      

      

      {/* Meet The Team Scroll Section with upward card animation */}
      <MeetTeamScrollSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Insights Section */}
      <InsightsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

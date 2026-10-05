"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [isPlayingVideo1, setIsPlayingVideo1] = useState(true);
  const [isPlayingVideo2, setIsPlayingVideo2] = useState(true);
  const [isPlayingVideo3, setIsPlayingVideo3] = useState(true);
  const [isPlayingVideo4, setIsPlayingVideo4] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-24 bg-[#FAFAFA] text-[#111317] overflow-hidden">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#FFF5EE]/60 via-[#F3F4F6]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Hero Container (Headline, Rating, CTA) */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        

        {/* 2-Column Split: Headline on Left, Subtitle & Email CTA on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 sm:mb-20">
          
          {/* Left Column: Big Bold Headline */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[74px] font-medium text-[#111317] tracking-[-0.035em] leading-[1.05]">
              Your brand deserves visibility unlimited.
            </h1>
          </div>

          {/* Right Column: Descriptive text + Email Form */}
          <div className="lg:col-span-5 flex flex-col justify-end lg:pl-4">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-7 font-normal max-w-md">
              Let’s make your brand the one people talk about.
            </p>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#348DBF] hover:bg-[#2A7AA8] text-white text-sm sm:text-base font-semibold tracking-wide shadow-[0_4px_14px_rgba(52,141,191,0.35)] hover:shadow-[0_6px_20px_rgba(52,141,191,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-fit"
            >
              <span>Build with us</span>
              
            </Link>

          </div>
        </div>

      </div>

      {/* Carousel Controls (Mobile / Desktop Quick Jump) */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-4">
        
        
      </div>

      {/* Bottom Carousel Section: Strictly alternating [9:16 Video Frame] -> [1 Column: Figure + 3:4 Image] */}
      <div
        ref={carouselRef}
        className="w-full overflow-x-auto no-scrollbar py-4 px-4 sm:px-6 lg:px-8 select-none"
      >
        <div className="animate-marquee flex gap-4 sm:gap-5 w-max">
          
          {/* ================= PRIMARY SET (Alternating Reel -> 1 Column -> Reel -> 1 Column) ================= */}
          
          {/* 1. 9:16 VIDEO REEL - NOAH WILSON */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/1.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlayingVideo1 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />




            <div
              onClick={() => setIsPlayingVideo1(!isPlayingVideo1)}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div
                className={`w-14 h-14 bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 ${
                  isPlayingVideo1
                    ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    : "opacity-100 scale-100 bg-[#FF4500] border-transparent"
                }`}
              >
                {isPlayingVideo1 ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>


          </div>

          {/* 2. ONE COLUMN ONLY -> FIGURE CARD ($500M+) + 3:4 IMAGE CARD (RYAN MITCHELL) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card */}
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/1.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Bottom 3:4 Image Card (Ryan Mitchell - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/5.png"
                alt="Ryan Mitchell - Fitness & Coaching"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

          {/* 3. 9:16 VIDEO REEL - AISHA GRANT */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/2.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlayingVideo2 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />




            <div
              onClick={() => setIsPlayingVideo2(!isPlayingVideo2)}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div
                className={`w-14 h-14 bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 ${
                  isPlayingVideo2
                    ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    : "opacity-100 scale-100 bg-[#FF4500] border-transparent"
                }`}
              >
                {isPlayingVideo2 ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>


          </div>

          {/* 4. ONE COLUMN ONLY -> FIGURE CARD (42M+) + 3:4 IMAGE CARD (EVAN BROOKS) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card */}
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/2.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Bottom 3:4 Image Card (Evan Brooks - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/6.png"
                alt="Evan Brooks - Content Creator"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

          {/* 5. 9:16 VIDEO REEL - MARCUS VANCE */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/3.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlayingVideo3 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />




            <div
              onClick={() => setIsPlayingVideo3(!isPlayingVideo3)}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div
                className={`w-14 h-14 bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 ${
                  isPlayingVideo3
                    ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    : "opacity-100 scale-100 bg-[#FF4500] border-transparent"
                }`}
              >
                {isPlayingVideo3 ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>


          </div>

          {/* 6. ONE COLUMN ONLY -> FIGURE CARD (10M+) + 3:4 IMAGE CARD (SOPHIA CHEN) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card */}
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/3.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Bottom 3:4 Image Card (Sophia Chen - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/7.png"
                alt="Sophia Chen - Creative Director"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

          {/* 7. 9:16 VIDEO REEL - MAYA LIN */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/4.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isPlayingVideo4 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />




            <div
              onClick={() => setIsPlayingVideo4(!isPlayingVideo4)}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div
                className={`w-14 h-14 bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 ${
                  isPlayingVideo4
                    ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                    : "opacity-100 scale-100 bg-[#FF4500] border-transparent"
                }`}
              >
                {isPlayingVideo4 ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>


          </div>

          {/* 8. ONE COLUMN ONLY -> FIGURE CARD (3.8x) + 3:4 IMAGE CARD (DAVID KIM) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card */}
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/4.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            {/* Bottom 3:4 Image Card (David Kim - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/8.png"
                alt="David Kim - E-commerce Founder"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

          {/* ================= CLONED SET FOR SEAMLESS INFINITE LOOP (SAME REEL -> 1 COLUMN PATTERN) ================= */}

          {/* 1 CLONE: 9:16 VIDEO REEL */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/1.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />


          </div>

          {/* 2 CLONE: 1 COLUMN ONLY ($500M+ & Ryan Mitchell) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/1.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/5.png"
                alt="Ryan Mitchell - Fitness & Coaching"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

          {/* 3 CLONE: 9:16 VIDEO REEL */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <video
              src="/herovod/2.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />


          </div>

          {/* 4 CLONE: 1 COLUMN ONLY (42M+ & Evan Brooks) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            <div className="relative h-[235px] sm:h-[245px] rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image src="/heroimg/2.png" alt="Hero image" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="/heroimg/6.png"
                alt="Evan Brooks - Content Creator"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

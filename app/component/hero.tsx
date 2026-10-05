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
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Featured Creators & Impact
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white/80 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm"
          >
            ←
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white/80 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-sm"
          >
            →
          </button>
        </div>
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
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80"
              alt="Noah Wilson - SaaS Consultant"
              fill
              sizes="300px"
              className={`object-cover transition-transform duration-700 ${
                isPlayingVideo1 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

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

            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              {isPlayingVideo1 && (
                <div className="flex items-end gap-1 mb-2.5">
                  <span className="w-1 bg-[#FF4500] animate-soundwave-1" />
                  <span className="w-1 bg-[#FF4500] animate-soundwave-2" />
                  <span className="w-1 bg-white animate-soundwave-3" />
                  <span className="w-1 bg-white animate-soundwave-4" />
                  <span className="text-[11px] text-white/80 font-mono ml-2">0:24 / 0:45</span>
                </div>
              )}

              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Noah Wilson
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                SaaS Consultant
              </p>

              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div
                  className={`h-full bg-[#FF4500] ${
                    isPlayingVideo1 ? "w-3/5 transition-all duration-1000" : "w-1/4"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 2. ONE COLUMN ONLY -> FIGURE CARD ($500M+) + 3:4 IMAGE CARD (RYAN MITCHELL) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card (Blue - Rounded None) */}
            <div className="relative h-[235px] sm:h-[245px] bg-[#0062FF] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  $500M+
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Creator revenue influenced by Castly email campaigns.
              </p>
            </div>

            {/* Bottom 3:4 Image Card (Ryan Mitchell - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Ryan Mitchell - Fitness & Coaching"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  Ryan Mitchell
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Fitness & Coaching
                </p>
              </div>
            </div>
          </div>

          {/* 3. 9:16 VIDEO REEL - AISHA GRANT */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80"
              alt="Aisha Grant - Podcaster"
              fill
              sizes="300px"
              className={`object-cover transition-transform duration-700 ${
                isPlayingVideo2 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

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

            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              {isPlayingVideo2 && (
                <div className="flex items-end gap-1 mb-2.5">
                  <span className="w-1 bg-[#FF4500] animate-soundwave-2" />
                  <span className="w-1 bg-[#FF4500] animate-soundwave-1" />
                  <span className="w-1 bg-white animate-soundwave-4" />
                  <span className="w-1 bg-white animate-soundwave-3" />
                  <span className="text-[11px] text-white/80 font-mono ml-2">0:18 / 0:32</span>
                </div>
              )}

              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Aisha Grant
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Podcaster & Host
              </p>

              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div
                  className={`h-full bg-[#FF4500] ${
                    isPlayingVideo2 ? "w-1/2 transition-all duration-1000" : "w-1/5"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 4. ONE COLUMN ONLY -> FIGURE CARD (42M+) + 3:4 IMAGE CARD (EVAN BROOKS) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card (Purple - Rounded None) */}
            <div className="relative h-[235px] sm:h-[245px] bg-[#6C5CE7] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  42M+
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Emails sent through Castly each month.
              </p>
            </div>

            {/* Bottom 3:4 Image Card (Evan Brooks - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
                alt="Evan Brooks - Content Creator"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  Evan Brooks
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Content Creator
                </p>
              </div>
            </div>
          </div>

          {/* 5. 9:16 VIDEO REEL - MARCUS VANCE */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80"
              alt="Marcus Vance - Agency Founder"
              fill
              sizes="300px"
              className={`object-cover transition-transform duration-700 ${
                isPlayingVideo3 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

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

            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              {isPlayingVideo3 && (
                <div className="flex items-end gap-1 mb-2.5">
                  <span className="w-1 bg-[#FF4500] animate-soundwave-3" />
                  <span className="w-1 bg-[#FF4500] animate-soundwave-1" />
                  <span className="w-1 bg-white animate-soundwave-2" />
                  <span className="w-1 bg-white animate-soundwave-4" />
                  <span className="text-[11px] text-white/80 font-mono ml-2">0:30 / 0:50</span>
                </div>
              )}

              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Marcus Vance
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Agency Founder
              </p>

              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div
                  className={`h-full bg-[#FF4500] ${
                    isPlayingVideo3 ? "w-4/5 transition-all duration-1000" : "w-1/3"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 6. ONE COLUMN ONLY -> FIGURE CARD (10M+) + 3:4 IMAGE CARD (SOPHIA CHEN) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card (Green - Rounded None) */}
            <div className="relative h-[235px] sm:h-[245px] bg-[#10B981] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  10M+
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Subscribers reached across active creator communities.
              </p>
            </div>

            {/* Bottom 3:4 Image Card (Sophia Chen - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80"
                alt="Sophia Chen - Creative Director"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  Sophia Chen
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Creative Director
                </p>
              </div>
            </div>
          </div>

          {/* 7. 9:16 VIDEO REEL - MAYA LIN */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=80"
              alt="Maya Lin - Digital Strategist"
              fill
              sizes="300px"
              className={`object-cover transition-transform duration-700 ${
                isPlayingVideo4 ? "scale-105" : "scale-100"
              } group-hover:scale-110`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 hover:text-white transition-colors"
              >
                {isMuted ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

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

            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              {isPlayingVideo4 && (
                <div className="flex items-end gap-1 mb-2.5">
                  <span className="w-1 bg-[#FF4500] animate-soundwave-1" />
                  <span className="w-1 bg-[#FF4500] animate-soundwave-4" />
                  <span className="w-1 bg-white animate-soundwave-2" />
                  <span className="w-1 bg-white animate-soundwave-3" />
                  <span className="text-[11px] text-white/80 font-mono ml-2">0:14 / 0:38</span>
                </div>
              )}

              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Maya Lin
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Digital Strategist
              </p>

              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div
                  className={`h-full bg-[#FF4500] ${
                    isPlayingVideo4 ? "w-2/5 transition-all duration-1000" : "w-1/6"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* 8. ONE COLUMN ONLY -> FIGURE CARD (3.8x) + 3:4 IMAGE CARD (DAVID KIM) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            {/* Top Figure Card (Orange - Rounded None) */}
            <div className="relative h-[235px] sm:h-[245px] bg-[#FF5A1F] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  3.8x
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Average click-to-purchase boost from smart automation.
              </p>
            </div>

            {/* Bottom 3:4 Image Card (David Kim - Rounded None) */}
            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80"
                alt="David Kim - E-commerce Founder"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  David Kim
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  E-commerce Founder
                </p>
              </div>
            </div>
          </div>

          {/* ================= CLONED SET FOR SEAMLESS INFINITE LOOP (SAME REEL -> 1 COLUMN PATTERN) ================= */}

          {/* 1 CLONE: 9:16 VIDEO REEL */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80"
              alt="Noah Wilson - SaaS Consultant"
              fill
              sizes="300px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Noah Wilson
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                SaaS Consultant
              </p>
              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div className="h-full bg-[#FF4500] w-3/5" />
              </div>
            </div>
          </div>

          {/* 2 CLONE: 1 COLUMN ONLY ($500M+ & Ryan Mitchell) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            <div className="relative h-[235px] sm:h-[245px] bg-[#0062FF] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  $500M+
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Creator revenue influenced by Castly email campaigns.
              </p>
            </div>

            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Ryan Mitchell - Fitness & Coaching"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  Ryan Mitchell
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Fitness & Coaching
                </p>
              </div>
            </div>
          </div>

          {/* 3 CLONE: 9:16 VIDEO REEL */}
          <div className="relative w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] rounded-none overflow-hidden flex-shrink-0 bg-slate-900 group cursor-pointer transition-transform duration-300">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80"
              alt="Aisha Grant - Podcaster"
              fill
              sizes="300px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                9:16 VIDEO
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 z-10 flex flex-col justify-end">
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                Aisha Grant
              </h3>
              <p className="text-white/80 text-xs sm:text-sm font-medium">
                Podcaster & Host
              </p>
              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden">
                <div className="h-full bg-[#FF4500] w-1/2" />
              </div>
            </div>
          </div>

          {/* 4 CLONE: 1 COLUMN ONLY (42M+ & Evan Brooks) */}
          <div className="w-[270px] sm:w-[290px] h-[500px] sm:h-[520px] flex flex-col gap-3.5 flex-shrink-0">
            <div className="relative h-[235px] sm:h-[245px] bg-[#6C5CE7] rounded-none p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden group cursor-pointer transition-transform duration-300">
              <div>
                <span className="text-4xl sm:text-[44px] font-extrabold tracking-tight leading-none block">
                  42M+
                </span>
              </div>
              <p className="text-white/95 text-sm sm:text-[15px] font-medium leading-snug mt-auto max-w-[210px]">
                Emails sent through Castly each month.
              </p>
            </div>

            <div className="relative flex-1 bg-slate-800 rounded-none overflow-hidden group cursor-pointer transition-transform duration-300">
              <Image
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
                alt="Evan Brooks - Content Creator"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                  Evan Brooks
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-medium">
                  Content Creator
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

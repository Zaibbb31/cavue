"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-10 sm:pt-14 md:pt-18 lg:pt-20 pb-12 sm:pb-16 md:pb-20 bg-[#F8FAFC] text-[#25282F] overflow-hidden select-none">
      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Top Pill Badge: AI-Driven Agency */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 sm:mb-6 transition-transform duration-300 cursor-default">
          <span className="text-base sm:text-xl font-gochi text-[#0C4568] tracking-wide">
            AI-Driven Agency
          </span>
        </div>

        {/* Main Headline Composition */}
        <h1 className="flex flex-col items-center justify-center text-center font-sans tracking-[-0.035em] text-[#23262F] font-medium leading-[1.08] max-w-5xl mx-auto">
          {/* Line 1: Your AI Sprint Team */}
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] block">
            Your AI Sprint Team
          </span>

          {/* Line 2: on Demand + Blue Capsule with 3 Floating Moving Logo Cards */}
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-5 md:gap-x-7 mt-1 sm:mt-2">
            <span>on Demand</span>

            {/* Blue Capsule Pill with 3 Animated Floating Logos */}
            <span className="relative inline-flex items-center justify-center align-middle my-2 sm:my-0">
              
              {/* Outer Capsule Shape */}
              <span className="relative z-10 w-28 sm:w-38 md:w-48 lg:w-56 h-10 sm:h-14 md:h-17 lg:h-20 bg-gradient-to-r from-[#0C4568] via-[#0E527C] to-[#125D8C] rounded-full inline-block shadow-[0_10px_25px_rgba(12,69,104,0.35)]" />

              {/* Glowing Blue Drop Halo */}
              <span className="absolute inset-0 bg-[#0C4568]/30 rounded-full blur-xl -z-10 scale-110" />

              {/* LOGO CARD 1 (Top-Left Green Icon) */}
              <span className="absolute -top-3 sm:-top-5 md:-top-7 -left-1 sm:-left-2 md:-left-3 z-30 animate-logo-card-1 transition-transform">
                <span className="flex items-center justify-center w-9 h-9 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white rounded-xl sm:rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.14)] border border-slate-100 p-1.5 sm:p-2.5 hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="w-full h-full text-[#10B981]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 6L38 14V34L24 42L10 34V14L24 6Z"
                      fill="#10B981"
                      fillOpacity="0.12"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 16L31 20V28L24 32L17 28V20L24 16Z"
                      fill="#10B981"
                    />
                  </svg>
                </span>
              </span>

              {/* LOGO CARD 2 (Right Purple/Indigo Icon) */}
              <span className="absolute top-1 sm:top-2 md:top-3 -right-4 sm:-right-6 md:-right-8 lg:-right-10 z-30 animate-logo-card-2 transition-transform">
                <span className="flex items-center justify-center w-9 h-9 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white rounded-xl sm:rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.14)] border border-slate-100 p-1.5 sm:p-2.5 hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="w-full h-full text-[#6366F1]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 10C12 8.89543 12.8954 8 14 8H26C27.1046 8 28 8.89543 28 10V22C28 23.1046 27.1046 24 26 24H14C12.8954 24 12 23.1046 12 22V10Z"
                      fill="#6366F1"
                    />
                    <path
                      d="M20 24C20 22.8954 20.8954 22 22 22H34C35.1046 22 36 22.8954 36 24V36C36 37.1046 35.1046 38 34 38H22C20.8954 38 20 37.1046 20 36V24Z"
                      fill="#4F46E5"
                      fillOpacity="0.8"
                    />
                  </svg>
                </span>
              </span>

              {/* LOGO CARD 3 (Bottom Sky Blue Icon) */}
              <span className="absolute -bottom-5 sm:-bottom-7 md:-bottom-9 lg:-bottom-11 left-6 sm:left-10 md:left-14 lg:left-16 z-30 animate-logo-card-3 transition-transform">
                <span className="flex items-center justify-center w-9 h-9 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white rounded-xl sm:rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.16)] border border-slate-100 p-1.5 sm:p-2.5 hover:scale-110 transition-transform duration-300">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="w-full h-full text-[#0284C7]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 14C14 11.7909 15.7909 10 18 10C20.2091 10 22 11.7909 22 14V22H14V14Z"
                      fill="#0284C7"
                    />
                    <path
                      d="M26 26C26 23.7909 27.7909 22 30 22C32.2091 22 34 23.7909 34 26V34C34 36.2091 32.2091 38 30 38C27.7909 38 26 36.2091 26 34V26Z"
                      fill="#0284C7"
                    />
                    <path
                      d="M14 26C14 23.7909 15.7909 22 18 22H26V30C26 32.2091 24.2091 34 22 34C19.7909 34 18 32.2091 18 30V26H14Z"
                      fill="#38BDF8"
                    />
                  </svg>
                </span>
              </span>

            </span>
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="mt-6 sm:mt-8 md:mt-9 text-sm sm:text-base md:text-[17px] text-[#5A5D66] max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-sans px-4">
          From discovery to deployment, we plug into your stack to prototype, validate, and launch AI experiences your users actually love.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 z-20">
          <Link
            href="/Service"
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#0C4568] hover:bg-[#083550] text-white font-medium text-sm sm:text-base shadow-[0_10px_25px_-5px_rgba(12,69,104,0.35)] hover:shadow-[0_14px_30px_-5px_rgba(12,69,104,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Services
          </Link>

          <Link
            href="/contact"
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#0C3852] border border-slate-200/90 hover:border-[#0C4568]/30 font-medium text-sm sm:text-base shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Pricing Plans
          </Link>
        </div>

      </div>
    </section>
  );
}

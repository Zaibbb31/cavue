import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFAFA] pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Giant CAVUE Background Wordmark */}
      <div className="w-full flex justify-center items-center pointer-events-none select-none overflow-hidden absolute top-0 sm:top-2 left-0 right-0 z-0">
        <span className="font-medium text-[#0C3852] tracking-tight text-[26vw] sm:text-[25vw] md:text-[24vw] lg:text-[340px] xl:text-[390px] leading-none uppercase opacity-95">
          CAVUE
        </span>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-24 md:pt-28">
        {/* Main Floating Glassmorphic White Card with Backdrop Blur */}
        <div className="bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] border border-white/60 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
          {/* Gochi Tag Badge */}
          <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider mb-2 sm:mb-3 block">
            / LET&apos;S CREATE
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#4B5563] tracking-tight leading-tight">
            Don’t just have a brand. <br />Make sure it gets seen.

          </h2>

          {/* Subtitle */}
          <p className="text-[#6B7280] text-sm sm:text-base md:text-[16px] leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
            It&apos;s short, memorable, and gives the agency a bit of personality
            without becoming too unprofessional.
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-b from-[#125883] via-[#0C4568] to-[#083550] text-white font-medium text-sm sm:text-base border-t border-white/25 border-b border-black/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_5px_rgba(0,0,0,0.45)] hover:opacity-95 transition-opacity mb-12 sm:mb-16"
          >
            Make Some Noise
          </Link>

          {/* Card Bottom Meta & Navigation Links */}
          <div className="w-full pt-6 sm:pt-8 border-t border-black/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#4B5563]">
            <div className="flex items-center gap-4 text-[#6B7280]">
              <a href="https://www.instagram.com/cavue.in/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#0C3852] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="mailto:Palak@cavue.in" aria-label="Email" className="hover:text-[#0C3852] transition-colors">
                <Mail size={20} strokeWidth={2} />
              </a>
              <a href="tel:9211544533" aria-label="Phone" className="hover:text-[#0C3852] transition-colors">
                <Phone size={20} strokeWidth={2} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 font-medium">
              <Link
                href="/"
                className="text-[#4B5563] hover:text-[#0C3852] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-[#4B5563] hover:text-[#0C3852] transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/Service"
                className="text-[#4B5563] hover:text-[#0C3852] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/projectpage"
                className="text-[#4B5563] hover:text-[#0C3852] transition-colors"
              >
                Work
              </Link>
              <Link
                href="/insights"
                className="text-[#4B5563] hover:text-[#0C3852] transition-colors"
              >
                Insights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

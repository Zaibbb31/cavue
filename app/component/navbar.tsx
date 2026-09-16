"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/Service" },
  { label: "Work", href: "/projectpage" },
  { label: "Insights", href: "/insights" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 flex justify-center transform-gpu transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "pt-3 sm:pt-4 px-4"
          : "pt-2.5 sm:pt-4 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto"
      }`}
    >
      {/* Floating Navbar Container with Ultra Smooth Width Shrink */}
      <nav
        className={`transform-gpu will-change-[max-width,width,padding,background-color,border-color,box-shadow] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "w-full max-w-[720px] lg:max-w-[760px] px-4 sm:px-6 md:px-7 py-1 rounded-none shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-md bg-white/[0.18] border border-white/40 text-[#0C3852]"
            : "w-full max-w-[1536px] px-4 sm:px-6 md:px-8 py-0.5 sm:py-1 rounded-none shadow-none bg-[#0C4568] border border-transparent text-white"
        }`}
      >
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-15">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="/whitelogo.svg"
                alt="Cavue Logo"
                width={120}
                height={40}
                className={`w-auto object-contain transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] ${
                  isScrolled
                    ? "h-6 sm:h-7 md:h-8 brightness-0"
                    : "h-7 sm:h-8 md:h-9"
                }`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div
            className={`hidden md:flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? "space-x-4 lg:space-x-6" : "space-x-6 lg:space-x-8"
            }`}
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-500 ease-out ${
                    isScrolled
                      ? "text-xs lg:text-[13.5px]"
                      : "text-sm lg:text-[15px]"
                  } font-normal ${
                    isActive
                      ? isScrolled
                        ? "text-[#2575A5] font-semibold"
                        : "text-[#3CA8D9] font-medium"
                      : isScrolled
                      ? "text-[#0C3852]/85 hover:text-[#2575A5]"
                      : "text-white/90 hover:text-[#3CA8D9]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Contact Us CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center font-medium text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none ${
                isScrolled
                  ? "px-4 py-1.5 text-xs sm:text-sm bg-gradient-to-r from-[#125883] to-[#0C4568] hover:from-[#0C4568] hover:to-[#083550] shadow-sm"
                  : "px-5 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-[#2575A5] to-[#3690C2] hover:from-[#1E648F] hover:to-[#2F7FA9]"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`p-2 rounded-none focus:outline-none transition-colors duration-500 ${
                isScrolled
                  ? "text-[#0C3852] hover:bg-black/5"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div
            className={`md:hidden border-t px-2 pt-3 pb-5 space-y-3 transition-all duration-500 ${
              isScrolled
                ? "border-black/10 bg-white/80 backdrop-blur-lg"
                : "border-white/15 bg-transparent"
            }`}
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-none transition-colors ${
                      isActive
                        ? isScrolled
                          ? "text-[#2575A5] bg-black/5 font-semibold"
                          : "text-[#3CA8D9] bg-white/10 font-semibold"
                        : isScrolled
                        ? "text-[#0C3852] hover:text-[#2575A5] hover:bg-black/5"
                        : "text-white/90 hover:text-[#3CA8D9] hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div
              className={`pt-2 border-t ${
                isScrolled ? "border-black/10" : "border-white/10"
              }`}
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-[#2575A5] to-[#3690C2] hover:from-[#1E648F] hover:to-[#2F7FA9] transition-all shadow-sm rounded-none"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

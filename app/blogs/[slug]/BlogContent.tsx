"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { BlogPost, BlogFAQ } from "@/lib/types/blog";
import {
  Calendar,
  Clock,
  Share2,
  Check,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  QrCode,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

interface BlogContentProps {
  blog: BlogPost;
}

interface TocItem {
  id: string;
  text: string;
  level: number; // 2 or 3
}

export default function BlogContent({ blog }: BlogContentProps) {
  const [activeTocId, setActiveTocId] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]); // first open by default
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Parse H2 and H3 headings from HTML content to build TOC
  const tocItems: TocItem[] = useMemo(() => {
    if (!blog?.description) return [];

    const items: TocItem[] = [];
    const regex = /<h([23])\s*([^>]*)>(.*?)<\/h\1>/gi;
    let match;

    while ((match = regex.exec(blog.description)) !== null) {
      const level = parseInt(match[1]);
      const rawText = match[3].replace(/<[^>]+>/g, "").trim();
      const existingIdMatch = match[2].match(/id=["']([^"']+)["']/i);

      const id = existingIdMatch
        ? existingIdMatch[1]
        : rawText
            .toLowerCase()
            .replace(/&/g, "-and-")
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");

      if (rawText && id) {
        items.push({ id, text: rawText, level });
      }
    }

    return items;
  }, [blog?.description]);

  // Inject anchor IDs into HTML headings for smooth navigation
  const processedContentHtml = useMemo(() => {
    if (!blog?.description) return "";

    return blog.description.replace(/<h([23])\s*([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
      const rawText = text.replace(/<[^>]+>/g, "").trim();
      const existingIdMatch = attrs.match(/id=["']([^"']+)["']/i);
      const id = existingIdMatch
        ? existingIdMatch[1]
        : rawText
            .toLowerCase()
            .replace(/&/g, "-and-")
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");

      // Ensure class attributes don't get lost
      return `<h${level} id="${id}" class="scroll-mt-28" ${attrs}>${text}</h${level}>`;
    });
  }, [blog?.description]);

  // Scroll-spy observer for Table of Contents with 200px top offset
  useEffect(() => {
    if (tocItems.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentActive = "";

      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (top <= scrollPosition) {
            currentActive = item.id;
          }
        }
      }

      if (currentActive) {
        setActiveTocId(currentActive);
      } else if (tocItems.length > 0) {
        setActiveTocId(tocItems[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  // Smooth scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTocId(id);
    }
  };

  // Toggle FAQ accordion item
  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Social share links
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Read "${blog.title}" by Cavue`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Header (Dark Navy Theme) */}
      <header className="w-full bg-[#0C3852] text-white pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2B7DA8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0C4568]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb / Top Category Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-gochi text-[#3CA8D9] text-base sm:text-lg tracking-wider">
              / INSIGHTS &amp; STRATEGIES
            </span>
            <span className="text-white/30">•</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 backdrop-blur-xs">
              {blog.category}
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-5xl leading-tight">
            {blog.title}
          </h1>

          {/* Subtitle / Deck */}
          {blog.subtitle && (
            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              {blog.subtitle}
            </p>
          )}

          {/* Author Details & CTA Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/15">
            <div className="flex items-center gap-3.5">
              {blog.authorAvatar ? (
                <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white/30 shrink-0">
                  <Image
                    src={blog.authorAvatar}
                    alt={blog.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#2B7DA8] text-white font-bold flex items-center justify-center shrink-0 text-base">
                  {blog.authorName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide">
                  {blog.authorName}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                  <span>{blog.authorRole || "Cavue Studio"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#3CA8D9]" />
                    {blog.publishDate || "Published recently"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3CA8D9]" />
                    {blog.readTime || "5 Min Read"}
                  </span>
                </div>
              </div>
            </div>

            {/* Book Consultation Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2B7DA8] hover:bg-[#3CA8D9] text-white font-bold text-sm tracking-wide shadow-lg shadow-black/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Mobile Horizontal TOC (Visible on < lg screens) */}
        {tocItems.length > 0 && (
          <div className="lg:hidden mb-8 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <span className="text-xs font-bold text-[#0C4568] uppercase tracking-wider block mb-2">
              Table of Contents
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {tocItems.map((item) => {
                const isActive = activeTocId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#0C4568] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Desktop Table of Contents (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-[#2B7DA8]" />
                <h2 className="text-xs font-bold text-[#0C4568] uppercase tracking-wider">
                  Table of Contents
                </h2>
              </div>

              {tocItems.length === 0 ? (
                <p className="text-xs text-slate-400">
                  Detailed article overview without section headings.
                </p>
              ) : (
                <nav className="space-y-1">
                  {tocItems.map((item) => {
                    const isActive = activeTocId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToHeading(item.id)}
                        className={`w-full text-left py-1.5 px-3 rounded-lg text-xs transition-all duration-150 cursor-pointer flex items-center justify-between group ${
                          isActive
                            ? "bg-blue-50/80 text-[#0C4568] font-bold border-l-2 border-[#2B7DA8]"
                            : "text-slate-600 hover:text-[#0C4568] hover:bg-slate-50 font-medium"
                        } ${item.level === 3 ? "pl-5 text-[11px]" : ""}`}
                      >
                        <span className="line-clamp-1">{item.text}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2B7DA8] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>

            {/* Quick Share Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-[#0C4568] uppercase tracking-wider block">
                Share Article
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0C4568] text-slate-600 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0C4568] text-slate-600 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Twitter/X
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Copy link to clipboard"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0C4568] text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </aside>

          {/* Middle Column: Main Article Body & FAQs (6 cols) */}
          <article className="lg:col-span-6 space-y-10">
            {/* Hero Cover Image Banner */}
            {blog.coverImage && (
              <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            {/* Prose Content */}
            <div
              ref={contentContainerRef}
              className="prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed selection:bg-[#3CA8D9]/20"
              dangerouslySetInnerHTML={{ __html: processedContentHtml }}
            />

            {/* Social Share Bar */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#2B7DA8]" />
                <span className="text-xs sm:text-sm font-bold text-[#0C4568]">
                  Share this insight with your network:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={shareOnLinkedIn}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0C4568] hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  LinkedIn
                </button>
                <button
                  type="button"
                  onClick={shareOnTwitter}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0C4568] hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Twitter / X
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <span>Copy Link</span>
                  )}
                </button>
              </div>
            </div>

            {/* FAQ Accordion (If FAQs attached) */}
            {blog.faqs && blog.faqs.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <span className="font-gochi text-[#2B7DA8] text-base tracking-wider block">
                    / FREQUENTLY ASKED QUESTIONS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0C3852]">
                    Answers &amp; Technical Clarifications
                  </h2>
                </div>

                <div className="space-y-3">
                  {blog.faqs.map((faq, index) => {
                    const isOpen = openFaqIndices.includes(index);
                    return (
                      <div
                        key={faq.id || index}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className="text-sm sm:text-base font-bold text-[#0C4568]">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#2B7DA8] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Verified Client Reviews (If attached) */}
            {blog.reviews && blog.reviews.length > 0 && (
              <section className="space-y-4 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <span className="font-gochi text-[#2B7DA8] text-base tracking-wider block">
                    / CLIENT EXPERIENCES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0C3852]">
                    What Teams Say About Cavue
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {blog.reviews.map((rev, index) => (
                    <div
                      key={rev.id || index}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                        &quot;{rev.review}&quot;
                      </p>
                      <div className="pt-2 border-t border-slate-100 text-xs font-bold text-[#0C4568]">
                        {rev.clientName}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Right Column: Sticky Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28 self-start">
            {/* Author Profile Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <span className="text-[11px] font-bold text-[#0C4568] uppercase tracking-wider block">
                Written By
              </span>

              <div className="flex items-center gap-3">
                {blog.authorAvatar ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                    <Image
                      src={blog.authorAvatar}
                      alt={blog.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0C4568] font-bold text-sm flex items-center justify-center shrink-0">
                    {blog.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-bold text-[#0C4568]">{blog.authorName}</h3>
                  <p className="text-xs text-slate-500">{blog.authorRole || "Creative Studio"}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Contributing high-impact digital perspectives, modern engineering approaches, and design strategy for high-growth brands.
              </p>
            </div>

            {/* Cavue Studio Bio Card */}
            <div className="bg-[#0C3852] text-white rounded-2xl p-6 shadow-md space-y-4 relative overflow-hidden">
              <span className="font-anton text-2xl tracking-wider uppercase block text-[#3CA8D9]">
                CAVUE STUDIO
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                We craft high-velocity digital experiences, bespoke web applications, and bold brand identities that convert.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#3CA8D9] transition-colors"
              >
                <span>Learn About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Contact / QR Code Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs text-center space-y-3">
              <div className="w-28 h-28 mx-auto bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://cavue.co/contact`}
                  alt="Cavue Contact QR Code"
                  width={100}
                  height={100}
                  className="rounded-lg"
                  unoptimized
                />
              </div>
              <h4 className="text-xs font-bold text-[#0C4568] uppercase tracking-wider">
                Instant Consultation
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Scan with your smartphone to immediately reach our strategy team.
              </p>
              <Link
                href="/contact"
                className="block w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0C4568] text-xs font-bold transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

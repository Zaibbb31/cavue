"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../component/navbar";
import TestimonialSection from "../../component/testimonial";
import Footer from "../../component/footer";
import { getBlogBySlug } from "@/lib/services/blogsService";
import { BlogPost } from "@/lib/types/blog";
import { calculateReadTime } from "@/lib/seo-utils";
import { Loader2, Copy, Check, ChevronDown, Star, ArrowLeft } from "lucide-react";

interface StaticBlogPostData {
  slug: string;
  date: string;
  title: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  heroImage: string;
  sections: {
    heading: string;
    body: string;
  }[];
}

const blogsDatabase: Record<string, StaticBlogPostData> = {
  "7-content-ideas-that-always-perform-widely": {
    slug: "7-content-ideas-that-always-perform-widely",
    date: "/ Nov 12, 2026",
    title: "7 Content Ideas That Always Perform Widely",
    readTime: "5 Min Read",
    author: {
      name: "User Admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    heroImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=85",
    sections: [
      {
        heading: "Introduction",
        body: "Pixel Flow is an interactive web experience designed to engage users through motion, responsive design, and immersive visuals. The project transformed a standard website into a dynamic playground where every click, scroll, and animation tells a story.",
      },
      {
        heading: "High-Converting Formats",
        body: "Modular storytelling and concise video formats enable brands to communicate high-density value propositions quickly without losing viewer retention.",
      },
    ],
  },
  "why-short-form-video-still-wins": {
    slug: "why-short-form-video-still-wins",
    date: "/ Mar 18, 2026",
    title: "Why Short-Form Video Still Wins",
    readTime: "4 Min Read",
    author: {
      name: "Maya Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=85",
    sections: [
      {
        heading: "Introduction",
        body: "Short-form video is no longer just a trend—it is the foundational language of modern internet discovery. Consumers don't browse static feeds; they experience dynamic cultural narratives through movement, sound, and genuine human presence.",
      },
      {
        heading: "Hook Architecture & 3-Second Retention",
        body: "The battle for consumer attention is decided within the first three seconds. Successful brands engineer immediate visual curiosity, asking unexpected questions or presenting jarring juxtapositions that stop the infinite thumb scroll.",
      },
      {
        heading: "Scaling Creative Output Without Burnout",
        body: "By developing repeatable modular content systems and repurposing high-performing audio hooks, brands can scale weekly output without sacrificing visual quality or brand integrity.",
      },
    ],
  },
};

export default function BlogSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

  const [dynamicBlog, setDynamicBlog] = useState<BlogPost | null>(null);
  const [staticBlog, setStaticBlog] = useState<StaticBlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    async function loadPost() {
      if (!slugParam) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Try to fetch dynamic blog from Firestore
        const liveBlog = await getBlogBySlug(slugParam);
        if (liveBlog) {
          setDynamicBlog(liveBlog);
        } else if (blogsDatabase[slugParam]) {
          // 2. Fall back to static mock database if available
          setStaticBlog(blogsDatabase[slugParam]);
        }
      } catch (err) {
        console.error("Error loading blog details from Firestore:", err);
        if (blogsDatabase[slugParam]) {
          setStaticBlog(blogsDatabase[slugParam]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slugParam]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#0C4568]" />
          <span className="text-sm font-medium">Loading insight article...</span>
        </div>
        <Footer />
      </div>
    );
  }

  // 2. Not Found State
  if (!dynamicBlog && !staticBlog) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
          <span className="font-gochi text-2xl text-[#2B7DA8] mb-2">/ 404 NOT FOUND</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0C3852] mb-4">Article Not Found</h1>
          <p className="text-slate-500 max-w-md mb-8">
            The article you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C4568] text-white rounded-none font-medium hover:bg-[#0C3852] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // 3. Render Dynamic Firestore Blog
  if (dynamicBlog) {
    const formattedDate = dynamicBlog.publishDate ? `/ ${dynamicBlog.publishDate}` : "/ Recent";
    const readTime = dynamicBlog.readTime || calculateReadTime(dynamicBlog.description || "");
    const coverImg =
      dynamicBlog.coverImage ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=85";

    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
        <Navbar />

        <main className="w-full pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Date & Category Bar */}
            <div className="text-center mb-3 flex items-center justify-center gap-3">
              <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider">
                {formattedDate}
              </span>
              <span className="text-slate-300">•</span>
              <span className="px-3 py-0.5 text-xs font-bold uppercase tracking-wider bg-[#0C4568] text-white">
                {dynamicBlog.category}
              </span>
            </div>

            {/* Centered Blog Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium text-[#0C3852] text-center tracking-tight leading-[1.12] max-w-4xl mx-auto mb-10 sm:mb-14">
              {dynamicBlog.title}
            </h1>

            {/* Full-Width Hero Media Card */}
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EBF0F5] border border-black/[0.04] shadow-sm relative overflow-hidden mb-12 sm:mb-16 rounded-none">
              <Image
                src={coverImg}
                alt={dynamicBlog.title}
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* 2-Column Article Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
              {/* Left Column: Author & Share Sidebar */}
              <aside className="lg:col-span-4 flex flex-col space-y-8 sticky top-24">
                {/* Author & Read Time */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-black/[0.08] shadow-sm bg-slate-100 flex items-center justify-center font-bold text-[#0C4568]">
                    {dynamicBlog.authorAvatar ? (
                      <Image
                        src={dynamicBlog.authorAvatar}
                        alt={dynamicBlog.authorName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <span>{dynamicBlog.authorName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#0C3852]">
                      {dynamicBlog.authorName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
                      <span className="text-xs text-[#6B899E] font-medium">
                        {readTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share This Section */}
                <div className="pt-6 border-t border-black/[0.06]">
                  <h4 className="font-bold text-lg sm:text-xl text-[#0C3852] mb-5">
                    Share This
                  </h4>

                  <div className="flex flex-col divide-y divide-black/[0.06] border-y border-black/[0.06]">
                    {/* Copy Link */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center justify-between py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </div>
                        <span>{copied ? "Link Copied!" : "Copy Article Link"}</span>
                      </div>
                    </button>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        typeof window !== "undefined" ? window.location.href : ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group"
                    >
                      <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                        </svg>
                      </div>
                      <span>LinkedIn</span>
                    </a>

                    {/* Twitter / X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        dynamicBlog.title
                      )}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3.5 py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group"
                    >
                      <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <span>Twitter</span>
                    </a>
                  </div>
                </div>

                {/* Back to Insights button */}
                <div className="pt-2">
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0C4568] hover:text-[#2B7DA8] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> All Insights Articles
                  </Link>
                </div>
              </aside>

              {/* Right Column: Dynamic Article Content */}
              <article className="lg:col-span-8 space-y-8">
                {/* Subtitle / Key Takeaway */}
                {dynamicBlog.subtitle && (
                  <div className="p-6 bg-blue-50/70 border-l-4 border-[#0C4568] text-base sm:text-lg text-[#0C3852] font-medium leading-relaxed">
                    {dynamicBlog.subtitle}
                  </div>
                )}

                {/* Rich TipTap HTML Body */}
                <div
                  className="prose prose-lg max-w-none text-[#476B82] leading-relaxed
                    prose-headings:font-bold prose-headings:text-[#0C3852] prose-headings:tracking-tight
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-[#476B82] prose-p:my-4 prose-p:text-base sm:prose-p:text-[17px] prose-p:leading-relaxed
                    prose-a:text-[#2B7DA8] hover:prose-a:underline
                    prose-blockquote:border-l-4 prose-blockquote:border-[#2B7DA8] prose-blockquote:pl-4 prose-blockquote:italic
                    prose-img:rounded-xl prose-img:shadow-sm"
                  dangerouslySetInnerHTML={{ __html: dynamicBlog.description }}
                />

                {/* Dynamic FAQs Section */}
                {dynamicBlog.faqs && dynamicBlog.faqs.length > 0 && (
                  <div className="pt-10 border-t border-black/[0.08] mt-12 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0C3852] mb-6">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {dynamicBlog.faqs.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                          <div
                            key={faq.id || idx}
                            className="border border-slate-200 bg-white overflow-hidden transition-all duration-200"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                              className="w-full p-5 text-left font-bold text-[#0C3852] text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                              <span>{faq.question}</span>
                              <ChevronDown
                                className={`w-5 h-5 text-[#2B7DA8] transition-transform duration-200 shrink-0 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dynamic Client Testimonials / Reviews Section */}
                {dynamicBlog.reviews && dynamicBlog.reviews.length > 0 && (
                  <div className="pt-10 border-t border-black/[0.08] mt-12 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0C3852] mb-6">
                      Client Feedback &amp; Reviews
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dynamicBlog.reviews.map((rev, idx) => (
                        <div
                          key={rev.id || idx}
                          className="p-5 bg-white border border-slate-200 rounded-none shadow-2xs space-y-3"
                        >
                          <div className="flex items-center gap-1 text-amber-400">
                            {Array.from({ length: rev.rating || 5 }).map((_, starIdx) => (
                              <Star key={starIdx} className="w-4 h-4 fill-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 italic">
                            &ldquo;{rev.review}&rdquo;
                          </p>
                          <span className="text-xs font-bold text-[#0C3852] block">
                            — {rev.clientName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </main>

        <TestimonialSection />
        <Footer />
      </div>
    );
  }

  // 4. Render Static Fallback Post (if dynamic was not found in Firestore)
  const post = staticBlog!;
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      <Navbar />

      <main className="w-full pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3">
            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider">
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium text-[#0C3852] text-center tracking-tight leading-[1.12] max-w-3xl mx-auto mb-10 sm:mb-14">
            {post.title}
          </h1>

          <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EBF0F5] border border-black/[0.04] shadow-sm relative overflow-hidden mb-12 sm:mb-16 rounded-none">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              unoptimized
              className="object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            <aside className="lg:col-span-4 flex flex-col space-y-8 sticky top-24">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-black/[0.08] shadow-sm">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0C3852]">
                    {post.author.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block" />
                    <span className="text-xs text-[#6B899E] font-medium">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/[0.06]">
                <h4 className="font-bold text-lg sm:text-xl text-[#0C3852] mb-5">
                  Share This
                </h4>

                <div className="flex flex-col divide-y divide-black/[0.06] border-y border-black/[0.06]">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group"
                  >
                    <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                      </svg>
                    </div>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group"
                  >
                    <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </aside>

            <article className="lg:col-span-8 space-y-10 sm:space-y-12">
              {post.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#0C3852] tracking-tight leading-tight">
                    {section.heading}
                  </h2>
                  <p className="text-sm sm:text-base md:text-[17px] text-[#476B82] leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </article>
          </div>
        </div>
      </main>

      <TestimonialSection />
      <Footer />
    </div>
  );
}

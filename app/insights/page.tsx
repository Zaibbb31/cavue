"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/navbar";
import FAQSection from "../component/faq";
import Footer from "../component/footer";
import { getBlogs } from "@/lib/services/blogsService";
import { stripHtml } from "@/lib/seo-utils";
import { Loader2, HelpCircle, Star } from "lucide-react";

interface InsightArticle {
  id: string | number;
  slug: string;
  category: string;
  categoryBg: string;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  featured?: boolean;
  faqCount?: number;
  reviewCount?: number;
}

const CATEGORY_BG_MAP: Record<string, string> = {
  strategy: "bg-[#F472B6] text-[#111827]",
  "influencer marketing": "bg-[#A28CFF] text-[#111827]",
  "social media": "bg-[#F9A048] text-[#111827]",
  branding: "bg-[#86EFAC] text-[#111827]",
  "ai & creative": "bg-[#93C5FD] text-[#111827]",
  performance: "bg-[#FDE047] text-[#111827]",
  "web development": "bg-[#38BDF8] text-[#111827]",
  "ui/ux design": "bg-[#C084FC] text-[#111827]",
  "seo & performance": "bg-[#34D399] text-[#111827]",
  insights: "bg-[#F472B6] text-[#111827]",
  creative: "bg-[#F43F5E] text-white",
};

function getCategoryBg(cat: string): string {
  const key = cat.toLowerCase().trim();
  return CATEGORY_BG_MAP[key] || "bg-[#A28CFF] text-[#111827]";
}

const fallbackFeaturedArticle: InsightArticle = {
  id: "fallback-1",
  slug: "why-short-form-video-still-wins",
  category: "Strategy",
  categoryBg: "bg-[#F472B6] text-[#111827]",
  title: "Why Short-Form Video Still Wins",
  excerpt: "The highest-return format for modern brands.",
  date: "Mar 18, 2026",
  author: {
    name: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80",
  featured: true,
};

const fallbackArticles: InsightArticle[] = [
  {
    id: "fallback-2",
    slug: "brief-creators-without-losing-authenticity",
    category: "Influencer Marketing",
    categoryBg: "bg-[#A28CFF] text-[#111827]",
    title: "Brief Creators Without Losing Authenticity",
    excerpt: "Create authentic content without over-directing creators..",
    date: "Mar 12, 2026",
    author: {
      name: "Noah Carter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fallback-3",
    slug: "building-50k-tiktok-followers-fast",
    category: "Social Media",
    categoryBg: "bg-[#F9A048] text-[#111827]",
    title: "Building 50K TikTok Followers Fast",
    excerpt: "The strategy behind rapid audience growth.",
    date: "Feb 20, 2026",
    author: {
      name: "Sophia Bennett",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fallback-4",
    slug: "death-of-generic-brand-aesthetics",
    category: "Branding",
    categoryBg: "bg-[#86EFAC] text-[#111827]",
    title: "The Death of Generic Brand Aesthetics",
    excerpt: "Why weird, distinctive brand personalities command 4x higher recall.",
    date: "Feb 14, 2026",
    author: {
      name: "Maya Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fallback-5",
    slug: "how-ai-video-pipelines-lower-cac",
    category: "AI & Creative",
    categoryBg: "bg-[#93C5FD] text-[#111827]",
    title: "How AI Video Pipelines Lower CAC by 60%",
    excerpt: "Scaling 50+ hyper-targeted creative variants every single week.",
    date: "Feb 08, 2026",
    author: {
      name: "Noah Carter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fallback-6",
    slug: "the-2026-paid-performance-playbook",
    category: "Performance",
    categoryBg: "bg-[#FDE047] text-[#111827]",
    title: "The 2026 Paid Performance Playbook",
    excerpt: "Meta Advantage+ vs TikTok Spark Ads: where media budgets actually convert.",
    date: "Jan 29, 2026",
    author: {
      name: "Sophia Bennett",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80",
  },
  {
    id: "fallback-7",
    slug: "founder-led-marketing-engine",
    category: "Strategy",
    categoryBg: "bg-[#F472B6] text-[#111827]",
    title: "The Founder-Led Marketing Engine",
    excerpt: "Transforming leadership presence into high-velocity customer acquisition.",
    date: "Jan 19, 2026",
    author: {
      name: "Maya Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
  },
];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [articlesList, setArticlesList] = useState<InsightArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await getBlogs({ sortBy: "newest" });
        if (res.blogs && res.blogs.length > 0) {
          const mapped: InsightArticle[] = res.blogs.map((b) => {
            const rawExcerpt = b.subtitle || stripHtml(b.description || "");
            const excerpt = rawExcerpt.length > 150 ? rawExcerpt.substring(0, 150) + "..." : rawExcerpt;

            return {
              id: b.id || b.slug,
              slug: b.slug,
              category: b.category || "Web Development",
              categoryBg: getCategoryBg(b.category || "Web Development"),
              title: b.title,
              excerpt: excerpt || "Read article on Cavue Studio.",
              date: b.publishDate || "Recent",
              author: {
                name: b.authorName || "Cavue Studio",
                avatar:
                  b.authorAvatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
              },
              image:
                b.coverImage ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80",
              featured: !!b.featured,
              faqCount: b.faqCount || 0,
              reviewCount: b.reviewCount || 0,
            };
          });
          setArticlesList(mapped);
        } else {
          // Fallback to static articles if Firestore is currently empty
          setArticlesList([fallbackFeaturedArticle, ...fallbackArticles]);
        }
      } catch (err) {
        console.error("Error loading insights articles from Firestore:", err);
        setArticlesList([fallbackFeaturedArticle, ...fallbackArticles]);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  // Compute dynamic categories from loaded articles
  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    articlesList.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [articlesList]);

  // Filtered by selected category
  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articlesList;
    return articlesList.filter(
      (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [articlesList, activeCategory]);

  // Featured article: the first one marked featured, or the first article in filtered list
  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null;
    return filteredArticles.find((item) => item.featured) || filteredArticles[0];
  }, [filteredArticles]);

  // Remaining articles
  const remainingArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return filteredArticles.filter((item) => item.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-28">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Centered Header with Gochi cursive tag */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-gochi text-3xl sm:text-4xl text-[#A28CFF] block mb-2 tracking-wide">
              Insights
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-[#111827] tracking-tight leading-[1.12]">
              Strategy, content, and <br className="hidden sm:inline" />
              growth straight from us.
            </h1>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12 sm:mb-16 pb-2">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
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

          {/* Loading Indicator */}
          {loading ? (
            <div className="py-24 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0C4568]" />
              <span className="text-sm">Loading latest articles...</span>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-16 text-center bg-white border border-black/[0.05] p-12 max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-[#0C3852]">No articles found</h3>
              <p className="text-sm text-slate-500 mt-2">
                There are currently no articles published under &quot;{activeCategory}&quot;.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="mt-6 px-5 py-2.5 bg-[#0C4568] text-white text-xs sm:text-sm font-medium hover:bg-[#0C3852] transition-colors cursor-pointer"
              >
                View All Articles
              </button>
            </div>
          ) : (
            /* Articles Section */
            <div className="max-w-8xl mx-auto space-y-8 sm:space-y-10">
              {/* Featured Hero Article Row */}
              {featuredArticle && (
                <Link
                  href={`/insights/${featuredArticle.slug}`}
                  className="flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch group cursor-pointer w-full min-h-[440px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px]"
                >
                  {/* Left: 70% Width Featured Image Box with Tag */}
                  <div className="relative w-full md:w-[70%] min-h-[320px] md:min-h-full overflow-hidden bg-[#EAEFF4] border border-black/[0.04] shadow-sm rounded-none">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      priority
                      unoptimized
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-block px-3.5 py-1 text-xs font-semibold shadow-sm rounded-none ${featuredArticle.categoryBg}`}
                      >
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: 30% Width Featured White Card */}
                  <div className="w-full md:w-[30%] bg-white p-7 sm:p-9 md:p-10 border border-black/[0.04] shadow-sm rounded-none flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#6B899E] font-medium block mb-4">
                        {featuredArticle.date}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight leading-snug mb-3 group-hover:text-[#0C4568] transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Attached FAQs & Reviews */}
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {featuredArticle.faqCount ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                            {featuredArticle.faqCount} FAQs Included
                          </span>
                        ) : null}
                        {featuredArticle.reviewCount ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            {featuredArticle.reviewCount} Client Reviews
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* Author Meta */}
                    <div className="flex items-center gap-2.5 pt-6 mt-6 border-t border-black/[0.04]">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-[#111827]">
                        <span className="font-normal text-[#6B7280]">By </span>
                        {featuredArticle.author.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* 2-Columns Grid of Remaining Articles */}
              {remainingArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                  {remainingArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/insights/${article.slug}`}
                      className="flex flex-col group cursor-pointer"
                    >
                      {/* Image Container with Top-Left Category Tag */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-[#EAEFF4] border border-black/[0.04] shadow-sm rounded-none mb-3">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          unoptimized
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Category Tag on Top-Left */}
                        <div className="absolute top-3.5 left-3.5 z-10">
                          <span
                            className={`inline-block px-3.5 py-1 text-xs font-semibold shadow-sm rounded-none ${article.categoryBg}`}
                          >
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Bottom White Info Box */}
                      <div className="bg-white p-5 sm:p-6 md:p-7 border border-black/[0.04] shadow-sm rounded-none flex flex-col justify-between flex-1">
                        <div>
                          {/* Author & Date Top Row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src={article.author.avatar}
                                  alt={article.author.name}
                                  fill
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-xs font-semibold text-[#111827]">
                                <span className="font-normal text-[#6B7280]">By </span>
                                {article.author.name}
                              </span>
                            </div>
                            <span className="text-xs text-[#6B899E] font-medium">
                              {article.date}
                            </span>
                          </div>

                          {/* Article Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight leading-snug mb-2 group-hover:text-[#0C4568] transition-colors">
                            {article.title}
                          </h3>

                          {/* Article Excerpt */}
                          <p className="text-xs sm:text-[13.5px] text-[#6B7280] leading-relaxed">
                            {article.excerpt}
                          </p>

                          {/* Attached FAQs & Reviews */}
                          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-black/[0.04]">
                            {article.faqCount ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                <HelpCircle className="w-3 h-3 text-emerald-600" />
                                {article.faqCount} FAQs
                              </span>
                            ) : null}
                            {article.reviewCount ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                {article.reviewCount} Reviews
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

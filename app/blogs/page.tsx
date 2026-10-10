"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../component/navbar";
import FAQSection from "../component/faq";
import Footer from "../component/footer";
import { BlogPost } from "@/lib/types/blog";
import { getBlogs } from "@/lib/services/blogsService";
import { stripHtml, calculateReadTime } from "@/lib/seo-utils";
import { ArrowUpRight, Clock, Calendar, Sparkles, Loader2, BookOpen, HelpCircle, Star } from "lucide-react";

const CATEGORIES = [
  "All",
  "Influencer Marketing",
  "Social Media",
  "Branding",
  "AI & Creative",
  "Web Development",
  "UI/UX Design",
  "SEO & Performance",
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const blogsSectionRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);

    if (blogsSectionRef.current) {
      const yOffset = -90; // offset for sticky floating navbar
      const y =
        blogsSectionRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await getBlogs({ sortBy: "newest" });
        setBlogs(res.blogs);
      } catch (err) {
        console.error("Error loading public blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter by category
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter(
      (b) => b.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [blogs, activeCategory]);

  // Featured post: first featured post, or first post overall
  const featuredBlog = useMemo(() => {
    if (filteredBlogs.length === 0) return null;
    return filteredBlogs.find((b) => b.featured) || filteredBlogs[0];
  }, [filteredBlogs]);

  // Remaining posts (excluding featured)
  const remainingBlogs = useMemo(() => {
    if (!featuredBlog) return [];
    return filteredBlogs.filter((b) => b.id !== featuredBlog.id);
  }, [filteredBlogs, featuredBlog]);

  // Pagination on remaining posts
  const totalPages = Math.ceil(remainingBlogs.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return remainingBlogs.slice(start, start + itemsPerPage);
  }, [remainingBlogs, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="font-gochi text-[#2B7DA8] text-lg sm:text-xl tracking-wider block">
              / CURATED KNOWLEDGE &amp; ARTICLES
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-[76px] uppercase tracking-tight text-[#0C3852] leading-[1.05]">
              IDEAS THAT DRIVE DIGITAL EXPERIENCES
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
              Explore strategic deep-dives, modern web architecture guides, and UI/UX case studies curated by the Cavue studio team.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div
            ref={blogsSectionRef}
            id="blogs-section"
            className="w-full -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 overflow-x-auto no-scrollbar scroll-smooth"
          >
            <div className="flex items-center justify-start md:justify-center gap-2 min-w-max pb-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={(e) => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                      e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none ${isActive
                      ? "bg-[#0C4568] text-white shadow-md shadow-[#0C4568]/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-[#0C4568]"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="py-24 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0C4568]" />
              <span className="text-sm">Loading articles...</span>
            </div>
          ) : filteredBlogs.length === 0 ? (
            /* Empty state */
            <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl p-12 max-w-xl mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0C4568] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#0C3852]">No articles found</h3>
              <p className="text-sm text-slate-500 mt-2">
                {activeCategory === "All"
                  ? "There are no published articles at the moment. Please check back soon!"
                  : `There are no published articles under "${activeCategory}" at the moment.`}
              </p>
              {activeCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All");
                    setCurrentPage(1);
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0C4568] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#0C3852] transition-colors cursor-pointer"
                >
                  View All Articles
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-16">
              {/* Featured Post Card (Page 1 only) */}
              {featuredBlog && currentPage === 1 && (
                <div className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                    {/* Image Column */}
                    <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-slate-100">
                      {featuredBlog.coverImage ? (
                        <Image
                          src={featuredBlog.coverImage}
                          alt={featuredBlog.title}
                          fill
                          priority
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#0C3852] to-[#2B7DA8] flex items-center justify-center">
                          <span className="font-anton text-4xl text-white/30 uppercase">Cavue</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#0C4568] shadow-sm backdrop-blur-xs">
                          {featuredBlog.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2B7DA8] text-white shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Featured
                        </span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#2B7DA8]" />
                            {featuredBlog.publishDate || "Recent"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#2B7DA8]" />
                            {featuredBlog.readTime || calculateReadTime(featuredBlog.description)}
                          </span>
                        </div>

                        <Link href={`/blogs/${featuredBlog.slug}`}>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C3852] group-hover:text-[#2B7DA8] transition-colors leading-tight">
                            {featuredBlog.title}
                          </h2>
                        </Link>

                        <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed">
                          {featuredBlog.subtitle || stripHtml(featuredBlog.description)}
                        </p>

                        {/* FAQs & Client Reviews Badges */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {featuredBlog.faqCount ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                              {featuredBlog.faqCount} FAQs Included
                            </span>
                          ) : null}
                          {featuredBlog.reviewCount ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                              {featuredBlog.reviewCount} Client Reviews
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {featuredBlog.authorAvatar ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200">
                              <Image
                                src={featuredBlog.authorAvatar}
                                alt={featuredBlog.authorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0C4568] font-bold text-xs flex items-center justify-center border border-slate-200">
                              {featuredBlog.authorName.charAt(0)}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-bold text-[#0C3852]">
                              {featuredBlog.authorName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {featuredBlog.authorRole || "Cavue Studio"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/blogs/${featuredBlog.slug}`}
                          className="w-10 h-10 rounded-full bg-[#0C4568] group-hover:bg-[#2B7DA8] text-white flex items-center justify-center transition-colors shadow-sm"
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3-Column Grid for Remaining Articles */}
              {paginatedPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedPosts.map((post) => {
                    const excerpt = post.subtitle || stripHtml(post.description);
                    const readTime = post.readTime || calculateReadTime(post.description);

                    return (
                      <article
                        key={post.id || post.slug}
                        className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Thumbnail */}
                          <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                            {post.coverImage ? (
                              <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-linear-to-tr from-[#0C3852] to-[#2B7DA8]/80 flex items-center justify-center">
                                <span className="font-anton text-2xl text-white/30 uppercase">
                                  {post.category}
                                </span>
                              </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0C4568] shadow-2xs">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 sm:p-6 space-y-3">
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span>{post.publishDate || "Recent"}</span>
                              <span>•</span>
                              <span>{readTime}</span>
                            </div>

                            <Link href={`/blogs/${post.slug}`}>
                              <h3 className="text-lg sm:text-xl font-bold text-[#0C3852] group-hover:text-[#2B7DA8] transition-colors leading-snug line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>

                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                              {excerpt}
                            </p>

                            {/* FAQs & Client Reviews Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {post.faqCount ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                  <HelpCircle className="w-3 h-3 text-emerald-600" />
                                  {post.faqCount} FAQs
                                </span>
                              ) : null}
                              {post.reviewCount ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                  {post.reviewCount} Reviews
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-5 sm:p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-2.5">
                            {post.authorAvatar ? (
                              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200">
                                <Image
                                  src={post.authorAvatar}
                                  alt={post.authorName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0C4568] font-bold text-xs flex items-center justify-center">
                                {post.authorName.charAt(0)}
                              </div>
                            )}
                            <span className="text-xs font-semibold text-slate-700">
                              {post.authorName}
                            </span>
                          </div>

                          <Link
                            href={`/blogs/${post.slug}`}
                            className="p-2 rounded-full bg-slate-50 group-hover:bg-[#0C4568] group-hover:text-white text-[#0C4568] transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Pagination for Remaining Articles */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0C4568] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => handlePageChange(pg)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${pg === currentPage
                        ? "bg-[#0C4568] text-white shadow-2xs"
                        : "bg-white border border-slate-200 text-[#0C4568] hover:bg-blue-50"
                        }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#0C4568] hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Quick Answers / FAQs Section */}
      <FAQSection paddingClassName="pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-28" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

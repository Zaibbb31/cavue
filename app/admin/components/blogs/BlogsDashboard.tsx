"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  BookmarkCheck,
  HelpCircle,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Edit3,
  Trash2,
  ExternalLink,
  ChevronDown,
  RotateCw,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import BlogForm from "./BlogForm";
import { BlogPost, BlogStats } from "@/lib/types/blog";
import {
  getBlogs,
  getBlogStats,
  getBlogById,
  deleteBlog,
} from "@/lib/services/blogsService";

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

export default function BlogsDashboard() {
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<BlogStats>({
    totalBlogs: 0,
    tocEnriched: 0,
    faqsEmbedded: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dropdown UI states
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);

  // Deletion modal
  const [blogToDelete, setBlogToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch blogs & stats
  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const [blogsRes, statsRes] = await Promise.all([
        getBlogs({ sortBy }),
        getBlogStats(),
      ]);
      setBlogs(blogsRes.blogs);
      setStats(statsRes);
    } catch (err) {
      console.error("Failed to load blogs data:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [sortBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Edit handler
  const handleStartEdit = async (blog: BlogPost) => {
    if (!blog.id) return;
    try {
      setLoading(true);
      const fullBlog = await getBlogById(blog.id);
      if (fullBlog) {
        setEditingBlog(fullBlog);
        setViewMode("edit");
      }
    } catch (err) {
      console.error("Failed to fetch full blog for editing:", err);
    } finally {
      setLoading(false);
    }
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!blogToDelete?.id) return;
    try {
      setIsDeleting(true);
      await deleteBlog(
        blogToDelete.id,
        blogToDelete.description,
        blogToDelete.coverImage
      );
      setBlogToDelete(null);
      await fetchData();
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog post. Please check permissions.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Client-side filtering & sorting
  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.subtitle && b.subtitle.toLowerCase().includes(q)) ||
          b.slug.toLowerCase().includes(q) ||
          b.authorName.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (b) => b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "oldest") {
      result.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
    } else {
      result.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    }

    return result;
  }, [blogs, searchQuery, selectedCategory, sortBy]);

  // Pagination calculation
  const totalFilteredCount = filteredBlogs.length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const startItem = totalFilteredCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalFilteredCount);

  // If in Create or Edit mode, render BlogForm
  if (viewMode === "create") {
    return (
      <BlogForm
        onCancel={() => setViewMode("list")}
        onSuccess={() => {
          setViewMode("list");
          fetchData();
        }}
      />
    );
  }

  if (viewMode === "edit" && editingBlog) {
    return (
      <BlogForm
        initialBlog={editingBlog}
        onCancel={() => {
          setEditingBlog(null);
          setViewMode("list");
        }}
        onSuccess={() => {
          setEditingBlog(null);
          setViewMode("list");
          fetchData();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Row + Metrics (Matches Cavue layout) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0C4568] tracking-tight">
              Blogs Manager
            </h1>
            <button
              type="button"
              title="Refresh Blogs"
              onClick={fetchData}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:text-[#0C4568] transition-all cursor-pointer shadow-2xs"
            >
              <RotateCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#0C4568]" : ""}`}
              />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, publish, and manage long-form articles, SEO schemas, and Q&amp;A guides.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Total Blogs Stat Card */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 min-w-[130px] sm:min-w-[145px] shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0C4568] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-[#0C4568]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                Total Blogs
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#0C4568] leading-none mt-0.5">
                {loading ? "–" : stats.totalBlogs}
              </span>
            </div>
          </div>

          {/* TOC Enriched Stat Card */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 min-w-[130px] sm:min-w-[145px] shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
              <BookmarkCheck className="w-4 h-4 text-[#D97706]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                TOC Enriched
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#D97706] leading-none mt-0.5">
                {loading ? "–" : stats.tocEnriched}
              </span>
            </div>
          </div>

          {/* FAQs Embedded Stat Card */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 min-w-[130px] sm:min-w-[145px] shadow-xs hover:border-slate-300 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-[#059669]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                FAQs Embedded
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#059669] leading-none mt-0.5">
                {loading ? "–" : stats.faqsEmbedded}
              </span>
            </div>
          </div>

          {/* Write Blog Post Action Button */}
          <button
            type="button"
            onClick={() => setViewMode("create")}
            className="bg-[#0C4568] hover:bg-[#0C3852] text-white font-bold rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Write Blog Post</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (Matching FilterBar.tsx design) */}
      <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 pb-1">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, subtitle, slug, author..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0C4568] placeholder-slate-400 shadow-2xs focus:outline-none focus:border-[#0C4568] focus:ring-1 focus:ring-[#0C4568] transition-all"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2.5">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenCategoryDropdown(!openCategoryDropdown);
                setOpenSortDropdown(false);
              }}
              className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#0C4568] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Category: {selectedCategory}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openCategoryDropdown && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                      setOpenCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between cursor-pointer ${selectedCategory === cat ? "text-[#0C4568] font-bold bg-blue-50/50" : "text-slate-700"
                      }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <CheckCircle2 className="w-3.5 h-3.5 text-[#0C4568]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenSortDropdown(!openSortDropdown);
                setOpenCategoryDropdown(false);
              }}
              className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#0C4568] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span>Sort: {sortBy === "newest" ? "Newest" : "Oldest"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {openSortDropdown && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1">
                <button
                  type="button"
                  onClick={() => {
                    setSortBy("newest");
                    setCurrentPage(1);
                    setOpenSortDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between cursor-pointer ${sortBy === "newest" ? "text-[#0C4568] font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                >
                  <span>Newest First</span>
                  {sortBy === "newest" && <CheckCircle2 className="w-3.5 h-3.5 text-[#0C4568]" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy("oldest");
                    setCurrentPage(1);
                    setOpenSortDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-slate-50 flex items-center justify-between cursor-pointer ${sortBy === "oldest" ? "text-[#0C4568] font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                >
                  <span>Oldest First</span>
                  {sortBy === "oldest" && <CheckCircle2 className="w-3.5 h-3.5 text-[#0C4568]" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blogs Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading && blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#0C4568]" />
            <span className="text-xs">Loading articles...</span>
          </div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0C4568] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0C4568]">No articles found</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              {searchQuery || selectedCategory !== "All"
                ? "No published articles matched your search filters."
                : "You haven't written any blog articles yet. Click 'Write Blog Post' to publish your first piece."}
            </p>
            {(!searchQuery && selectedCategory === "All") && (
              <button
                type="button"
                onClick={() => setViewMode("create")}
                className="mt-2 px-4 py-2 bg-[#0C4568] text-white text-xs font-semibold rounded-xl hover:bg-[#0C3852] transition-colors"
              >
                Write First Blog Post
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 w-16">Cover</th>
                  <th className="py-3 px-4">Title &amp; Author</th>
                  <th className="py-3 px-4">URL Slug</th>
                  <th className="py-3 px-4">Attached Q&amp;A / Reviews</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {paginatedBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Cover Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 relative shrink-0 border border-slate-200">
                        {blog.coverImage ? (
                          <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Details */}
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#0C4568] group-hover:text-[#2B7DA8] transition-colors line-clamp-1">
                          {blog.title}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[#0C4568] font-medium">
                            {blog.category}
                          </span>
                          <span>•</span>
                          <span>{blog.authorName}</span>
                          <span>•</span>
                          <span>{blog.publishDate || "Draft"}</span>
                          {blog.featured && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* URL Slug */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80">
                        /{blog.slug}
                      </span>
                    </td>

                    {/* Q&A / Reviews Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <HelpCircle className="w-3 h-3" />
                          {blog.faqCount || 0} FAQs
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                          {blog.reviewCount || 0} Reviews
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/insights/${blog.slug}`}
                          target="_blank"
                          title="View Live Page"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0C4568] hover:bg-slate-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          title="Edit Post"
                          onClick={() => handleStartEdit(blog)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0C4568] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete Post"
                          onClick={() => setBlogToDelete(blog)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer & Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-8 text-xs sm:text-sm text-slate-500">
        <div>
          Showing{" "}
          <span className="font-semibold text-[#0C4568]">{startItem}</span> to{" "}
          <span className="font-semibold text-[#0C4568]">{endItem}</span> of{" "}
          <span className="font-semibold text-[#0C4568]">{totalFilteredCount}</span> articles
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[#0C4568] text-xs font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
            const isCurrent = pg === currentPage;
            return (
              <button
                key={pg}
                type="button"
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${isCurrent
                    ? "bg-[#0C4568] text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-[#0C4568] hover:bg-blue-50"
                  }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[#0C4568] text-xs font-semibold hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {blogToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Delete Blog Article?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-slate-800">&quot;{blogToDelete.title}&quot;</strong>?
              This will automatically clean up all associated images in Storage bucket, delete attached FAQs and Reviews, and remove the article completely.
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setBlogToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

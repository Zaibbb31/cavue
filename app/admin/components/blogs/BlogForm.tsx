"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Trash2,
  Plus,
  Star,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import TipTapEditor from "./TipTapEditor";
import { BlogPost, BlogFAQ, BlogReview } from "@/lib/types/blog";
import {
  createBlog,
  updateBlog,
  uploadBlogImage,
} from "@/lib/services/blogsService";
import {
  generateSlug,
  calibrateMetaTitle,
  calibrateMetaDescription,
} from "@/lib/seo-utils";

interface BlogFormProps {
  initialBlog?: BlogPost | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const AUTHOR_PROFILES = [
  { name: "Cavue Studio Team", role: "Creative Studio", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
  { name: "Lead Web Architect", role: "Web Engineering", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
  { name: "Design Director", role: "Product & UI/UX", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" },
  { name: "Marketing Team", role: "Growth & SEO", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" },
];

const CATEGORIES = [
  "Strategy",
  "Influencer Marketing",
  "Social Media",
  "Branding",
  "AI & Creative",
  "Web Development",
  "UI/UX Design",
  "SEO & Performance",
];

export default function BlogForm({ initialBlog, onCancel, onSuccess }: BlogFormProps) {
  const isEditing = !!initialBlog?.id;
  const draftStorageKey = isEditing ? `autosave_blog_${initialBlog?.id}` : "autosave_blog_new";

  // Form states
  const [title, setTitle] = useState(initialBlog?.title || "");
  const [subtitle, setSubtitle] = useState(initialBlog?.subtitle || "");
  const [slug, setSlug] = useState(initialBlog?.slug || "");
  const [isSlugManual, setIsSlugManual] = useState(!!initialBlog?.slug);
  const [category, setCategory] = useState(initialBlog?.category || CATEGORIES[0]);
  const [publishDate, setPublishDate] = useState(
    initialBlog?.publishDate || new Date().toISOString().split("T")[0]
  );
  const [selectedAuthor, setSelectedAuthor] = useState(
    initialBlog?.authorName || AUTHOR_PROFILES[0].name
  );
  const [coverImage, setCoverImage] = useState(initialBlog?.coverImage || "");
  const [customCoverUrl, setCustomCoverUrl] = useState("");
  const [description, setDescription] = useState(initialBlog?.description || "");
  const [metaTitle, setMetaTitle] = useState(initialBlog?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialBlog?.metaDescription || "");
  const [featured, setFeatured] = useState(!!initialBlog?.featured);

  // Subcollections
  const [faqs, setFaqs] = useState<BlogFAQ[]>(initialBlog?.faqs || []);
  const [reviews, setReviews] = useState<BlogReview[]>(initialBlog?.reviews || []);

  // UI helpers
  const [showSeoAccordion, setShowSeoAccordion] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const coverFileRef = useRef<HTMLInputElement>(null);

  // Auto-slug from title if not manually touched
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      setSlug(generateSlug(val));
    }
  };

  // Check for unsaved draft on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title || parsed.description) {
          setHasDraft(true);
        }
      }
    } catch (e) {
      console.error("Error reading draft:", e);
    }
  }, [draftStorageKey]);

  // Restore draft handler
  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title !== undefined) setTitle(parsed.title);
        if (parsed.subtitle !== undefined) setSubtitle(parsed.subtitle);
        if (parsed.slug !== undefined) setSlug(parsed.slug);
        if (parsed.category !== undefined) setCategory(parsed.category);
        if (parsed.publishDate !== undefined) setPublishDate(parsed.publishDate);
        if (parsed.selectedAuthor !== undefined) setSelectedAuthor(parsed.selectedAuthor);
        if (parsed.coverImage !== undefined) setCoverImage(parsed.coverImage);
        if (parsed.description !== undefined) setDescription(parsed.description);
        if (parsed.metaTitle !== undefined) setMetaTitle(parsed.metaTitle);
        if (parsed.metaDescription !== undefined) setMetaDescription(parsed.metaDescription);
        if (parsed.faqs !== undefined) setFaqs(parsed.faqs);
        if (parsed.reviews !== undefined) setReviews(parsed.reviews);
        setHasDraft(false);
      }
    } catch (e) {
      console.error("Failed to restore draft:", e);
    }
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(draftStorageKey);
    setHasDraft(false);
  };

  // 1-second debounced Autosave to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title.trim() || description.trim()) {
        const draftData = {
          title,
          subtitle,
          slug,
          category,
          publishDate,
          selectedAuthor,
          coverImage,
          description,
          metaTitle,
          metaDescription,
          faqs,
          reviews,
          savedAt: new Date().toLocaleTimeString(),
        };
        try {
          localStorage.setItem(draftStorageKey, JSON.stringify(draftData));
          setDraftSavedAt(draftData.savedAt);
        } catch (e) {
          console.warn("Local draft quota reached:", e);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    title,
    subtitle,
    slug,
    category,
    publishDate,
    selectedAuthor,
    coverImage,
    description,
    metaTitle,
    metaDescription,
    faqs,
    reviews,
    draftStorageKey,
  ]);

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);
      const url = await uploadBlogImage(file, "blog-images");
      setCoverImage(url);
    } catch (err) {
      console.error("Failed to upload cover image:", err);
      alert("Failed to upload cover image. Please check storage bucket permissions.");
    } finally {
      setIsUploadingCover(false);
      if (coverFileRef.current) coverFileRef.current.value = "";
    }
  };

  // Add FAQ Item
  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { question: "", answer: "", order: prev.length },
    ]);
  };

  const handleUpdateFaq = (index: number, field: "question" | "answer", val: string) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Add Review Item
  const handleAddReview = () => {
    setReviews((prev) => [
      ...prev,
      { clientName: "", rating: 5, review: "" },
    ]);
  };

  const handleUpdateReview = (
    index: number,
    field: "clientName" | "rating" | "review",
    val: any
  ) => {
    setReviews((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleDeleteReview = (index: number) => {
    setReviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit / Publish
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter a blog title.");
      return;
    }
    if (!slug.trim()) {
      setErrorMessage("Please enter a valid URL slug.");
      return;
    }
    if (!description.trim() || description === "<p></p>") {
      setErrorMessage("Please add body content to the article.");
      return;
    }

    try {
      setIsSaving(true);

      const authorObj = AUTHOR_PROFILES.find((a) => a.name === selectedAuthor) || {
        name: selectedAuthor,
        role: "Cavue Contributor",
        avatar: "",
      };

      const blogPayload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        slug: slug.trim().toLowerCase(),
        category,
        publishDate,
        authorName: authorObj.name,
        authorRole: authorObj.role,
        authorAvatar: authorObj.avatar,
        coverImage,
        description,
        metaTitle: metaTitle.trim() || calibrateMetaTitle(title),
        metaDescription: metaDescription.trim() || calibrateMetaDescription(description, title),
        featured,
      };

      if (isEditing && initialBlog?.id) {
        await updateBlog(initialBlog.id, blogPayload, faqs, reviews);
      } else {
        await createBlog(blogPayload, faqs, reviews);
      }

      // Clear draft on success
      localStorage.removeItem(draftStorageKey);
      onSuccess();
    } catch (err: any) {
      console.error("Failed to save blog:", err);
      setErrorMessage(err.message || "Failed to save blog post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0C4568]">
              {isEditing ? "Edit Blog Article" : "Write New Blog Article"}
            </h1>
            <p className="text-xs text-slate-500">
              100% manual content management with live formatting, SEO calibration, and rich media.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {draftSavedAt && (
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Draft auto-saved at {draftSavedAt}
            </span>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#0C4568] hover:bg-[#0C3852] text-white flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? "Update Article" : "Publish Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Draft Notification Banner */}
      {hasDraft && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-800 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>An unsaved draft for this article was detected. Would you like to restore it?</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Restore Draft
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="px-3 py-1 bg-white border border-amber-300 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs sm:text-sm text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Main Info & Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0C4568] uppercase tracking-wider mb-1.5">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 7 Modern Design Principles for Web Conversion"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-[#0C4568] uppercase tracking-wider mb-1.5">
                Subtitle / Deck (Optional)
              </label>
              <input
                type="text"
                placeholder="A high-impact summary or teaser for the hero banner"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#0C4568] uppercase tracking-wider">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugManual(false);
                    setSlug(generateSlug(title));
                  }}
                  className="text-xs text-[#2B7DA8] hover:text-[#0C4568] flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Auto-generate
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 font-mono">
                <span>/insights/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                  }}
                  className="w-full bg-transparent text-slate-800 focus:outline-none pl-1 font-mono"
                />
              </div>
            </div>
          </div>

          {/* WYSIWYG Editor */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#0C4568] uppercase tracking-wider">
              Article Content <span className="text-red-500">*</span>
            </label>
            <TipTapEditor
              content={description}
              onChange={(html) => setDescription(html)}
            />
          </div>

          {/* FAQ Subcollection Builder */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0C4568] uppercase tracking-wider">
                  Attached FAQs ({faqs.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Adds interactive Q&A accordion at the bottom of the article and generates Google FAQPage schema.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-[#0C4568] hover:bg-blue-100 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>

            {faqs.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                No FAQs added yet. Click &quot;Add FAQ&quot; to include questions and answers.
              </div>
            ) : (
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#0C4568]">Q{index + 1}:</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. What is the turnaround time for a custom brand sprint?"
                      value={faq.question}
                      onChange={(e) => handleUpdateFaq(index, "question", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Detailed answer for this question..."
                      value={faq.answer}
                      onChange={(e) => handleUpdateFaq(index, "answer", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568] resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Client Reviews Subcollection Builder */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0C4568] uppercase tracking-wider">
                  Client Reviews &amp; Testimonials ({reviews.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Embed verified client ratings and endorsements directly linked to this article topic.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddReview}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-[#0C4568] hover:bg-blue-100 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Review</span>
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                No client reviews added yet.
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0C4568]">Review #{index + 1}</span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(index)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Client Name & Title (e.g. Sarah Miller, VP Product)"
                        value={rev.clientName}
                        onChange={(e) => handleUpdateReview(index, "clientName", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568]"
                      />
                      <select
                        value={rev.rating}
                        onChange={(e) => handleUpdateReview(index, "rating", Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568]"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Great</option>
                        <option value={3}>3 Stars - Good</option>
                        <option value={2}>2 Stars - Fair</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Client testimonial or review text..."
                      value={rev.review}
                      onChange={(e) => handleUpdateReview(index, "review", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568] resize-none"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Publishing Metadata, Cover Image, & SEO Accordion */}
        <div className="space-y-6 lg:col-span-1 lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto custom-scrollbar lg:pr-1.5 p-0.5">
          {/* Publishing Details Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#0C4568] uppercase tracking-wider">
              Publishing Settings
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
              >
                {!CATEGORIES.includes(category) && category && (
                  <option value={category}>{category}</option>
                )}
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
              />
            </div>

            {/* Author Profile */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Author Profile
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0C4568]/20 focus:border-[#0C4568]"
              >
                {AUTHOR_PROFILES.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Featured toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700">Feature on Blog Hero</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0C4568]"></div>
              </label>
            </div>
          </div>

          {/* Cover Image Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#0C4568] uppercase tracking-wider">
              Cover Image
            </h3>

            {/* Hidden File Input */}
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />

            {coverImage ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                <Image
                  src={coverImage}
                  alt="Cover Preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => coverFileRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-semibold text-slate-800 hover:bg-white transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => coverFileRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#0C4568] rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col items-center justify-center gap-2 group"
              >
                {isUploadingCover ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-[#0C4568]" />
                    <span className="text-xs text-slate-500">Compressing &amp; uploading...</span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0C4568] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Upload Compressed Cover Image
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Auto-resized to 1200px max (JPEG 75%)
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Manual Cover URL Option */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-semibold text-slate-500">
                Or Paste Image URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customCoverUrl.trim()) {
                      setCoverImage(customCoverUrl.trim());
                      setCustomCoverUrl("");
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* SEO Calibration Accordion */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSeoAccordion(!showSeoAccordion)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2B7DA8]" />
                <span className="text-xs font-bold text-[#0C4568] uppercase tracking-wider">
                  SEO Meta Calibration
                </span>
              </div>
              {showSeoAccordion ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showSeoAccordion && (
              <div className="p-4 pt-1 border-t border-slate-100 space-y-4">
                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">
                      Meta Title
                    </label>
                    <span
                      className={`text-[11px] font-mono font-medium ${metaTitle.length >= 45 && metaTitle.length <= 58
                        ? "text-emerald-600"
                        : "text-amber-600"
                        }`}
                    >
                      {metaTitle.length} chars (Target: 45–58)
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder={calibrateMetaTitle(title || "Digital Strategy")}
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Automatically appends &quot; | Cavue&quot; upon publication.
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">
                      Meta Description
                    </label>
                    <span
                      className={`text-[11px] font-mono font-medium ${metaDescription.length >= 120 && metaDescription.length <= 150
                        ? "text-emerald-600"
                        : "text-amber-600"
                        }`}
                    >
                      {metaDescription.length} chars (Target: 120–150)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Calibrated summary optimized for search engines..."
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0C4568] resize-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Leave blank to auto-generate from calibrated body text.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

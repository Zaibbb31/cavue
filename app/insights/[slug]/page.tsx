"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../component/navbar";
import TestimonialSection from "../../component/testimonial";
import Footer from "../../component/footer";

interface BlogPostData {
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

const blogsDatabase: Record<string, BlogPostData> = {
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
        body: "Pixel Flow is an interactive web experience designed to engage users through motion, responsive design, and immersive visuals. The project transformed a standard website into a dynamic playground where every click, scroll, and animation tells a story, creating memorable interactions, enhancing user engagement, and leaving a lasting impression that reflects the client's unique brand identity and playful spirit.",
      },
      {
        heading: "Introduction",
        body: "Pixel Flow is an interactive web experience designed to engage users through motion, responsive design, and immersive visuals. The project transformed a standard website into a dynamic playground where every click, scroll, and animation tells a story, creating memorable interactions, enhancing user engagement, and leaving a lasting impression that reflects the client's unique brand identity and playful spirit.",
      },
      {
        heading: "Introduction",
        body: "Pixel Flow is an interactive web experience designed to engage users through motion, responsive design, and immersive visuals. The project transformed a standard website into a dynamic playground where every click, scroll, and animation tells a story, creating memorable interactions, enhancing user engagement, and leaving a lasting impression that reflects the client's unique brand identity and playful spirit.",
      },
      {
        heading: "Introduction",
        body: "Pixel Flow is an interactive web experience designed to engage users through motion, responsive design, and immersive visuals. The project transformed a standard website into a dynamic playground where every click, scroll, and animation tells a story, creating memorable interactions, enhancing user engagement, and leaving a lasting impression that reflects the client's unique brand identity and playful spirit.",
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
        body: "By developing repeatable modular content systems and repurposing high-performing audio hooks, brands can scale weekly output from 3 to 30 videos without sacrificing visual quality or brand integrity.",
      },
    ],
  },
};

export default function BlogSlugPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const post = blogsDatabase[slugParam] || blogsDatabase["7-content-ideas-that-always-perform-widely"];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Blog Post Article */}
      <main className="w-full pt-10 sm:pt-14 md:pt-18 pb-16 sm:pb-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Date Bar */}
          <div className="text-center mb-3">
            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider">
              {post.date}
            </span>
          </div>

          {/* Centered Blog Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium text-[#0C3852] text-center tracking-tight leading-[1.12] max-w-3xl mx-auto mb-10 sm:mb-14">
            {post.title}
          </h1>

          {/* Full-Width Hero Media Card */}
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EBF0F5] border border-black/[0.04] shadow-sm relative overflow-hidden mb-12 sm:mb-16 rounded-none">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* 2-Column Article Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
            {/* Left Column: Author & Share Sidebar */}
            <aside className="lg:col-span-4 flex flex-col space-y-8 sticky top-24">
              {/* Author & Read Time */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-black/[0.08] shadow-sm">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
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

              {/* Share This Section */}
              <div className="pt-6 border-t border-black/[0.06]">
                <h4 className="font-bold text-lg sm:text-xl text-[#0C3852] mb-5">
                  Share This
                </h4>

                <div className="flex flex-col divide-y divide-black/[0.06] border-y border-black/[0.06]">
                  {/* LinkedIn */}
                  <Link
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
                  </Link>

                  {/* Twitter / X */}
                  <Link
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
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 py-3.5 text-sm sm:text-[15px] font-medium text-[#0C3852] hover:text-[#2575A5] transition-colors group"
                  >
                    <div className="w-7 h-7 bg-[#0C3852] text-white flex items-center justify-center rounded-none group-hover:bg-[#2575A5] transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <span>Instagram</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Column: Article Content Sections */}
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

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

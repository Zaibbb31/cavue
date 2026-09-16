"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "../../component/navbar";
import FAQSection from "../../component/faq";
import Footer from "../../component/footer";

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  livePreviewUrl?: string;
  industry: string;
  services: string;
  year: string;
  accentColor: string; // Used for cursive tags or highlights
  challenge: {
    heading: string;
    description: string;
  };
  strategy: {
    heading: string;
    description: string;
    images: [string, string];
  };
  results: {
    heading: string;
    description: string;
    images: [string, string];
    metrics: [
      { value: string; label: string; bg: string; text?: string },
      { value: string; label: string; bg: string; text?: string },
      { value: string; label: string; bg: string; text?: string }
    ];
  };
}

export const projectsDatabase: Record<string, ProjectDetail> = {
  novaskin: {
    slug: "novaskin",
    title: "NovaSkin",
    subtitle:
      "Clean skincare brand targeting Gen Z and Millennial consumers with dermatologist-formulated products.",
    heroImage:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://novaskin.com",
    industry: "Beauty & Personal Care",
    services: "Influencer Marketing, UGC Campaigns, Short form - Video, Brand Strategy",
    year: "2024",
    accentColor: "text-[#A28CFF]",
    challenge: {
      heading: "Strong Products, Weak Social Performance",
      description:
        "Despite offering clinically backed skincare at accessible prices, NovaSkin struggled to stand out online. Inconsistent content, low engagement, and an inactive TikTok presence limited audience growth and prevented the brand from communicating its true value.",
    },
    strategy: {
      heading: "Education-Led Content That Built Trust",
      description:
        "We shifted the focus from product promotion to audience education, creating consistent short-form content around ingredients, routines, and real results. A unified visual identity, UGC system, and rigorous hook testing improved performance across platforms.",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "Rapid Growth Across Every Metric",
      description:
        "The new strategy transformed NovaSkin's social presence, driving significant audience growth, stronger engagement, and millions of video views. Consistent content and clear messaging helped establish credibility while accelerating brand awareness at scale.",
      images: [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "+280%",
          label: "Follower Growth in 90 Days",
          bg: "bg-[#9C84FF] text-[#111827]",
        },
        {
          value: "4.1M",
          label: "Total Reel Views (First 3 Months)",
          bg: "bg-[#F9A048] text-[#111827]",
        },
        {
          value: "6.2%",
          label: "Average Engagement Rate",
          bg: "bg-[#0EA5E9] text-white",
        },
      ],
    },
  },
  "aura-botanical": {
    slug: "aura-botanical",
    title: "Aura Botanical",
    subtitle:
      "Organic, plant-derived botanical wellness formulations crafted for everyday mindful restoration.",
    heroImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://aurabotanical.com",
    industry: "Skincare & Wellness",
    services: "Paid Performance Media, Paid TikTok Ads, Creative Strategy",
    year: "2025",
    accentColor: "text-[#FB7185]",
    challenge: {
      heading: "High Production Costs, Low Customer Retention",
      description:
        "Aura Botanical had a cult following locally, but lacked a cohesive digital conversion funnel. High acquisition costs on generic social ads drained budgets without building long-term recurring subscriptions.",
    },
    strategy: {
      heading: "Ritual-Centric Storytelling & High-Converting Paid Creatives",
      description:
        "We restructured Aura's creative testing pipeline with over 40 weekly video variations focusing on sensory morning routines, unboxing experiences, and transparent ingredient efficacy reviews.",
      images: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "Tripled Return on Ad Spend & Record Repeat Orders",
      description:
        "Within 6 months, paid revenue quadrupled while lowering customer acquisition cost by 44%. Aura scaled from a boutique brand into an omnichannel retail powerhouse.",
      images: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "3.4x",
          label: "ROAS on Performance Media",
          bg: "bg-[#FDA4AF] text-[#111827]",
        },
        {
          value: "$1.8M",
          label: "Gross Revenue in 6 Months",
          bg: "bg-[#FBBF24] text-[#111827]",
        },
        {
          value: "42%",
          label: "Repeat Subscription Rate",
          bg: "bg-[#38BDF8] text-white",
        },
      ],
    },
  },
  "verve-eyewear": {
    slug: "verve-eyewear",
    title: "Verve Eyewear",
    subtitle:
      "Handcrafted Japanese titanium sunglasses engineered for modernist aesthetics and ultimate lightness.",
    heroImage:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://verve-eyewear.com",
    industry: "Luxury & Lifestyle",
    services: "Art Direction, Influencer Seeding, 3D CGI Motion, Web Experience",
    year: "2024",
    accentColor: "text-[#60A5FA]",
    challenge: {
      heading: "Premium Craftsmanship Trapped in Crowded Market Noise",
      description:
        "Verve produced exceptional frames, but legacy marketing channels failed to reach design-forward buyers. Digital touchpoints lacked the tactile luxury feel of their physical frames.",
    },
    strategy: {
      heading: "Cinematic Visuals & Global Creative Tastemaker Seeding",
      description:
        "We engineered high-fashion 3D exploding-lens product videos, paired with targeted gifting to influential architects, photographers, and creative directors worldwide.",
      images: [
        "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "Global Virality & Sold-Out Capsule Drops",
      description:
        "Organic impressions skyrocketed past 4.8 million within 60 days. Every seasonal limited capsule drop sold out within 48 hours of announcement.",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "4.8M",
          label: "Organic Social Impressions",
          bg: "bg-[#93C5FD] text-[#111827]",
        },
        {
          value: "100%",
          label: "Capsule Sellout Rate in 48h",
          bg: "bg-[#FCD34D] text-[#111827]",
        },
        {
          value: "+310%",
          label: "Direct Site Traffic Growth",
          bg: "bg-[#2563EB] text-white",
        },
      ],
    },
  },
  "lumina-glow": {
    slug: "lumina-glow",
    title: "Lumina Glow",
    subtitle:
      "Next-generation bio-fermented serum brand setting a new standard in radiant, restorative skin barrier health.",
    heroImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://luminaglow.com",
    industry: "Beauty & Biotech",
    services: "TikTok Shop Strategy, UGC Creator Management, CRO, Brand Identity",
    year: "2025",
    accentColor: "text-[#A28CFF]",
    challenge: {
      heading: "New Category Launch with High Science Jargon",
      description:
        "Lumina’s proprietary bio-ferment technology sounded overly clinical for mainstream consumers. They needed to turn complex biotech patents into relatable skincare joy.",
    },
    strategy: {
      heading: "Micro-Creator Education & Visual Texture Campaigns",
      description:
        "We mobilized a fleet of 150+ micro-creators to demonstrate the product's instant hydration glass-skin glow, emphasizing before-and-after skin texture transformations.",
      images: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "Viral TikTok Shop Phenomenon & 185% YoY Growth",
      description:
        "Lumina became one of the fastest trending skincare brands in the beauty ecosystem, unlocking exponential repeat purchases and top-tier retail placement.",
      images: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "+185%",
          label: "Direct-to-Consumer Growth",
          bg: "bg-[#9C84FF] text-[#111827]",
        },
        {
          value: "35K+",
          label: "Units Sold on Launch Month",
          bg: "bg-[#F97316] text-white",
        },
        {
          value: "8.4%",
          label: "Shopify Store Conversion Rate",
          bg: "bg-[#06B6D4] text-white",
        },
      ],
    },
  },
  "solstice-studio": {
    slug: "solstice-studio",
    title: "Solstice Studio",
    subtitle:
      "Contemporary unisex silhouettes crafted from sustainable deadstock textiles and deadweight organic cottons.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://solsticestudio.com",
    industry: "Fashion & Apparel",
    services: "Lookbook Photography, Community Discord, E-Commerce Development",
    year: "2024",
    accentColor: "text-[#FACC15]",
    challenge: {
      heading: "Sustainable Fashion Without the Boring Clichés",
      description:
        "Most sustainable fashion was perceived as bland and beige. Solstice needed a bold, underground cultural edge that resonated with youth streetwear culture.",
    },
    strategy: {
      heading: "Raw Editorial Visuals & Exclusive Drop Mechanics",
      description:
        "We built an edgy aesthetic with VHS-inspired motion teasers, community-gated early access drop codes, and live stream studio workshops showing piece construction.",
      images: [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "A Hyper-Loyal Cult Following & Instant Sellouts",
      description:
        "Solstice amassed over 12,000 active community members and became an internationally recognized staple featured in leading style magazines.",
      images: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "12.4K",
          label: "Community Members Added",
          bg: "bg-[#FDE047] text-[#111827]",
        },
        {
          value: "94%",
          label: "Customer Satisfaction Rating",
          bg: "bg-[#A78BFA] text-[#111827]",
        },
        {
          value: "4.2x",
          label: "Lifetime Value (LTV) Increase",
          bg: "bg-[#10B981] text-white",
        },
      ],
    },
  },
  "kinetic-sound": {
    slug: "kinetic-sound",
    title: "Kinetic Sound",
    subtitle:
      "Audiophile-grade wireless planar magnetic studio monitors designed for music producers and creative purists.",
    heroImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=85",
    livePreviewUrl: "https://kineticsound.com",
    industry: "Tech & Audio Hardware",
    services: "Sound Design, 3D Product Renders, Kickstarter Campaign, PR",
    year: "2025",
    accentColor: "text-[#34D399]",
    challenge: {
      heading: "Breaking Into a Monopoly Dominated by Legacy Tech Giants",
      description:
        "Kinetic Sound possessed superior audio fidelity but struggled to build consumer brand authority without million-dollar traditional TV media budgets.",
    },
    strategy: {
      heading: "Blind Audio Reactions & Creator Studio Integrations",
      description:
        "We placed Kinetic headphones in top Grammy-winning recording studios, capturing authentic blind listening tests that went viral across YouTube and tech blogs.",
      images: [
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&auto=format&fit=crop&q=80",
      ],
    },
    results: {
      heading: "Crowdfunding Record & 88% Brand Sentiment Uplift",
      description:
        "The campaign reached 500% of its initial funding goal in 72 hours, cementing Kinetic Sound as the premier emerging audiophile hardware brand.",
      images: [
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80",
      ],
      metrics: [
        {
          value: "88%",
          label: "Brand Sentiment Uplift",
          bg: "bg-[#6EE7B7] text-[#111827]",
        },
        {
          value: "$2.4M",
          label: "First-Year Unit Sales",
          bg: "bg-[#38BDF8] text-white",
        },
        {
          value: "#1",
          label: "Trending Tech Product on Product Hunt",
          bg: "bg-[#F472B6] text-white",
        },
      ],
    },
  },
};

export default function ProjectSlugPage() {
  const params = useParams();
  const slugParam = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const project = projectsDatabase[slugParam] || projectsDatabase["novaskin"];

  if (!project) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#0C3852] font-sans selection:bg-[#3CA8D9] selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Case Study Article */}
      <main className="w-full pt-4 sm:pt-6 pb-20 sm:pb-28">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar with Back Button */}
          <div className="flex items-center justify-between py-4 mb-4">
            <Link
              href="/projectpage"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white text-[#0C3852] font-medium text-xs sm:text-sm border border-black/[0.06] hover:bg-[#F3F4F6] transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back</span>
            </Link>

            <span className="font-gochi text-[#2B7DA8] text-base sm:text-lg tracking-wider">
              / CASE STUDY
            </span>
          </div>

          {/* 1. Giant Hero Card */}
          <div className="relative w-full aspect-[4/3.2] sm:aspect-[16/10] md:aspect-[16/9.5] overflow-hidden bg-[#0C4568] shadow-md border border-black/[0.04] mb-4">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 z-10" />

            {/* Content Over Hero Image */}
            <div className="absolute inset-0 z-20 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              {/* Top Tag */}
              <div className="flex justify-between items-start">
                <span className="font-gochi text-2xl sm:text-3xl text-white/95 tracking-wide">
                  Project
                </span>
              </div>

              {/* Bottom Details & Live Preview CTA */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-3">
                    {project.title}
                  </h1>
                  <p className="text-white/90 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal">
                    {project.subtitle}
                  </p>
                </div>

                {project.livePreviewUrl && (
                  <Link
                    href={project.livePreviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#111827] font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all shadow-md flex-shrink-0 self-start md:self-auto"
                  >
                    Live preview
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 2. Metadata Specs Bar */}
          <div className="bg-white p-5 sm:p-7 border border-black/[0.04] shadow-sm mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div>
                <span className="text-xs text-[#6B899E] block mb-1">Industry</span>
                <span className="font-semibold text-sm sm:text-base text-[#0C3852]">
                  {project.industry}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6B899E] block mb-1">Services</span>
                <span className="font-semibold text-sm sm:text-base text-[#0C3852] leading-snug">
                  {project.services}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6B899E] block mb-1">Year</span>
                <span className="font-semibold text-sm sm:text-base text-[#0C3852]">
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* 3. The Challenge Section Card */}
          <section className="bg-white p-6 sm:p-10 md:p-12 border border-black/[0.04] shadow-sm mb-12 sm:mb-16">
            <span className={`font-gochi text-2xl sm:text-3xl ${project.accentColor} block mb-1`}>
              The challenge
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight leading-tight mb-4">
              {project.challenge.heading}
            </h2>
            <p className="text-[#4B5563] text-sm sm:text-base md:text-[16px] leading-relaxed">
              {project.challenge.description}
            </p>
          </section>

          {/* 4. Our Strategy Section */}
          <section className="mb-12 sm:mb-16">
            <div className="mb-6 sm:mb-8">
              <span className={`font-gochi text-2xl sm:text-3xl ${project.accentColor} block mb-1`}>
                Our strategy
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight leading-tight mb-4">
                {project.strategy.heading}
              </h2>
              <p className="text-[#4B5563] text-sm sm:text-base md:text-[16px] leading-relaxed max-w-3xl">
                {project.strategy.description}
              </p>
            </div>

            {/* 2-Column Showcase Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {project.strategy.images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E7EB] border border-black/[0.04] shadow-sm group"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} strategy visual ${idx + 1}`}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. The Results Section */}
          <section className="mb-12 sm:mb-16">
            <div className="mb-6 sm:mb-8">
              <span className={`font-gochi text-2xl sm:text-3xl ${project.accentColor} block mb-1`}>
                The results
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] tracking-tight leading-tight mb-4">
                {project.results.heading}
              </h2>
              <p className="text-[#4B5563] text-sm sm:text-base md:text-[16px] leading-relaxed max-w-3xl">
                {project.results.description}
              </p>
            </div>

            {/* 2-Column Results Visuals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {project.results.images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E7EB] border border-black/[0.04] shadow-sm group"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.title} results visual ${idx + 1}`}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* 3 Metric Highlight Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {project.results.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`${metric.bg} p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-transform hover:-translate-y-1 duration-300`}
                >
                  <span className="text-3xl sm:text-4xl md:text-[38px] font-bold tracking-tight leading-none mb-3">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-[13px] font-medium leading-snug opacity-90">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

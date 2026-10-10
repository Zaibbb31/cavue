import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "./BlogContent";
import { getBlogBySlug, getBlogs } from "@/lib/services/blogsService";
import { calibrateMetaTitle, calibrateMetaDescription } from "@/lib/seo-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getBlogs();
    return res.blogs.map((b) => ({
      slug: b.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Cavue",
      description: "The requested article could not be found.",
    };
  }

  const title = blog.metaTitle ? calibrateMetaTitle(blog.metaTitle) : calibrateMetaTitle(blog.title);
  const description = blog.metaDescription
    ? calibrateMetaDescription(blog.metaDescription)
    : calibrateMetaDescription(blog.subtitle || blog.description, blog.title);

  const ogImages = blog.coverImage
    ? [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.publishDate,
      modifiedTime: blog.updatedAt || blog.publishDate,
      authors: [blog.authorName],
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Schema: BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription || blog.subtitle || "",
    image: blog.coverImage ? [blog.coverImage] : [],
    datePublished: blog.publishDate,
    dateModified: blog.updatedAt || blog.publishDate,
    author: {
      "@type": "Person",
      name: blog.authorName,
      jobTitle: blog.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Cavue",
      logo: {
        "@type": "ImageObject",
        url: "https://cavue.co/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cavue.co/blogs/${blog.slug}`,
    },
  };

  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://cavue.co",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://cavue.co/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://cavue.co/blogs/${blog.slug}`,
      },
    ],
  };

  // Schema: FAQPage (if FAQs attached)
  const faqSchema =
    blog.faqs && blog.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blog.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Reader Layout */}
      <BlogContent blog={blog} />
    </>
  );
}

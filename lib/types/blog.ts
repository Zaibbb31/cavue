export interface BlogFAQ {
  id?: string;
  question: string;
  answer: string;
  order?: number;
}

export interface BlogReview {
  id?: string;
  clientName: string;
  rating: number; // 1 to 5
  review: string;
  createdAt?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  publishDate: string; // YYYY-MM-DD
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  coverImage?: string;
  description: string; // HTML content from TipTap
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  readTime?: string;
  createdAt?: string;
  updatedAt?: string;
  faqCount?: number;
  reviewCount?: number;
  faqs?: BlogFAQ[];
  reviews?: BlogReview[];
}

export interface BlogStats {
  totalBlogs: number;
  tocEnriched: number;
  faqsEmbedded: number;
}

export interface BlogFilters {
  search?: string;
  category?: string;
  sortBy?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

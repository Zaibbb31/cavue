import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { BlogPost, BlogFAQ, BlogReview, BlogStats, BlogFilters } from "../types/blog";
import {
  cleanInternalNofollow,
  calibrateMetaTitle,
  calibrateMetaDescription,
  calculateReadTime,
} from "../seo-utils";

const BLOGS_COLLECTION = "blogs";

/**
 * Compresses an image file on the client using HTML5 Canvas
 * Max dimension: 1200px, Quality: 0.75 JPEG
 */
export async function compressImage(file: File, maxDimension = 1200, quality = 0.75): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If not in browser environment, return file directly
    if (typeof window === "undefined" || !window.createImageBitmap) {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);

    img.onload = () => {
      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image to Firebase Storage with compression
 */
export async function uploadBlogImage(
  file: File,
  folder: "blog-images" | "editor-images" = "editor-images"
): Promise<string> {
  const compressedBlob = await compressImage(file, 1200, 0.75);
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${folder}/${Date.now()}_${sanitizedName}`;
  const storageRef = ref(storage, fileName);

  const snapshot = await uploadBytes(storageRef, compressedBlob, {
    contentType: "image/jpeg",
  });

  return await getDownloadURL(snapshot.ref);
}

/**
 * Extracts Firebase Storage URLs from HTML or text
 */
export function extractStorageUrls(text: string): string[] {
  if (!text) return [];
  const regex = /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^"\s)]+/g;
  const matches = text.match(regex);
  return matches ? Array.from(new Set(matches)) : [];
}

/**
 * Deletes a file from Firebase Storage given its public URL
 */
export async function deleteStorageFileByUrl(url: string): Promise<void> {
  try {
    if (!url || !url.includes("firebasestorage.googleapis.com")) return;
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (err) {
    console.warn("Could not delete storage file:", url, err);
  }
}

/**
 * Fetches all blogs with optional filtering, search, and sorting
 */
export async function getBlogs(filters?: BlogFilters): Promise<{ blogs: BlogPost[]; total: number }> {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    let items: BlogPost[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "",
        subtitle: data.subtitle || "",
        slug: data.slug || "",
        category: data.category || "General",
        publishDate: data.publishDate || "",
        authorName: data.authorName || "Cavue Studio Team",
        authorRole: data.authorRole || "Creative Studio",
        authorAvatar: data.authorAvatar || "",
        coverImage: data.coverImage || "",
        description: data.description || "",
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        featured: !!data.featured,
        readTime: data.readTime || calculateReadTime(data.description || ""),
        createdAt: data.createdAt || "",
        updatedAt: data.updatedAt || "",
        faqCount: data.faqCount || 0,
        reviewCount: data.reviewCount || 0,
      };
    });

    // Apply client-side filters (Search across title, subtitle, slug, author)
    if (filters?.search && filters.search.trim()) {
      const term = filters.search.toLowerCase().trim();
      items = items.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          (b.subtitle && b.subtitle.toLowerCase().includes(term)) ||
          b.slug.toLowerCase().includes(term) ||
          b.authorName.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (filters?.category && filters.category !== "All") {
      items = items.filter((b) => b.category.toLowerCase() === filters.category!.toLowerCase());
    }

    // Sorting
    if (filters?.sortBy === "oldest") {
      items.sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
    } else {
      items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    }

    const total = items.length;

    // Pagination
    if (filters?.page && filters?.limit) {
      const start = (filters.page - 1) * filters.limit;
      items = items.slice(start, start + filters.limit);
    }

    return { blogs: items, total };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], total: 0 };
  }
}

/**
 * Fetches dashboard metrics for blogs
 */
export async function getBlogStats(): Promise<BlogStats> {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const snapshot = await getDocs(blogsRef);

    let totalBlogs = snapshot.size;
    let tocEnriched = 0;
    let faqsEmbedded = 0;

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const desc = data.description || "";
      if (/<h[23][^>]*>/i.test(desc)) {
        tocEnriched++;
      }
      if ((data.faqCount && data.faqCount > 0) || (data.faqs && data.faqs.length > 0)) {
        faqsEmbedded++;
      }
    });

    return { totalBlogs, tocEnriched, faqsEmbedded };
  } catch (err) {
    console.error("Error getting blog stats:", err);
    return { totalBlogs: 0, tocEnriched: 0, faqsEmbedded: 0 };
  }
}

/**
 * Fetches a single blog with its FAQs and Reviews subcollections
 */
export async function getBlogById(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, BLOGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    // Fetch FAQs subcollection
    const faqsRef = collection(db, BLOGS_COLLECTION, id, "faqs");
    const faqsSnap = await getDocs(query(faqsRef, orderBy("order", "asc")));
    const faqs: BlogFAQ[] = faqsSnap.docs.map((d) => ({
      id: d.id,
      question: d.data().question || "",
      answer: d.data().answer || "",
      order: d.data().order ?? 0,
    }));

    // Fetch Reviews subcollection
    const reviewsRef = collection(db, BLOGS_COLLECTION, id, "reviews");
    const reviewsSnap = await getDocs(reviewsRef);
    const reviews: BlogReview[] = reviewsSnap.docs.map((d) => ({
      id: d.id,
      clientName: d.data().clientName || "",
      rating: d.data().rating || 5,
      review: d.data().review || "",
      createdAt: d.data().createdAt || "",
    }));

    return {
      id: docSnap.id,
      title: data.title || "",
      subtitle: data.subtitle || "",
      slug: data.slug || "",
      category: data.category || "Web Development",
      publishDate: data.publishDate || "",
      authorName: data.authorName || "Cavue Studio Team",
      authorRole: data.authorRole || "Creative Studio",
      authorAvatar: data.authorAvatar || "",
      coverImage: data.coverImage || "",
      description: data.description || "",
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      featured: !!data.featured,
      readTime: data.readTime || calculateReadTime(data.description || ""),
      createdAt: data.createdAt || "",
      updatedAt: data.updatedAt || "",
      faqCount: faqs.length,
      reviewCount: reviews.length,
      faqs,
      reviews,
    };
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
}

/**
 * Fetches a single blog by slug with subcollections
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const blogsRef = collection(db, BLOGS_COLLECTION);
    const q = query(blogsRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return await getBlogById(docSnap.id);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

/**
 * Creates a new blog document along with its subcollections
 */
export async function createBlog(
  blogData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">,
  faqs: BlogFAQ[] = [],
  reviews: BlogReview[] = []
): Promise<string> {
  const now = new Date().toISOString();

  // Strip nofollow from internal URLs
  const cleanDescription = cleanInternalNofollow(blogData.description || "");

  // Auto-calibrate meta fields if needed
  const finalMetaTitle = blogData.metaTitle
    ? calibrateMetaTitle(blogData.metaTitle)
    : calibrateMetaTitle(blogData.title);

  const finalMetaDescription = blogData.metaDescription
    ? calibrateMetaDescription(blogData.metaDescription, blogData.title)
    : calibrateMetaDescription(cleanDescription, blogData.title);

  const finalReadTime = calculateReadTime(cleanDescription);

  const payload = {
    title: blogData.title.trim(),
    subtitle: blogData.subtitle?.trim() || "",
    slug: blogData.slug.trim().toLowerCase(),
    category: blogData.category || "Web Development",
    publishDate: blogData.publishDate || now.split("T")[0],
    authorName: blogData.authorName || "Cavue Studio Team",
    authorRole: blogData.authorRole || "Creative Studio",
    authorAvatar: blogData.authorAvatar || "",
    coverImage: blogData.coverImage || "",
    description: cleanDescription,
    metaTitle: finalMetaTitle,
    metaDescription: finalMetaDescription,
    featured: !!blogData.featured,
    readTime: finalReadTime,
    faqCount: faqs.length,
    reviewCount: reviews.length,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(collection(db, BLOGS_COLLECTION), payload);
  const blogId = docRef.id;

  // Add FAQs subcollection
  if (faqs.length > 0) {
    const faqsCol = collection(db, BLOGS_COLLECTION, blogId, "faqs");
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      if (f.question.trim() && f.answer.trim()) {
        await addDoc(faqsCol, {
          question: f.question.trim(),
          answer: f.answer.trim(),
          order: i,
        });
      }
    }
  }

  // Add Reviews subcollection
  if (reviews.length > 0) {
    const reviewsCol = collection(db, BLOGS_COLLECTION, blogId, "reviews");
    for (const r of reviews) {
      if (r.clientName.trim() && r.review.trim()) {
        await addDoc(reviewsCol, {
          clientName: r.clientName.trim(),
          rating: Number(r.rating) || 5,
          review: r.review.trim(),
          createdAt: now,
        });
      }
    }
  }

  return blogId;
}

/**
 * Updates an existing blog document and its subcollections
 */
export async function updateBlog(
  id: string,
  blogData: Partial<BlogPost>,
  faqs?: BlogFAQ[],
  reviews?: BlogReview[]
): Promise<void> {
  const now = new Date().toISOString();
  const docRef = doc(db, BLOGS_COLLECTION, id);

  const cleanDescription = blogData.description
    ? cleanInternalNofollow(blogData.description)
    : undefined;

  const updates: Record<string, any> = {
    updatedAt: now,
  };

  if (blogData.title !== undefined) updates.title = blogData.title.trim();
  if (blogData.subtitle !== undefined) updates.subtitle = blogData.subtitle.trim();
  if (blogData.slug !== undefined) updates.slug = blogData.slug.trim().toLowerCase();
  if (blogData.category !== undefined) updates.category = blogData.category;
  if (blogData.publishDate !== undefined) updates.publishDate = blogData.publishDate;
  if (blogData.authorName !== undefined) updates.authorName = blogData.authorName;
  if (blogData.authorRole !== undefined) updates.authorRole = blogData.authorRole;
  if (blogData.authorAvatar !== undefined) updates.authorAvatar = blogData.authorAvatar;
  if (blogData.coverImage !== undefined) updates.coverImage = blogData.coverImage;
  if (cleanDescription !== undefined) {
    updates.description = cleanDescription;
    updates.readTime = calculateReadTime(cleanDescription);
  }
  if (blogData.metaTitle !== undefined) {
    updates.metaTitle = calibrateMetaTitle(blogData.metaTitle);
  }
  if (blogData.metaDescription !== undefined) {
    updates.metaDescription = calibrateMetaDescription(blogData.metaDescription);
  }
  if (blogData.featured !== undefined) updates.featured = blogData.featured;

  if (faqs !== undefined) {
    updates.faqCount = faqs.length;
  }
  if (reviews !== undefined) {
    updates.reviewCount = reviews.length;
  }

  await updateDoc(docRef, updates);

  // Sync FAQs if provided
  if (faqs !== undefined) {
    const faqsCol = collection(db, BLOGS_COLLECTION, id, "faqs");
    const existingFaqs = await getDocs(faqsCol);
    for (const d of existingFaqs.docs) {
      await deleteDoc(d.ref);
    }
    for (let i = 0; i < faqs.length; i++) {
      const f = faqs[i];
      if (f.question.trim() && f.answer.trim()) {
        await addDoc(faqsCol, {
          question: f.question.trim(),
          answer: f.answer.trim(),
          order: i,
        });
      }
    }
  }

  // Sync Reviews if provided
  if (reviews !== undefined) {
    const reviewsCol = collection(db, BLOGS_COLLECTION, id, "reviews");
    const existingReviews = await getDocs(reviewsCol);
    for (const d of existingReviews.docs) {
      await deleteDoc(d.ref);
    }
    for (const r of reviews) {
      if (r.clientName.trim() && r.review.trim()) {
        await addDoc(reviewsCol, {
          clientName: r.clientName.trim(),
          rating: Number(r.rating) || 5,
          review: r.review.trim(),
          createdAt: now,
        });
      }
    }
  }
}

/**
 * Deletes a blog document, its subcollections, and all associated images in Storage
 */
export async function deleteBlog(id: string, descriptionHtml = "", coverImageUrl = ""): Promise<void> {
  // 1. Gather all storage image URLs
  const imageUrls = [
    ...extractStorageUrls(descriptionHtml),
    ...(coverImageUrl ? [coverImageUrl] : []),
  ];

  // 2. Delete images from Storage
  for (const url of imageUrls) {
    await deleteStorageFileByUrl(url);
  }

  // 3. Delete FAQs subcollection
  const faqsCol = collection(db, BLOGS_COLLECTION, id, "faqs");
  const faqsSnap = await getDocs(faqsCol);
  for (const d of faqsSnap.docs) {
    await deleteDoc(d.ref);
  }

  // 4. Delete Reviews subcollection
  const reviewsCol = collection(db, BLOGS_COLLECTION, id, "reviews");
  const reviewsSnap = await getDocs(reviewsCol);
  for (const d of reviewsSnap.docs) {
    await deleteDoc(d.ref);
  }

  // 5. Delete main blog doc
  const blogDocRef = doc(db, BLOGS_COLLECTION, id);
  await deleteDoc(blogDocRef);
}

/**
 * SEO & Text Calibration Utilities for Cavue
 */

/**
 * Strips HTML tags, decodes common HTML entities, and trims whitespace
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Strips rel="nofollow" or rel="... nofollow ..." from internal Cavue URLs and relative links
 */
export function cleanInternalNofollow(html: string): string {
  if (!html) return "";

  // Matches <a ... href="..." ...>
  return html.replace(/<a\s+([^>]*?)>/gi, (match, attributes) => {
    // Check if link is internal (relative or matches cavue domains / localhost)
    const hrefMatch = attributes.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) return match;

    const href = hrefMatch[1];
    const isInternal =
      href.startsWith("/") ||
      href.startsWith("#") ||
      /^(https?:\/\/)?(www\.)?(cavue\.(com|in|co|net|io|org|app|dev)|localhost|127\.0\.0\.1)/i.test(href);

    if (isInternal) {
      // Remove nofollow from rel attribute
      let updatedAttributes = attributes.replace(/rel=["']([^"']*)["']/i, (_relMatch: string, relValue: string) => {
        const cleanedRel = relValue
          .split(/\s+/)
          .filter((token) => token.toLowerCase() !== "nofollow")
          .join(" ")
          .trim();
        return cleanedRel ? `rel="${cleanedRel}"` : "";
      });
      return `<a ${updatedAttributes.trim()}>`;
    }

    return match;
  });
}

/**
 * Calibrates Meta Title:
 * Strictly targets 45–58 characters ending with " | Cavue"
 */
export function calibrateMetaTitle(title: string, fallback: string = "Digital Agency & Design Studio"): string {
  const brandSuffix = " | Cavue";
  const targetMin = 45;
  const targetMax = 58;

  let base = (title || fallback).trim().replace(/\s*\|\s*Cavue$/i, "").trim();

  // If too long, truncate with word boundary so total length <= targetMax
  const maxBaseLength = targetMax - brandSuffix.length;
  if (base.length > maxBaseLength) {
    let truncated = base.substring(0, maxBaseLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 20) {
      truncated = truncated.substring(0, lastSpace);
    }
    base = truncated.trim();
  }

  let finalTitle = `${base}${brandSuffix}`;

  // If shorter than targetMin, pad naturally if context allows
  if (finalTitle.length < targetMin && fallback && fallback !== base) {
    const extension = ` - ${fallback}`;
    const potential = `${base}${extension}${brandSuffix}`;
    if (potential.length <= targetMax) {
      finalTitle = potential;
    } else {
      const allowedExt = targetMax - finalTitle.length - 3;
      if (allowedExt > 8) {
        finalTitle = `${base} - ${fallback.substring(0, allowedExt).trim()}${brandSuffix}`;
      }
    }
  }

  return finalTitle;
}

/**
 * Calibrates Meta Description:
 * Keeps description strictly between 120 and 150 characters and under 940px estimated width
 */
export function calibrateMetaDescription(desc: string, titleContext?: string): string {
  const clean = stripHtml(desc || titleContext || "Explore insightful articles and web design strategies from Cavue.");
  const targetMin = 120;
  const targetMax = 150;

  if (clean.length > targetMax) {
    let truncated = clean.substring(0, targetMax);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 100) {
      truncated = truncated.substring(0, lastSpace);
    }
    // Clean trailing punctuation
    truncated = truncated.replace(/[.,;:\-\s]+$/, "");
    return `${truncated}...`;
  }

  if (clean.length < targetMin) {
    const pad = " Read our detailed guide on Cavue to transform your digital strategy today.";
    let padded = clean;
    if (!/[.!?]$/.test(padded)) padded += ".";
    padded += pad;
    if (padded.length > targetMax) {
      let truncated = padded.substring(0, targetMax);
      const lastSpace = truncated.lastIndexOf(" ");
      if (lastSpace > 100) {
        truncated = truncated.substring(0, lastSpace);
      }
      return `${truncated.replace(/[.,;:\-\s]+$/, "")}...`;
    }
    return padded;
  }

  return clean;
}

/**
 * Generates a kebab-case slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculates reading time in minutes from HTML content
 */
export function calculateReadTime(html: string): string {
  const text = stripHtml(html);
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} Min Read`;
}

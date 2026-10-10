import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "Google-Extended", "PerplexityBot", "anthropic-ai"],
        allow: "/",
        disallow: ["/admin/", "/admin/login/"],
      },
    ],
    sitemap: "https://www.cavue.com/sitemap.xml",
  };
}

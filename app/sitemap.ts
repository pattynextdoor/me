import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://patricktumbucon.com"; // adjust if needed
  const posts = getAllPosts();
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.frontmatter.updated || p.frontmatter.date) })),
  ];
}

import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static"; // build once

export async function GET() {
  const posts = getAllPosts();
  const site = "https://patricktumbucon.com"; // adjust if needed

  const items = posts.map((p) => `
    <item>
      <title><![CDATA[${p.frontmatter.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      ${p.frontmatter.description ? `<description><![CDATA[${p.frontmatter.description}]]></description>` : ""}
    </item>
  `).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Patrick Tumbucon — Blog</title>
      <link>${site}/blog</link>
      <description>Writing, notes, and case studies.</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

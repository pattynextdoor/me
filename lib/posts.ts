import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(""),
  date: z.string(),
  updated: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  coverImage: z.string().optional(),
  draft: z.boolean().optional().default(false),
  canonicalUrl: z.string().optional(),
});
export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type PostSummary = {
  slug: string;
  frontmatter: Frontmatter;
  readingTime: ReturnType<typeof readingTime>;
};

export type PostFile = PostSummary & { content: string };

function isDir(p: string) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR)
    .filter((name) => isDir(path.join(POSTS_DIR, name)));
}

export function loadPost(slug: string | undefined): PostFile | null {
  if (!slug) return null;
  const full = path.join(POSTS_DIR, slug, "index.mdx");
  if (!fs.existsSync(full)) return null;
  const source = fs.readFileSync(full, "utf8");
  const { data, content } = matter(source);
  const fm = FrontmatterSchema.parse(data);
  return {
    slug,
    frontmatter: fm,
    readingTime: readingTime(content),
    content,
  };
}

let cache: PostSummary[] | null = null;
export function getAllPosts({ includeDrafts = false }: { includeDrafts?: boolean } = {}): PostSummary[] {
  if (cache) {
    return cache.filter((p) => includeDrafts || !p.frontmatter.draft);
  }
  const posts = getPostSlugs()
    .map((slug) => loadPost(slug))
    .filter((p): p is PostFile => Boolean(p))
    .map(({ slug, frontmatter, content }) => ({
      slug,
      frontmatter,
      readingTime: readingTime(content),
    }))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  cache = posts;
  return posts.filter((p) => includeDrafts || !p.frontmatter.draft);
}

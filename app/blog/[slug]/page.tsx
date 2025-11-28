import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import path from "path";
import fs from "fs";
import Image from "next/image";
import { MDXComponents } from "@/components/MDXComponents";
import { getAllPosts, loadPost } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPost(slug);
  if (!post) return {};
  const { frontmatter } = post;
  const url = `https://patricktumbucon.com/blog/${slug}`; // adjust if needed
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: frontmatter.canonicalUrl || url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: "article",
      images: frontmatter.coverImage ? [frontmatter.coverImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug || typeof slug !== "string") return notFound();
  const post = loadPost(slug);
  if (!post || post.frontmatter.draft) return notFound();

  const { frontmatter, readingTime } = post;

  const sourcePath = path.join(process.cwd(), "content", "blog", slug, "index.mdx");
  const source = fs.readFileSync(sourcePath, "utf8");

  const { content } = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
    components: MDXComponents,
  });

  return (
    <section className="relative px-4 md:px-8 lg:px-9 pt-28 pb-16">
      <article className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4">
          <p className="text-sm text-text/60 uppercase tracking-wide">
            Blog
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text tracking-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text/60">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{Math.ceil(readingTime.minutes)} min read</span>
          </div>

          {frontmatter.coverImage && frontmatter.coverImage.startsWith("/") && (
            <div className="mt-6 overflow-hidden rounded-2xl border border-border/40 bg-dark/40">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                width={1280}
                height={720}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </header>

          {content}
        </article>
      </section>
  );
}

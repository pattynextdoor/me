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
    <section className="px-6 pt-20 pb-16">
      <article className="max-w-[680px] mx-auto">
        <a
          href="/blog"
          className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4 inline-block mb-6"
        >
          &larr; Blog
        </a>
        <header className="space-y-4 mb-10">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            {frontmatter.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-tertiary">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{Math.ceil(readingTime.minutes)} min read</span>
          </div>

          {frontmatter.coverImage && frontmatter.coverImage.startsWith("/") && (
            <div className="mt-6 overflow-hidden rounded-lg border border-border">
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

import Link from "next/link";
import { PostSummary } from "@/lib/posts";

export default function PostCard({ post }: { post: PostSummary }) {
  const { slug, frontmatter, readingTime } = post;
  return (
    <article className="border border-border/40 rounded-xl p-5 hover:border-accent/60 transition-colors">
      <h3 className="text-xl font-semibold mb-2">
        <Link href={`/blog/${slug}`} className="hover:text-accent">
          {frontmatter.title}
        </Link>
      </h3>
      {frontmatter.description && (
        <p className="text-sm text-text/80 mb-3">{frontmatter.description}</p>
      )}
      <div className="text-xs text-text/60 flex gap-3">
        <time dateTime={frontmatter.date}>{new Date(frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        <span>•</span>
        <span>{Math.ceil(readingTime.minutes)} min read</span>
      </div>
    </article>
  );
}

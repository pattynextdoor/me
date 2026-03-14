import Link from "next/link";
import { PostSummary } from "@/lib/posts";

export default function PostCard({ post }: { post: PostSummary }) {
  const { slug, frontmatter, readingTime } = post;
  return (
    <article className="py-5 border-b border-border">
      <h3 className="text-base font-medium mb-1">
        <Link href={`/blog/${slug}`} className="text-primary hover:text-secondary transition-colors">
          {frontmatter.title}
        </Link>
      </h3>
      {frontmatter.description && (
        <p className="text-sm text-secondary mb-2">{frontmatter.description}</p>
      )}
      <div className="text-xs text-tertiary flex gap-3">
        <time dateTime={frontmatter.date}>{new Date(frontmatter.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</time>
        <span>·</span>
        <span>{Math.ceil(readingTime.minutes)} min read</span>
      </div>
    </article>
  );
}

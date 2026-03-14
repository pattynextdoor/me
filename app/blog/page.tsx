import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing, notes, and case studies.",
};

export default async function BlogIndex() {
  const { isEnabled } = await draftMode();
  const posts = getAllPosts({ includeDrafts: isEnabled });

  return (
    <section className="max-w-[680px] mx-auto px-6 pt-20 pb-16">
      <a
        href="/"
        className="text-sm text-secondary hover:text-primary transition-colors duration-150 hover:underline underline-offset-4 mb-8 inline-block"
      >
        &larr; Back
      </a>
      <h1 className="text-2xl font-semibold mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-secondary">No posts yet.</p>
      ) : (
        <div className="grid gap-0">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}

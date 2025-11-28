import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing, notes, and case studies.",
};

export default async function BlogIndex() {
  const { isEnabled } = draftMode();
  const posts = getAllPosts({ includeDrafts: isEnabled });

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-text/70">No posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}

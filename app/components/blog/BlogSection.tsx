import Link from "next/link";
import BlogCard from "./BlogCard";
import { getAllPostPreviews } from "@/lib/blog";

export default async function BlogSection() {
  const posts = await getAllPostPreviews();
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-400">Blog</h2>
        <Link href="/blog" className="text-sm text-gray-300 hover:underline">
          View all
        </Link>
      </div>
      {latestPosts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        <div className="grid gap-4">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

import Link from "next/link";
import BlogCard from "@/app/components/blog/BlogCard";
import { getAllPostPreviews } from "@/lib/blog";

export const metadata = {
  title: "Blog | Joel Tan",
  description: "Notes, projects, and reflections by Joel Tan.",
};

export default async function BlogPage() {
  const posts = await getAllPostPreviews();

  return (
    <main className="p-4 max-w-3xl mx-auto mt-24">
      <Link href="/" className="text-sm text-gray-400 hover:underline">
        Back home
      </Link>
      <h1 className="text-5xl font-bold mt-4">Blog</h1>
      <p className="text-gray-300 mt-4">Writing on STEM, projects, and learning.</p>

      <section className="mt-12 grid gap-4">
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          posts.map((post) => <BlogCard key={post.slug} post={post} />)
        )}
      </section>
    </main>
  );
}

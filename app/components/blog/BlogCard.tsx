import Link from "next/link";
import type { BlogPostPreview } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPostPreview;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="border border-gray-800 p-4 hover:border-gray-600 transition-colors">
      <h3 className="text-xl font-bold mt-2">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="text-gray-300 mt-2">{post.excerpt}</p>
      {post.tags && post.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 border border-gray-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
          <p className="text-sm text-gray-400 ml-auto">{post.date}</p>
        </div>
      ) : null}
    </article>
  );
}

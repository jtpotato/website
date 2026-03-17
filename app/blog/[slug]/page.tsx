import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="p-4 max-w-3xl mx-auto mt-24">
      <Link href="/blog" className="text-sm text-gray-400 hover:underline">
        Back to blog
      </Link>
      <article className="mt-6">
        <h1 className="text-5xl font-bold">{post.frontmatter.title}</h1>
        <p className="text-gray-400 mt-2">{post.frontmatter.date}</p>
        <div className="blog-content mt-10 text-gray-200 leading-8">
          {post.content}
        </div>
      </article>
    </main>
  );
}

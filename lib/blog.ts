import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { promises as fs } from "node:fs";
import path from "node:path";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
};

export type BlogPostPreview = BlogFrontmatter & {
  slug: string;
};

function sortByNewest(a: BlogPostPreview, b: BlogPostPreview) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function getSlugFromFileName(fileName: string) {
  return fileName.replace(/\.mdx?$/, "");
}

async function getPostFiles() {
  try {
    const entries = await fs.readdir(BLOG_DIRECTORY);
    return entries.filter((entry) => entry.endsWith(".mdx"));
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}

export async function getAllPostPreviews(): Promise<BlogPostPreview[]> {
  const mdxFiles = await getPostFiles();

  const posts = await Promise.all(
    mdxFiles.map(async (fileName) => {
      const fullPath = path.join(BLOG_DIRECTORY, fileName);
      const source = await fs.readFile(fullPath, "utf8");
      const { data } = matter(source);

      return {
        slug: getSlugFromFileName(fileName),
        title: String(data.title),
        date: String(data.date),
        excerpt: String(data.excerpt),
        tags: Array.isArray(data.tags)
          ? data.tags.map((tag) => String(tag))
          : undefined,
      };
    }),
  );

  return posts.sort(sortByNewest);
}

export async function getAllPostSlugs(): Promise<string[]> {
  const entries = await getPostFiles();

  return entries.map((entry) => getSlugFromFileName(entry));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  let source: string;

  try {
    source = await fs.readFile(fullPath, "utf8");
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }

  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    content,
    frontmatter,
    slug,
  };
}

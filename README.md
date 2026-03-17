# Joel Tan - Personal Website

A personal website built with Next.js and TypeScript.

It currently includes:

- A homepage with profile information, social links, and featured external articles.
- A file-based blog section powered by MDX (`/blog` and `/blog/[slug]`).
- Existing three.js/react-three-fiber components in `app/components` for 3D experiences.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- `next-mdx-remote` (RSC mode) + `gray-matter` for MDX blog content
- three.js + react-three-fiber + drei (for 3D components)

## Project Structure

```text
app/
  blog/
    [slug]/page.tsx        # Blog post page
    page.tsx               # Blog index page
  components/
    blog/
      BlogCard.tsx         # Reusable blog preview card
      BlogSection.tsx      # Home page blog section
    ...                    # Existing site components
  globals.css
  layout.tsx
  page.tsx                 # Home page
content/
  blog/
    welcome.mdx            # Example MDX post
lib/
  blog.ts                  # Blog content loading/parsing logic
```

## Getting Started

### 1) Install dependencies

```bash
bun install
```

### 2) Run in development

```bash
bun run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `bun run dev` - Start dev server
- `bun run build` - Build for production
- `bun run start` - Run production server
- `bun run lint` - Run ESLint

## Blog Authoring (MDX)

Add posts by creating `.mdx` files in `content/blog`.

Each post should include frontmatter:

```mdx
---
title: "Post title"
date: "YYYY-MM-DD"
excerpt: "Short summary shown in cards"
tags:
  - tag-one
  - tag-two
---

Your MDX content goes here.
```

Notes:

- `slug` is derived from the file name.
  - Example: `content/blog/my-first-post.mdx` -> `/blog/my-first-post`
- Posts are sorted newest-first by `date`.
- The homepage displays the latest 3 posts.

## Deploy

Deploy as a standard Next.js app (for example on Vercel).

```bash
bun run build
bun run start
```

## Maintenance Notes

- Keep blog logic centralized in `lib/blog.ts`.
- Keep UI components split by responsibility (`BlogSection`, `BlogCard`, pages).
- If you later need syntax highlighting/remark plugins, add them inside `lib/blog.ts` where `compileMDX` is called.

# AGENTS.md

This is a living document that describes the codebase and actions for any AI agents.

## Behaviour

1. Recieve a task.
2. Execute the task, solve the user's problem. You are likely to require subagents.
3. Test the results of the task.
4. Reflect on any learnings from the task.
5. Alter AGENTS.md to reflect learnings from the task, and any patterns to keep note of for future tasks.

## Learnings

- The project is a Next.js App Router site using Bun, TypeScript, Tailwind CSS, and react-three-fiber components.
- For a simple and maintainable blog setup, keep MDX posts in `content/blog` and centralize loading/parsing logic in `lib/blog.ts`.
- `next-mdx-remote/rsc` with `compileMDX` and `gray-matter` works well here without adding `@next/mdx` plugin complexity.
- Compose blog UI from small files (`BlogSection`, `BlogCard`, list page, post page) instead of a single monolithic component.
- In Next.js async route pages, avoid wrapping JSX returns in `try/catch`; return `null`/sentinel from data helpers and call `notFound()` in the page.
- Keep homepage project tiles in a reusable `app/components/ProjectLink.tsx` component; accept optional icon content so projects without icons retain centered labels, and use square grid cells with the same hover treatment as article links.
- For separately deployed Vite apps mounted under a path on the main site, set Vite's `base` to that path and keep central routing/redirect rules in the main deployment configuration.

# Wsoft Technologies

Marketing website for Wsoft Technologies, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

- `src/app` — pages, layout, and global styles
- `src/components` — Navbar, Hero, Services, Approach, Testimonials, CTA, Footer, Logo
- `src/data/content.ts` — all site copy (services, stats, process steps, testimonials) in one place for easy editing
- `public/logo.png` — placeholder logo mark; replace with the final brand asset when available

## Editing content

Most text on the site (services, stats, testimonials) lives in [`src/data/content.ts`](src/data/content.ts) — edit there instead of hunting through components.

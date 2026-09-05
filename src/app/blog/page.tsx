import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog | Wsoft Technologies",
  description:
    "Notes on AI agents, computer vision, voice AI, and software engineering from the Wsoft Technologies team.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Blog
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ideas &amp; Insights
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Notes from the team on AI agents, computer vision, voice AI, and
            building software that actually ships.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
              >
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-600">
                    {post.category}
                  </span>
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900 transition group-hover:text-sky-600">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

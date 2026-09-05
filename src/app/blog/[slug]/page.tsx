import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Wsoft Technologies Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="rounded-full bg-sky-50 px-3 py-1 font-semibold text-sky-600">
            {post.category}
          </span>
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-5">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

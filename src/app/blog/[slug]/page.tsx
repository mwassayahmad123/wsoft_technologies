import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, contactInfo, type BlogBlock } from "@/data/content";
import { PhoneIcon, WhatsAppIcon } from "@/components/ContactIcons";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Turns inline [text](href) markers into links and **text** into bold.
function renderInline(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-slate-900">
          {bold[1]}
        </strong>
      );
    }
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    return (
      <Link
        key={i}
        href={match[2]}
        className="font-semibold text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-4 transition-colors hover:text-blue-800 hover:decoration-blue-600"
      >
        {match[1]}
      </Link>
    );
  });
}

function renderBlock(block: BlogBlock, i: number) {
  if (typeof block === "string") {
    return (
      <p key={i} className="text-base leading-relaxed text-slate-700">
        {renderInline(block)}
      </p>
    );
  }
  if ("h2" in block) {
    return (
      <h2 key={i} className="pt-6 text-2xl font-bold tracking-tight text-slate-900">
        {block.h2}
      </h2>
    );
  }
  if ("h3" in block) {
    return (
      <h3 key={i} className="pt-3 text-lg font-semibold text-slate-900">
        {block.h3}
      </h3>
    );
  }
  return (
    <ul key={i} className="list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700 marker:text-sky-500">
      {block.list.map((item) => (
        <li key={item}>{renderInline(item)}</li>
      ))}
    </ul>
  );
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
    title: post.seoTitle ?? `${post.title} | Wsoft Technologies Blog`,
    description: post.excerpt,
    openGraph: post.image ? { images: [post.image.src] } : undefined,
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

        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt ?? post.title}
            width={post.image.width}
            height={post.image.height}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="mt-8 w-full rounded-2xl border border-slate-200"
          />
        )}

        <div className="mt-8 space-y-5">{post.content.map(renderBlock)}</div>

        <div className="mt-14 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Have a project in mind?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Talk to the Wsoft Technologies team by phone or WhatsApp.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={contactInfo.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 sm:w-auto"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {contactInfo.phoneDisplay}
            </a>
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5b] sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

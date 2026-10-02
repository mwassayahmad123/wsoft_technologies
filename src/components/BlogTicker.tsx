import Image from "next/image";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/data/content";

function TickerCard({ post, hidden }: { post: BlogPost; hidden?: boolean }) {
  return (
    // Padding (not gap) keeps both halves of the track the same width, so the loop is seamless.
    <div className="w-[300px] shrink-0 pr-6 sm:w-[360px]" aria-hidden={hidden}>
      <Link
        href={`/blog/${post.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100"
      >
        {post.image ? (
          <Image
            src={post.image.src}
            alt={hidden ? "" : (post.image.alt ?? post.title)}
            width={post.image.width}
            height={post.image.height}
            sizes="360px"
            className="aspect-[16/9] w-full border-b border-slate-200 object-cover"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 px-6 text-center">
            <span className="text-lg font-bold tracking-tight text-white">
              {post.category}
            </span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="rounded-full bg-sky-50 px-2.5 py-1 font-semibold text-sky-600">
              {post.category}
            </span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-900 transition group-hover:text-sky-600">
            {post.title}
          </h3>
          <span className="mt-3 text-sm font-semibold text-sky-600">
            Read more →
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function BlogTicker() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section id="blog" className="overflow-hidden bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
            From the Blog
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Latest insights from our team
          </h2>
          <p className="mt-4 text-slate-600">
            Practical notes on software development, outsourcing, and AI.
          </p>
        </div>
      </div>

      <div className="blog-ticker relative mt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent sm:w-24"
        />
        <div className="blog-ticker-track flex w-max py-2 pl-6">
          {posts.map((post) => (
            <TickerCard key={post.slug} post={post} />
          ))}
          {posts.map((post) => (
            <TickerCard key={`${post.slug}-copy`} post={post} hidden />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
        >
          View All Posts
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

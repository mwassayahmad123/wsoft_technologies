"use client";

import { useState } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function TeamMemberCard({
  name,
  role,
  image,
  linkedin,
}: {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}) {
  const [errored, setErrored] = useState(false);

  const content = (
    <>
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name}
          onError={() => setErrored(true)}
          className="pointer-events-none h-full w-full object-cover grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-700 to-sky-500 text-4xl font-bold text-white/90 transition duration-500 group-hover:scale-110">
          {initials(name)}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity" />

      {linkedin && (
        <span className="absolute top-3 right-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#0A66C2] text-white shadow-md transition duration-300 group-hover:scale-110">
          <LinkedInIcon />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white transition-all duration-300 md:-bottom-1 md:p-6 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100">
        <span className="block h-0.5 w-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
        <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-lg font-semibold tracking-tight text-white md:text-2xl">
          {name}
        </h3>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-sky-400 md:text-sm">
          {role}
        </p>
      </div>
    </>
  );

  const className = "group relative block overflow-hidden";
  const style = { aspectRatio: "474 / 553" };

  if (linkedin) {
    return (
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${name} on LinkedIn`}
        className={`${className} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400`}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}

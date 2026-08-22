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

export default function TeamMemberCard({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="group relative overflow-hidden"
      style={{ aspectRatio: "474 / 553" }}
    >
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

      <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white transition-all duration-300 md:-bottom-1 md:p-6 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100">
        <span className="block h-0.5 w-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500" />
        <h3 className="mt-3 font-[family-name:var(--font-poppins)] text-lg font-semibold tracking-tight text-white md:text-2xl">
          {name}
        </h3>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-sky-400 md:text-sm">
          {role}
        </p>
      </div>
    </div>
  );
}

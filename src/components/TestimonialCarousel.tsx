"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/content";

const AUTO_ADVANCE_MS = 5000;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index]);

  function goTo(next: number) {
    setIndex((next + testimonials.length) % testimonials.length);
  }

  const active = testimonials[index];

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-400 hover:text-sky-600 hover:shadow-md sm:h-12 sm:w-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-xl shadow-slate-200/60"
          style={{ perspective: "1200px" }}
        >
          <div
            key={index}
            className="p-8 sm:p-12"
            style={{
              transformStyle: "preserve-3d",
              animation: "testimonial-flip 0.6s ease-out",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9 text-sky-400/70"
              fill="currentColor"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <p className="mt-4 text-lg leading-relaxed text-slate-700 sm:text-xl">
              &ldquo;{active.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-lg font-bold text-white">
                {active.name.charAt(0)}
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">
                  {active.name}
                </p>
                <p className="text-sm text-slate-500">{active.role}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-400 hover:text-sky-600 hover:shadow-md sm:h-12 sm:w-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => goTo(i)}
            aria-label={`Show testimonial from ${t.name}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-sky-500" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

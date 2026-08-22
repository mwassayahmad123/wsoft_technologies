"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/content";

const stepStyles = [
  { gradient: "from-blue-600 to-sky-400", glow: "hover:shadow-sky-200" },
  { gradient: "from-fuchsia-600 to-pink-400", glow: "hover:shadow-pink-200" },
  { gradient: "from-emerald-500 to-teal-400", glow: "hover:shadow-teal-200" },
  { gradient: "from-orange-500 to-amber-400", glow: "hover:shadow-amber-200" },
];

export default function ProcessSteps() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative grid gap-8">
      <span className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-gradient-to-b from-blue-400 via-fuchsia-400 to-amber-400 opacity-30" />

      {processSteps.map((item, i) => {
        const style = stepStyles[i % stepStyles.length];
        return (
          <div
            key={item.step}
            className={`group relative flex gap-5 transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
          >
            <span
              className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${style.gradient} text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
            >
              {item.step}
            </span>
            <div
              className={`flex-1 rounded-xl border border-transparent p-1 transition-all duration-300 group-hover:border-slate-200 group-hover:bg-white group-hover:p-4 group-hover:shadow-lg ${style.glow}`}
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

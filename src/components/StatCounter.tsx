"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1800;

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

export default function StatCounter({
  value,
  label,
  gradient,
}: {
  value: string;
  label: string;
  gradient: string;
}) {
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setCount(Math.round(target * easeOutQuint(progress)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradient}`}
      />
      <p
        className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-extrabold text-transparent tabular-nums`}
      >
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

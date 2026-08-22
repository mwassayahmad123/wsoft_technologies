import { stats } from "@/data/content";

export default function Stats() {
  return (
    <section className="bg-slate-900 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 sm:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold text-sky-400 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { aiApproach } from "@/data/content";

export default function AIApproach() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
              {aiApproach.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {aiApproach.title}
            </h2>
            <p className="mt-4 text-slate-400">{aiApproach.description}</p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {aiApproach.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-3xl font-extrabold text-transparent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {aiApproach.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-sky-400/30"
              >
                <h3 className="text-base font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

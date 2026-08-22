const features = [
  {
    label: "AI Agents",
    desc: "Automate workflows end to end.",
    gradient: "from-blue-600 to-sky-400",
  },
  {
    label: "Custom Software",
    desc: "Built for your product.",
    gradient: "from-fuchsia-600 to-pink-400",
  },
  {
    label: "Scalable Platforms",
    desc: "Architecture that grows.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    label: "Cloud & DevOps",
    desc: "Reliable, secure delivery.",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 pt-20 pb-28 lg:pt-28 lg:pb-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-500/25 blur-3xl"
        style={{ animation: "float-slow 9s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 -right-20 h-[28rem] w-[28rem] rounded-full bg-blue-600/25 blur-3xl"
        style={{ animation: "float-slow-reverse 11s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        style={{ animation: "float-slow 13s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-8">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-300"
          style={{ animation: "fade-up 0.7s ease-out both" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          SOFTWARE &amp; AI ENGINEERING PARTNER
        </span>

        <h1
          className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{ animation: "fade-up 0.7s ease-out 0.1s both" }}
        >
          Software That Ships,
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Built the Right Way.
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300"
          style={{ animation: "fade-up 0.7s ease-out 0.2s both" }}
        >
          Wsoft Technologies pairs senior engineers with modern AI tooling to
          build custom software, intelligent agents, and scalable platforms
          for startups and growing teams.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animation: "fade-up 0.7s ease-out 0.3s both" }}
        >
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400 hover:shadow-xl hover:shadow-sky-400/40 sm:w-auto"
          >
            Start a Project
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#services"
            className="w-full rounded-full border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white/5 sm:w-auto"
          >
            Explore Services
          </a>
        </div>

        <div
          className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4 sm:gap-5"
          style={{ animation: "fade-up 0.7s ease-out 0.4s both" }}
        >
          {features.map((item) => (
            <div
              key={item.label}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

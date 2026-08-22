import { approachStats } from "@/data/content";
import StatCounter from "./StatCounter";
import ProcessSteps from "./ProcessSteps";

const statGradients = [
  "from-blue-600 to-sky-400",
  "from-fuchsia-600 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
];

export default function Approach() {
  return (
    <section id="approach" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
              Our Approach
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Engineering discipline, AI-accelerated speed
            </h2>
            <p className="mt-4 text-slate-600">
              We combine senior engineering judgment with modern AI tooling
              across the workflow: from code generation to testing and
              deployment, so your project moves faster without cutting
              corners on quality.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {approachStats.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  gradient={statGradients[i % statGradients.length]}
                />
              ))}
            </div>
          </div>

          <ProcessSteps />
        </div>
      </div>
    </section>
  );
}

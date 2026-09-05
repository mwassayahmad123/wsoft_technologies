import { services, coreServiceTitles } from "@/data/content";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const coreServices = coreServiceTitles
    .map((title) => services.find((s) => s.title === title))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-600">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to build, launch, and scale
          </h2>
          <p className="mt-4 text-slate-600">
            From a first prototype to production infrastructure, our team
            covers the full lifecycle of your product.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
          >
            View All Services
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

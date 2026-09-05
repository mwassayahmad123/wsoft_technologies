import type { Metadata } from "next";
import { services } from "@/data/content";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services | Wsoft Technologies",
  description:
    "Full range of software and AI engineering services from Wsoft Technologies: AI agents, web development, computer vision, voice AI, LLM integration, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Our Services
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Everything We Build
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            From full-stack software to computer vision and voice AI, this is
            the complete range of what our team ships for clients — pick a
            service or tell us about something that doesn&apos;t fit neatly
            into a category.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

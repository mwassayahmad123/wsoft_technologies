import { contactInfo } from "@/data/content";
import { PhoneIcon, WhatsAppIcon } from "./ContactIcons";

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-950 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.25), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Let&apos;s build something worth shipping
        </h2>
        <p className="mt-4 text-slate-300">
          Tell us about your project and we&apos;ll get back to you within
          one business day.
        </p>
        <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          <a
            href={`mailto:${contactInfo.email}`}
            className="w-full rounded-full bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-400 sm:w-auto"
          >
            {contactInfo.email}
          </a>
          <a
            href={contactInfo.phoneHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-400 sm:w-auto"
          >
            <PhoneIcon className="h-4 w-4" />
            Call {contactInfo.phoneDisplay}
          </a>
          <a
            href={contactInfo.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b] sm:w-auto"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

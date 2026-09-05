import Link from "next/link";
import ServiceIcon from "./ServiceIcon";

export default function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 text-white">
        <ServiceIcon name={icon} />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
      <Link
        href="/#contact"
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100"
      >
        Learn more →
      </Link>
    </div>
  );
}

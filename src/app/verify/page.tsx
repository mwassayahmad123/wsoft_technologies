import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Verify a Certificate | Wsoft Technologies",
  description: "Check that an internship certificate was issued by Wsoft Technologies.",
};

async function lookup(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "").trim().toUpperCase();
  if (id) redirect(`/verify/${encodeURIComponent(id)}`);
}

export default function VerifyLookupPage() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Wsoft Technologies</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Verify a Certificate</h1>
        <p className="mt-2 text-sm text-slate-600">
          Scan the QR code on the certificate, or enter the Certificate ID printed on it.
        </p>
        <form action={lookup} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            name="id"
            required
            placeholder="WS-XXXX-XXXX"
            className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-center font-mono text-sm uppercase outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-left"
          />
          <button className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600">
            Verify
          </button>
        </form>
      </div>
    </section>
  );
}

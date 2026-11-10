import type { Metadata } from "next";
import Link from "next/link";
import { formatCertDate } from "@/lib/certificates/pdf";
import { getCertificate } from "@/lib/certificates/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Certificate Verification | Wsoft Technologies",
  robots: { index: false, follow: false },
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-slate-100 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-900 sm:col-span-2 sm:mt-0">{value}</dd>
    </div>
  );
}

export default async function VerifyPage({ params }: PageProps<"/verify/[id]">) {
  const { id } = await params;
  const cert = await getCertificate(decodeURIComponent(id));

  return (
    <section className="bg-slate-50 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
          Certificate Verification
        </p>

        {!cert ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
              ✕
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Certificate not found</h1>
            <p className="mt-2 text-sm text-slate-600">
              No Wsoft Technologies certificate exists with this ID. Please check the code and try again.
            </p>
          </div>
        ) : (
          <div
            className={`mt-6 overflow-hidden rounded-2xl border bg-white shadow-sm ${
              cert.status === "valid" ? "border-emerald-200" : "border-red-200"
            }`}
          >
            <div className={`px-6 py-6 text-center sm:px-8 ${cert.status === "valid" ? "bg-emerald-50" : "bg-red-50"}`}>
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white ${
                  cert.status === "valid" ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {cert.status === "valid" ? "✓" : "✕"}
              </div>
              <h1 className="mt-3 text-xl font-bold text-slate-900">
                {cert.status === "valid" ? "Verified Certificate" : "This certificate is no longer valid"}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {cert.status === "valid"
                  ? "Issued by Wsoft Technologies"
                  : "It was revoked by Wsoft Technologies."}
              </p>
            </div>

            <div className="px-6 pb-6 pt-2 sm:px-8">
              <dl>
                <Detail label="Intern" value={cert.name} />
                <Detail label="Role" value={cert.role} />
                <Detail
                  label="Internship period"
                  value={`${formatCertDate(cert.startDate)} – ${formatCertDate(cert.endDate)}`}
                />
                <Detail label="Batch" value={cert.batch} />
                <Detail label="Issued on" value={formatCertDate(cert.issuedAt.slice(0, 10))} />
                <Detail label="Certificate ID" value={cert.id} />
              </dl>

              {cert.status === "valid" && (
                <a
                  href={`/verify/${cert.id}/pdf`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
                  </svg>
                  Download Certificate (PDF)
                </a>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/verify" className="font-semibold text-sky-600 hover:text-sky-700">
            Verify another certificate
          </Link>
        </p>
      </div>
    </section>
  );
}

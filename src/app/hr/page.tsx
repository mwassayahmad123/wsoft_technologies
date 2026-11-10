import type { Metadata } from "next";
import { currentHrUser, isPortalConfigured } from "@/lib/certificates/auth";
import { listCertificates } from "@/lib/certificates/store";
import { logout } from "./actions";
import LoginForm from "./LoginForm";
import IssueForms from "./IssueForms";
import CertificateTable from "./CertificateTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HR Portal | Wsoft Technologies",
  robots: { index: false, follow: false },
};

export default async function HrPage() {
  if (!isPortalConfigured()) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">HR Portal is not set up yet</h1>
        <p className="mt-3 text-slate-600">
          Add the <code>HR_WSoft</code> and <code>HR_SESSION_SECRET</code> environment variables on Netlify,
          then redeploy.
        </p>
      </section>
    );
  }

  const user = await currentHrUser();
  if (!user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-20">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Wsoft Technologies</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">HR Portal</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to issue internship certificates.</p>
          <LoginForm />
        </div>
      </section>
    );
  }

  const certificates = await listCertificates();
  const valid = certificates.filter((c) => c.status === "valid").length;

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">HR Portal</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Internship Certificates</h1>
            <p className="mt-1 text-sm text-slate-500">
              Signed in as <span className="font-semibold text-slate-700">{user}</span> · {valid} valid ·{" "}
              {certificates.length - valid} revoked
            </p>
          </div>
          <form action={logout}>
            <button className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
              Sign out
            </button>
          </form>
        </div>

        <IssueForms />
        <CertificateTable certificates={certificates} />
      </div>
    </section>
  );
}

"use client";

import { useActionState, useState } from "react";
import { issueBulk, issueCertificate, type FormState } from "./actions";

const input =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

function Result({ state }: { state: FormState }) {
  if (state.error) return <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>;
  if (!state.success) return null;
  return (
    <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
      <p className="font-semibold">{state.success}</p>
      {state.issuedIds && state.issuedIds.length <= 10 && (
        <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {state.issuedIds.map((id) => (
            <a key={id} href={`/verify/${id}/pdf`} className="font-mono underline">
              {id} ↓
            </a>
          ))}
        </p>
      )}
    </div>
  );
}

export default function IssueForms() {
  const [tab, setTab] = useState<"single" | "bulk">("single");
  const [single, singleAction, singlePending] = useActionState<FormState, FormData>(issueCertificate, {});
  const [bulk, bulkAction, bulkPending] = useActionState<FormState, FormData>(issueBulk, {});

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex gap-2">
        {(["single", "bulk"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t === "single" ? "Issue one certificate" : "Issue a whole batch"}
          </button>
        ))}
      </div>

      {tab === "single" ? (
        <form action={singleAction} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Intern full name</span>
            <input name="name" required placeholder="e.g. Ayesha Khan" className={input} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Internship role</span>
            <input name="role" required placeholder="e.g. Social Media Marketing Intern" className={input} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Start date</span>
            <input name="startDate" type="date" required className={input} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">End date</span>
            <input name="endDate" type="date" required className={input} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Batch</span>
            <input name="batch" required defaultValue="Internship Batch 1 (2026)" className={input} />
          </label>
          <div className="space-y-3 sm:col-span-2">
            <Result state={single} />
            <button
              disabled={singlePending}
              className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
            >
              {singlePending ? "Issuing…" : "Issue certificate"}
            </button>
          </div>
        </form>
      ) : (
        <form action={bulkAction} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Batch</span>
            <input name="batch" required defaultValue="Internship Batch 1 (2026)" className={input} />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Interns (one per line)</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Name, Role, Start date, End date. Dates as YYYY-MM-DD. You can copy 4 columns straight from Excel.
            </span>
            <textarea
              name="rows"
              rows={7}
              required
              placeholder={"Ayesha Khan, Social Media Marketing Intern, 2026-08-01, 2026-10-31\nAli Raza, Web Development Intern, 2026-08-01, 2026-10-31"}
              className={`${input} font-mono`}
            />
          </label>
          <Result state={bulk} />
          <button
            disabled={bulkPending}
            className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
          >
            {bulkPending ? "Issuing…" : "Issue all certificates"}
          </button>
        </form>
      )}
    </div>
  );
}

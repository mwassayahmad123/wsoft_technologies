"use client";

import { useMemo, useState, useTransition } from "react";
import type { Certificate } from "@/lib/certificates/store";
import { removeCertificate, setRevoked } from "./actions";

function fmt(date: string) {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function CertificateTable({ certificates }: { certificates: Certificate[] }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter((c) =>
      [c.name, c.role, c.batch, c.id].some((v) => v.toLowerCase().includes(q)),
    );
  }, [certificates, query]);

  function copyLink(id: string) {
    navigator.clipboard?.writeText(`${window.location.origin}/verify/${id}`);
    setCopied(id);
    setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500);
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-4 sm:p-5">
        <h2 className="text-lg font-bold text-slate-900">Issued certificates</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role, batch or ID"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:w-72"
        />
      </div>

      {rows.length === 0 ? (
        <p className="p-8 text-center text-sm text-slate-500">
          {certificates.length ? "No certificates match your search." : "No certificates issued yet."}
        </p>
      ) : (
        <div className={`overflow-x-auto ${pending ? "opacity-60" : ""}`}>
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Intern</th>
                <th className="px-4 py-3 font-semibold">Period</th>
                <th className="px-4 py-3 font-semibold">Certificate ID</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((c) => (
                <tr key={c.id} className="align-top">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500">
                      {c.role} · {c.batch}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {fmt(c.startDate)} – {fmt(c.endDate)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{c.id}</td>
                  <td className="px-4 py-3">
                    {c.status === "valid" ? (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Valid
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                        Revoked
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-xs font-semibold">
                      {c.status === "valid" && (
                        <a href={`/verify/${c.id}/pdf`} className="text-sky-600 hover:text-sky-800">
                          Download PDF
                        </a>
                      )}
                      <a href={`/verify/${c.id}`} target="_blank" className="text-slate-600 hover:text-slate-900">
                        View
                      </a>
                      <button onClick={() => copyLink(c.id)} className="text-slate-600 hover:text-slate-900">
                        {copied === c.id ? "Copied!" : "Copy link"}
                      </button>
                      <button
                        disabled={pending}
                        onClick={() => {
                          const revoke = c.status === "valid";
                          if (revoke && !confirm(`Revoke ${c.name}'s certificate? Its QR will show "Not valid".`)) return;
                          startTransition(() => setRevoked(c.id, revoke));
                        }}
                        className={c.status === "valid" ? "text-amber-600 hover:text-amber-800" : "text-emerald-600 hover:text-emerald-800"}
                      >
                        {c.status === "valid" ? "Revoke" : "Restore"}
                      </button>
                      <button
                        disabled={pending}
                        onClick={() => {
                          if (!confirm(`Delete ${c.name}'s certificate permanently? Use this only for mistakes.`)) return;
                          startTransition(() => removeCertificate(c.id));
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

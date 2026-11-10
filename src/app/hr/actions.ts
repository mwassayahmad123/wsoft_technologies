"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, endSession, requireHrUser, startSession } from "@/lib/certificates/auth";
import {
  deleteCertificate,
  getCertificate,
  newCertificateId,
  saveCertificate,
  type Certificate,
} from "@/lib/certificates/store";

export type FormState = { error?: string; success?: string; issuedIds?: string[] };

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = checkCredentials(String(formData.get("username") ?? ""), String(formData.get("password") ?? ""));
  if (!user) {
    await new Promise((r) => setTimeout(r, 800)); // slow down password guessing
    return { error: "Username or password is incorrect." };
  }
  await startSession(user);
  redirect("/hr");
}

export async function logout() {
  await endSession();
  redirect("/hr");
}

// The PDF uses standard fonts, which cover English letters and common accents only.
const PRINTABLE = /^[\x20-\x7E -ÿ]+$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

type Draft = Pick<Certificate, "name" | "role" | "batch" | "startDate" | "endDate">;

function validate(d: Draft, label = ""): string | null {
  for (const [field, value] of Object.entries(d)) {
    if (!value) return `${label}${field} is required.`;
    if (value.length > 120) return `${label}${field} is too long.`;
    if (!PRINTABLE.test(value)) return `${label}${field} must use English letters only.`;
  }
  if (!DATE.test(d.startDate) || !DATE.test(d.endDate)) return `${label}dates must be YYYY-MM-DD.`;
  if (Number.isNaN(Date.parse(d.startDate)) || Number.isNaN(Date.parse(d.endDate))) return `${label}invalid date.`;
  if (d.endDate < d.startDate) return `${label}end date is before start date.`;
  return null;
}

async function issue(d: Draft, issuedBy: string): Promise<string> {
  const id = await newCertificateId();
  await saveCertificate({ ...d, id, issuedBy, issuedAt: new Date().toISOString(), status: "valid" });
  return id;
}

const field = (fd: FormData, key: string) => String(fd.get(key) ?? "").replace(/\s+/g, " ").trim();

export async function issueCertificate(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireHrUser();
  const draft: Draft = {
    name: field(formData, "name"),
    role: field(formData, "role"),
    batch: field(formData, "batch"),
    startDate: field(formData, "startDate"),
    endDate: field(formData, "endDate"),
  };
  const error = validate(draft);
  if (error) return { error };
  const id = await issue(draft, user);
  revalidatePath("/hr");
  return { success: `Certificate issued for ${draft.name} (${id}).`, issuedIds: [id] };
}

/**
 * Bulk issue. One intern per line, comma separated (can be pasted straight from Excel/Google Sheets as CSV):
 *   Name, Role, Start date, End date
 * The batch name is shared and comes from its own field.
 */
export async function issueBulk(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireHrUser();
  const batch = field(formData, "batch");
  const rows = String(formData.get("rows") ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !/^name\s*[,\t]/i.test(l)); // skip a header row if pasted

  if (!rows.length) return { error: "Paste at least one row." };
  if (rows.length > 200) return { error: "Maximum 200 rows at a time." };

  const drafts: Draft[] = [];
  for (const [i, line] of rows.entries()) {
    const cols = line.split(/\t|,/).map((c) => c.replace(/\s+/g, " ").trim());
    if (cols.length !== 4) return { error: `Row ${i + 1}: expected 4 columns (Name, Role, Start, End).` };
    const d: Draft = { name: cols[0], role: cols[1], batch, startDate: cols[2], endDate: cols[3] };
    const error = validate(d, `Row ${i + 1}: `);
    if (error) return { error };
    drafts.push(d);
  }

  const issuedIds: string[] = [];
  for (const d of drafts) issuedIds.push(await issue(d, user));
  revalidatePath("/hr");
  return { success: `${issuedIds.length} certificates issued.`, issuedIds };
}

export async function setRevoked(id: string, revoked: boolean) {
  await requireHrUser();
  const cert = await getCertificate(id);
  if (!cert) return;
  await saveCertificate(
    revoked
      ? { ...cert, status: "revoked", revokedAt: new Date().toISOString() }
      : { ...cert, status: "valid", revokedAt: undefined },
  );
  revalidatePath("/hr");
}

export async function removeCertificate(id: string) {
  await requireHrUser();
  await deleteCertificate(id);
  revalidatePath("/hr");
}

import "server-only";
import { randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type CertificateStatus = "valid" | "revoked";

export type Certificate = {
  id: string;
  name: string;
  role: string;
  batch: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  issuedAt: string; // ISO timestamp
  issuedBy: string;
  status: CertificateStatus;
  revokedAt?: string;
};

/*
 * Storage:
 * - Production (Netlify): Netlify Blobs, which every Netlify site has built in. No extra account needed.
 * - Local development: a JSON file in .data/ (git-ignored).
 */
const useFileStore =
  process.env.NODE_ENV === "development" || process.env.CERT_STORAGE === "file";

const FILE_PATH = path.join(process.cwd(), ".data", "certificates.json");
const KEY_PREFIX = "cert/";

async function readFileStore(): Promise<Record<string, Certificate>> {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf8"));
  } catch {
    return {};
  }
}

async function writeFileStore(data: Record<string, Certificate>) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

async function blobStore() {
  const { getStore } = await import("@netlify/blobs");
  // Default (eventual) consistency: "strong" needs an uncachedEdgeURL that the Next.js runtime doesn't always provide.
  return getStore("internship-certificates");
}

export async function getCertificate(id: string): Promise<Certificate | null> {
  const key = normalizeId(id);
  if (!key) return null;
  if (useFileStore) return (await readFileStore())[key] ?? null;
  const store = await blobStore();
  return ((await store.get(KEY_PREFIX + key, { type: "json" })) as Certificate | null) ?? null;
}

export async function saveCertificate(cert: Certificate) {
  if (useFileStore) {
    const data = await readFileStore();
    data[cert.id] = cert;
    await writeFileStore(data);
    return;
  }
  const store = await blobStore();
  await store.setJSON(KEY_PREFIX + cert.id, cert);
}

export async function deleteCertificate(id: string) {
  if (useFileStore) {
    const data = await readFileStore();
    delete data[id];
    await writeFileStore(data);
    return;
  }
  const store = await blobStore();
  await store.delete(KEY_PREFIX + id);
}

export async function listCertificates(): Promise<Certificate[]> {
  let certs: Certificate[];
  if (useFileStore) {
    certs = Object.values(await readFileStore());
  } else {
    const store = await blobStore();
    const { blobs } = await store.list({ prefix: KEY_PREFIX });
    certs = (
      await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" }) as Promise<Certificate | null>))
    ).filter((c): c is Certificate => c !== null);
  }
  return certs.sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}

// Random, non-sequential IDs such as WS-7K3P-9XQ2, so nobody can guess other interns' certificates.
// The alphabet skips look-alike characters (0/O, 1/I/L).
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export async function newCertificateId(): Promise<string> {
  for (;;) {
    const bytes = randomBytes(8);
    const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
    const id = `WS-${chars.slice(0, 4)}-${chars.slice(4)}`;
    if (!(await getCertificate(id))) return id;
  }
}

export function normalizeId(id: string): string | null {
  const clean = id.trim().toUpperCase();
  return /^WS-[2-9A-HJKMNP-Z]{4}-[2-9A-HJKMNP-Z]{4}$/.test(clean) ? clean : null;
}

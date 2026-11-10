import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/*
 * HR accounts come from the HR_WSoft environment variable (set on Netlify, never in code):
 *   HR_WSoft = "username:password,username2:password2"   (or just "password" for username "hr")
 * Sessions are signed with HR_SESSION_SECRET (any long random string).
 */
const COOKIE_NAME = "wsoft_hr_session";
const SESSION_HOURS = 12;

function accounts(): Map<string, string> {
  const map = new Map<string, string>();
  // HR_WSoft is the name used on Netlify; HR_ACCOUNTS is kept as an alias.
  const raw = process.env.HR_WSoft ?? process.env.HR_ACCOUNTS ?? "";
  for (const entry of raw.split(",")) {
    const sep = entry.indexOf(":");
    // An entry without "username:" is treated as the password for the default "hr" user.
    const user = sep > 0 ? entry.slice(0, sep).trim().toLowerCase() : "hr";
    const pass = (sep > 0 ? entry.slice(sep + 1) : entry).trim();
    if (user && pass) map.set(user, pass);
  }
  return map;
}

function secret(): string {
  const s = process.env.HR_SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("HR_SESSION_SECRET is not set (needs 16+ characters).");
  return s;
}

export function isPortalConfigured() {
  return accounts().size > 0 && (process.env.HR_SESSION_SECRET ?? "").length >= 16;
}

function safeEqual(a: string, b: string) {
  const ha = createHmac("sha256", "cmp").update(a).digest();
  const hb = createHmac("sha256", "cmp").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function checkCredentials(username: string, password: string): string | null {
  const user = username.trim().toLowerCase();
  const expected = accounts().get(user);
  // Always compare, even for unknown users, so response time doesn't reveal which usernames exist.
  const ok = safeEqual(password, expected ?? "\u0000invalid");
  return ok && expected ? user : null;
}

export async function startSession(user: string) {
  const exp = Date.now() + SESSION_HOURS * 3600 * 1000;
  const payload = Buffer.from(JSON.stringify({ u: user, exp })).toString("base64url");
  (await cookies()).set(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE_NAME);
}

/** Returns the logged-in HR username, or null. */
export async function currentHrUser(): Promise<string | null> {
  if (!isPortalConfigured()) return null;
  const raw = (await cookies()).get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [payload, sig] = raw.split(".");
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return null;
  try {
    const { u, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    // A user removed from HR_ACCOUNTS loses access immediately.
    if (typeof u !== "string" || Date.now() > exp || !accounts().has(u)) return null;
    return u;
  } catch {
    return null;
  }
}

export async function requireHrUser(): Promise<string> {
  const user = await currentHrUser();
  if (!user) throw new Error("Not authorized");
  return user;
}

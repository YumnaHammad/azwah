/** Edge-safe session token helpers (no Node.js `crypto`). */

export const COOKIE_NAME = "azwah_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "azwah2026";
}

function getSecret() {
  return process.env.ADMIN_SECRET || "azwah-admin-secret-change-me";
}

export async function createSessionToken(): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(getAdminPassword())
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyPassword(password: string): boolean {
  return password === getAdminPassword();
}

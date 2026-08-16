import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE_NAME = "admin_session";
const ADMIN_SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export type AdminSessionPayload = {
  adminId: string;
  email: string;
  expiresAt: string;
};

function getSessionSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return new TextEncoder().encode(secret);
}

/** Signs an admin session payload into a compact JWT. */
export async function encryptAdminSession(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecretKey());
}

/**
 * Verifies a session JWT and returns its payload, or null if the token is
 * missing, expired, or has been tampered with. Never throws.
 */
export async function decryptAdminSession(
  sessionToken: string | undefined,
): Promise<AdminSessionPayload | null> {
  if (!sessionToken) return null;
  try {
    const { payload } = await jwtVerify(sessionToken, getSessionSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

/** Signs in an admin by writing a signed session cookie. */
export async function createAdminSession(adminId: string, email: string) {
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_MS);
  const sessionToken = await encryptAdminSession({
    adminId,
    email,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

/** Reads the raw session cookie value for the current request. */
export async function readAdminSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
}

/** Signs out the current admin by deleting the session cookie. */
export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
}

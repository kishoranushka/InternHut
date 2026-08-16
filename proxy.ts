import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, decryptAdminSession } from "@/lib/session";

/**
 * Optimistic gate for /admin/**: redirects to /admin/login when there is no
 * valid session cookie. This only reads the cookie (no database call) so it
 * stays fast on every request. The real, authoritative check happens in the
 * Data Access Layer (lib/dal.ts) used by every admin page/action.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = await decryptAdminSession(sessionToken);

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

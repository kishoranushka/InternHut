import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  decryptAdminSession,
  STUDENT_SESSION_COOKIE_NAME,
  decryptStudentSession,
} from "@/lib/session";

/**
 * Optimistic gate for /admin/** and /dashboard/**: redirects to the relevant
 * login page when there is no valid session cookie. This only reads the
 * cookie (no database call) so it stays fast on every request. The real,
 * authoritative check happens in the Data Access Layer (lib/dal.ts) used by
 * every admin/student page and action.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
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

  const sessionToken = request.cookies.get(STUDENT_SESSION_COOKIE_NAME)?.value;
  const session = await decryptStudentSession(sessionToken);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

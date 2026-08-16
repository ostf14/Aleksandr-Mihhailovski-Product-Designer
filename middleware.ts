import { NextResponse, type NextRequest } from "next/server";
import { isWipRoute, WIP_PREVIEW_COOKIE } from "@/lib/site";

/** Visiting this grants preview access; append /off to give it back. */
const UNLOCK_PATH = "/underconstr";
const LOCK_PATH = "/underconstr/off";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

/**
 * Keeps unfinished routes away from visitors.
 *
 * Anything still listed in WIP_ROUTES is redirected to /work before it
 * renders, so a half-built page is never sent to someone who just wants to
 * see the portfolio. This replaces the client-side cover screen, which still
 * shipped the page and only hid it after the fact.
 *
 * Preview works by cookie rather than by a /underconstr/<slug> prefix: under
 * a prefix every in-page link still points at the ordinary path, so the first
 * click would bounce you straight back out. With the cookie set, the whole
 * site simply behaves normally.
 *
 * The unlock path is a convenience, not a secret — this repository is public.
 * It keeps unfinished pages away from ordinary visitors, and nothing more.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === LOCK_PATH) {
    const response = NextResponse.redirect(new URL("/work", request.url));
    response.cookies.delete(WIP_PREVIEW_COOKIE);
    return response;
  }

  if (pathname === UNLOCK_PATH) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set(WIP_PREVIEW_COOKIE, "1", {
      path: "/",
      sameSite: "lax",
      maxAge: THIRTY_DAYS,
    });
    return response;
  }

  if (!isWipRoute(pathname)) return NextResponse.next();

  if (request.cookies.get(WIP_PREVIEW_COOKIE)?.value === "1") {
    return NextResponse.next();
  }

  // Temporary: these routes come back the moment their content lands, and a
  // cached permanent redirect would be very hard to take back.
  return NextResponse.redirect(new URL("/work", request.url));
}

export const config = {
  // Everything except Next's own assets, the OG endpoint and anything with a
  // file extension — those must never be bounced.
  matcher: ["/((?!_next/static|_next/image|api/|favicon.ico|.*\\.).*)"],
};

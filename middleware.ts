import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authCookie = req.cookies.get("auth");
  const isLoggedIn = authCookie?.value === "true";

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!isLoggedIn && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

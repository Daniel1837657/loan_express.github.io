import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken, COOKIE_NAME } from "@/lib/auth/jwt";

const publicPaths = [
  "/",
  "/login",
  "/registro",
  "/recover",
  "/api/auth",
  "/api/contact",
  "/favicon.ico",
  "/robots.txt",
  "/_next",
  "/static"
];

function isPublicPath(pathname: string) {
  return publicPaths.some((path) => pathname === path || pathname.startsWith(path));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    // For API routes, return 401 instead of redirect
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const payload = await verifyAuthToken(token);

    if (pathname.startsWith("/cliente") && payload.role !== "cliente") {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    // For API routes, return 401 instead of redirect
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/cliente/:path*", "/admin/:path*", "/api/:path*"]
};

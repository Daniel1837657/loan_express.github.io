import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, verifyAuthToken, COOKIE_NAME } from "./jwt";
import { hashPassword, verifyPassword } from "./password";

export { hashPassword, verifyPassword, signAuthToken, verifyAuthToken, COOKIE_NAME };

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser() {
  const token = await getAuthTokenFromCookies();

  if (!token) return null;

  try {
    const payload = await verifyAuthToken(token);
    const user = await prisma.usuario.findUnique({
      where: { id: payload.userId },
      include: { cliente: true }
    });
    return user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  
  return user;
}

export async function requireRole(role: string) {
  const user = await requireAuth();
  
  if (user.role !== role) {
    throw new Error("FORBIDDEN");
  }
  
  return user;
}

export function createAuthCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7
  };
}

export function clearAuthCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0
  };
}

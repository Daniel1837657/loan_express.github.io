import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
export const COOKIE_NAME = "loan_express_token";
const TOKEN_EXPIRES_IN = "7d";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function signAuthToken(payload: { userId: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string; iat: number; exp: number };
}

export async function getAuthTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser() {
  const token = await getAuthTokenFromCookies();

  if (!token) return null;

  try {
    const payload = verifyAuthToken(token);
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

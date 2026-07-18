import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, createAuthCookie } from "@/lib/auth/auth";
import getSupabase from "@/lib/supabase";
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }

  // Rate limiting: 5 attempts per minute per email/IP combination
  const identifier = getRateLimitIdentifier(request, email);
  const rateLimitResult = rateLimit(identifier, 5, 60 * 1000);
  
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: rateLimitResult.error }, { status: 429 });
  }

  // Authenticate with Supabase
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message || "Credenciales inválidas." }, { status: 401 });
  }

  const supabaseUser = data.user;

  // Find existing user or create new one
  let user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user) {
    // Create new user with default role
    user = await prisma.usuario.create({
      data: {
        email,
        password: "",
        role: "cliente"
      }
    });
  }
  // If user exists, preserve existing role - do not modify privileges

  if (supabaseUser?.id) {
    await prisma.usuario.update({ where: { id: user.id }, data: { supabaseId: supabaseUser.id } });
  }

  const token = await signAuthToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}

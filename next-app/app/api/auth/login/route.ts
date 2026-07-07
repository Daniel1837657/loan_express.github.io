import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, createAuthCookie } from "@/lib/auth/auth";
import getSupabase from "@/lib/supabase";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }

  // Authenticate with Supabase
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return NextResponse.json({ error: error?.message || "Credenciales inválidas." }, { status: 401 });
  }

  const supabaseUser = data.user;

  // find or create local user
  const user = await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: { email, password: "", role: "cliente" }
  });

  if (supabaseUser?.id) {
    await prisma.usuario.update({ where: { id: user.id }, data: ({ supabaseId: supabaseUser.id } as unknown) as any });
  }

  const token = signAuthToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, createAuthCookie } from "@/lib/auth/auth";
import getSupabase from "@/lib/supabase";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }

  // Use Supabase to create the auth user
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const supabaseUser = data.user;

  // create or upsert local user linked to supabase id
  const user = await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: "",
      role: "cliente"
    }
  });

  if (supabaseUser?.id) {
    await prisma.usuario.update({ where: { id: user.id }, data: ({ supabaseId: supabaseUser.id } as unknown) as any });
  }

  // create empty cliente record if missing
  const existingCliente = await prisma.cliente.findUnique({ where: { userId: user.id } });
  if (!existingCliente) {
    await prisma.cliente.create({
      data: {
        userId: user.id,
        firstName: "",
        lastName: "",
        phone: "",
        docType: "",
        docNumber: "",
        birthDate: new Date("1900-01-01"),
        originCountry: "",
        address: "",
        occupation: "",
        company: "",
        monthlyIncome: 0
      }
    });
  }

  const token = signAuthToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}

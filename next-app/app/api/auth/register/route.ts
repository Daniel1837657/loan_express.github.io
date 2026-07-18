import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, createAuthCookie } from "@/lib/auth/auth";
import getSupabase from "@/lib/supabase";
import { isValidCountryCode } from "@/lib/constants/countries";
import { sendWelcomeEmail } from "@/lib/email/resend";

// Password validation regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)." }, { status: 400 });
  }

  // Use Supabase to create the auth user
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const supabaseUser = data.user;

  // Check if user already exists
  const existingUser = await prisma.usuario.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ error: "El usuario ya existe" }, { status: 409 });
  }

  // Create new user
  const user = await prisma.usuario.create({
    data: {
      email,
      password: "",
      role: "cliente"
    }
  });

  if (supabaseUser?.id) {
    await prisma.usuario.update({ where: { id: user.id }, data: { supabaseId: supabaseUser.id } });
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

  // Send welcome email
  try {
    await sendWelcomeEmail(user.email);
  } catch (emailError) {
    console.error('Failed to send welcome email:', emailError);
    // Continue with registration even if email fails
  }

  const token = signAuthToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}

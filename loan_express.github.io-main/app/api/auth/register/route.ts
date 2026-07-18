import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { signAuthToken, createAuthCookie } from "@/lib/auth/auth";
import getSupabase from "@/lib/supabase";
import { isValidCountryCode } from "@/lib/constants/countries";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { validatePassword } from "@/lib/validations/password";
import { rateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
  }

  if (!validatePassword(password)) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)." }, { status: 400 });
  }

  // Rate limiting: 3 registrations per minute per IP
  const identifier = getRateLimitIdentifier(request);
  const rateLimitResult = rateLimit(identifier, 3, 60 * 1000);
  
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: rateLimitResult.error }, { status: 429 });
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

  const token = await signAuthToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  response.cookies.set(createAuthCookie(token));

  return response;
}

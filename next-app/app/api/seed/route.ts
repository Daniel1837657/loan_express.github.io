import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    await prisma.usuario.createMany({
      data: [
        { email: "admin@loanexpress.com", password: "admin123", role: "admin" }
      ],
      skipDuplicates: true
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/auth";

// GET /api/clientes - List all clientes (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole("admin");

    const clientes = await prisma.cliente.findMany({
      include: {
        user: true,
        solicitudes: {
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ clientes });
  } catch (err) {
    if (err instanceof Error && (err.message === "UNAUTHORIZED" || err.message === "FORBIDDEN")) {
      return NextResponse.json({ error: err.message === "FORBIDDEN" ? "Forbidden" : "Unauthorized" }, { status: err.message === "FORBIDDEN" ? 403 : 401 });
    }
    console.error("/api/clientes GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

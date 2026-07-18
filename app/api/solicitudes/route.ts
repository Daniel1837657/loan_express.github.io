import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireAuth, requireRole } from "@/lib/auth/auth";
import { validateFile, generateSecureFilename, ALLOWED_MIME_TYPES } from "@/lib/utils/file-validation";

const solicitudSchema = z.object({
  productId: z.enum(["personal", "libre"]),
  amount: z.number().int().positive(),
  term: z.number().int().positive(),
  clientNotes: z.string().max(500).optional(),
  documents: z.array(
    z.object({
      type: z.string().nonempty(),
      name: z.string().nonempty(),
      size: z.number().int().positive(),
      mime: z.enum(ALLOWED_MIME_TYPES),
      url: z.string().url().optional()
    })
  ).optional()
});

const rateByProduct = {
  personal: 1.3,
  libre: 1.5
};

// GET /api/solicitudes - List solicitudes (cliente: own, admin: all with optional status filter)
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    if (user.role === "admin") {
      // Admin can see all solicitudes with optional status filter
      const where = statusFilter ? { status: statusFilter as any } : {};
      
      const solicitudes = await prisma.solicitud.findMany({
        where,
        include: {
          cliente: {
            include: {
              user: true
            }
          },
          documents: true,
          history: {
            orderBy: { date: "desc" }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ solicitudes });
    } else {
      // Cliente can only see their own solicitudes
      const cliente = await prisma.cliente.findUnique({
        where: { userId: user.id }
      });

      if (!cliente) {
        return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
      }

      const where = statusFilter 
        ? { clienteId: cliente.id, status: statusFilter as any }
        : { clienteId: cliente.id };

      const solicitudes = await prisma.solicitud.findMany({
        where,
        include: {
          documents: true,
          history: {
            orderBy: { date: "desc" }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      return NextResponse.json({ solicitudes });
    }
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("/api/solicitudes GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    
    const body = await request.json();
    const result = solicitudSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { productId, amount, term, clientNotes, documents } = result.data;

    // Validate documents if provided
    if (documents && documents.length > 0) {
      for (const doc of documents) {
        // Note: In a real implementation, you would validate the actual file buffer
        // Here we validate the metadata since files are uploaded separately
        if (!ALLOWED_MIME_TYPES.includes(doc.mime as any)) {
          return NextResponse.json({ 
            error: `Invalid file type: ${doc.mime}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}` 
          }, { status: 400 });
        }
      }
    }

    const cliente = await prisma.cliente.findUnique({
      where: { userId: user.id },
      include: { user: true }
    });

    if (!cliente) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }

    const number = `LE-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`;
    const rate = rateByProduct[productId];
    
    if (!rate) {
      return NextResponse.json({ error: "Producto inválido" }, { status: 400 });
    }

    const solicitud = await prisma.solicitud.create({
    data: {
      number,
      clienteId: cliente.id,
      productId,
      amount,
      term,
      rate,
      status: "enviada",
      clientNotes,
      documents: documents
        ? {
            create: documents.map((document) => ({
              type: document.type,
              name: document.name,
              size: document.size,
              mime: document.mime,
              url: document.url ?? ""
            }))
          }
        : undefined,
      history: {
        create: {
          from: "borrador",
          to: "enviada",
          by: cliente.user.email,
          comment: "Solicitud enviada por cliente"
        }
      }
    },
    include: {
      cliente: true,
      documents: true,
      history: true
    }
  });

    return NextResponse.json({ success: true, solicitud });
  } catch (err) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Log for local debugging and return error message
    // eslint-disable-next-line no-console
    console.error("/api/solicitudes error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

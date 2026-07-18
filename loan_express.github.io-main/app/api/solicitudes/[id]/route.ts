import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/auth/auth";
import { sendStatusChangeEmail } from "@/lib/email/resend";

const updateSchema = z.object({
  status: z.enum(["borrador", "enviada", "documentacion_pendiente", "en_revision", "aprobada", "rechazada", "cancelada"]),
  adminNotes: z.string().max(1000).optional()
});

// PATCH /api/solicitudes/[id] - Update solicitud status (admin only)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const user = await requireRole("admin");
    
    const body = await request.json();
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { status, adminNotes } = result.data;

    // Get current solicitud
    const solicitud = await prisma.solicitud.findUnique({
      where: { id },
      include: {
        cliente: {
          include: {
            user: true
          }
        }
      }
    });

    if (!solicitud) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }

    const oldStatus = solicitud.status;

    // Update solicitud
    const updatedSolicitud = await prisma.solicitud.update({
      where: { id },
      data: {
        status,
        adminNotes,
        history: {
          create: {
            from: oldStatus,
            to: status,
            by: user.email,
            comment: adminNotes || `Estado cambiado de ${oldStatus} a ${status}`
          }
        }
      },
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
      }
    });

    // Send status change email
    try {
      await sendStatusChangeEmail({
        email: solicitud.cliente.user.email,
        name: `${solicitud.cliente.firstName} ${solicitud.cliente.lastName}`,
        solicitudNumber: solicitud.number,
        oldStatus,
        newStatus: status,
        adminNotes
      });
    } catch (emailError) {
      console.error('Failed to send status change email:', emailError);
      // Continue with the update even if email fails
    }

    return NextResponse.json({ success: true, solicitud: updatedSolicitud });
  } catch (err) {
    if (err instanceof Error && (err.message === "UNAUTHORIZED" || err.message === "FORBIDDEN")) {
      return NextResponse.json({ error: err.message === "FORBIDDEN" ? "Forbidden" : "Unauthorized" }, { status: err.message === "FORBIDDEN" ? 403 : 401 });
    }
    console.error(`/api/solicitudes/${id} PATCH error:`, err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET /api/solicitudes/[id] - Get single solicitud details
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const user = await requireRole("admin");

    const solicitud = await prisma.solicitud.findUnique({
      where: { id },
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
      }
    });

    if (!solicitud) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ solicitud });
  } catch (err) {
    if (err instanceof Error && (err.message === "UNAUTHORIZED" || err.message === "FORBIDDEN")) {
      return NextResponse.json({ error: err.message === "FORBIDDEN" ? "Forbidden" : "Unauthorized" }, { status: err.message === "FORBIDDEN" ? 403 : 401 });
    }
    console.error(`/api/solicitudes/${id} GET error:`, err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

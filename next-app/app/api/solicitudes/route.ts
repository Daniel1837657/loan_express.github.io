import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const solicitudSchema = z.object({
  productId: z.string().nonempty(),
  amount: z.number().int().positive(),
  term: z.number().int().positive(),
  clientEmail: z.string().email().optional(),
  clientNotes: z.string().max(500).optional(),
  documents: z.array(
    z.object({
      type: z.string().nonempty(),
      name: z.string().nonempty(),
      size: z.number().int().positive(),
      mime: z.string().nonempty(),
      url: z.string().url().optional()
    })
  ).optional()
});

const rateByProduct = {
  personal: 1.3,
  libre: 1.5
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = solicitudSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const { productId, amount, term, clientEmail, clientNotes, documents } = result.data;

  const cliente = await prisma.cliente.findFirst({
    where: {
      user: {
        email: clientEmail ?? "cliente@loanexpress.com"
      }
    },
    include: { user: true }
  });

  if (!cliente) {
    return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  }

  const number = `LE-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`;
  const rate = rateByProduct[productId as keyof typeof rateByProduct] ?? 1.5;

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
    // Log for local debugging and return error message
    // eslint-disable-next-line no-console
    console.error("/api/solicitudes error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

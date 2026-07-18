import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth/auth";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.usuario.upsert({
    where: { email: "admin@loanexpress.com" },
    update: {},
    create: {
      email: "admin@loanexpress.com",
      password: hashPassword("Admin123"),
      role: "admin"
    }
  });

  const user = await prisma.usuario.upsert({
    where: { email: "cliente@loanexpress.com" },
    update: {},
    create: {
      email: "cliente@loanexpress.com",
      password: hashPassword("Cliente123"),
      role: "cliente"
    }
  });

  const cliente = await prisma.cliente.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      firstName: "Maria",
      lastName: "Gomez",
      phone: "+1 555 0100",
      docType: "Pasaporte",
      docNumber: "P123456",
      birthDate: new Date("1990-05-12"),
      originCountry: "Colombia",
      address: "120 Main St",
      occupation: "Asistente administrativa",
      company: "Servicios Latam",
      monthlyIncome: 4200
    }
  });

  await prisma.solicitud.upsert({
    where: { number: "LE-2026-000001" },
    update: {},
    create: {
      number: "LE-2026-000001",
      clienteId: cliente.id,
      productId: "personal",
      amount: 18000,
      term: 24,
      rate: 1.3,
      status: "en_revision",
      clientNotes: "Necesito consolidar gastos familiares.",
      adminNotes: "",
      documents: {
        create: [{
          type: "identidad",
          name: "pasaporte.pdf",
          size: 340000,
          mime: "application/pdf",
          url: "https://example.com/pasaporte.pdf"
        }]
      },
      history: {
        create: [
          { from: "borrador", to: "enviada", by: "cliente@loanexpress.com", comment: "Solicitud enviada." },
          { from: "enviada", to: "en_revision", by: "admin@loanexpress.com", comment: "Documentos recibidos." }
        ]
      }
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

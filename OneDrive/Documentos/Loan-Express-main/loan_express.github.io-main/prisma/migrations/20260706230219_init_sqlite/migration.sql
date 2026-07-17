-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "supabaseId" TEXT,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "docNumber" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "originCountry" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "monthlyIncome" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "rate" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'enviada',
    "clientNotes" TEXT,
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Solicitud_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solicitudId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Documento_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Historial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "solicitudId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "by" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Historial_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitud_number_key" ON "Solicitud"("number");

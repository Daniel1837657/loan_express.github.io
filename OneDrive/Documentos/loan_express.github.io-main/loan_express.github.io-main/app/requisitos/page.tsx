"use client";

import { useLanguage } from "@/components/providers/language-provider";
import "@/app/globals.css";

export default function RequisitosPage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "Requirements" : "Requisitos"}</h1>
      <p className="muted">
        {lang === "en" ? "Before applying, make sure you have the following:" : "Antes de solicitar, asegúrate de tener lo siguiente:"}
      </p>

      <ul style={{ marginTop: 16 }}>
        <li>{lang === "en" ? "Valid ID (passport, consular card, national ID)" : "Documento de identidad válido (pasaporte, cédula o matrícula consular)"}</li>
        <li>{lang === "en" ? "Proof of income or employment" : "Comprobante de ingresos o empleo"}</li>
        <li>{lang === "en" ? "At least one ID document uploaded" : "Al menos un documento de identidad subido"}</li>
        <li>{lang === "en" ? "Files: PDF, JPG, PNG — max 10 MB each" : "Archivos: PDF, JPG, PNG — máximo 10 MB cada uno"}</li>
      </ul>
    </main>
  );
}

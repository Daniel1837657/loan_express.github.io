"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function FaqPage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "FAQ" : "Preguntas frecuentes"}</h1>
      <div className="faq-grid">
        <details>
          <summary>{lang === "en" ? "Do I need to verify my email?" : "¿Debo verificar mi correo?"}</summary>
          <p>{lang === "en" ? "No, registration can be completed without required verification." : "No, el registro se puede completar sin verificación obligatoria."}</p>
        </details>
        <details>
          <summary>{lang === "en" ? "How many documents?" : "¿Cuántos documentos?"}</summary>
          <p>{lang === "en" ? "At least one ID document." : "Al menos un documento de identidad."}</p>
        </details>
      </div>
    </main>
  );
}

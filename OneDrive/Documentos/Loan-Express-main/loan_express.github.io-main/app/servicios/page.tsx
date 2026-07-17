"use client";

import { useLanguage } from "@/components/providers/language-provider";
import "@/app/globals.css";

export default function ServiciosPage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "Services" : "Servicios"}</h1>
      <p className="muted">
        {lang === "en"
          ? "We offer quick personal loans and free-investment loans with transparent terms and fast decisions."
          : "Ofrecemos créditos personales y de libre inversión con términos transparentes y decisiones rápidas."}
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>{lang === "en" ? "Products" : "Productos"}</h2>
        <ul>
          <li>{lang === "en" ? "Personal Loan: 3,000 - 50,000" : "Crédito Personal: 3,000 - 50,000"}</li>
          <li>{lang === "en" ? "Free Investment: 60,000 - 200,000" : "Libre Inversión: 60,000 - 200,000"}</li>
        </ul>
      </section>
    </main>
  );
}

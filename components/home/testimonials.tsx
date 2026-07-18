"use client";

import React from "react";
import { useLanguage } from "@/components/providers/language-provider";

const data = [
  {
    author: "Maria G.",
    en: "Loan Express helped me solve my financial problems quickly and easily. Highly recommended!",
    es: "Los préstamos de Loan Express me ayudaron a resolver mis problemas financieros de manera rápida y sencilla. ¡Altamente recomendado!"
  },
  {
    author: "Juan M.",
    en: "Excellent customer service and competitive rates. The best option for personal loans.",
    es: "Excelente servicio de atención al cliente y tasas de interés competitivas. Sin duda, la mejor opción para préstamos personales."
  },
  {
    author: "Luisa R.",
    en: "I got the money I needed for a medical emergency. Fast and reliable.",
    es: "Gracias a Loan Express, pude obtener el dinero que necesitaba para mi emergencia médica. ¡Confiables y eficientes!"
  }
];

export default function Testimonials() {
  const { lang } = useLanguage();

  return (
    <section className="section" id="testimonials">
      <h2 style={{ textAlign: "center" }}>{lang === "en" ? "What our customers say" : "Lo que dicen nuestros clientes"}</h2>
      <div className="testimonials-grid">
        {data.map((t) => (
          <article key={t.author} className="product-card">
            <p>{lang === "en" ? t.en : t.es}</p>
            <div className="muted" style={{ marginTop: 24 }}>{t.author}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

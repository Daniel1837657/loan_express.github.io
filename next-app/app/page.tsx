"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import Testimonials from "@/components/home/testimonials";

const products = [
  {
    id: "personal",
    name: { en: "Personal Loan", es: "Crédito Personal" },
    description: {
      en: "For personal needs with fixed terms and a digital process.",
      es: "Para necesidades personales con plazo fijo y proceso digital."
    },
    min: 3000,
    max: 50000
  },
  {
    id: "libre",
    name: { en: "Free Investment", es: "Libre Inversión" },
    description: {
      en: "For projects, consolidation or investment with flexible terms.",
      es: "Para proyectos, consolidacion o inversion con plazos flexibles."
    },
    min: 60000,
    max: 200000
  }
];

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <main>
      <section className="section hero" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">{lang === "en" ? "Serious, transparent digital credit" : "Credito digital serio y transparente"}</p>
          <h1>Loan Express</h1>
          <p>{lang === "en" ? "Apply for a personal or business loan, attach documents and track status in one place." : "Solicita credito personal o de libre inversion, adjunta documentos y consulta el estado desde un solo lugar."}</p>
          <div className="hero-actions">
            <Link href="/cliente/nueva-solicitud" className="primary-button">{lang === "en" ? "Apply for a loan" : "Solicitar credito"}</Link>
            <a href="#requisitos" className="text-link">{lang === "en" ? "View requirements" : "Ver requisitos"}</a>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <span className="metric">$3k - $200k</span>
            <span>{lang === "en" ? "Amount range" : "Rango de montos"}</span>
          </div>
          <div>
            <span className="metric">1.3%</span>
            <span>{lang === "en" ? "Fixed rate" : "Tasa fija"}</span>
          </div>
          <div>
            <span className="metric">12 - 60</span>
            <span>{lang === "en" ? "Months term" : "Meses de plazo"}</span>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <p className="eyebrow">{lang === "en" ? "Financial products" : "Productos financieros"}</p>
          <h2>{lang === "en" ? "Two clear options for your needs" : "Dos opciones claras para tu necesidad"}</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <h3>{product.name[lang]}</h3>
              <p>{product.description[lang]}</p>
              <ul>
                <li>{lang === "en" ? "Amounts" : "Montos"}: ${product.min.toLocaleString()} - ${product.max.toLocaleString()}</li>
                <li>{lang === "en" ? "Terms" : "Plazos"}: 12, 24, 36, 48, 60 {lang === "en" ? "months" : "meses"}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted" id="requisitos">
        <div className="section-heading">
          <p className="eyebrow">{lang === "en" ? "Before you apply" : "Antes de solicitar"}</p>
          <h2>{lang === "en" ? "Requirements to apply" : "Requisitos para solicitar"}</h2>
        </div>
        <div className="requirements-grid">
          <article>
            <strong>{lang === "en" ? "Accepted documents" : "Documentos aceptados"}</strong>
            <p>{lang === "en" ? "ID, passport, work permit, consular card or other valid documents." : "Identidad, pasaporte, permiso de trabajo, matricula consular u otros habilitados."}</p>
          </article>
          <article>
            <strong>{lang === "en" ? "Files" : "Archivos"}</strong>
            <p>{lang === "en" ? "PDF or image, maximum 10 MB per file." : "PDF o imagen, maximo 10 MB por archivo."}</p>
          </article>
          <article>
            <strong>{lang === "en" ? "Conditions" : "Condiciones"}</strong>
            <p>{lang === "en" ? "Valid amount and term according to product, with at least one ID document." : "Monto y plazo validos según producto, con al menos un documento de identidad."}</p>
          </article>
        </div>
      </section>

      <Testimonials />

      <section className="section" id="faq">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>{lang === "en" ? "Frequently Asked" : "Preguntas frecuentes"}</h2>
        </div>
        <div className="faq-grid">
          <details>
            <summary>{lang === "en" ? "Do I need to verify my email?" : "¿Debo verificar mi correo?"}</summary>
            <p>{lang === "en" ? "No. Registration can be completed without required verification." : "No. El registro se puede completar sin verificacion obligatoria."}</p>
          </details>
          <details>
            <summary>{lang === "en" ? "How many documents do I need?" : "¿Cuantos documentos necesito?"}</summary>
            <p>{lang === "en" ? "At least one ID document. More may be requested during review." : "Al menos un documento de identidad. Se pueden pedir mas en revision."}</p>
          </details>
          <details>
            <summary>{lang === "en" ? "How do I receive notifications?" : "¿Cómo recibo notificaciones?"}</summary>
            <p>{lang === "en" ? "By email when your application status changes." : "Por correo cuando el estado de la solicitud cambia."}</p>
          </details>
        </div>
      </section>
    </main>
  );
}

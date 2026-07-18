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
            <Link href="/registro" className="primary-button">{lang === "en" ? "Apply for a loan" : "Solicitar credito"}</Link>
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

      <section
        className="section"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
          color: "white",
          textAlign: "center",
          padding: "60px 20px"
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ color: "white", fontSize: "36px", marginBottom: "16px" }}>
            {lang === "en" ? "Ready for your loan?" : "¿Listo para tu crédito?"}
          </h2>
          <p style={{ color: "#dbeafe", fontSize: "18px", lineHeight: 1.6 }}>
            {lang === "en"
              ? "Join hundreds of clients who already trust Loan Express. A 100% digital, fast and transparent process."
              : "Únete a cientos de clientes que ya confían en Loan Express. Proceso 100% digital, rápido y transparente."}
          </p>
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Link
              href="/registro"
              className="primary-button large"
              style={{ background: "white", color: "#1e3a8a", border: "none" }}
            >
              🚀 {lang === "en" ? "Get started" : "Comenzar ahora"}
            </Link>
            <Link
              href="/login"
              className="secondary-button large"
              style={{ background: "transparent", color: "white", borderColor: "white" }}
            >
              {lang === "en" ? "Sign in" : "Iniciar sesión"}
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="contacto">
        <div className="section-heading">
          <p className="eyebrow">{lang === "en" ? "Contact" : "Contacto"}</p>
          <h2>{lang === "en" ? "Contact us" : "Contáctanos"}</h2>
        </div>
        <div className="product-grid">
          <article className="product-card">
            <h3>
              <span className="material-symbols-outlined">mail</span>{" "}
              {lang === "en" ? "Email" : "Correo electrónico"}
            </h3>
            <p>
              {lang === "en"
                ? "Send us an email for any inquiry."
                : "Envíanos un correo electrónico para cualquier consulta."}
            </p>
            <a href="mailto:contacto@loanexpress.com" className="secondary-button">
              {lang === "en" ? "Write email" : "Escribir correo"}
            </a>
          </article>
          <article className="product-card">
            <h3>
              <span className="material-symbols-outlined">phone</span>{" "}
              {lang === "en" ? "Phone" : "Teléfono"}
            </h3>
            <p>
              {lang === "en"
                ? "Call us Monday to Friday, 8:00 a.m. - 6:00 p.m."
                : "Llámanos de lunes a viernes, 8:00 a.m. - 6:00 p.m."}
            </p>
            <a href="tel:+15550102026" className="secondary-button">
              {lang === "en" ? "Call" : "Llamar"}
            </a>
          </article>
          <article className="product-card">
            <h3>
              <span className="material-symbols-outlined">location_on</span>{" "}
              {lang === "en" ? "Location" : "Ubicación"}
            </h3>
            <p>
              {lang === "en"
                ? "Visit us at our main office."
                : "Visítanos en nuestra oficina principal."}
            </p>
            <a 
              href="https://maps.google.com/?q=1111+Brickell+Ave+Suite+2850+Miami+FL+33131"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              {lang === "en" ? "View on map" : "Ver en mapa"}
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
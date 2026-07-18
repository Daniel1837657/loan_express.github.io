import Link from "next/link";
import Testimonials from "@/components/home/testimonials";

const products = [
  {
    id: "personal",
    name: "Crédito Personal",
    description: "Para necesidades personales con plazo fijo y proceso digital.",
    min: 3000,
    max: 50000
  },
  {
    id: "libre",
    name: "Libre Inversión",
    description: "Para proyectos, consolidacion o inversion con plazos flexibles.",
    min: 60000,
    max: 200000
  }
];

export const metadata = {
  title: "Loan Express - Crédito Personal y Libre Inversión Digital",
  description: "Solicita crédito personal o de libre inversión de $3,000 a $200,000 con tasa fija del 1.3%. Proceso 100% digital, rápido y transparente.",
  openGraph: {
    title: "Loan Express - Crédito Personal y Libre Inversión Digital",
    description: "Solicita crédito personal o de libre inversión de $3,000 a $200,000 con tasa fija del 1.3%.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <section className="section hero" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">Credito digital serio y transparente</p>
          <h1>Loan Express</h1>
          <p>Solicita credito personal o de libre inversion, adjunta documentos y consulta el estado desde un solo lugar.</p>
          <div className="hero-actions">
            <Link href="/registro" className="primary-button">Solicitar credito</Link>
            <a href="#requisitos" className="text-link">Ver requisitos</a>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <span className="metric">$3k - $200k</span>
            <span>Rango de montos</span>
          </div>
          <div>
            <span className="metric">1.3%</span>
            <span>Tasa fija</span>
          </div>
          <div>
            <span className="metric">12 - 60</span>
            <span>Meses de plazo</span>
          </div>
        </div>
      </section>

      <section className="section" id="servicios">
        <div className="section-heading">
          <p className="eyebrow">Productos financieros</p>
          <h2>Dos opciones claras para tu necesidad</h2>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <ul>
                <li>Montos: ${product.min.toLocaleString()} - ${product.max.toLocaleString()}</li>
                <li>Plazos: 12, 24, 36, 48, 60 meses</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted" id="requisitos">
        <div className="section-heading">
          <p className="eyebrow">Antes de solicitar</p>
          <h2>Requisitos para solicitar</h2>
        </div>
        <div className="requirements-grid">
          <article>
            <strong>Documentos aceptados</strong>
            <p>Identidad, pasaporte, permiso de trabajo, matricula consular u otros habilitados.</p>
          </article>
          <article>
            <strong>Archivos</strong>
            <p>PDF o imagen, maximo 10 MB por archivo.</p>
          </article>
          <article>
            <strong>Condiciones</strong>
            <p>Monto y plazo validos según producto, con al menos un documento de identidad.</p>
          </article>
        </div>
      </section>

      <Testimonials />

      <section className="section" id="faq">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className="faq-grid">
          <details>
            <summary>¿Debo verificar mi correo?</summary>
            <p>No. El registro se puede completar sin verificacion obligatoria.</p>
          </details>
          <details>
            <summary>¿Cuantos documentos necesito?</summary>
            <p>Al menos un documento de identidad. Se pueden pedir mas en revision.</p>
          </details>
          <details>
            <summary>¿Cómo recibo notificaciones?</summary>
            <p>Por correo cuando el estado de la solicitud cambia.</p>
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
            ¿Listo para tu crédito?
          </h2>
          <p style={{ color: "#dbeafe", fontSize: "18px", lineHeight: 1.6 }}>
            Únete a cientos de clientes que ya confían en Loan Express. Proceso 100% digital, rápido y transparente.
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
              🚀 Comenzar ahora
            </Link>
            <Link
              href="/login"
              className="secondary-button large"
              style={{ background: "transparent", color: "white", borderColor: "white" }}
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="contacto">
        <div className="section-heading">
          <p className="eyebrow">Contacto</p>
          <h2>Contáctanos</h2>
        </div>
        <div className="product-grid">
          <article className="product-card">
            <h3>Correo electrónico</h3>
            <p>Envíanos un correo electrónico para cualquier consulta.</p>
            <a href="mailto:contact@loaneforxpress.com" className="secondary-button">
              Escribir correo
            </a>
          </article>
          <article className="product-card">
            <h3>Teléfono</h3>
            <p>Llámanos para asistencia inmediata durante horario laboral.</p>
            <a href="tel:+15014699742" className="secondary-button">
              (501) 469-9742
            </a>
          </article>
          <article className="product-card">
            <h3>WhatsApp</h3>
            <p>Chatea con nosotros para respuestas rápidas.</p>
            <a href="https://wa.me/15014699742" className="secondary-button">
              WhatsApp
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
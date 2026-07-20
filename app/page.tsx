import Link from "next/link";
import Testimonials from "@/components/home/testimonials";
import ContactForm from "@/components/home/contact-form";
import HeroButton from "@/components/home/hero-button";

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
  title: "Loan Express | Crédito Digital Rápido y Transparente",
  description: "Solicita crédito personal o de libre inversión en Loan Express. Proceso digital, tasas fijas y aprobación rápida. Montos desde $3,000 hasta $200,000 USD.",
  keywords: "crédito, préstamo, crédito personal, libre inversión, financiamiento, préstamo digital",
  authors: [{ name: "Loan Express" }],
  creator: "Loan Express",
  publisher: "Loan Express",
  metadataBase: new URL("https://loaneforxpress.com"),
  openGraph: {
    title: "Loan Express | Crédito Digital Rápido y Transparente",
    description: "Solicita crédito personal o de libre inversión con proceso digital, tasas fijas y aprobación rápida.",
    type: "website",
    locale: "es_ES",
    siteName: "Loan Express",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Express | Crédito Digital Rápido y Transparente",
    description: "Solicita crédito personal o de libre inversión con proceso digital, tasas fijas y aprobación rápida.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Loan Express",
            "url": "https://loaneforxpress.com/",
            "areaServed": "US",
            "description": "Servicios de credito personal y libre inversion con solicitud digital.",
            "sameAs": []
          })
        }}
      />
      
      <main>
        <section 
          className="hero" 
          id="inicio"
          style="background-image: linear-gradient(115deg, rgba(30, 58, 138, 0.88), rgba(37, 99, 235, 0.70)), url('banner.png'); background-size: cover; background-position: center;"
        >
          <div className="hero-content">
            <p className="eyebrow" data-i18n="hero_eyebrow">Crédito digital serio y transparente</p>
            <h1 data-i18n="hero_title">Loan Express</h1>
            <p style="font-size: 19px; max-width: 680px;" data-i18n="hero_copy">
              Solicita crédito personal o de libre inversión, adjunta documentos y consulta el estado desde un solo lugar.
            </p>
            <div className="hero-actions">
              <HeroButton />
              <a href="#requisitos" className="text-link" data-i18n="see_requirements">Ver requisitos</a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Resumen Loan Express">
            <div>
              <span data-i18n="amount_range">Rango de montos</span>
              <span className="metric">$3k - $200k USD</span>
            </div>
            <div>
              <span data-i18n="fixed_rate">Tasa fija</span>
              <span className="metric">1.3%</span>
            </div>
            <div>
              <span data-i18n="terms_months">Meses de plazo</span>
              <span className="metric">12 - 60</span>
            </div>
          </div>
        </section>

        <section className="section" id="servicios">
          <div className="section-heading">
            <p className="eyebrow" data-i18n="services_eyebrow">Productos financieros</p>
            <h2 data-i18n="services_title">Dos opciones claras para tu necesidad</h2>
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
                <Link href="/registro" className="primary-button">Solicitar</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section split" id="nosotros">
          <div>
            <p className="eyebrow">Institucional</p>
            <h2>Profesionalismo para decisiones financieras importantes</h2>
            <p>Loan Express acompana a personas que necesitan credito en linea con un proceso claro, documentado y orientado a la confianza.</p>
          </div>
          <div className="stack">
            <article className="info-block">
              <h3>Historia</h3>
              <p>Loan Express nace para facilitar el acceso a soluciones de credito a clientes que necesitan una evaluacion seria, especialmente migrantes, colombianos en el exterior y personas que requieren una alternativa financiera formal.</p>
            </article>
            <article className="info-block">
              <h3>Mision</h3>
              <p>Facilitar acceso a credito mediante procesos digitales, claros y responsables.</p>
            </article>
            <article className="info-block">
              <h3>Vision</h3>
              <p>Ser una entidad reconocida por confianza, rapidez y acompanamiento serio a sus clientes.</p>
            </article>
            <article className="info-block">
              <h3>Valores</h3>
              <p>Transparencia, seguridad, cumplimiento y respeto por la informacion del cliente.</p>
            </article>
            <article className="info-block">
              <h3>Compromiso</h3>
              <p>Cada solicitud se revisa con criterios definidos, proteccion de datos y comunicacion por correo durante el proceso.</p>
            </article>
          </div>
        </section>

        <section className="section muted" id="requisitos">
          <div className="section-heading">
            <p className="eyebrow" data-i18n="requirements_eyebrow">Antes de solicitar</p>
            <h2 data-i18n="requirements_title">Requisitos para solicitar</h2>
          </div>
          <div className="requirements-grid">
            <div className="requirement">
              <strong><span className="material-symbols-outlined">description</span> <span data-i18n="req_docs">Documentos aceptados</span></strong>
              <p data-i18n="req_docs_copy">Identidad, pasaporte, permiso de trabajo, matricula consular, Social Security u otros habilitados.</p>
            </div>
            <div className="requirement">
              <strong><span className="material-symbols-outlined">attach_file</span> <span data-i18n="req_files">Archivos</span></strong>
              <p data-i18n="req_files_copy">PDF o imagen, maximo 10 MB por archivo.</p>
            </div>
            <div className="requirement">
              <strong><span className="material-symbols-outlined">check_circle</span> <span data-i18n="req_terms">Condiciones</span></strong>
              <p data-i18n="req_terms_copy">Monto dentro del producto elegido, plazo de 12, 24, 36, 48 o 60 meses y al menos un documento de identidad.</p>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="section muted" id="faq">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="accordion">
            <details>
              <summary>¿Puedo solicitar si tengo reportes en centrales?</summary>
              <p>Si. Puedes iniciar la solicitud; la evaluacion se realiza manualmente por el equipo administrativo.</p>
            </details>
            <details>
              <summary>¿Debo verificar mi correo?</summary>
              <p>No. Despues del registro puedes completar perfil y solicitar credito.</p>
            </details>
            <details>
              <summary>¿Qué documentos son mínimos?</summary>
              <p>Al menos un documento de identidad. El administrador puede pedir documentacion adicional.</p>
            </details>
            <details>
              <summary>¿Cómo se notifican los cambios?</summary>
              <p>Los cambios de estado se notifican por correo electronico.</p>
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
              Únete a cientos de clientes que ya confían en Loan Express.
              Proceso 100% digital, rápido y transparente.
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

        <section className="section split" id="contacto">
          <div>
            <p className="eyebrow" data-i18n="contact_eyebrow">Contacto</p>
            <h2 data-i18n="contact_title">Habla con Loan Express</h2>
            <p data-i18n="contact_copy">
              Envíanos tus datos y un asesor revisará tu mensaje.
            </p>
            <ul className="contact-list">
              <li>
                <a href="mailto:contact@loaneforxpress.com">
                  contact@loaneforxpress.com
                </a>
              </li>
              <li>
                <a href="tel:+5014699742">
                  (501) 469-9742
                </a>
              </li>
              <li>
                <a href="https://wa.me/15014699742" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61568027056603" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li>
                Lunes a viernes, 8:00 a.m. - 6:00 p.m.
              </li>
              <li>
                <a href="https://maps.google.com/?q=1111+Brickell+Ave+Suite+2850+Miami+FL+33131" target="_blank" rel="noopener noreferrer">
                  1111 Brickell Ave, Suite 2850, Miami FL 33131
                </a>
              </li>
            </ul>
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps?q=1111+Brickell+Ave+Suite+2850+Miami+FL+33131&output=embed"
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <ContactForm />
        </section>

        <section className="legal section" id="legal">
          <h2>Politica de privacidad y terminos</h2>
          <p>Loan Express protege la informacion personal y documental del cliente. Los datos se utilizan para crear la cuenta, completar el perfil, evaluar solicitudes de credito, gestionar documentos, comunicar cambios de estado y cumplir obligaciones legales aplicables.</p>
          <p>El envio de una solicitud no implica aprobacion automatica. La aprobacion, rechazo o solicitud de documentacion adicional depende de la revision administrativa y de la informacion presentada por el cliente.</p>
          <p>Para más información, consulta nuestra <Link href="/privacidad.html">Política de Privacidad</Link> y <Link href="/terminos.html">Términos y Condiciones</Link>.</p>
        </section>
      </main>
    </>
  );
}
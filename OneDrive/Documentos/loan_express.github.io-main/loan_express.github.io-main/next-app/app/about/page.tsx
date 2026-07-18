"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "About Loan Express" : "Sobre Loan Express"}</h1>
      <p className="muted">
        {lang === "en"
          ? "Loan Express has been serving customers for 55 years, offering fast, reliable lending solutions focused on transparency and speed."
          : "Loan Express lleva 55 años en el sector, ofreciendo soluciones de crédito rápidas y confiables, enfocadas en la transparencia y la rapidez."}
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>{lang === "en" ? "Who we help" : "A quién ayudamos"}</h2>
        <p>
          {lang === "en"
            ? "We serve immigrants and nationals alike: Colombians, other nationalities, freelancers, self-employed and employees. Our products are accessible for a wide range of situations."
            : "Atendemos a inmigrantes y nacionales: colombianos, de otras nacionalidades, independientes, autónomos y empleados. Nuestros productos son accesibles para una amplia variedad de situaciones."}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>{lang === "en" ? "Mission" : "Misión"}</h2>
        <p>
          {lang === "en"
            ? "To make responsible credit accessible through a simple digital-first workflow, with quick decisions and clear terms."
            : "Hacer el crédito responsable accesible mediante un flujo simple y digital, con decisiones rápidas y términos claros."}
        </p>
      </section>
    </main>
  );
}

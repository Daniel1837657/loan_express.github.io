"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export default function ClientePage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "Client area" : "Área de cliente"}</h1>
      <p>{lang === "en" ? "Complete your profile, create an application and check status." : "Completa tu perfil, crea una solicitud y consulta el estado."}</p>
      <div className="button-group">
        <Link href="/cliente/nueva-solicitud" className="primary-button">
          {lang === "en" ? "New application" : "Nueva solicitud"}
        </Link>
        <Link href="/cliente/solicitudes" className="secondary-button">
          {lang === "en" ? "My applications" : "Mis solicitudes"}
        </Link>
        <Link href="/cliente/perfil" className="secondary-button">
          {lang === "en" ? "My profile" : "Mi perfil"}
        </Link>
      </div>
    </main>
  );
}

"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function ContactoPage() {
  const { lang } = useLanguage();

  return (
    <main className="section">
      <h1>{lang === "en" ? "Contact" : "Contacto"}</h1>
      <p className="muted">{lang === "en" ? "Get in touch with us." : "Ponte en contacto con nosotros."}</p>

      <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
        <label>
          {lang === "en" ? "Name" : "Nombre"}
          <input name="name" />
        </label>
        <label>
          {lang === "en" ? "Email" : "Correo"}
          <input name="email" type="email" />
        </label>
        <label>
          {lang === "en" ? "Message" : "Mensaje"}
          <textarea name="message" />
        </label>
        <button className="primary-button">{lang === "en" ? "Send" : "Enviar"}</button>
      </form>
    </main>
  );
}

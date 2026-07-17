"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import "@/app/globals.css";

export default function ContactoPage() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      amount: formData.get("amount") as string,
      message: formData.get("message") as string
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (!response.ok) {
        setError(data.error || (lang === "en" ? "Failed to send message." : "Error al enviar mensaje."));
        return;
      }

      setStatus(lang === "en" ? "Message sent successfully!" : "¡Mensaje enviado exitosamente!");
      e.currentTarget.reset();
    } catch (err) {
      setIsSubmitting(false);
      setError(lang === "en" ? "Network error." : "Error de red.");
    }
  }

  return (
    <main className="section">
      <h1>{lang === "en" ? "Contact" : "Contacto"}</h1>
      <p className="muted">{lang === "en" ? "Get in touch with us." : "Ponte en contacto con nosotros."}</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          {lang === "en" ? "Name" : "Nombre"}
          <input name="name" required />
        </label>
        <label>
          {lang === "en" ? "Email" : "Correo"}
          <input name="email" type="email" required />
        </label>
        <label>
          {lang === "en" ? "Phone" : "Teléfono"}
          <input name="phone" type="tel" />
        </label>
        <label>
          {lang === "en" ? "Amount (optional)" : "Monto (opcional)"}
          <input name="amount" type="number" />
        </label>
        <label>
          {lang === "en" ? "Message" : "Mensaje"}
          <textarea name="message" required />
        </label>
        <button className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? (lang === "en" ? "Sending..." : "Enviando...") : (lang === "en" ? "Send" : "Enviar")}
        </button>
      </form>

      {status ? <p className="message success">{status}</p> : null}
      {error ? <p className="message error">{error}</p> : null}
    </main>
  );
}

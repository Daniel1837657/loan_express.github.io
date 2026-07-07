"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export default function SiteFooter() {
  const { lang } = useLanguage();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      amount: fd.get("amount") as string,
      message: fd.get("message") as string
    };

    try {
      await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });
      // simple feedback (could be improved)
      (e.currentTarget.querySelector("button") as HTMLButtonElement).textContent = lang === "en" ? "Sent" : "Enviado";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner contact-grid">
        <div className="contact-card">
          <div className="brand-block">
            <div className="brand-mark">LE</div>
            <div>
              <strong>Loan Express</strong>
              <div className="muted">{lang === "en" ? "Fast digital credit" : "Créditos rápidos digitales"}</div>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div><strong>{lang === "en" ? "Contact" : "Contacto"}</strong></div>
            <div className="muted">{lang === "en" ? "Email" : "Correo"}: support@loanexpress.com</div>
            <div className="muted">{lang === "en" ? "Phone" : "Celular"}: +1 305-555-1234</div>
            <div className="muted">{lang === "en" ? "Address" : "Dirección"}: 1111 Brickell Ave Suite 2850, Miami, FL 33131, EE. UU.</div>
          </div>
        </div>

        <div className="contact-card">
          <h4>{lang === "en" ? "Visit Us" : "Visítanos"}</h4>
          <div className="muted" style={{ marginTop: 8 }}>
            {lang === "en" ? (
              <>
                Monday - Friday 11:00 - 18:30<br />Saturday 11:00 - 17:00<br />Sunday 12:30 - 16:30
              </>
            ) : (
              <>
                Lunes - Viernes 11:00 - 18:30<br />Sábado 11:00 - 17:00<br />Domingo 12:30 - 16:30
              </>
            )}
          </div>
        </div>

        <div className="contact-card">
          <h4>{lang === "en" ? "Tell Us" : "Contáctanos"}</h4>
          <form onSubmit={handleSubmit} className="contact-form">
            <input name="name" placeholder={lang === "en" ? "Name" : "Nombre"} />
            <input name="email" type="email" placeholder="Email" />
            <input name="phone" placeholder={lang === "en" ? "Phone" : "Celular"} />
            <input name="amount" placeholder={lang === "en" ? "Amount (optional)" : "Monto (opcional)"} />
            <textarea name="message" placeholder={lang === "en" ? "Write your message..." : "Escribe tu mensaje..."} />
            <button type="submit" className="primary-button">{lang === "en" ? "Send" : "Enviar"}</button>
          </form>
        </div>
      </div>

      <div className="copyright">© {new Date().getFullYear()} Loan Express. {lang === "en" ? "All rights reserved." : "Todos los derechos reservados."}</div>
    </footer>
  );
}

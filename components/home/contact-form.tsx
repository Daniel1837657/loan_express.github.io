"use client";

import { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Mensaje enviado correctamente. Te contactaremos pronto.");
        setMessageType("success");
        e.currentTarget.reset();
      } else {
        setMessage("Hubo un error al enviar el mensaje. Por favor intenta nuevamente.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Hubo un error al enviar el mensaje. Por favor intenta nuevamente.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="panel-form" onSubmit={handleSubmit}>
        <label>
          <span data-i18n="name">Nombre</span>
          <input required name="name" disabled={isSubmitting} />
        </label>

        <label>
          <span data-i18n="email">Correo</span>
          <input required type="email" name="email" disabled={isSubmitting} />
        </label>

        <label>
          <span data-i18n="message">Mensaje</span>
          <textarea required name="message" disabled={isSubmitting}></textarea>
        </label>

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {message && (
        <div className={`message ${messageType}`} style={{ marginTop: "16px" }}>
          {message}
        </div>
      )}
    </>
  );
}
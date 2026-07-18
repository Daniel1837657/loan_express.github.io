"use client";

import { FormEvent, useState } from "react";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setIsError(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || "No se pudo procesar la solicitud.");
        setIsError(true);
        return;
      }

      setMessage("Si existe una cuenta con ese correo, se envió un email de recuperación.");
    } catch {
      setMessage("No se pudo conectar con el servidor. Intenta de nuevo.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="section">
      <h1>Recuperar contraseña</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="cliente@loanexpress.com"
            required
          />
        </label>

        <div>
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar email de recuperación"}
          </button>
        </div>
      </form>

      {message ? (
        <p className={`message ${isError ? "error" : "success"}`}>{message}</p>
      ) : null}
    </main>
  );
}
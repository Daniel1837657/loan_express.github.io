"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.error || "No se pudo iniciar sesión.");
      return;
    }

    if (data.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/cliente");
    }
  }

  return (
    <main className="section">
      <h1>Iniciar sesión</h1>
      <p>Ingresa con tu correo y contraseña para acceder a tu panel.</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="cliente@loanexpress.com"
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Iniciando..." : "Ingresar"}
        </button>
      </form>

      <p>
        ¿No tienes cuenta? <Link href="/registro">Regístrate</Link>
      </p>

      <p>
        <Link href="/recover">Recuperar contraseña</Link>
      </p>

      {error ? <p className="message error">{error}</p> : null}
    </main>
  );
}

"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "@/components/providers/language-provider";

const products = [
  { id: "personal", label: { en: "Personal Loan", es: "Crédito Personal" } },
  { id: "libre", label: { en: "Free Investment", es: "Libre Inversión" } }
];

export default function NuevaSolicitudPage() {
  const { lang } = useLanguage();
  const [productId, setProductId] = useState("personal");
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(12);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setIsSubmitting(true);
    // validate amount against product minimums
    const minAmounts: Record<string, number> = { personal: 3000, libre: 5000 };
    const min = minAmounts[productId] ?? 3000;
    if (amount < min) {
      setError(lang === "en" ? `Minimum amount for this product is ${min.toLocaleString()}` : `El monto mínimo para este producto es ${min.toLocaleString()}`);
      setIsSubmitting(false);
      return;
    }
    const response = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        amount,
        term,
        clientEmail: email,
        clientNotes: notes,
        documents: []
      })
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.error?.message || (lang === "en" ? "Could not create application." : "No se pudo crear la solicitud."));
      return;
    }

    setStatus(lang === "en" ? `Application created: ${data.solicitud.number}` : `Solicitud creada: ${data.solicitud.number}`);
  }

  return (
    <main className="section">
      <h1>{lang === "en" ? "New application" : "Nueva solicitud"}</h1>
      <p>{lang === "en" ? "Complete the details to request credit and receive a quick response." : "Completa los datos para solicitar crédito y recibir una respuesta rápida."}</p>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          {lang === "en" ? "Product" : "Producto"}
          <select value={productId} onChange={(event) => setProductId(event.target.value)}>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.label[lang]}
              </option>
            ))}
          </select>
        </label>

        <label>
            {lang === "en" ? "Amount" : "Monto"}
            <input
              type="number"
              value={amount}
              min={productId === "personal" ? 3000 : 5000}
              max={200000}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
            <div className="muted">{lang === "en" ? `Minimum amount: ${productId === "personal" ? "3,000" : "5,000"}` : `Monto mínimo: ${productId === "personal" ? "3,000" : "5,000"}`}</div>
        </label>

        <label>
          {lang === "en" ? "Term (months)" : "Plazo (meses)"}
          <input
            type="number"
            value={term}
            min={12}
            max={60}
            onChange={(event) => setTerm(Number(event.target.value))}
          />
        </label>

        <label>
          {lang === "en" ? "Client email" : "Correo del cliente"}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="cliente@loanexpress.com"
          />
        </label>

        <label>
          {lang === "en" ? "Additional notes" : "Notas adicionales"}
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (lang === "en" ? "Sending..." : "Enviando...") : (lang === "en" ? "Submit application" : "Enviar solicitud")}
        </button>
      </form>

      {status ? <p className="message success">{status}</p> : null}
      {error ? <p className="message error">{error}</p> : null}
    </main>
  );
}

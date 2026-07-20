"use client";

import { useState } from "react";

export default function RecoverPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const res = await fetch("/api/auth/recover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (!res.ok) {
      const data = await res.json();
      setMessage(data.error || "Error");
      return;
    }
    setMessage("If an account exists, a password reset email was sent.");
  }

  return (
    <main className="section">
      <h1>Recover password</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <div>
          <button className="primary-button" type="submit">Send recovery email</button>
        </div>
      </form>
      {message ? <p className="message success">{message}</p> : null}
    </main>
  );
}
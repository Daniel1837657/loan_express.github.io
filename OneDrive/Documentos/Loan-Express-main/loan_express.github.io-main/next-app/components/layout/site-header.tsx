"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";

export default function SiteHeader() {
  const [theme, setTheme] = useState("light");
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("site:theme");
    if (stored === "dark") {
      document.documentElement.classList.add("theme-dark");
      setTheme("dark");
    }

    // custom cursor
    const cursor = document.createElement("div");
    cursor.className = "cursor-dot";
    document.body.appendChild(cursor);

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    document.addEventListener("mousemove", onMove);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cursor.remove();
    };
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("site:theme", next);
    } catch (e) {}
    document.documentElement.classList.toggle("theme-dark", next === "dark");
  }

  function toggleLang() {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
  }

  const labels = {
    home: lang === "en" ? "Home" : "Inicio",
    about: lang === "en" ? "About" : "Nosotros",
    servicios: lang === "en" ? "Services" : "Servicios",
    requisitos: lang === "en" ? "Requirements" : "Requisitos",
    client: lang === "en" ? "Client" : "Cliente",
    admin: lang === "en" ? "Admin" : "Admin",
    faq: lang === "en" ? "FAQ" : "FAQ",
    contact: lang === "en" ? "Contact" : "Contacto",
    login: lang === "en" ? "Login" : "Iniciar sesión",
    register: lang === "en" ? "Register" : "Registro",
    recover: lang === "en" ? "Recover" : "Recuperar"
  } as const;

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <img src="/logo.png" alt="Loan Express" className="brand-logo" width="84" height="64" fetchPriority="high" />
      </Link>

      <nav className="nav">
        <Link href="/">{labels.home}</Link>
        <Link href="/about">{labels.about}</Link>
        <Link href="/servicios">{labels.servicios}</Link>
        <Link href="/requisitos">{labels.requisitos}</Link>
        <Link href="/faq">{labels.faq}</Link>
        <Link href="/contacto">{labels.contact}</Link>
        <Link href="/cliente">{labels.client}</Link>
        <Link href="/admin">{labels.admin}</Link>
      </nav>

      <div className="header-actions">
        <button className="text-link" onClick={toggleLang} aria-label="Toggle language">
          {lang === "en" ? "ES" : "EN"}
        </button>

        <button className="primary-button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "Dark" : "Light"}
        </button>

        <Link href="/registro" className="secondary-button">{labels.register}</Link>
        <Link href="/login" className="secondary-button">{labels.login}</Link>
        <Link href="/recuperar-contrasena" className="text-link">{labels.recover}</Link>
      </div>
    </header>
  );
}

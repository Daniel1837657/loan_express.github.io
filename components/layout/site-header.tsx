"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <img src="/logo.png" alt="Loan Express" className="brand-logo" width="84" height="64" />
      </Link>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`} id="mainNav">
        <Link href="/#nosotros">Nosotros</Link>
        <Link href="/#servicios">Servicios</Link>
        <Link href="/#requisitos">Requisitos</Link>
        <Link href="/#testimonios">Testimonios</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/#contacto">Contacto</Link>
        <Link href="/login" className="secondary-button">Ingresar</Link>
        <Link href="/registro" className="primary-button">Registrarse</Link>
      </nav>

      <button 
        className="menu-toggle" 
        type="button" 
        aria-label="Menú"
        onClick={toggleMenu}
      >
        ☰
      </button>
    </header>
  );
}
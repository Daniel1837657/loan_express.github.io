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
        <img src="logo.png" alt="Loan Express" className="brand-logo" width="84" height="64" fetchPriority="high" />
      </Link>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`} id="mainNav">
        <Link href="#nosotros" data-i18n="nav_about">Nosotros</Link>
        <Link href="#servicios" data-i18n="nav_services">Servicios</Link>
        <Link href="#requisitos" data-i18n="nav_requirements">Requisitos</Link>
        <Link href="#testimonios">Testimonios</Link>
        <Link href="#faq" data-i18n="nav_faq">FAQ</Link>
        <Link href="#contacto" data-i18n="nav_contact">Contacto</Link>
        <button className="ghost-button" id="langToggle" type="button">EN</button>
        <Link href="/login" className="secondary-button" data-i18n="nav_login">Ingresar</Link>
        <Link href="/registro" className="primary-button" data-i18n="nav_apply">Registrarse</Link>
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
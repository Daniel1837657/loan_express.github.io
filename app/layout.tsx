import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Express | Crédito Digital Rápido y Transparente",
  description: "Solicita crédito personal o de libre inversión en Loan Express. Proceso digital, tasas fijas y aprobación rápida. Montos desde $3,000 hasta $200,000 USD.",
  keywords: "crédito, préstamo, crédito personal, libre inversión, financiamiento, préstamo digital",
  authors: [{ name: "Loan Express" }],
  creator: "Loan Express",
  publisher: "Loan Express",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://loaneforxpress.com/"),
  alternates: {
    canonical: "https://loaneforxpress.com/",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  themeColor: "#1e3a8a",
  openGraph: {
    title: "Loan Express | Crédito Digital Rápido y Transparente",
    description: "Solicita crédito personal o de libre inversión con proceso digital, tasas fijas y aprobación rápida.",
    type: "website",
    locale: "es_ES",
    siteName: "Loan Express",
    url: "https://loaneforxpress.com/",
    images: [
      {
        url: "https://loaneforxpress.com/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Loan Express",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Express | Crédito Digital Rápido y Transparente",
    description: "Solicita crédito personal o de libre inversión con proceso digital, tasas fijas y aprobación rápida.",
    images: ["https://loaneforxpress.com/twitter-logo.png"],
  },
};

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import LanguageProvider from "@/components/providers/language-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
        <div className="toast" id="toast" role="status" aria-live="polite"></div>
      </body>
    </html>
  );
}
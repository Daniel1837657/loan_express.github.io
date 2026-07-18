import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Express - Crédito Personal y Libre Inversión Digital",
  description: "Solicita crédito personal o de libre inversión de $3,000 a $200,000 con tasa fija del 1.3%. Proceso 100% digital, rápido y transparente. Seguimiento en línea de tu solicitud.",
  keywords: "credito personal, libre inversion, prestamos, tasa fija, credito digital, solicitud online, prestamos personales",
  authors: [{ name: "Loan Express" }],
  creator: "Loan Express",
  publisher: "Loan Express",
  metadataBase: new URL("https://loaneforxpress.com/"),
  openGraph: {
    title: "Loan Express - Crédito Personal y Libre Inversión Digital",
    description: "Solicita crédito personal o de libre inversión de $3,000 a $200,000 con tasa fija del 1.3%. Proceso 100% digital, rápido y transparente.",
    type: "website",
    locale: "es_ES",
    siteName: "Loan Express",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Express - Crédito Personal y Libre Inversión Digital",
    description: "Solicita crédito personal o de libre inversión de $3,000 a $200,000 con tasa fija del 1.3%.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import LanguageProvider from "@/components/providers/language-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href="https://loaneforxpress.com/" />
      </head>
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}

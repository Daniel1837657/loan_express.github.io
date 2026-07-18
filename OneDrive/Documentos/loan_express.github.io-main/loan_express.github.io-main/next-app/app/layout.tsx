import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Express | Crédito Digital Rápido y Transparente",
  description: "Solicita crédito personal o de libre inversión en Loan Express. Proceso digital, tasas fijas y aprobación rápida. Montos desde $3,000 hasta $200,000 USD.",
  keywords: "crédito, préstamo, crédito personal, libre inversión, financiamiento, préstamo digital",
  authors: [{ name: "Loan Express" }],
  metadataBase: new URL("https://loaneforxpress.com/"),
  openGraph: {
    title: "Loan Express | Crédito Digital Rápido y Transparente",
    description: "Solicita crédito personal o de libre inversión con proceso digital, tasas fijas y aprobación rápida.",
    type: "website",
    siteName: "Loan Express",
    locale: "es_ES",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
};

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import LanguageProvider from "@/components/providers/language-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Express",
  description: "Credito personal y libre inversion con solicitud digital y seguimiento en linea.",
  metadataBase: new URL("https://loaneforxpress.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Loan Express",
    description: "Credito personal y libre inversion con solicitud digital y seguimiento en linea.",
    type: "website"
  }
};

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import LanguageProvider from "@/components/providers/language-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
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
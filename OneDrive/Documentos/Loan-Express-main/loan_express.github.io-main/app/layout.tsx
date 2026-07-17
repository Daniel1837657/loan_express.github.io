import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Express",
  description: "Credito personal y libre inversion con solicitud digital y seguimiento en linea.",
  metadataBase: new URL("https://loaneforxpress.com/"),
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

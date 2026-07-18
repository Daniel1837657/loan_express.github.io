"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "es";

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("site:lang");
      if (stored === "es") setLang("es");
    } catch (e) {
      // ignore (SSR or blocked)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("site:lang", lang);
    } catch (e) {}
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export default LanguageProvider;

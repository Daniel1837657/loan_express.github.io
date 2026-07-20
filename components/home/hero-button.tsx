"use client";

import { useRouter } from "next/navigation";

export default function HeroButton() {
  const router = useRouter();

  return (
    <button 
      className="primary-button large" 
      data-view="register" 
      type="button" 
      data-i18n="start_request" 
      onClick={() => router.push('/registro')}
    >
      Solicitar crédito
    </button>
  );
}
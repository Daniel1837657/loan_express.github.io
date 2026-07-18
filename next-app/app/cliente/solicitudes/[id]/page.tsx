import Link from "next/link";

export default function DetalleSolicitudClientePage({ params }: any) {
  return (
    <main className="section">
      <div className="toolbar">
        <h1>Detalle de solicitud</h1>
        <Link href="/cliente/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
      </div>
      <p>Solicitud ID: {params.id}</p>
      <p>Vista de estado, historial y documentos del cliente.</p>
    </main>
  );
}

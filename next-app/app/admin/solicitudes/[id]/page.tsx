import Link from "next/link";

export default function DetalleSolicitudAdminPage({ params }: any) {
  return (
    <main className="section">
      <div className="toolbar">
        <h1>Detalle de solicitud</h1>
        <Link href="/admin/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
      </div>
      <p>Solicitud ID: {params.id}</p>
      <p>Panel de revisión administrativa con documentos y cambio de estado.</p>
    </main>
  );
}

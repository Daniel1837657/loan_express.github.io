export default function DetalleSolicitudAdminPage({ params }: any) {
  return (
    <main className="section">
      <h1>Detalle de solicitud</h1>
      <p>Solicitud ID: {params.id}</p>
      <p>Panel de revisión administrativa con documentos y cambio de estado.</p>
    </main>
  );
}

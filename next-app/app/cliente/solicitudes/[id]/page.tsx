export default function DetalleSolicitudClientePage({ params }: any) {
  return (
    <main className="section">
      <h1>Detalle de solicitud</h1>
      <p>Solicitud ID: {params.id}</p>
      <p>Vista de estado, historial y documentos del cliente.</p>
    </main>
  );
}

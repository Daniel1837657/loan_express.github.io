import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import "@/app/globals.css";

export default async function DetalleSolicitudClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user) {
    return <div className="section">No autorizado</div>;
  }

  const cliente = await prisma.cliente.findUnique({
    where: { userId: user.id }
  });

  if (!cliente) {
    return <div className="section">Perfil de cliente no encontrado</div>;
  }

  const solicitud = await prisma.solicitud.findFirst({
    where: { 
      id,
      clienteId: cliente.id 
    },
    include: {
      documents: true,
      history: {
        orderBy: { date: "desc" }
      }
    }
  });

  if (!solicitud) {
    return (
      <main className="section">
        <div className="toolbar">
          <h1>Detalle de solicitud</h1>
          <Link href="/cliente/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
        </div>
        <p>Solicitud no encontrada</p>
      </main>
    );
  }

  const statusColors: Record<string, string> = {
    borrador: "bg-gray-100 text-gray-800",
    enviada: "bg-blue-100 text-blue-800",
    documentacion_pendiente: "bg-yellow-100 text-yellow-800",
    en_revision: "bg-purple-100 text-purple-800",
    aprobada: "bg-green-100 text-green-800",
    rechazada: "bg-red-100 text-red-800",
    cancelada: "bg-gray-100 text-gray-800"
  };

  return (
    <main className="section">
      <div className="toolbar">
        <h1>Detalle de solicitud</h1>
        <Link href="/cliente/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Información de la solicitud</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Número:</span>
            <p className="font-medium">{solicitud.number}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Producto:</span>
            <p className="font-medium capitalize">{solicitud.productId}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Monto:</span>
            <p className="font-medium">${solicitud.amount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Plazo:</span>
            <p className="font-medium">{solicitud.term} meses</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Tasa:</span>
            <p className="font-medium">{solicitud.rate}%</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Estado:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[solicitud.status]}`}>
              {solicitud.status.replace(/_/g, " ")}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Fecha:</span>
            <p className="font-medium">{new Date(solicitud.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {solicitud.clientNotes && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold mb-4">Tus notas</h2>
          <p className="text-gray-700">{solicitud.clientNotes}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Documentos</h2>
        {solicitud.documents.length > 0 ? (
          <ul className="space-y-2">
            {solicitud.documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.type} • {(doc.size / 1024).toFixed(1)} KB</p>
                </div>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Ver
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay documentos adjuntos</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Historial de cambios</h2>
        <div className="space-y-3">
          {solicitud.history.map((entry) => (
            <div key={entry.id} className="p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {entry.from.replace(/_/g, " ")} → {entry.to.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-600">{entry.comment}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{entry.by}</p>
                  <p>{new Date(entry.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

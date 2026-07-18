import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function DetalleSolicitudAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    return <div className="section">No autorizado</div>;
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id },
    include: {
      cliente: {
        include: {
          user: true
        }
      },
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
          <Link href="/admin/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
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

  const statusOptions = [
    { value: "borrador", label: "Borrador" },
    { value: "enviada", label: "Enviada" },
    { value: "documentacion_pendiente", label: "Documentación Pendiente" },
    { value: "en_revision", label: "En Revisión" },
    { value: "aprobada", label: "Aprobada" },
    { value: "rechazada", label: "Rechazada" },
    { value: "cancelada", label: "Cancelada" }
  ];

  return (
    <main className="section">
      <div className="toolbar">
        <h1>Detalle de solicitud</h1>
        <Link href="/admin/solicitudes" className="secondary-button">← Volver a solicitudes</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Información de la solicitud */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Información de la solicitud</h2>
          <div className="space-y-3">
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
              <span className="text-sm text-gray-500">Estado actual:</span>
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

        {/* Información del cliente */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Información del cliente</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Nombre:</span>
              <p className="font-medium">{solicitud.cliente.firstName} {solicitud.cliente.lastName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Email:</span>
              <p className="font-medium">{solicitud.cliente.user.email}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Teléfono:</span>
              <p className="font-medium">{solicitud.cliente.phone || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">País de origen:</span>
              <p className="font-medium">{solicitud.cliente.originCountry || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Ocupación:</span>
              <p className="font-medium">{solicitud.cliente.occupation || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Ingreso mensual:</span>
              <p className="font-medium">${solicitud.cliente.monthlyIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notas del cliente */}
      {solicitud.clientNotes && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
          <h2 className="text-lg font-semibold mb-4">Notas del cliente</h2>
          <p className="text-gray-700">{solicitud.clientNotes}</p>
        </div>
      )}

      {/* Documentos */}
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

      {/* Historial de cambios */}
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

      {/* Cambio de estado */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Cambiar estado</h2>
        <form action={`/api/solicitudes/${id}`} method="POST" className="space-y-4">
          <input type="hidden" name="_method" value="PATCH" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nuevo estado</label>
            <select name="status" className="w-full p-2 border border-gray-300 rounded">
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas del administrador</label>
            <textarea name="adminNotes" rows={3} className="w-full p-2 border border-gray-300 rounded" defaultValue={solicitud.adminNotes || ""} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Actualizar estado
          </button>
        </form>
      </div>
    </main>
  );
}

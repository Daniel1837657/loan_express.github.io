import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function SolicitudesAdminPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    return <div className="section">No autorizado</div>;
  }

  const solicitudes = await prisma.solicitud.findMany({
    include: {
      cliente: {
        include: {
          user: true
        }
      },
      documents: true,
      history: {
        orderBy: { date: "desc" },
        take: 1
      }
    },
    orderBy: { createdAt: "desc" }
  });

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
      <h1>Solicitudes</h1>
      <p>Listado de solicitudes con filtro por estado y búsqueda por cliente o número.</p>
      
      <div className="mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cliente</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Producto</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Monto</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{solicitud.number}</td>
                <td className="px-4 py-3 text-sm">
                  {solicitud.cliente.firstName} {solicitud.cliente.lastName}
                  <br />
                  <span className="text-gray-500">{solicitud.cliente.user.email}</span>
                </td>
                <td className="px-4 py-3 text-sm capitalize">{solicitud.productId}</td>
                <td className="px-4 py-3 text-sm">${solicitud.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[solicitud.status]}`}>
                    {solicitud.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(solicitud.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link 
                    href={`/admin/solicitudes/${solicitud.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {solicitudes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay solicitudes registradas
          </div>
        )}
      </div>
    </main>
  );
}

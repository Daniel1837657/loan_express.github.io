import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function ClientesAdminPage() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== "admin") {
    return <div className="section">No autorizado</div>;
  }

  const clientes = await prisma.cliente.findMany({
    include: {
      user: true,
      solicitudes: {
        orderBy: { createdAt: "desc" }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="section">
      <h1>Clientes</h1>
      <p>Listado y gestión de clientes registrados.</p>
      
      <div className="mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Teléfono</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">País</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Solicitudes</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">
                  {cliente.firstName} {cliente.lastName}
                </td>
                <td className="px-4 py-3 text-sm">
                  {cliente.user.email}
                </td>
                <td className="px-4 py-3 text-sm">
                  {cliente.phone || "-"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {cliente.originCountry || "-"}
                </td>
                <td className="px-4 py-3 text-sm">
                  {cliente.solicitudes.length}
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(cliente.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {clientes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay clientes registrados
          </div>
        )}
      </div>
    </main>
  );
}

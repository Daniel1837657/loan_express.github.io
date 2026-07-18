import { getCurrentUser } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export default async function PerfilClientePage() {
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

  return (
    <main className="section">
      <h1>Perfil</h1>
      <p>Información personal del cliente.</p>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Información personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Nombre:</span>
            <p className="font-medium">{cliente.firstName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Apellido:</span>
            <p className="font-medium">{cliente.lastName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Email:</span>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Teléfono:</span>
            <p className="font-medium">{cliente.phone || "-"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Tipo de documento:</span>
            <p className="font-medium">{cliente.docType || "-"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Número de documento:</span>
            <p className="font-medium">{cliente.docNumber || "-"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Fecha de nacimiento:</span>
            <p className="font-medium">{new Date(cliente.birthDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">País de origen:</span>
            <p className="font-medium">{cliente.originCountry || "-"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Información laboral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Ocupación:</span>
            <p className="font-medium">{cliente.occupation || "-"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Empresa:</span>
            <p className="font-medium">{cliente.company || "-"}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Ingreso mensual:</span>
            <p className="font-medium">${cliente.monthlyIncome.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
        <h2 className="text-lg font-semibold mb-4">Dirección</h2>
        <div>
          <span className="text-sm text-gray-500">Dirección:</span>
          <p className="font-medium">{cliente.address || "-"}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Para actualizar tu información, contáctanos a contact@loanexpress.com
        </p>
      </div>
    </main>
  );
}

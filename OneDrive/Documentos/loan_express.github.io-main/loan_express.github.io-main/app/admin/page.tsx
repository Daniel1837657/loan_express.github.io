import Link from "next/link";
import "@/app/globals.css";

export default function AdminPage() {
  return (
    <main className="section">
      <h1>Panel administrativo</h1>
      <p>Accede a solicitudes, clientes y detalles de estado.</p>
      <div className="button-group">
        <Link href="/admin/solicitudes" className="primary-button">
          Solicitudes
        </Link>
        <Link href="/admin/clientes" className="secondary-button">
          Clientes
        </Link>
      </div>
    </main>
  );
}

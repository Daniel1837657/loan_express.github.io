import Link from "next/link";

export default function SolicitudesClientePage() {
  return (
    <main className="section">
      <h1>Mis solicitudes</h1>
      <p>Consulta el estado de tus solicitudes y accede al detalle.</p>
      <ul>
        <li>
          <Link href="/cliente/solicitudes/abc123">Solicitud abc123</Link>
        </li>
        <li>
          <Link href="/cliente/solicitudes/xyz456">Solicitud xyz456</Link>
        </li>
      </ul>
    </main>
  );
}

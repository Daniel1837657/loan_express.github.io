# Loan Express Portal

Portal funcional en HTML, CSS y JavaScript para revisar la experiencia del cliente y del administrador antes de conectar los servicios reales.

## Como abrir

Abre `index.html` en el navegador. No requiere servidor ni instalacion de dependencias.

## Usuarios de prueba

- Cliente: `cliente@loanexpress.com` / `Cliente123`
- Administrador: `admin@loanexpress.com` / `Admin123`

Tambien puedes registrar un cliente nuevo desde la pantalla de registro.

## Que incluye

- Sitio publico bilingue ES/EN con inicio, nosotros, servicios, requisitos, FAQ, contacto y paginas legales.
- Registro, login y recuperacion de contrasena.
- Perfil de cliente con datos obligatorios.
- Solicitud de credito en pasos, con reglas de monto, plazo, tasa y documento minimo.
- Carga de documentos PDF o imagen hasta 10 MB.
- Consulta de estado e historial.
- Panel admin con listado, filtros, busqueda, detalle, documentos y cambio de estado.
- Comentario obligatorio para rechazo y documentacion pendiente.
- Notificaciones por correo dentro del flujo.
- SEO basico: meta tags, Open Graph, Twitter Card y JSON-LD.

## Integraciones de produccion

La implementacion productiva recomendada es una app Next.js con:

- `/` publico.
- `/cliente` protegido para clientes.
- `/admin` protegido para administradores.
- Server Actions con validacion Zod.
- Prisma sobre Postgres.
- Supabase Auth y Storage privado.
- Resend para bienvenida y cambio de estado.
- `app/api/webhooks/` reservado para pagos cuando se active esa integracion.

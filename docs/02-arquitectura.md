# Fase 2 - Arquitectura

## Aplicacion

Una sola aplicacion Next.js con tres zonas:

- `/`: sitio publico.
- `/cliente`: requiere sesion y rol cliente.
- `/admin`: requiere sesion y rol administrador.

## Seguridad

El middleware verifica sesion y redirige si no existe. La autorizacion real se valida dentro de Server Actions y Route Handlers contra la base de datos.

## Capas

- Presentacion: componentes de servidor para lectura y componentes de cliente para formularios.
- Acciones: Server Actions para mutaciones internas.
- Servicios: reglas de negocio.
- Datos: Prisma como puerta unica hacia Postgres.
- Infraestructura: Supabase Auth, Supabase Storage, Resend y Vercel.

## Carpetas

```text
app/
  (public)/
  cliente/
  admin/
  api/
    webhooks/
components/
lib/
  auth/
  db/
  services/
  validations/
  utils/
prisma/
public/
types/
```

## Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `APP_URL`

## Correos

Dos plantillas:

- Bienvenida al registrarse.
- Cambio de estado de solicitud.

## Webhooks futuros

`app/api/webhooks/` queda reservado para ePayco, PayPal u otros proveedores.

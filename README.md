# Loan Express MVP Completo

Este entregable organiza el proyecto en dos partes:

- `prototype/`: demo funcional que se abre directo con `index.html`.
- `next-app/`: estructura profesional preparada para implementar el MVP con Next.js, Supabase, Prisma y Resend.

## Abrir la demo

Abre:

`prototype/index.html`

Usuarios de prueba:

- Cliente: `cliente@loanexpress.com` / `Cliente123`
- Admin: `admin@loanexpress.com` / `Admin123`

## Estructura

```text
loan-express-completo/
  docs/
    01-srs.md
    02-arquitectura.md
    03-modelo-er.md
    04-ui-ux.md
    05-trazabilidad.md
    06-contenido-institucional.md
  prototype/
    index.html
    styles.css
    app.js
    robots.txt
    sitemap.xml
  next-app/
    app/
    components/
    lib/
    prisma/
    public/
    types/
    package.json
    .env.example
```

## Que esta completo en esta fase

- Flujo publico: informacion institucional, productos, requisitos, FAQ, contacto y legales.
- Flujo cliente: registro, login, perfil, solicitud, documentos y estado.
- Flujo admin: solicitudes, busqueda, filtros, detalle, documentos y cambio de estado.
- Reglas de negocio documentadas e implementadas en la demo.
- Contenido institucional visible: historia, mision, vision, valores, privacidad y terminos.
- Modelo de datos Prisma listo.
- Estructura Next.js lista para conectar servicios reales.

## Pendiente para produccion

- Crear proyecto Supabase.
- Configurar `DATABASE_URL` y ejecutar migraciones Prisma.
- Configurar Supabase Auth y bucket privado de documentos.
- Configurar Resend con las dos plantillas: bienvenida y cambio de estado.
- Implementar Server Actions reales usando los servicios y validaciones ya separados.
# loan_express.github.io

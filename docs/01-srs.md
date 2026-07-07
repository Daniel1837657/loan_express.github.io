# Fase 1 - SRS Loan Express MVP

## Alcance

El MVP cubre el flujo completo del cliente: conocer la empresa, ver requisitos, crear cuenta, solicitar credito, adjuntar documentos y consultar el estado. El panel administrativo cubre lo basico: ver solicitudes, ver documentos, cambiar estado y buscar cliente.

Quedan fuera del MVP activo: pagos, WhatsApp Business API, consulta automatica a centrales de riesgo, firma electronica, CMS y multiples roles internos. El modelo queda preparado para integrar esos puntos despues.

## Actores

- Visitante: navega el sitio publico.
- Cliente: se registra, solicita credito, sube documentos y consulta estado.
- Administrador: revisa solicitudes, documentos y cambia estados.

## Requisitos funcionales

- RF01: Informacion institucional.
- RF02: Productos financieros: Credito Personal y Libre Inversion.
- RF03: Requisitos y FAQ.
- RF04: Selector ES/EN persistente.
- RF05: Formulario de contacto.
- RF06: Paginas legales.
- RF07: Registro con correo y contrasena.
- RF08: Inicio de sesion.
- RF09: Recuperacion de contrasena por correo.
- RF10: Edicion de perfil.
- RF11: Formulario de solicitud por producto.
- RF12: Carga de documentos PDF o imagen.
- RF13: Envio en estado inicial Enviada.
- RF14: Consulta de estado.
- RF15: Correo al cambiar estado.
- RF16: Listado admin con filtro por estado.
- RF17: Detalle admin con documentos.
- RF18: Cambio manual de estado.
- RF19: Busqueda por cliente, correo o numero de solicitud.

## Requisitos no funcionales

- HTTPS obligatorio.
- Contrasenas gestionadas por Supabase Auth.
- Validacion server-side en formularios.
- Control de acceso por rol.
- Validacion de tipo y tamano de archivo.
- Diseno responsive.
- SEO tecnico desde el inicio.
- Buen desempeno en Core Web Vitals.
- Contenido bilingue sin duplicar innecesariamente datos.

## Reglas de negocio

- Un cliente puede tener varias solicitudes activas.
- No hay verificacion obligatoria de correo.
- El correo es unico.
- Credito Personal: 3.000 a 50.000.
- Libre Inversion: 60.000 a 200.000.
- Plazos permitidos: 12, 24, 36, 48 y 60 meses.
- Tasa fija: 1.3%.
- Documento minimo: al menos un documento de identidad.
- Archivo maximo: 10 MB, PDF o imagen.
- Comentario obligatorio al rechazar o pedir documentacion adicional.

## Estados

Borrador -> Enviada -> Documentacion pendiente -> En revision -> Aprobada / Rechazada -> Cancelada.

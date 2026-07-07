# Fase 3 - Modelo Entidad-Relacion

## Entidades

- Usuario
- Cliente
- ProductoFinanciero
- Solicitud
- HistorialEstado
- Documento
- Notificacion

## Relaciones

- Usuario 1:1 Cliente.
- Cliente 1:N Solicitud.
- ProductoFinanciero 1:N Solicitud.
- Solicitud 1:N Documento.
- Solicitud 1:N HistorialEstado.
- Usuario 1:N Notificacion.

## Indices

- Usuario.supabase_id unico.
- Cliente.usuario_id unico.
- Cliente.numero_documento unico.
- Solicitud.numero_solicitud unico.
- Solicitud.cliente_id.
- Solicitud.estado_actual.
- Solicitud.created_at.
- Documento.solicitud_id.
- HistorialEstado.solicitud_id.

## Restricciones clave

- Monto dentro del rango del producto: servicio de negocio.
- Plazo en 12, 24, 36, 48 o 60.
- Solicitud siempre pertenece a un cliente.
- Documento siempre pertenece a una solicitud.
- Comentario obligatorio para rechazo y documentacion pendiente.

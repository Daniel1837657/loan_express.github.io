# Trazabilidad del MVP

| Requisito | Cobertura |
| --- | --- |
| RF01-RF06 publico/legal | `prototype/index.html`, `next-app/app/*` |
| RF07-RF09 cuenta | `prototype/app.js`, `next-app/app/login`, `next-app/app/registro`, validaciones auth |
| RF10 perfil | `prototype/app.js`, `next-app/app/cliente/perfil`, `clienteSchema` |
| RF11-RF15 solicitud/documentos/estado/correo | `prototype/app.js`, `business-rules.ts`, `solicitudes.ts`, `notifications.ts` |
| RF16-RF19 admin | `prototype/app.js`, `next-app/app/admin/*` |
| RNF01 HTTPS | Pendiente de despliegue en Vercel |
| RNF02 hash contrasenas | Supabase Auth en arquitectura |
| RNF03 validacion servidor | Zod en `lib/validations` |
| RNF04 roles | `middleware.ts`, `lib/auth/roles.ts` |
| RNF05 archivos | `business-rules.ts` |
| RNF06 responsive | `prototype/styles.css` |
| RNF07 SEO | `robots.txt`, `sitemap.xml`, metadata |
| RNF08 performance | App estatica demo y Next.js SSR preparado |
| RNF09 bilingue | Selector ES/EN en portal funcional |

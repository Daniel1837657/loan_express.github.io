import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_EMAIL = 'Loan Express <contact@loaneforxpress.com>';
const ADMIN_EMAIL = 'contact@loaneforxpress.com';

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, skipping welcome email');
      return { success: false, error: 'RESEND_API_KEY not configured' };
    }
    
    const userName = name || email.split('@')[0];
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Bienvenido a Loan Express',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a Loan Express</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">Loan Express</h1>
              <p style="color: #dbeafe; margin: 10px 0 0 0;">Crédito Digital Rápido y Transparente</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1e3a8a;">¡Bienvenido, ${userName}!</h2>
              <p>Gracias por registrarte en Loan Express. Tu cuenta ha sido creada exitosamente.</p>
              
              <p>Con tu cuenta ya puedes:</p>
              <ul style="color: #475569;">
                <li>Solicitar crédito personal o de libre inversión</li>
                <li>Adjuntar documentos de forma segura</li>
                <li>Seguir el estado de tu solicitud en tiempo real</li>
                <li>Actualizar tu perfil personal</li>
              </ul>
              
              <div style="background: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af;"><strong>Próximo paso:</strong> Completa tu perfil para agilizar el proceso de aprobación.</p>
              </div>
              
              <p>Si tienes alguna pregunta, no dudes en contactarnos:</p>
              <ul style="color: #475569;">
                <li>Correo: contact@loanexpress.com</li>
                <li>Teléfono: (501) 469-9742</li>
                <li>WhatsApp: Disponible en nuestro sitio web</li>
              </ul>
              
              <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                Atentamente,<br>
                El equipo de Loan Express
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
              <p>&copy; 2026 Loan Express. Todos los derechos reservados.</p>
              <p>Este correo fue enviado automáticamente. Por favor no respondas.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error };
  }
}

/**
 * Send contact notification to admin
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  amount?: string;
  message: string;
}) {
  try {
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, skipping contact notification');
      return { success: false, error: 'RESEND_API_KEY not configured' };
    }
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `Nuevo contacto de ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo Contacto - Loan Express</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">Loan Express</h1>
              <p style="color: #dbeafe; margin: 10px 0 0 0;">Nuevo mensaje de contacto</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1e3a8a;">Información del contacto</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: #e2e8f0;">
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Nombre:</td>
                  <td style="padding: 10px; color: #1e293b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Correo:</td>
                  <td style="padding: 10px; color: #1e293b;"><a href="mailto:${data.email}">${data.email}</a></td>
                </tr>
                ${data.phone ? `
                <tr style="background: #e2e8f0;">
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Teléfono:</td>
                  <td style="padding: 10px; color: #1e293b;"><a href="tel:${data.phone}">${data.phone}</a></td>
                </tr>
                ` : ''}
                ${data.amount ? `
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #475569;">Monto de interés:</td>
                  <td style="padding: 10px; color: #1e293b;">${data.amount}</td>
                </tr>
                ` : ''}
              </table>
              
              <h3 style="color: #1e3a8a;">Mensaje:</h3>
              <div style="background: white; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
                <p style="margin: 0; color: #475569;">${data.message}</p>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${data.email}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Responder a ${data.name}
                </a>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
              <p>&copy; 2026 Loan Express. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return { success: false, error };
  }
}

/**
 * Send status change notification to client
 */
export async function sendStatusChangeEmail(data: {
  email: string;
  name: string;
  solicitudNumber: string;
  oldStatus: string;
  newStatus: string;
  adminNotes?: string;
}) {
  try {
    if (!resend) {
      console.warn('RESEND_API_KEY not configured, skipping status change email');
      return { success: false, error: 'RESEND_API_KEY not configured' };
    }
    
    const statusColors: Record<string, string> = {
      'enviada': '#3b82f6',
      'documentacion_pendiente': '#f59e0b',
      'en_revision': '#8b5cf6',
      'aprobada': '#10b981',
      'rechazada': '#ef4444',
      'cancelada': '#6b7280'
    };
    
    const statusLabels: Record<string, string> = {
      'enviada': 'Enviada',
      'documentacion_pendiente': 'Documentación Pendiente',
      'en_revision': 'En Revisión',
      'aprobada': 'Aprobada',
      'rechazada': 'Rechazada',
      'cancelada': 'Cancelada'
    };
    
    const color = statusColors[data.newStatus] || '#6b7280';
    const newStatusLabel = statusLabels[data.newStatus] || data.newStatus;
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      subject: `Actualización de solicitud ${data.solicitudNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Actualización de Solicitud - Loan Express</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0;">Loan Express</h1>
              <p style="color: #dbeafe; margin: 10px 0 0 0;">Actualización de tu solicitud</p>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #1e3a8a;">Hola, ${data.name}</h2>
              <p>Tu solicitud <strong>${data.solicitudNumber}</strong> ha sido actualizada.</p>
              
              <div style="display: flex; align-items: center; gap: 20px; margin: 20px 0;">
                <div style="flex: 1; text-align: center; padding: 15px; background: #e2e8f0; border-radius: 6px;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">Estado anterior</p>
                  <p style="margin: 5px 0 0 0; color: #475569; font-weight: bold;">${statusLabels[data.oldStatus] || data.oldStatus}</p>
                </div>
                <div style="font-size: 24px; color: #94a3b8;">→</div>
                <div style="flex: 1; text-align: center; padding: 15px; background: ${color}20; border: 2px solid ${color}; border-radius: 6px;">
                  <p style="margin: 0; color: ${color}; font-size: 12px;">Nuevo estado</p>
                  <p style="margin: 5px 0 0 0; color: ${color}; font-weight: bold;">${newStatusLabel}</p>
                </div>
              </div>
              
              ${data.adminNotes ? `
              <div style="background: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
                <p style="margin: 0; color: #1e40af;"><strong>Notas del administrador:</strong></p>
                <p style="margin: 10px 0 0 0; color: #1e40af;">${data.adminNotes}</p>
              </div>
              ` : ''}
              
              <p style="margin-top: 20px; color: #64748b;">Puedes ver el detalle completo de tu solicitud iniciando sesión en tu cuenta.</p>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="https://loanexpress.com/cliente/solicitudes" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Ver mis solicitudes
                </a>
              </div>
              
              <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
                Si tienes preguntas, contáctanos:<br>
                📧 contact@loanexpress.com<br>
                📞 (501) 469-9742
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
              <p>&copy; 2026 Loan Express. Todos los derechos reservados.</p>
              <p>Este correo fue enviado automáticamente. Por favor no respondas.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending status change email:', error);
    return { success: false, error };
  }
}

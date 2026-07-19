export default function Testimonials() {
  const testimonials = [
    {
      quote: "El proceso fue increíblemente rápido. En 24 horas ya tenía el dinero en mi cuenta. ¡Totalmente recomendado!",
      author: "María Rodríguez",
      since: "Cliente desde 2024"
    },
    {
      quote: "La transparencia en las tasas y plazos me dio mucha confianza. Sin sorpresas, todo claro desde el principio.",
      author: "Carlos Pérez",
      since: "Cliente desde 2023"
    },
    {
      quote: "Pude consolidar mis deudas con una sola solicitud. El equipo de soporte siempre estuvo disponible para ayudarme.",
      author: "Ana Gómez",
      since: "Cliente desde 2024"
    }
  ];

  return (
    <section className="section" id="testimonios">
      <div className="section-heading">
        <p className="eyebrow">Lo que dicen nuestros clientes</p>
        <h2>Experiencias de nuestros clientes</h2>
      </div>
      <div className="product-grid">
        {testimonials.map((testimonial, index) => (
          <div className="product-card" key={index}>
            <p style={{ fontStyle: 'italic', color: '#334155', lineHeight: 1.6 }}>
              "{testimonial.quote}"
            </p>
            <div style={{ marginTop: '12px' }}>
              <strong style={{ color: '#1e3a8a' }}>{testimonial.author}</strong>
              <p className="small-note" style={{ margin: 0 }}>{testimonial.since}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
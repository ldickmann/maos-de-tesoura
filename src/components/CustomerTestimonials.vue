<template>
  <section class="testimonials">
    <div class="container">
      <h2 class="section-title">O Que Dizem Nossos Clientes</h2>
      <p class="section-subtitle">A satisfação de vocês é a nossa maior recompensa.</p>
      <div class="testimonials-container">
        <!-- Testimonial 1 -->
        <div class="testimonial-card">
          <p class="testimonial-quote">
            "O melhor corte que já fiz! Profissionais incríveis e um ambiente muito amigável.
            Recomendo 100%!"
          </p>
          <p class="testimonial-author">- João Silva</p>
        </div>
        <!-- Testimonial 2 -->
        <div class="testimonial-card">
          <p class="testimonial-quote">
            "A barba terapia é sensacional. Saí de lá renovado. Atendimento impecável e de alta
            qualidade."
          </p>
          <p class="testimonial-author">- Carlos Pereira</p>
        </div>
        <!-- Testimonial 3 -->
        <div class="testimonial-card">
          <p class="testimonial-quote">
            "Finalmente encontrei um lugar que entende o meu estilo. A equipe é super talentosa e
            atenciosa."
          </p>
          <p class="testimonial-author">- Ricardo Souza</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.testimonials {
  padding: 4rem 2rem;
  background-color: #f4f4f4;
}
.container {
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
}
.section-title {
  font-size: 2.5rem;
  font-family: 'Bungee Hairline', sans-serif;
  color: #212121;
  margin-bottom: 0.5rem;
}
.section-subtitle {
  font-size: 1.2rem;
  color: #6c6c6c;
  margin-bottom: 3rem;
  font-family: 'Hanken Grotesk', sans-serif;
}
.testimonials-container {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
}
.testimonial-card {
  background: white;
  border-left: 5px solid #ff7b42;
  border-radius: 8px;
  padding: 2rem;
  width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.testimonial-quote {
  font-family: 'Hanken Grotesk', sans-serif;
  font-style: italic;
  color: #333;
  margin-bottom: 1rem;
  flex-grow: 1;
}
.testimonial-author {
  font-family: 'Hanken Grotesk', sans-serif;
  font-weight: bold;
  color: #212121;
  text-align: right;
}
</style>

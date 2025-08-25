<template>
  <section class="services-highlight">
    <div class="container">
      <h2 class="section-title">Nossos Serviços</h2>
      <p class="section-subtitle">Qualidade e estilo em cada detalhe.</p>
      <div class="cards-container">
        <!-- Card 1 -->
        <div class="service-card">
          <div class="card-icon">✂️</div>
          <h3 class="card-title">Corte de Cabelo</h3>
          <p class="card-description">Estilos clássicos e modernos, sempre na tesoura.</p>
          <a href="/servicos" class="card-link">Ver mais</a>
        </div>
        <!-- Card 2 -->
        <div class="service-card">
          <div class="card-icon">🧔</div>
          <h3 class="card-title">Design de Barba</h3>
          <p class="card-description">Modelagem, hidratação e os melhores produtos.</p>
          <a href="/servicos" class="card-link">Ver mais</a>
        </div>
        <!-- Card 3 -->
        <div class="service-card">
          <div class="card-icon">🔥</div>
          <h3 class="card-title">Barba Terapia</h3>
          <p class="card-description">Uma experiência relaxante com toalha quente e massagem.</p>
          <a href="/servicos" class="card-link">Ver mais</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.services-highlight {
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
.cards-container {
  display: flex;
  justify-content: space-around;
  gap: 2rem;
  flex-wrap: wrap;
}
.service-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  font-family: 'Hanken Grotesk', sans-serif;
}
.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.card-title {
  font-size: 1.5rem;
  font-family: 'Archivo Black', sans-serif;
  color: #212121;
  margin-bottom: 0.5rem;
}
.card-description {
  color: #6c6c6c;
  margin-bottom: 1.5rem;
}
.card-link {
  color: #ff7b42;
  text-decoration: none;
  font-weight: bold;
}
</style>

<template>
  <div class="services-page">
    <div class="page-header">
      <h1>Nossos Serviços</h1>
      <p>Oferecemos uma gama completa de serviços para o homem moderno.</p>
    </div>
    <div class="services-container">
      <div
        v-for="service in services"
        :key="service.id"
        class="service-card"
        @click="toggleDetails(service)"
      >
        <div class="card-header">
          <h3 class="card-title">{{ service.title }}</h3>
          <span class="card-price">{{ service.price }}</span>
        </div>
        <p class="card-description">{{ service.short_desc }}</p>
        <div v-if="service.expanded" class="card-details">
          <p>{{ service.long_desc }}</p>
        </div>
        <button class="details-button">
          {{ service.expanded ? 'Ver Menos' : 'Ver Mais' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    title: 'Corte de Cabelo',
    price: 'R$ 50',
    short_desc: 'Tesoura ou máquina, com lavagem e finalização.',
    long_desc:
      'Nossos mestres barbeiros utilizam técnicas clássicas e modernas para criar o corte perfeito que combina com seu estilo e formato de rosto. Inclui consultoria, lavagem com produtos premium e finalização com pomada ou cera.',
    expanded: false,
  },
  {
    id: 2,
    title: 'Design de Barba',
    price: 'R$ 40',
    short_desc: 'Modelagem completa da barba com navalha.',
    long_desc:
      'Alinhamento preciso, modelagem e hidratação. Usamos óleos e balms especiais para deixar sua barba macia, saudável e com um aroma incrível.',
    expanded: false,
  },
  {
    id: 3,
    title: 'Barba Terapia',
    price: 'R$ 70',
    short_desc: 'Uma experiência premium com toalha quente.',
    long_desc:
      'Relaxe e renove-se. Este serviço inclui esfoliação facial, toalha quente para abrir os poros, barbear clássico com navalha, e uma massagem facial relaxante para finalizar. Uma experiência de luxo.',
    expanded: false,
  },
  {
    id: 4,
    title: 'Combo Cabelo + Barba',
    price: 'R$ 80',
    short_desc: 'O pacote completo para um visual impecável.',
    long_desc:
      'Combine o nosso corte de cabelo premium com o design de barba para um visual completo e harmonioso, com um preço especial.',
    expanded: false,
  },
  {
    id: 5,
    title: 'Tratamento Capilar',
    price: 'R$ 60',
    short_desc: 'Hidratação e fortalecimento dos fios.',
    long_desc:
      'Recupere a saúde do seu cabelo com nossos tratamentos de hidratação profunda. Ideal para cabelos ressecados ou danificados.',
    expanded: false,
  },
])

const toggleDetails = (service) => {
  service.expanded = !service.expanded
}
</script>

<style scoped lang="scss">
.services-page {
  padding: 88px 2rem 2rem;
  background-color: #f4f4f4;
  min-height: 100vh;
  font-family: 'Hanken Grotesk', sans-serif;
}
.page-header {
  text-align: center;
  margin: 2rem 0 4rem;
}
.page-header h1 {
  font-size: 3rem;
  font-family: 'Bungee Hairline', sans-serif;
  color: #212121;
}
.page-header p {
  font-size: 1.2rem;
  color: #6c6c6c;
}
.services-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
.service-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.service-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.card-title {
  font-size: 1.5rem;
  font-family: 'Archivo Black', sans-serif;
  color: #212121;
}
.card-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff7b42;
}
.card-description {
  color: #6c6c6c;
  margin-bottom: 1rem;
}
.card-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  color: #333;
}
.details-button {
  background: none;
  border: none;
  color: #ff7b42;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0;
  font-size: 1rem;
  font-family: 'Hanken Grotesk', sans-serif;
}
</style>

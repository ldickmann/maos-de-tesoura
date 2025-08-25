<template>
  <section class="photo-gallery">
    <div class="container">
      <h2 class="section-title">Nossa Galeria</h2>
      <p class="section-subtitle">Um vislumbre do nosso trabalho e do nosso espaço.</p>
      <div class="gallery-grid">
        <div class="gallery-item" v-for="image in images" :key="image.id">
          <img :src="image.src" :alt="image.alt" class="gallery-image" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  { id: 1, src: '/images/image-1-card.jpg', alt: 'Corte de cabelo estiloso' },
  { id: 2, src: '/images/barber-banner.jpg', alt: 'Ambiente da barbearia' },
  { id: 3, src: '/images/image-1-card.jpg', alt: 'Barba bem feita' },
  { id: 4, src: '/images/barber-banner.jpg', alt: 'Cliente satisfeito' },
])
</script>

<style scoped lang="scss">
.photo-gallery {
  padding: 4rem 2rem;
  background-color: #ffffff;
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
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.gallery-item {
  overflow: hidden;
  border-radius: 10px;
  height: 250px;
}
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.gallery-image:hover {
  transform: scale(1.05);
}
</style>

<template>
  <!-- Componente Banner, que exibirá um banner com imagem de fundo, texto sobreposto e botão de ação -->
  <div class="banner">
    <img :src="bannerImage" class="banner-img" alt="" />

    <div class="banner-overlay">
      <div class="toolbar">
        <div class="toolbar-title">
          <h1 class="banner-title">
            <span class="text-overline">A Barbearia onde você vira</span>
            <span class="highlight-text">Referência</span>
          </h1>
          <div class="line-text-row">
            <LineComponent class="line" :isVertical="false" lineWidth="50px" lineHeight="1px" />
            <p class="text-overline-toolbar">Desde 2009</p>
            <LineComponent class="line" :isVertical="false" lineWidth="50px" lineHeight="1px" />
          </div>
        </div>
      </div>

      <div class="card-actions">
        <button @click="handleBooking" class="btn btn--outline-light banner-btn">
          Agende um Horário
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'
import LineComponent from './LineComponent.vue'
import bannerImg from '@/assets/images/barber-banner.jpg'

const bannerImage = ref(bannerImg)
const notificationStore = useNotificationStore()

const handleBooking = () => {
  notificationStore.showInfo('Função Não implementada')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

.banner {
  @include mx.on-dark-surface;
  width: 100%;
  height: 100vh;
  font-family: var.$font-family-tertiary;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 80vh;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(to top, rgba(var.$primary, 0.7), transparent);

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.toolbar-title {
  color: var.$accent-light;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

// O h1 agrupa as duas linhas do título sem mudar o desenho
.banner-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-weight: 400;
}

.text-overline {
  font-size: 1.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
}

.text-overline-toolbar {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
}

.highlight-text {
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var.$secondary;
  color: transparent;
  font-size: 5rem;
  font-weight: 400;
  line-height: 4rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
    line-height: 2.5rem;
    -webkit-text-stroke-width: 1px;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    line-height: 2rem;
  }
}

.line-text-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 3rem;
}

.card-actions {
  margin-top: 4rem;
  text-align: center;
}

.banner-btn {
  padding: 1.3rem 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  font-family: var.$font-family-secondary;
  font-weight: bold;
}
</style>

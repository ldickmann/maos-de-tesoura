<template>
  <div class="banner">
    <img :src="bannerImage" class="banner-img" alt="Barbearia Banner" />

    <div class="banner-overlay">
      <div class="toolbar">
        <div class="toolbar-title">
          <p class="text-overline">A Barbearia onde você vira</p>
          <span class="highlight-text">Referência</span>
          <div class="line-text-row">
            <LineComponent class="line" :isVertical="false" lineWidth="50px" lineHeight="1px" />
            <p class="text-overline-toolbar">Desde 2009</p>
            <LineComponent class="line" :isVertical="false" lineWidth="50px" lineHeight="1px" />
          </div>
        </div>
      </div>

      <div class="card-actions">
        <button @click="handleBooking" class="btn-outline">Agende um Horário</button>
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
@use 'sass:color';
@use '@/assets/styles/scss/_variables.scss' as var;

.banner {
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

.btn-outline {
  background: transparent;
  color: var.$accent-light;
  border: 2px solid var.$accent-light;
  padding: 1.3rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  font-family: var.$font-family-secondary;
  font-weight: bold;

  &:hover {
    background-color: var.$secondary;
    border-color: var.$secondary;
    color: var.$primary;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(var.$secondary, 0.4);
  }
}
</style>

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

      <!-- <div class="card-container">
        <div class="card-content">
          <p class="text-subtitle1">
            Renove seu estilo, cuide da sua barba e sinta-se no controle. Aqui, cada corte é uma
            experiência única!
          </p>
        </div>
      </div> -->

      <div class="card-actions">
        <router-link to="/booking" class="btn-outline">Agende um Horário</router-link>
      </div>
    </div>

    <!-- <div class="banner-inclined">
      <div class="toolbar-title">
        <p class="text-banner-inclined">Força, estilo e respeito</p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineComponent from './LineComponent.vue'

const bannerImage = ref('/images/barber-banner.jpg')
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 100vh;
  font-family: $font-family-tertiary;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    height: 80vh;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  background: rgba($tertiary, 0.4);

  @media (max-width: 768px) {
    height: 80vh;
    padding: 1rem;
  }
}

.toolbar-title {
  color: $accent-light;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
  -webkit-text-stroke-color: $secondary;
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

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.card-content {
  background: rgba($tertiary, 0.8);
  color: $accent-light;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
}

.text-subtitle1 {
  color: $accent-light;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 300;
}

.card-actions {
  margin-top: 4rem;
  text-align: center;
}

.btn-outline {
  background: transparent;
  color: $accent-light;
  border: 2px solid $accent-light;
  padding: 1.3rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    background-color: rgba($accent-light, 0.1);
  }
}

.banner-inclined {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: $secondary;
  padding: 1.5rem 0;
  transform: skewY(-2deg);
  margin-top: -4rem;
  position: relative;
  z-index: 10;
}

.text-banner-inclined {
  font-family: $font-family-tertiary;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: $tertiary;
  font-size: 3rem;
  color: $accent-light;
  text-transform: uppercase;
  font-weight: 400;
}
</style>

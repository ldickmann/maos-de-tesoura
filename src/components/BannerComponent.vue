<template>
  <div class="banner">
    <img :src="bannerImage" class="banner-img" alt="Barbearia Banner" />

    <div class="banner-overlay">
      <div class="toolbar">
        <div class="toolbar-title">
          <p class="text-overline-toolbar">Desde 1999</p>
          <p>A Barbearia dos</p>
          <span class="highlight-text">Homens</span>
        </div>
      </div>

      <div class="card-container">
        <div class="card transparent-card">
          <div class="card-section">
            <p class="text-subtitle1">
              Renove seu estilo, cuide da sua barba e sinta-se no controle. Aqui, cada corte é uma
              experiência única!
            </p>
          </div>
          <div class="card-actions">
            <button class="btn-outline">Ver Mais</button>
          </div>
        </div>
      </div>
    </div>

    <div class="banner-inclined">
      <div class="toolbar-title">
        <p class="text-banner-inclined">Força, estilo e respeito</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bannerImage = ref('/images/barber-banner.jpg')
</script>

<style scoped lang="scss">
@use '../assets/base.scss' as *;

.banner {
  width: 100%;
  height: 80vh;
  font-family: $font-family-tertiary;
  position: relative;
  overflow: visible;
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
  height: calc(80vh - 1rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  background: rgba($tertiary, 0.4);
}

.toolbar-title {
  color: $accent-light;
  text-transform: uppercase;
}

.text-overline-toolbar {
  font-size: 0.9rem;
  line-height: 1rem;
  font-weight: 300;
}

.highlight-text {
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: $secondary;
  color: transparent;
  font-size: 4rem;
  font-weight: 400;
  line-height: 4rem;
  text-transform: uppercase;
}

.card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.card {
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
  margin-top: 2rem;
  text-align: center;
}

.btn-outline {
  background: transparent;
  color: $accent-light;
  border: 2px solid $accent-light;
  padding: 0.8rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 5px;
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

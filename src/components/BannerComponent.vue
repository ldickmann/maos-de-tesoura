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
            <p class="text-white text-subtitle1">
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
      <div class="toolbar">
        <div class="toolbar-title">
          <p class="text-title-banner-inclined">Força, estilo e respeito</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bannerImage = ref('/images/barber-banner.jpg')
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 80vh;
  font-family: 'Hanken Grotesk', sans-serif;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
}

.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.toolbar-title {
  text-align: center;
  color: white;
  text-transform: uppercase;
}

.text-overline-toolbar {
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: 200;
}

.highlight-text {
  text-align: center;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff7b42;
  color: transparent;
  font-size: 3.75rem;
  font-weight: 400;
  line-height: 3.75rem;
  text-transform: uppercase;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: rgba(0, 0, 0, 0.6);
  padding: 1.5rem;
  border-radius: 10px;
  max-width: 500px;
}

.text-subtitle1 {
  color: white;
  font-size: 1rem;
}

.card-actions {
  margin-top: 1rem;
  text-align: center;
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 5px;
}

.banner-inclined {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #ff7b42;
  padding: 1rem 0;
  transform: skewY(-3deg);
  margin-top: -3rem;
}

.text-title-banner-inclined {
  font-family: 'Bungee Hairline', sans-serif;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #000;
  font-size: 4rem;
  color: white;
}
</style>

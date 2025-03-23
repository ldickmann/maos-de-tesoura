<template>
  <main>
    <!-- Banner Section -->
    <section class="section-banner">
      <BannerComponent />
    </section>
    <CardComponent />
    <section class="section-black">
      <div class="container-services">
        <h2 class="text-h2 text-white text-center">Nossos Serviços</h2>
        <MiniCard />
      </div>
    </section>
  </main>
</template>

<script setup>
import BannerComponent from '@/components/BannerComponent.vue'
import CardComponent from '@/components/CardComponent.vue'
import MiniCard from '@/components/MiniCard.vue'
</script>

<style scoped lang="scss">
@use '../assets/base.scss' as *;
@use '../assets/typography.scss' as *;

.section-banner {
  height: 100vh;
}

.section-black {
  margin-top: 3rem;
  height: 60vh;
  background-color: $dark-page;

  .container-services {
    max-width: 1300px;
    margin: 0 auto;
    padding: 1rem 0;
    font-family: 'Hanken Grotesk';
  }
}
</style>

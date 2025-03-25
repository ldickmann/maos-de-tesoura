<template>
  <main>
    <!-- BannerComponent Section -->
    <section class="section-banner">
      <BannerComponent />
    </section>
    <!-- CardComponent Section -->
    <CardComponent />
    <section class="section-black">
      <div class="container-services">
        <h2 class="title-services">Nossos Serviços</h2>
        <hr class="separator-services" />
        <!-- MiniCard Component -->
        <div class="container-mini-cards">
          <MiniCard
            title="Lorem Ipsum"
            subtitle="Dolor sit amet, consectetur adipiscing elit."
            iconLibrary="mdi"
            icon="content-cut"
          />
          <MiniCard
            title="Lorem Ipsum"
            subtitle="Dolor sit amet, consectetur adipiscing elit."
            iconLibrary="mdi"
            icon="chair-rolling"
          />
          <MiniCard
            title="Lorem Ipsum"
            subtitle="Dolor sit amet, consectetur adipiscing elit."
            iconLibrary="mdi"
            icon="box-cutter"
          />
          <MiniCard
            title="Lorem Ipsum"
            subtitle="Dolor sit amet, consectetur adipiscing elit."
            iconLibrary="material"
            icon="accessibility_new"
          />
        </div>
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

.section-banner {
  height: 100vh;
}

.section-black {
  margin-top: 3rem;
  height: 50vh;
  background-color: $dark-page;

  .container-services {
    max-width: 1400px;
    margin: 0 auto;
    font-family: $font-family-tertiary;

    .title-services {
      color: $color-text-light;
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      padding-top: 1rem;
    }

    .separator-services {
      height: 2px;
      background-color: $color-bg-gray;
      margin-top: 1rem;
    }

    .container-mini-cards {
      display: flex;
      justify-content: space-evenly;
      margin-top: 2rem;
    }
  }
}
</style>

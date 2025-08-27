<template>
  <main>
    <!-- BannerComponent Section -->
    <section class="section-banner">
      <BannerComponent />
    </section>
<<<<<<< HEAD

    <!-- Services Highlight Section -->
    <ServicesHighlight />

    <!-- Photo Gallery Section -->
    <PhotoGallery />

    <!-- Testimonials Section -->
    <CustomerTestimonials />
=======
    <!-- CardComponent Section -->
    <CardComponent />
    <section class="section-mini-cards">
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
>>>>>>> feature/home-page-development
  </main>
</template>

<script setup>
import BannerComponent from '@/components/BannerComponent.vue'
<<<<<<< HEAD
import ServicesHighlight from '@/components/ServicesHighlight.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import CustomerTestimonials from '@/components/CustomerTestimonials.vue'
=======
import CardComponent from '@/components/CardComponent.vue'
import MiniCard from '@/components/MiniCard.vue'
>>>>>>> feature/home-page-development
</script>

<style scoped lang="scss">
.section-banner {
  height: 100vh;
}

.section-mini-cards {
  margin-top: 3rem;
  height: 55vh;
  background-color: $bg-dark;

  .container-services {
    max-width: 1400px;
    margin: 0 auto;
    font-family: $font-family-tertiary;

    .title-services {
      color: $accent-light;
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      padding-top: 1rem;
    }

    .separator-services {
      height: 2px;
      background-color: $accent-light;
      margin-top: 1rem;
    }

    .container-mini-cards {
      display: flex;
      justify-content: space-evenly;
      margin-top: 4rem;
    }
  }
}
</style>

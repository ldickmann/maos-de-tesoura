<template>
  <main>
    <!-- Banner Section -->
    <section class="section-banner">
      <BannerComponent />
    </section>

    <!-- Services Highlight Section -->
    <ServicesHighlight />

    <!-- Photo Gallery Section -->
    <PhotoGallery />

    <!-- Testimonials Section -->
    <CustomerTestimonials />
  </main>
</template>

<script setup>
import BannerComponent from '@/components/BannerComponent.vue'
import ServicesHighlight from '@/components/ServicesHighlight.vue'
import PhotoGallery from '@/components/PhotoGallery.vue'
import CustomerTestimonials from '@/components/CustomerTestimonials.vue'
</script>

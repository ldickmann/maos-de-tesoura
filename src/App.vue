<template>
  <HeaderFloating />

  <RouterView />

  <FooterComponent />

  <!-- Sistema de Notificações Global -->
  <NotificationSystem />
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderFloating from '@/components/layouts/HeaderFloating.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import NotificationSystem from '@/components/NotificationSystem.vue'
</script>

<style scoped></style>

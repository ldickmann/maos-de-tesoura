<template>
  <HeaderFloating />

  <RouterView />

  <FooterComponent />

  <AssinaturaTraco tom="escuro" />

  <!-- Sistema de Notificações Global -->
  <NotificationSystem />
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderFloating from '@/components/layouts/HeaderFloating.vue'
import FooterComponent from '@/components/layouts/FooterComponent.vue'
import AssinaturaTraco from '@/components/AssinaturaTraco.vue'
import NotificationSystem from '@/components/NotificationSystem.vue'
</script>

<style scoped></style>

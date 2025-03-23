<template>
  <HeaderFloating />

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderFloating from '@/components/HeaderFloating.vue' // Importação do novo header
</script>

<style scoped></style>

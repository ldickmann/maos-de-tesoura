<template>
  <HeaderFloating />

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderFloating from '@/components/HeaderFloating.vue'
</script>

<style scoped></style>

<template>
  <!-- Componente de Loading Spinner, que exibirá um spinner de carregamento com uma mensagem opcional -->
  <div class="loading-container" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
    <p v-else class="loading-message">Carregando...</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
  margin: 2rem auto;
  max-width: 600px;
  background: var.$accent-light;
  border-radius: var.$radius-xl;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

// Com prefers-reduced-motion, a regra global de _base.scss para a rotação e o texto fica
.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 0.25rem solid var.$bg-track;
  border-top: 0.25rem solid var.$secondary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-message {
  color: var.$text-gray;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

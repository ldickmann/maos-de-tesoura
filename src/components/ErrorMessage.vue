<template>
  <!-- Componente de Error Message, que exibirá uma mensagem de erro com opções para tentar novamente ou voltar ao início -->
  <div class="error-container" role="alert">
    <div class="error-icon" aria-hidden="true">
      <i class="fas fa-exclamation-triangle"></i>
    </div>
    <h2 class="error-title">{{ title }}</h2>
    <p class="error-message">{{ message }}</p>
    <div class="error-actions">
      <button v-if="showRetry" class="btn btn--primary error-btn" @click="$emit('retry')">
        <i class="fas fa-redo" aria-hidden="true"></i>
        Tentar Novamente
      </button>
      <router-link v-if="showBackHome" to="/" class="btn error-btn error-btn--neutral">
        <i class="fas fa-home" aria-hidden="true"></i>
        Voltar ao Início
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Ops! Algo deu errado',
  },
  message: {
    type: String,
    required: true,
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
  showBackHome: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['retry'])
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 300px;
  margin: 2rem auto;
  max-width: 600px;
  background: var.$accent-light;
  border-radius: var.$radius-xl;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.error-icon {
  font-size: 3rem;
  color: var.$danger;
  margin-bottom: 1rem;
}

.error-title {
  color: var.$text-primary;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-family: var.$font-family-primary;
}

.error-message {
  color: var.$text-gray;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.error-btn {
  padding: 0.75rem 1.5rem;

  // Botão neutro: branco sobre cinza (4,69:1; hover 6,21:1)
  &--neutral {
    background-color: var.$btn-secondary-bg;
    color: var.$accent-light;

    &:hover {
      background-color: var.$btn-secondary-hover;
    }
  }
}

@media (max-width: 768px) {
  .error-container {
    padding: 1.5rem;
    margin: 1rem;
  }

  .error-actions {
    flex-direction: column;
    width: 100%;
    max-width: 200px;
  }

  .error-btn {
    width: 100%;
  }
}
</style>

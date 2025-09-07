<template>
  <div class="error-container">
    <div class="error-icon">
      <i class="fas fa-exclamation-triangle"></i>
    </div>
    <h3 class="error-title">{{ title }}</h3>
    <p class="error-message">{{ message }}</p>
    <div class="error-actions">
      <button v-if="showRetry" class="btn btn-primary" @click="$emit('retry')">
        <i class="fas fa-redo"></i>
        Tentar Novamente
      </button>
      <router-link v-if="showBackHome" to="/" class="btn btn-secondary">
        <i class="fas fa-home"></i>
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
@use 'sass:color';
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
  background: white;
  border-radius: 16px;
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

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.btn-primary {
    background-color: var.$secondary;
    color: white;

    &:hover {
      background-color: var.$btn-primary-hover;
      transform: translateY(-2px);
    }
  }

  &.btn-secondary {
    background-color: var.$btn-secondary-bg;
    color: white;

    &:hover {
      background-color: var.$btn-secondary-hover;
      transform: translateY(-2px);
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

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

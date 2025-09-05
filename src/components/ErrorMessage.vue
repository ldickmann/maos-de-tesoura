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
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 300px;
}

.error-icon {
  font-size: 3rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.error-title {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.error-message {
  color: #666;
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
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.btn-primary {
    background-color: #ff7b42;
    color: white;

    &:hover {
      background-color: #e66b32;
    }
  }

  &.btn-secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #545b62;
    }
  }
}

@media (max-width: 768px) {
  .error-container {
    padding: 1rem;
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

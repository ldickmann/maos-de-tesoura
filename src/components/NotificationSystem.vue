<template>
  <!-- Componente de Notification System, que exibirá notificações do tipo sucesso, erro, aviso ou informação -->
  <Teleport to="body">
    <!-- Sempre montado, para o último toast também animar a saída -->
    <div class="notification-container">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', `notification--${notification.type}`]"
          :role="notification.type === 'error' ? 'alert' : 'status'"
          :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="notification__icon" aria-hidden="true">
            <i :class="getIconClass(notification.type)"></i>
          </div>
          <div class="notification__content">
            <p class="notification__message">{{ notification.message }}</p>
          </div>
          <button
            class="notification__close"
            @click="removeNotification(notification.id)"
            aria-label="Fechar notificação"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)
const { removeNotification } = notificationStore

const getIconClass = (type) => {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle',
  }
  return icons[type] || icons.info
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/scss/_variables.scss' as var;
@use '@/assets/styles/scss/_mixins.scss' as mx;

// Abaixo do header, para não cobrir o logo, o menu nem o botão de agendar
.notification-container {
  position: fixed;
  top: calc(#{var.$header-height} + 12px);
  right: 20px;
  z-index: var.$z-toast;
  max-width: 400px;
  width: 100%;

  @include mx.down(var.$bp-lg) {
    top: calc(#{var.$header-height-mobile} + 12px);
  }
}

.notification {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  padding: 16px;
  border-left: 4px solid;
  min-height: 60px;

  &--success {
    border-left-color: var.$success;

    .notification__icon {
      color: var.$success;
    }
  }

  &--error {
    border-left-color: var.$danger;

    .notification__icon {
      color: var.$danger;
    }
  }

  &--warning {
    border-left-color: var.$warning;

    .notification__icon {
      color: var.$warning;
    }
  }

  &--info {
    border-left-color: var.$info;

    .notification__icon {
      color: var.$info;
    }
  }
}

.notification__icon {
  font-size: 1.25rem;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification__content {
  flex: 1;
}

.notification__message {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #333;
}

// Área de toque de 44×44; as margens negativas mantêm o espaço de 24×24 no toast
.notification__close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var.$text-gray;
  padding: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition:
    color var.$duration-fast var.$ease,
    background-color var.$duration-fast var.$ease;
  flex-shrink: 0;
  margin: -10px -10px -10px -2px;

  &:hover {
    color: #666;
    background-color: #f0f0f0;
  }
}

// Animações
.notification-enter-active,
.notification-leave-active {
  transition:
    transform var.$duration-base var.$ease,
    opacity var.$duration-base var.$ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform var.$duration-base var.$ease;
}

@media (max-width: 768px) {
  .notification-container {
    right: 10px;
    left: 10px;
    width: auto;
    max-width: none;
  }

  .notification {
    margin-bottom: 8px;
    padding: 12px;
  }

  .notification__message {
    font-size: 0.8125rem;
  }
}
</style>

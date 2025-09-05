<template>
  <Teleport to="body">
    <div v-if="notifications.length" class="notification-container">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification', `notification--${notification.type}`]"
        >
          <div class="notification__icon">
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
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
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
    border-left-color: #28a745;

    .notification__icon {
      color: #28a745;
    }
  }

  &--error {
    border-left-color: #dc3545;

    .notification__icon {
      color: #dc3545;
    }
  }

  &--warning {
    border-left-color: #ffc107;

    .notification__icon {
      color: #ffc107;
    }
  }

  &--info {
    border-left-color: #17a2b8;

    .notification__icon {
      color: #17a2b8;
    }
  }
}

.notification__icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.notification__content {
  flex: 1;
}

.notification__message {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.notification__close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;

  &:hover {
    color: #666;
    background-color: #f0f0f0;
  }
}

// Animações
.notification-enter-active {
  transition: all 0.3s ease;
}

.notification-leave-active {
  transition: all 0.3s ease;
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
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .notification {
    margin-bottom: 8px;
    padding: 12px;
  }

  .notification__message {
    font-size: 13px;
  }
}
</style>

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()

    const newNotification = {
      id,
      type: notification.type || 'info', // success, error, warning, info
      message: notification.message,
      duration: notification.duration || 5000,
      persistent: notification.persistent || false,
    }

    notifications.value.push(newNotification)

    // Remover notificação automaticamente após a duração
    if (!newNotification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Helper auxiliares para diferentes tipos
  const showSuccess = (message, options = {}) => {
    return addNotification({ ...options, type: 'success', message })
  }

  const showError = (message, options = {}) => {
    return addNotification({ ...options, type: 'error', message })
  }

  const showWarning = (message, options = {}) => {
    return addNotification({ ...options, type: 'warning', message })
  }

  const showInfo = (message, options = {}) => {
    return addNotification({ ...options, type: 'info', message })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
})

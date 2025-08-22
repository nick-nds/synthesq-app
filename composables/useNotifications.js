import { reactive } from 'vue'

const notifications = reactive([])

export const useNotifications = () => {
  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      title: 'Notification',
      message: '',
      duration: 5000,
      persistent: false,
      actions: [],
      ...notification
    }
    
    notifications.push(newNotification)
    
    // Auto-remove after duration if not persistent
    if (!newNotification.persistent && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  const removeNotification = (id) => {
    const index = notifications.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.splice(index, 1)
    }
  }
  
  const clearAll = () => {
    notifications.splice(0)
  }
  
  // Convenience methods
  const success = (title, message, options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options
    })
  }
  
  const error = (title, message, options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 8000,
      ...options
    })
  }
  
  const warning = (title, message, options = {}) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration: 6000,
      ...options
    })
  }
  
  const info = (title, message, options = {}) => {
    return addNotification({
      type: 'info',
      title,
      message,
      ...options
    })
  }
  
  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }
}
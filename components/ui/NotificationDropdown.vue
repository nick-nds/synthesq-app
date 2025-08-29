<template>
  <div class="relative" ref="notificationRef">
    <!-- Notification Bell Button -->
    <button 
      @click="isOpen = !isOpen"
      class="relative p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
      :class="{ 'text-primary-600': isOpen }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
      <!-- Notification badge -->
      <span 
        v-if="unreadCount > 0" 
        class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown Panel -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-show="isOpen"
        class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
      >
        <!-- Header -->
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
            <div class="flex items-center space-x-2">
              <button
                v-if="unreadCount > 0"
                @click="markAllAsRead"
                class="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Mark all read
              </button>
              <button
                v-if="mockNotifications.length > 0"
                @click="clearAllNotifications"
                class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>

        <!-- Notification List -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="mockNotifications.length === 0" class="px-4 py-8 text-center">
            <div class="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5-5-5h5v-12" />
              </svg>
            </div>
            <p class="text-sm text-gray-500 mb-1">No notifications</p>
            <p class="text-xs text-gray-400">You're all caught up!</p>
          </div>

          <!-- Notification Items -->
          <div v-else class="divide-y divide-gray-100">
            <div
              v-for="notification in mockNotifications"
              :key="notification.id"
              class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
              :class="{ 'bg-blue-50/30': !notification.read }"
              @click="markAsRead(notification.id)"
            >
              <div class="flex items-start space-x-3">
                <!-- Icon -->
                <div class="flex-shrink-0 mt-0.5">
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      getNotificationIconStyle(notification.type)
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="notification.type === 'lead'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      <path v-else-if="notification.type === 'order'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      <path v-else-if="notification.type === 'payment'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      <path v-else-if="notification.type === 'system'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ notification.title }}
                    </p>
                    <div class="flex items-center space-x-1">
                      <span 
                        v-if="!notification.read" 
                        class="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"
                      ></span>
                      <span class="text-xs text-gray-500 flex-shrink-0">
                        {{ formatTimeAgo(notification.timestamp) }}
                      </span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {{ notification.message }}
                  </p>
                  <div v-if="notification.action" class="mt-2">
                    <button
                      @click.stop="handleAction(notification)"
                      class="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {{ notification.action.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button
            @click="viewAllNotifications"
            class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors w-full text-center"
          >
            View all notifications
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Component state
const isOpen = ref(false)
const notificationRef = ref(null)

// Mock notifications data
const mockNotifications = ref([
  {
    id: 1,
    type: 'lead',
    title: 'New Lead Created',
    message: 'Sarah Johnson from TechCorp has submitted a new lead inquiry for ERP solutions.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    action: {
      label: 'View Lead',
      handler: () => navigateTo('/crm/leads')
    }
  },
  {
    id: 2,
    type: 'order',
    title: 'Order Completed',
    message: 'Order #ORD-2024-156 has been successfully completed and shipped to Acme Corp.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    read: false,
    action: {
      label: 'View Order',
      handler: () => navigateTo('/sales/orders')
    }
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    message: '$12,500 payment received from Global Industries for Invoice #INV-2024-089.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    action: {
      label: 'View Payment',
      handler: () => navigateTo('/sales/payments')
    }
  },
  {
    id: 4,
    type: 'system',
    title: 'System Update',
    message: 'Scheduled maintenance completed successfully. All systems are running normally.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true
  },
  {
    id: 5,
    type: 'lead',
    title: 'Lead Converted',
    message: 'Mike Chen has successfully converted lead L-2024-045 to a customer opportunity.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    action: {
      label: 'View Opportunity',
      handler: () => navigateTo('/crm/opportunities')
    }
  }
])

// Computed properties
const unreadCount = computed(() => {
  return mockNotifications.value.filter(n => !n.read).length
})

// Methods
const markAsRead = (id) => {
  const notification = mockNotifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  mockNotifications.value.forEach(n => n.read = true)
}

const clearAllNotifications = () => {
  mockNotifications.value = []
  isOpen.value = false
}

const handleAction = (notification) => {
  if (notification.action?.handler) {
    notification.action.handler()
    isOpen.value = false
  }
}

const viewAllNotifications = () => {
  // In a real app, this would navigate to a full notifications page
  console.log('Navigate to full notifications page')
  isOpen.value = false
}

const getNotificationIconStyle = (type) => {
  switch (type) {
    case 'lead':
      return 'bg-blue-100 text-blue-600'
    case 'order':
      return 'bg-green-100 text-green-600'
    case 'payment':
      return 'bg-emerald-100 text-emerald-600'
    case 'system':
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-primary-100 text-primary-600'
  }
}

const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const diffInSeconds = Math.floor((now - timestamp) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return timestamp.toLocaleDateString()
}

// Click outside to close
const handleClickOutside = (event) => {
  if (notificationRef.value && !notificationRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Add/remove click outside listener
watch(isOpen, (newIsOpen) => {
  if (newIsOpen) {
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Add new notifications periodically for demo
let notificationInterval
onMounted(() => {
  // Add a new notification every 2 minutes for demo purposes
  notificationInterval = setInterval(() => {
    const newNotification = {
      id: Date.now(),
      type: ['lead', 'order', 'payment', 'system'][Math.floor(Math.random() * 4)],
      title: 'Demo Notification',
      message: 'This is a demo notification that appears automatically.',
      timestamp: new Date(),
      read: false
    }
    mockNotifications.value.unshift(newNotification)
    
    // Keep only last 10 notifications
    if (mockNotifications.value.length > 10) {
      mockNotifications.value = mockNotifications.value.slice(0, 10)
    }
  }, 120000) // 2 minutes
})

onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
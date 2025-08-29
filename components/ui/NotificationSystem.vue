<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none w-80 sm:w-96 md:w-[28rem] lg:w-[32rem]">
    <TransitionGroup
      name="notification"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden',
          getNotificationStyle(notification.type)
        ]"
        role="alert"
      >
        <div class="p-5">
          <div class="flex items-start">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <svg
                v-if="notification.type === 'success'"
                class="h-6 w-6 text-success-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg
                v-else-if="notification.type === 'error'"
                class="h-6 w-6 text-error-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg
                v-else-if="notification.type === 'warning'"
                class="h-6 w-6 text-warning-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <svg
                v-else
                class="h-6 w-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <!-- Content -->
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p :class="getTitleClass(notification.type)" class="text-base font-semibold">
                {{ notification.title }}
              </p>
              <p v-if="notification.message" :class="getMessageClass(notification.type)" class="mt-1 text-sm">
                {{ notification.message }}
              </p>
              
              <!-- Actions -->
              <div v-if="notification.actions && notification.actions.length > 0" class="mt-3 flex space-x-2">
                <button
                  v-for="action in notification.actions"
                  :key="action.label"
                  @click="handleAction(action, notification)"
                  :class="[
                    'text-xs font-medium rounded-md px-2 py-1',
                    getActionClass(notification.type, action.primary)
                  ]"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
            
            <!-- Close button -->
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                :class="[
                  'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  notification.type === 'success' ? 'focus:ring-success-500' :
                  notification.type === 'error' ? 'focus:ring-error-500' :
                  notification.type === 'warning' ? 'focus:ring-warning-500' :
                  'focus:ring-primary-500'
                ]"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Progress bar for timed notifications -->
        <div
          v-if="!notification.persistent && notification.duration > 0"
          :class="[
            'h-1 rounded-b-lg',
            notification.type === 'success' ? 'bg-success-200' :
            notification.type === 'error' ? 'bg-error-200' :
            notification.type === 'warning' ? 'bg-warning-200' :
            'bg-primary-200'
          ]"
        >
          <div
            :class="[
              'h-full rounded-b-lg transition-all ease-linear',
              notification.type === 'success' ? 'bg-success-500' :
              notification.type === 'error' ? 'bg-error-500' :
              notification.type === 'warning' ? 'bg-warning-500' :
              'bg-primary-500'
            ]"
            :style="{ 
              width: '100%',
              animationDuration: `${notification.duration}ms`,
              animationName: 'progress-shrink',
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards'
            }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { notifications, removeNotification } = useNotifications()

const getNotificationStyle = (type) => {
  switch (type) {
    case 'success':
      return 'bg-success-50 border border-success-200'
    case 'error':
      return 'bg-error-50 border border-error-200'
    case 'warning':
      return 'bg-warning-50 border border-warning-200'
    default:
      return 'bg-primary-50 border border-primary-200'
  }
}

const getTitleClass = (type) => {
  switch (type) {
    case 'success':
      return 'text-success-900'
    case 'error':
      return 'text-error-900'
    case 'warning':
      return 'text-warning-900'
    default:
      return 'text-primary-900'
  }
}

const getMessageClass = (type) => {
  switch (type) {
    case 'success':
      return 'text-success-700'
    case 'error':
      return 'text-error-700'
    case 'warning':
      return 'text-warning-700'
    default:
      return 'text-primary-700'
  }
}

const getActionClass = (type, isPrimary) => {
  if (isPrimary) {
    switch (type) {
      case 'success':
        return 'bg-success-200 text-success-800 hover:bg-success-300'
      case 'error':
        return 'bg-error-200 text-error-800 hover:bg-error-300'
      case 'warning':
        return 'bg-warning-200 text-warning-800 hover:bg-warning-300'
      default:
        return 'bg-primary-200 text-primary-800 hover:bg-primary-300'
    }
  } else {
    return 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }
}

const handleAction = (action, notification) => {
  if (action.handler) {
    action.handler()
  }
  if (action.dismissOnClick !== false) {
    removeNotification(notification.id)
  }
}
</script>

<style scoped>
@keyframes progress-shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>

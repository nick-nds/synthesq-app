<template>
  <div class="flex items-center space-x-2">
    <div :class="dotClasses"></div>
    <span :class="textClasses">
      <slot />
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'active', 'inactive', 'pending', 'completed', 'cancelled',
      'success', 'warning', 'error', 'info',
      'available', 'coming-soon', 'in-development', 'beta'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showDot: {
    type: Boolean,
    default: true
  }
})

const dotClasses = computed(() => {
  if (!props.showDot) return 'hidden'
  
  const base = 'rounded-full flex-shrink-0'
  
  const colors = {
    'default': 'bg-gray-400',
    'active': 'bg-success-400',
    'inactive': 'bg-gray-400',
    'pending': 'bg-warning-400',
    'completed': 'bg-success-400',
    'cancelled': 'bg-error-400',
    'success': 'bg-success-400',
    'warning': 'bg-warning-400',
    'error': 'bg-error-400',
    'info': 'bg-info-400',
    'available': 'bg-success-400',
    'coming-soon': 'bg-gradient-to-r from-primary-400 to-accent-400',
    'in-development': 'bg-warning-400',
    'beta': 'bg-info-400'
  }
  
  const sizes = {
    'sm': 'h-2 w-2',
    'md': 'h-2.5 w-2.5',
    'lg': 'h-3 w-3'
  }
  
  return [base, colors[props.status], sizes[props.size]].join(' ')
})

const textClasses = computed(() => {
  const base = 'font-medium'
  
  const colors = {
    'default': 'text-gray-600',
    'active': 'text-success-600',
    'inactive': 'text-gray-500',
    'pending': 'text-warning-600',
    'completed': 'text-success-600',
    'cancelled': 'text-error-600',
    'success': 'text-success-600',
    'warning': 'text-warning-600',
    'error': 'text-error-600',
    'info': 'text-info-600',
    'available': 'text-success-600',
    'coming-soon': 'text-primary-600',
    'in-development': 'text-warning-600',
    'beta': 'text-info-600'
  }
  
  const sizes = {
    'sm': 'text-xs',
    'md': 'text-sm',
    'lg': 'text-base'
  }
  
  return [base, colors[props.status], sizes[props.size]].join(' ')
})
</script>
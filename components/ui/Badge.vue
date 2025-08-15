<template>
  <span :class="badgeClasses">
    <span v-if="icon" class="mr-1.5">
      <component :is="icon" class="h-3.5 w-3.5" />
    </span>
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'success', 'warning', 'error', 'info', 'primary', 'accent', 'coming-soon'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  rounded: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  }
})

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center font-medium'
  
  const variants = {
    'default': 'bg-gray-100 text-gray-700',
    'success': 'bg-success-100 text-success-700',
    'warning': 'bg-warning-100 text-warning-700',
    'error': 'bg-error-100 text-error-700',
    'info': 'bg-info-100 text-info-700',
    'primary': 'bg-primary-100 text-primary-700',
    'accent': 'bg-accent-100 text-accent-700',
    'coming-soon': 'bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 border border-primary-200'
  }
  
  const sizes = {
    'sm': 'px-2 py-0.5 text-xs',
    'md': 'px-2.5 py-1 text-sm',
    'lg': 'px-3 py-1.5 text-base'
  }
  
  const rounded = props.rounded ? 'rounded-full' : 'rounded-md'
  
  return [base, variants[props.variant], sizes[props.size], rounded].join(' ')
})
</script>
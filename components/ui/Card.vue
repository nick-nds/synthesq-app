<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div v-if="icon" :class="iconClasses">
            <component :is="icon" class="h-5 w-5" />
          </div>
          <slot name="header" />
        </div>
        <slot name="header-actions" />
      </div>
    </div>
    
    <div :class="contentClasses">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'outlined', 'glass'].includes(value)
  },
  padding: {
    type: String,
    default: 'default',
    validator: (value) => ['none', 'sm', 'default', 'lg'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  iconColor: {
    type: String,
    default: 'primary'
  }
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg sm:rounded-xl transition-all duration-200'
  
  const variants = {
    'default': 'border border-gray-200',
    'elevated': 'shadow-md border border-gray-100',
    'outlined': 'border-2 border-gray-300',
    'glass': 'backdrop-blur-sm bg-white/90 border border-white/20 shadow-lg'
  }
  
  const interactive = []
  if (props.hover) interactive.push('hover:shadow-lg hover:border-gray-300')
  if (props.clickable) interactive.push('cursor-pointer hover:scale-[1.02]')
  
  return [base, variants[props.variant], ...interactive].join(' ')
})

const contentClasses = computed(() => {
  const paddings = {
    'none': '',
    'sm': 'p-3 sm:p-4',
    'default': 'p-4 sm:p-6',
    'lg': 'p-6 sm:p-8'
  }
  
  return paddings[props.padding]
})

const iconClasses = computed(() => {
  const colors = {
    'primary': 'text-primary-500 bg-primary-100',
    'accent': 'text-accent-500 bg-accent-100',
    'success': 'text-success-500 bg-success-100',
    'warning': 'text-warning-500 bg-warning-100',
    'error': 'text-error-500 bg-error-100',
    'gray': 'text-gray-500 bg-gray-100'
  }
  
  return `p-2 rounded-lg ${colors[props.iconColor] || colors.primary}`
})
</script>
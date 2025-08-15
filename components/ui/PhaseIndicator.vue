<template>
  <div class="flex items-center space-x-3">
    <div :class="phaseIconClasses">
      <span class="text-sm font-bold">{{ phase }}</span>
    </div>
    <div class="flex-1">
      <div class="flex items-center space-x-2">
        <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>
        <Badge :variant="badgeVariant" size="sm">
          {{ statusText }}
        </Badge>
      </div>
      <p class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Badge from './Badge.vue'

const props = defineProps({
  phase: {
    type: Number,
    required: true,
    validator: (value) => [1, 2, 3, 4].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'coming-soon',
    validator: (value) => ['available', 'coming-soon', 'in-development', 'completed'].includes(value)
  }
})

const phaseConfig = {
  1: { color: 'primary', name: 'CRM Core' },
  2: { color: 'accent', name: 'ERP Light' },
  3: { color: 'purple', name: 'ERP Full' },
  4: { color: 'warning', name: 'Advanced' }
}

const phaseIconClasses = computed(() => {
  const base = 'h-8 w-8 rounded-full flex items-center justify-center text-white font-bold'
  
  const colors = {
    1: 'bg-gradient-to-br from-primary-500 to-primary-600',
    2: 'bg-gradient-to-br from-accent-500 to-accent-600', 
    3: 'bg-gradient-to-br from-purple-500 to-purple-600',
    4: 'bg-gradient-to-br from-warning-500 to-warning-600'
  }
  
  return [base, colors[props.phase]].join(' ')
})

const badgeVariant = computed(() => {
  const variants = {
    'available': 'success',
    'coming-soon': 'coming-soon',
    'in-development': 'warning',
    'completed': 'success'
  }
  return variants[props.status]
})

const statusText = computed(() => {
  const texts = {
    'available': 'Available',
    'coming-soon': 'Coming Soon',
    'in-development': 'In Development',
    'completed': 'Completed'
  }
  return texts[props.status]
})
</script>
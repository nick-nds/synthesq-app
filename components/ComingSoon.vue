<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Phase indicator -->
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8" :class="phaseClasses">
        <span class="text-2xl font-bold text-white">{{ phase }}</span>
      </div>

      <!-- Title and description -->
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ title }}</h1>
      <p class="text-xl text-gray-600 mb-8">{{ description }}</p>

      <!-- Timeline -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <div class="flex items-center justify-center space-x-4 mb-6">
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-success-500"></div>
            <span class="ml-2 text-sm font-medium text-gray-700">UI Complete</span>
          </div>
          <div class="w-8 h-0.5 bg-gray-300"></div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full" :class="isCurrentPhase ? 'bg-warning-500' : 'bg-gray-300'"></div>
            <span class="ml-2 text-sm font-medium" :class="isCurrentPhase ? 'text-warning-700' : 'text-gray-500'">
              Backend {{ isCurrentPhase ? 'In Progress' : 'Coming Soon' }}
            </span>
          </div>
          <div class="w-8 h-0.5 bg-gray-300"></div>
          <div class="flex items-center">
            <div class="w-4 h-4 rounded-full bg-gray-300"></div>
            <span class="ml-2 text-sm font-medium text-gray-500">Live</span>
          </div>
        </div>
        
        <div class="text-center">
          <Badge :variant="badgeVariant" size="lg" class="mb-4">
            {{ statusText }}
          </Badge>
          <p class="text-sm text-gray-600">
            Expected completion: {{ expectedDate }}
          </p>
        </div>
      </div>

      <!-- Features preview -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">What's Coming</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="feature in features" :key="feature" class="flex items-center">
            <svg class="w-5 h-5 text-success-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm text-gray-700">{{ feature }}</span>
          </div>
        </div>
      </div>

      <!-- Demo/Mockup section -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">UI Preview</h3>
        <div v-if="!showPreview" class="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p class="text-gray-600 mb-4">Full UI components are designed and ready</p>
            <button 
              v-if="hasPreview"
              @click="togglePreview"
              class="btn-primary"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View UI Preview
            </button>
            <p v-else class="text-sm text-gray-500">Interactive mockup available once backend is ready</p>
          </div>
        </div>
        <div v-else class="text-left">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm text-gray-600">UI Preview Mode</span>
            <button 
              @click="togglePreview"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Hide Preview
            </button>
          </div>
          <slot name="preview">
            <div class="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300">
              <p class="text-center text-gray-600">No preview available</p>
            </div>
          </slot>
        </div>
      </div>

      <!-- Back button -->
      <div class="mt-8">
        <button @click="$router.go(-1)" class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Badge from './ui/Badge.vue'

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
  features: {
    type: Array,
    default: () => []
  },
  expectedDate: {
    type: String,
    required: true
  },
  isCurrentPhase: {
    type: Boolean,
    default: false
  },
  hasPreview: {
    type: Boolean,
    default: false
  }
})

const showPreview = ref(false)

const togglePreview = () => {
  showPreview.value = !showPreview.value
}

const phaseConfig = {
  1: { gradient: 'bg-gradient-to-br from-phase-1-500 to-phase-1-600' },
  2: { gradient: 'bg-gradient-to-br from-phase-2-500 to-phase-2-600' },
  3: { gradient: 'bg-gradient-to-br from-phase-3-500 to-phase-3-600' },
  4: { gradient: 'bg-gradient-to-br from-phase-4-500 to-phase-4-600' }
}

const phaseClasses = computed(() => phaseConfig[props.phase].gradient)

const badgeVariant = computed(() => props.isCurrentPhase ? 'warning' : 'coming-soon')

const statusText = computed(() => props.isCurrentPhase ? 'Backend In Development' : 'Coming Soon')
</script>
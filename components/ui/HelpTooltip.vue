<template>
  <div class="inline-block" data-help-container>
    <!-- Wrapper for heading and subtitle -->
    <div class="flex items-center">
      <slot />
      <button
        @click="showHelp = !showHelp"
        type="button"
        class="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary-300 bg-primary-50 text-primary-600 hover:bg-primary-100 hover:border-primary-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        :class="{ 'bg-primary-100 border-primary-400': showHelp }"
        :aria-expanded="showHelp"
        :aria-label="showHelp ? 'Hide help text' : 'Show help text'"
      >
        <svg class="w-3 h-3 font-semibold" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
      </button>
    </div>
    
    <!-- Help subtitle -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div v-if="showHelp" class="mt-2 mb-3 max-w-2xl">
        <div class="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-4 h-4 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-800 leading-relaxed" v-html="content"></p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const showHelp = ref(false)

// Optional: Auto-hide help when clicking elsewhere
const handleClickOutside = (event) => {
  if (showHelp.value && !event.target.closest('[data-help-container]')) {
    showHelp.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
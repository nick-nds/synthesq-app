<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 text-white">Manufacturing Pro</h1>
          <p class="text-blue-100">Production planning and quality control for manufacturers</p>
        </div>
        <div class="ml-auto">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Active</span>
        </div>
      </div>
    </div>

    <!-- Demo Content -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h2 class="text-lg font-semibold mb-4">Manufacturing Extension Demo</h2>
      <p class="text-gray-600 mb-4">
        This extension would provide comprehensive manufacturing management including production planning, 
        quality control, supply chain management, and equipment maintenance tracking.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">15</div>
          <div class="text-sm text-gray-600">Active Production Lines</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">98.2%</div>
          <div class="text-sm text-gray-600">Quality Score</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">247</div>
          <div class="text-sm text-gray-600">Products Manufactured</div>
        </div>
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <div class="text-2xl font-bold text-orange-600">3.2h</div>
          <div class="text-sm text-gray-600">Avg. Downtime</div>
        </div>
      </div>

      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center space-x-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-blue-900">Demo Extension</h3>
            <p class="text-sm text-blue-700">This demonstrates how Synthesq adapts to manufacturing needs with specialized workflows and metrics.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Manufacturing Pro Extension'
})
</script>
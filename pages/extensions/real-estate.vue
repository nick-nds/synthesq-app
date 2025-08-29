<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 text-white">Real Estate Plus</h1>
          <p class="text-emerald-100">Property listings and transaction management for real estate professionals</p>
        </div>
        <div class="ml-auto">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Active</span>
        </div>
      </div>
    </div>

    <!-- Demo Content -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h2 class="text-lg font-semibold mb-4">Real Estate Extension Demo</h2>
      <p class="text-gray-600 mb-4">
        This extension transforms Synthesq into a comprehensive real estate management platform with 
        property listings, client management, transaction tracking, and market analysis tools.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-emerald-50 rounded-lg">
          <div class="text-2xl font-bold text-emerald-600">127</div>
          <div class="text-sm text-gray-600">Active Listings</div>
        </div>
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">43</div>
          <div class="text-sm text-gray-600">Pending Transactions</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">$2.4M</div>
          <div class="text-sm text-gray-600">Monthly Sales Volume</div>
        </div>
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <div class="text-2xl font-bold text-orange-600">18</div>
          <div class="text-sm text-gray-600">Days Avg. Market Time</div>
        </div>
      </div>

      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center space-x-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-sm font-medium text-blue-900">Demo Extension</h3>
            <p class="text-sm text-blue-700">This shows how Synthesq can be customized for real estate with specialized property and transaction management features.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Real Estate Plus Extension'
})
</script>
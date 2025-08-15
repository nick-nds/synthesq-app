<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Customer Portal</h2>
        <p class="text-sm text-gray-600 mt-1">Self-service portal for customer management</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Portal Settings
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Invite Customer
        </button>
      </div>
    </div>

    <!-- Portal Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Users</p>
            <p class="text-2xl font-bold text-gray-900">1,247</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+89 this month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Support Tickets</p>
            <p class="text-2xl font-bold text-gray-900">342</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">23 open tickets</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Self-Service Rate</p>
            <p class="text-2xl font-bold text-gray-900">78%</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">Issues resolved without agent</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Satisfaction</p>
            <p class="text-2xl font-bold text-gray-900">4.3/5</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">From 892 reviews</p>
      </div>
    </div>

    <!-- Portal Features -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Account Management -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="p-3 bg-blue-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Account Management</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Customers can manage their profiles, update contact information, and view account settings.</p>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Profile Updates</span>
            <span class="font-medium">156 this month</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Password Resets</span>
            <span class="font-medium">23 this month</span>
          </div>
        </div>
      </div>

      <!-- Order Tracking -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="p-3 bg-green-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Order Tracking</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Real-time order status, tracking information, and delivery updates.</p>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Orders Tracked</span>
            <span class="font-medium">2,847 this month</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Avg Check Time</span>
            <span class="font-medium">3.2 times per order</span>
          </div>
        </div>
      </div>

      <!-- Support Center -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="p-3 bg-purple-100 rounded-lg mr-4">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Support Center</h3>
        </div>
        <p class="text-sm text-gray-600 mb-4">Knowledge base, FAQ, and ticket submission for customer support.</p>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">KB Article Views</span>
            <span class="font-medium">4,562 this month</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Tickets Created</span>
            <span class="font-medium">89 this month</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Recent Portal Activity</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Sarah Johnson updated her profile</p>
                <p class="text-sm text-gray-500">Changed contact email and billing address</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">2 min ago</span>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Mike Davis checked order status</p>
                <p class="text-sm text-gray-500">Order #ORD-2024-1245 - In Transit</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">15 min ago</span>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Lisa Chen created support ticket</p>
                <p class="text-sm text-gray-500">Issue with billing statement - Ticket #SUP-8834</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Notice -->
    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-warning-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-warning-800">Demo Portal Interface</h4>
          <p class="text-sm text-warning-700 mt-1">This shows the customer portal management interface. Real customer portal functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-400 to-pink-500 rounded-xl p-6 text-white">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold mb-2 text-white">Healthcare Suite</h1>
          <p class="text-red-100">HIPAA-compliant patient management and medical billing</p>
        </div>
        <div class="ml-auto">
          <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Active</span>
        </div>
      </div>
    </div>

    <!-- Extension Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Overview -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-lg font-semibold mb-4">Extension Overview</h2>
          <p class="text-gray-600 mb-4">
            The Healthcare Suite extension transforms your CRM into a comprehensive healthcare management system, 
            ensuring HIPAA compliance while streamlining patient care operations.
          </p>
          
          <!-- Key Features -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">HIPAA Compliance</h3>
                <p class="text-sm text-gray-600">Full compliance with healthcare privacy regulations</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Patient Portal</h3>
                <p class="text-sm text-gray-600">Secure patient access to records and appointments</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-8 0h8m-8 0H6a2 2 0 00-2 2v6a2 2 0 002 2h2m8-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-8 0v4a4 4 0 108 0v-4m-8 0H8m8 0h.01" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">EHR Integration</h3>
                <p class="text-sm text-gray-600">Seamless integration with electronic health records</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Medical Billing</h3>
                <p class="text-sm text-gray-600">Automated insurance claims and billing management</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo Notice -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="text-sm font-medium text-blue-900">Demo Extension</h3>
              <p class="text-sm text-blue-700">This is a demonstration of how extensions can adapt Synthesq for specific industries. In production, this would contain full healthcare management functionality.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Extension Info -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="font-semibold mb-4">Extension Details</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Version</span>
              <span class="font-medium">2.4.1</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Developer</span>
              <span class="font-medium">Synthesq Health</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Price</span>
              <span class="font-medium">$49/month</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Installed</span>
              <span class="text-green-600 font-medium">Active</span>
            </div>
          </div>
          
          <div class="mt-6 pt-4 border-t border-gray-200">
            <button class="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Configure Extension
            </button>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="font-semibold mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              View Patient Records
            </button>
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Schedule Appointments
            </button>
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Generate Reports
            </button>
            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              Manage Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Healthcare Suite Extension'
})
</script>
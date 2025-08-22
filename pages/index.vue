<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p class="text-sm text-gray-600 mt-1">Welcome back! Here's an overview of your business performance.</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          Export Report
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Quick Add
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" @click="$router.push('/crm/leads')">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-primary-100 text-primary-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Leads</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.totalLeads }}</p>
            <p class="text-xs text-success-600 mt-1">+12% this month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" @click="$router.push('/crm/customers')">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-accent-100 text-accent-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Customers</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.totalCustomers }}</p>
            <p class="text-xs text-success-600 mt-1">+8% this month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" @click="$router.push('/sales/orders')">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-success-100 text-success-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ metrics.totalProducts }}</p>
            <p class="text-xs text-success-600 mt-1">+15% this month</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" @click="$router.push('/sales/invoices')">
        <div class="flex items-center">
          <div class="p-3 rounded-lg bg-warning-100 text-warning-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Monthly Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ formatCurrency(metrics.totalRevenue) }}</p>
            <p class="text-xs text-success-600 mt-1">+22% this month</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button class="text-sm text-primary-600 hover:text-primary-700">View All</button>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">New lead added: Acme Corp</p>
              <p class="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Deal closed: $25,000</p>
              <p class="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">New customer: TechStart Inc</p>
              <p class="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Invoice #INV-001 sent</p>
              <p class="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-4">
          <button @click="$router.push('/crm/leads/add')" class="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-sm font-medium text-gray-700">Add Lead</span>
          </button>
          <button @click="$router.push('/crm/customers/add')" class="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-sm font-medium text-gray-700">Add Customer</span>
          </button>
          <button @click="$router.push('/sales/invoices')" class="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-sm font-medium text-gray-700">Create Invoice</span>
          </button>
          <button @click="$router.push('/analytics/reports')" class="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span class="text-sm font-medium text-gray-700">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { dashboardMetrics } = useMockData()
const metrics = dashboardMetrics
const router = useRouter()

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}
</script>
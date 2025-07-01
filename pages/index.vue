<template>
  <div>
    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <NuxtLink to="/finance" class="block">
        <div class="card-premium hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(metrics.totalRevenue) }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/customers" class="block">
        <div class="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-success-100">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Total Customers</p>
              <p class="text-2xl font-semibold text-neutral-900">{{ metrics.totalCustomers }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/leads" class="block">
        <div class="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-warning-100">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Active Leads</p>
              <p class="text-2xl font-semibold text-neutral-900">{{ metrics.totalLeads }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/inventory" class="block">
        <div class="card hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-secondary-100">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Products</p>
              <p class="text-2xl font-semibold text-neutral-900">{{ metrics.totalProducts }}</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Revenue Chart -->
      <NuxtLink to="/finance" class="block">
        <div class="card hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-neutral-900">Monthly Revenue</h3>
            <svg class="w-5 h-5 text-neutral-400 hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div 
              v-for="(revenue, index) in metrics.monthlyRevenue" 
              :key="index"
              class="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md transition-all duration-300 hover:from-primary-600 hover:to-primary-500 flex-1"
              :style="{ height: (revenue / Math.max(...metrics.monthlyRevenue)) * 100 + '%' }"
              :title="`${getMonthName(index)}: $${formatCurrency(revenue)}`"
            ></div>
          </div>
          <div class="flex justify-between mt-4 text-xs text-neutral-500">
            <span v-for="(month, index) in monthNames" :key="index">{{ month.slice(0, 3) }}</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Recent Leads -->
      <NuxtLink to="/leads" class="block">
        <div class="card hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-neutral-900">Recent Leads</h3>
            <svg class="w-5 h-5 text-neutral-400 hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div class="space-y-4">
            <div 
              v-for="lead in metrics.recentLeads" 
              :key="lead.id"
              class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div>
                <p class="font-medium text-neutral-900">{{ lead.title }}</p>
                <p class="text-sm text-neutral-500">{{ lead.customer }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-neutral-900">${{ formatCurrency(lead.value) }}</p>
                <span 
                  :class="getStageColor(lead.stage)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStage(lead.stage) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Top Customers -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-neutral-900">Top Customers</h3>
        <NuxtLink to="/customers" class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors">
          View All
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Company</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Value</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="customer in metrics.topCustomers" 
              :key="customer.id"
              class="border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
              @click="navigateToCustomer(customer.id)"
            >
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-sm">{{ getInitials(customer.name) }}</span>
                  </div>
                  <div class="ml-3">
                    <p class="font-medium text-neutral-900">{{ customer.name }}</p>
                    <p class="text-sm text-neutral-500">{{ customer.email }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-neutral-900">{{ customer.company }}</td>
              <td class="py-3 px-4 font-semibold text-neutral-900">${{ formatCurrency(customer.value) }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="getStatusColor(customer.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }}
                </span>
              </td>
              <td class="py-3 px-4 text-neutral-500">{{ formatDate(customer.lastContact) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const { dashboardMetrics } = useMockData()
const metrics = dashboardMetrics
const router = useRouter()

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getMonthName = (index) => {
  return monthNames[index]
}

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getStatusColor = (status) => {
  const colors = {
    active: 'status-active',
    inactive: 'status-inactive',
    prospect: 'status-prospect'
  }
  return colors[status] || 'status-inactive'
}

const getStageColor = (stage) => {
  const colors = {
    prospect: 'stage-prospect',
    qualified: 'stage-qualified',
    proposal: 'stage-proposal',
    negotiation: 'stage-negotiation',
    'closed-won': 'stage-closed-won',
    'closed-lost': 'stage-closed-lost'
  }
  return colors[stage] || 'stage-prospect'
}

const formatStage = (stage) => {
  return stage.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const navigateToCustomer = (customerId) => {
  router.push('/customers')
}
</script>
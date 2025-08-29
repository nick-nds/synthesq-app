<template>
  <div class="space-y-8">
    <!-- Header with enhanced actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center space-x-4 mb-2">
          <div class="flex items-center">
            <h2 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Executive Dashboard
            </h2>
            <HelpTooltip :content="getHelpText('dashboard')" class="ml-3" />
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span class="text-sm text-success-600 font-medium">Live Updates</span>
          </div>
        </div>
        <p class="text-gray-600">Real-time business intelligence and performance metrics</p>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          Export Report
        </button>
        <button class="btn-primary flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Quick Add
        </button>
      </div>
    </div>

    <!-- Enhanced Key Performance Indicators -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-gradient-to-br from-white to-primary-50 rounded-xl p-6 border border-primary-100 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" @click="$router.push('/crm/leads')">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <div class="flex-1">
                <HelpTooltip :content="getHelpText('lead')">
                  <p class="text-sm font-medium text-gray-600 mb-1">Active Leads</p>
                </HelpTooltip>
                <p class="text-3xl font-bold text-gray-900 animate-count">{{ metrics.totalLeads }}</p>
              </div>
              <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span class="text-sm text-success-600 font-semibold">+12.5%</span>
                <span class="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-white to-accent-50 rounded-xl p-6 border border-accent-100 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" @click="$router.push('/crm/customers')">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <div class="flex-1">
                <HelpTooltip :content="getHelpText('active_customer')">
                  <p class="text-sm font-medium text-gray-600 mb-1">Total Customers</p>
                </HelpTooltip>
                <p class="text-3xl font-bold text-gray-900 animate-count">{{ metrics.totalCustomers }}</p>
              </div>
              <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span class="text-sm text-success-600 font-semibold">+8.2%</span>
                <span class="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-white to-success-50 rounded-xl p-6 border border-success-100 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" @click="$router.push('/sales/orders')">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-3 rounded-xl bg-gradient-to-br from-success-500 to-success-600 text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <div class="flex-1">
                <HelpTooltip :content="'Total number of sales orders placed by customers across all statuses.'">
                  <p class="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                </HelpTooltip>
                <p class="text-3xl font-bold text-gray-900 animate-count">{{ metrics.totalOrders || 0 }}</p>
              </div>
              <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span class="text-sm text-success-600 font-semibold">+15.7%</span>
                <span class="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-white to-warning-50 rounded-xl p-6 border border-warning-100 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1" @click="$router.push('/sales/invoices')">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-3 rounded-xl bg-gradient-to-br from-warning-500 to-warning-600 text-white shadow-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <div class="flex-1">
                <HelpTooltip :content="getHelpText('mrr')">
                  <p class="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                </HelpTooltip>
                <p class="text-3xl font-bold text-gray-900 animate-count">${{ formatCurrency(metrics.totalRevenue) }}</p>
              </div>
              <div class="flex items-center mt-2">
                <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span class="text-sm text-success-600 font-semibold">+22.8%</span>
                <span class="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Analytics Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Revenue Chart -->
      <div class="xl:col-span-2">
        <RevenueChart :data="revenueData" />
      </div>
      
      <!-- Sales Pipeline -->
      <div class="xl:col-span-1">
        <SalesPipeline :opportunities="opportunities" />
      </div>
    </div>

    <!-- Business Intelligence Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Activity Feed -->
      <ActivityFeed :activities="recentActivities" />

      <!-- Enhanced Quick Actions & Business Insights -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <div class="text-sm text-gray-500">Shortcuts to key functions</div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <button @click="$router.push('/crm/leads/add')" class="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 transition-all duration-300 transform hover:scale-105">
              <div class="p-3 rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-primary-700">Add Lead</span>
            </button>

            <button @click="$router.push('/crm/customers/add')" class="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-accent-300 hover:bg-gradient-to-br hover:from-accent-50 hover:to-accent-100 transition-all duration-300 transform hover:scale-105">
              <div class="p-3 rounded-lg bg-accent-100 text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-accent-700">Add Customer</span>
            </button>

            <button @click="$router.push('/sales/orders')" class="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-success-300 hover:bg-gradient-to-br hover:from-success-50 hover:to-success-100 transition-all duration-300 transform hover:scale-105">
              <div class="p-3 rounded-lg bg-success-100 text-success-600 group-hover:bg-success-500 group-hover:text-white transition-colors duration-300 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-success-700">New Order</span>
            </button>

            <button @click="$router.push('/analytics/reports')" class="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-warning-300 hover:bg-gradient-to-br hover:from-warning-50 hover:to-warning-100 transition-all duration-300 transform hover:scale-105">
              <div class="p-3 rounded-lg bg-warning-100 text-warning-600 group-hover:bg-warning-500 group-hover:text-white transition-colors duration-300 mb-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span class="text-sm font-semibold text-gray-700 group-hover:text-warning-700">Analytics</span>
            </button>
          </div>
        </div>

        <!-- Business Health Score -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Business Health Score</h3>
            <div class="text-2xl font-bold text-primary-600">{{ businessHealthScore }}/100</div>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Revenue Growth</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-success-500 h-2 rounded-full" style="width: 85%"></div>
                </div>
                <span class="text-sm font-semibold text-success-600">85</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Customer Satisfaction</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" style="width: 92%"></div>
                </div>
                <span class="text-sm font-semibold text-primary-600">92</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Pipeline Health</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-accent-500 h-2 rounded-full" style="width: 78%"></div>
                </div>
                <span class="text-sm font-semibold text-accent-600">78</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Announcements -->
    <div class="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-200 p-6">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-primary-100 rounded-lg">
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="text-sm font-semibold text-gray-900">System Update</h4>
          <p class="text-sm text-gray-600">New AI-powered lead scoring and customer insights are now available. Check out the enhanced analytics features!</p>
        </div>
        <button class="text-sm text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap">
          Learn More →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import RevenueChart from '~/components/charts/RevenueChart.vue'
import SalesPipeline from '~/components/charts/SalesPipeline.vue'
import ActivityFeed from '~/components/charts/ActivityFeed.vue'
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

const { dashboardMetrics, revenueData, opportunities, recentActivities } = useMockData()
const metrics = dashboardMetrics
const router = useRouter()

const businessHealthScore = computed(() => {
  // Calculate based on various metrics
  const revenueGrowthScore = 85
  const customerSatisfactionScore = 92
  const pipelineHealthScore = 78
  return Math.round((revenueGrowthScore + customerSatisfactionScore + pipelineHealthScore) / 3)
})

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0'
  }
  return new Intl.NumberFormat('en-US').format(amount)
}

// Add some CSS animations
onMounted(() => {
  if (process.client) {
    // Add count-up animation for metrics
    const countElements = document.querySelectorAll('.animate-count')
    countElements.forEach(el => {
      // Extract numeric value from formatted text
      const textContent = el.textContent
      let finalValue = 0
      
      // Check if it's a currency value (contains $)
      if (textContent.includes('$')) {
        // Remove $ and commas, then parse
        const numericText = textContent.replace(/[$,]/g, '')
        finalValue = parseInt(numericText) || 0
      } else {
        finalValue = parseInt(textContent) || 0
      }
      
      let currentValue = 0
      const increment = finalValue / 30
      const interval = setInterval(() => {
        currentValue += increment
        if (currentValue >= finalValue) {
          // Restore original format for final value
          if (textContent.includes('$')) {
            el.textContent = `$${formatCurrency(finalValue)}`
          } else {
            el.textContent = finalValue
          }
          clearInterval(interval)
        } else {
          // Show animated value in same format
          if (textContent.includes('$')) {
            el.textContent = `$${formatCurrency(Math.floor(currentValue))}`
          } else {
            el.textContent = Math.floor(currentValue)
          }
        }
      }, 50)
    })
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-count {
  animation: fadeInUp 0.6s ease-out;
}
</style>
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Generate detailed reports and analyze business performance across all departments and metrics.'">
          <h2 class="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Comprehensive business intelligence and reporting</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Reports
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
          </svg>
          Schedule Report
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Report
        </button>
      </div>
    </div>

    <!-- Report Categories -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" @click="selectedCategory = 'sales'">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Reports on sales performance, revenue analysis, conversion rates, and team productivity.'">
              <p class="text-sm text-gray-600 mb-1">Sales Reports</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Revenue, pipeline, performance</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" @click="selectedCategory = 'finance'">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Financial reports including profit & loss statements, cash flow analysis, and expense tracking.'">
              <p class="text-sm text-gray-600 mb-1">Financial Reports</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">8</p>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">P&L, cash flow, expenses</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" @click="selectedCategory = 'customer'">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Customer analytics including satisfaction scores, retention rates, and lifetime value analysis.'">
              <p class="text-sm text-gray-600 mb-1">Customer Reports</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">6</p>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Behavior, retention, lifetime value</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" @click="selectedCategory = 'operations'">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Operations Reports</p>
            <p class="text-2xl font-bold text-gray-900">10</p>
          </div>
          <div class="p-3 bg-orange-100 rounded-lg">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Inventory, procurement, efficiency</p>
      </div>
    </div>

    <!-- Charts and Visualizations -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
          <select class="text-sm border border-gray-300 rounded-md px-3 py-1">
            <option>Last 12 months</option>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
          </select>
        </div>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div v-for="(value, index) in revenueData" :key="index" class="flex flex-col items-center">
            <div class="bg-blue-500 w-8 rounded-t" :style="`height: ${(value / Math.max(...revenueData)) * 200}px`"></div>
            <span class="text-xs text-gray-500 mt-2">{{ getMonthLabel(index) }}</span>
          </div>
        </div>
      </div>

      <!-- Customer Acquisition -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Customer Acquisition</h3>
          <select class="text-sm border border-gray-300 rounded-md px-3 py-1">
            <option>This year</option>
            <option>Last year</option>
          </select>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Organic Search</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">1,247 customers</div>
              <div class="text-xs text-gray-500">42% of total</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Paid Advertising</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">892 customers</div>
              <div class="text-xs text-gray-500">30% of total</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Referrals</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">534 customers</div>
              <div class="text-xs text-gray-500">18% of total</div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <span class="text-sm text-gray-600">Social Media</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">298 customers</div>
              <div class="text-xs text-gray-500">10% of total</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Reports -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Available Reports</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in availableReports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                <div class="text-sm text-gray-500">{{ report.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getCategoryBadge(report.category)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ report.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(report.lastGenerated) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ report.frequency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Generate</button>
                <button class="text-gray-600 hover:text-gray-900">Schedule</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Demo Notice -->
    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-warning-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-warning-800">Demo Reports & Analytics</h4>
          <p class="text-sm text-warning-700 mt-1">This page displays mock reporting data and visualizations. Real reporting functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const selectedCategory = ref('sales')

// Mock data
const revenueData = [85000, 92000, 78000, 105000, 118000, 125000, 135000, 142000, 128000, 155000, 168000, 175000]

const availableReports = [
  { id: 1, name: 'Monthly Sales Report', description: 'Comprehensive sales performance analysis', category: 'Sales', lastGenerated: '2024-08-14', frequency: 'Monthly' },
  { id: 2, name: 'Customer Retention Analysis', description: 'Customer churn and retention metrics', category: 'Customer', lastGenerated: '2024-08-13', frequency: 'Weekly' },
  { id: 3, name: 'Financial Statement', description: 'P&L, balance sheet, cash flow', category: 'Finance', lastGenerated: '2024-08-15', frequency: 'Monthly' },
  { id: 4, name: 'Inventory Turnover Report', description: 'Stock movement and turnover analysis', category: 'Operations', lastGenerated: '2024-08-12', frequency: 'Bi-weekly' },
  { id: 5, name: 'Lead Conversion Report', description: 'Sales funnel and conversion rates', category: 'Sales', lastGenerated: '2024-08-14', frequency: 'Weekly' },
  { id: 6, name: 'Customer Lifetime Value', description: 'CLV analysis and segmentation', category: 'Customer', lastGenerated: '2024-08-11', frequency: 'Monthly' }
]

// Methods
const getMonthLabel = (index) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = new Date().getMonth()
  const monthIndex = (currentMonth - 11 + index) % 12
  return months[monthIndex < 0 ? monthIndex + 12 : monthIndex]
}

const getCategoryBadge = (category) => {
  const badgeClasses = {
    'Sales': 'bg-blue-100 text-blue-800',
    'Finance': 'bg-green-100 text-green-800',
    'Customer': 'bg-purple-100 text-purple-800',
    'Operations': 'bg-orange-100 text-orange-800'
  }
  return badgeClasses[category] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
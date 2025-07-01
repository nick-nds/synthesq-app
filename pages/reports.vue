<template>
  <div>
    <!-- Report Type Selection -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <h2 class="text-xl font-semibold text-neutral-900">Reports & Analytics</h2>
        <select v-model="selectedReportType" class="input w-48">
          <option value="overview">Business Overview</option>
          <option value="sales">Sales Performance</option>
          <option value="customers">Customer Analysis</option>
          <option value="inventory">Inventory Reports</option>
          <option value="financial">Financial Reports</option>
        </select>
      </div>
      <div class="flex space-x-3">
        <select v-model="dateRange" class="input w-32">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export PDF
        </button>
        <button class="btn-gradient">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
    </div>

    <!-- Business Overview Report -->
    <div v-if="selectedReportType === 'overview'">
      <!-- Key Metrics Summary -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-success-100">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Total Revenue</p>
              <p class="text-2xl font-semibold text-neutral-900">${{ formatCurrency(487500) }}</p>
              <p class="text-xs text-success-600">↑ 12.5% from last period</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">New Customers</p>
              <p class="text-2xl font-semibold text-neutral-900">84</p>
              <p class="text-xs text-success-600">↑ 8.2% from last period</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-warning-100">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Conversion Rate</p>
              <p class="text-2xl font-semibold text-neutral-900">24.8%</p>
              <p class="text-xs text-danger-600">↓ 2.1% from last period</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-neutral-100">
              <svg class="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-neutral-500">Avg. Deal Time</p>
              <p class="text-2xl font-semibold text-neutral-900">32 days</p>
              <p class="text-xs text-success-600">↓ 5 days from last period</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Trend Chart -->
      <div class="card mb-8">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Revenue Trend</h3>
        <div class="h-64 flex items-end justify-between space-x-2">
          <div 
            v-for="(revenue, index) in monthlyRevenue" 
            :key="index"
            class="bg-primary-500 rounded-t-md transition-all duration-300 hover:bg-primary-600 flex-1 flex items-end justify-center text-white text-xs font-medium pb-2"
            :style="{ height: (revenue / Math.max(...monthlyRevenue)) * 100 + '%' }"
          >
            ${{ Math.round(revenue / 1000) }}k
          </div>
        </div>
        <div class="flex justify-between mt-4 text-xs text-neutral-500">
          <span v-for="(month, index) in monthNames" :key="index">{{ month.slice(0, 3) }}</span>
        </div>
      </div>

      <!-- Performance Breakdown -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card">
          <h3 class="text-lg font-semibold text-neutral-900 mb-6">Sales Pipeline Health</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Prospects</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-neutral-200 rounded-full h-2">
                  <div class="bg-neutral-400 h-2 rounded-full" style="width: 20%"></div>
                </div>
                <span class="text-sm font-medium text-neutral-900">8 leads</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Qualified</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-neutral-200 rounded-full h-2">
                  <div class="bg-primary-500 h-2 rounded-full" style="width: 60%"></div>
                </div>
                <span class="text-sm font-medium text-neutral-900">12 leads</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Proposal</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-neutral-200 rounded-full h-2">
                  <div class="bg-warning-500 h-2 rounded-full" style="width: 40%"></div>
                </div>
                <span class="text-sm font-medium text-neutral-900">6 leads</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Negotiation</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-neutral-200 rounded-full h-2">
                  <div class="bg-secondary-500 h-2 rounded-full" style="width: 80%"></div>
                </div>
                <span class="text-sm font-medium text-neutral-900">4 leads</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600">Closed Won</span>
              <div class="flex items-center space-x-2">
                <div class="w-32 bg-neutral-200 rounded-full h-2">
                  <div class="bg-success-500 h-2 rounded-full" style="width: 100%"></div>
                </div>
                <span class="text-sm font-medium text-neutral-900">15 leads</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold text-neutral-900 mb-6">Top Performing Products</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-success-50 rounded-lg">
              <div>
                <p class="font-medium text-neutral-900">Enterprise ERP Suite</p>
                <p class="text-sm text-neutral-500">Software</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-neutral-900">$64,950</p>
                <p class="text-xs text-success-600">50 units sold</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div>
                <p class="font-medium text-neutral-900">Professional CRM License</p>
                <p class="text-sm text-neutral-500">Software</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-neutral-900">$14,950</p>
                <p class="text-xs text-primary-600">200 units sold</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
              <div>
                <p class="font-medium text-neutral-900">Support & Maintenance</p>
                <p class="text-sm text-neutral-500">Service</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-neutral-900">$9,950</p>
                <p class="text-xs text-warning-600">150 units sold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Reports Grid (for other report types) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Customer Acquisition</h3>
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">84</p>
        <p class="text-sm text-success-600">↑ 12% increase</p>
      </div>

      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Sales Performance</h3>
          <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">$487K</p>
        <p class="text-sm text-success-600">↑ 8.5% increase</p>
      </div>

      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Inventory Turnover</h3>
          <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">4.2x</p>
        <p class="text-sm text-warning-600">↓ 0.3x decrease</p>
      </div>

      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Profit Margin</h3>
          <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">32.4%</p>
        <p class="text-sm text-success-600">↑ 2.1% increase</p>
      </div>

      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Customer Retention</h3>
          <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">91.2%</p>
        <p class="text-sm text-success-600">↑ 1.8% increase</p>
      </div>

      <div class="card hover:shadow-md transition-shadow cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-neutral-900">Outstanding Invoices</h3>
          <svg class="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-2xl font-bold text-neutral-900 mb-2">$12.5K</p>
        <p class="text-sm text-danger-600">3 overdue invoices</p>
      </div>
    </div>

    <!-- Scheduled Reports -->
    <div class="card mt-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-neutral-900">Scheduled Reports</h3>
        <button class="btn-gradient text-sm py-2 px-3">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Schedule Report
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-neutral-200">
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Report Name</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Type</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Frequency</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Next Run</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Recipients</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
              <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-neutral-100">
              <td class="py-3 px-4 font-medium text-neutral-900">Monthly Sales Summary</td>
              <td class="py-3 px-4 text-neutral-600">Sales Performance</td>
              <td class="py-3 px-4 text-neutral-600">Monthly</td>
              <td class="py-3 px-4 text-neutral-600">July 1, 2024</td>
              <td class="py-3 px-4 text-neutral-600">sales@bistrokeep.com</td>
              <td class="py-3 px-4">
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-800">Active</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button class="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button class="p-1 text-neutral-400 hover:text-success-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.172a1 1 0 01-.707-.293L10.707 4.293a1 1 0 00-.707-.293H9a2 2 0 00-2 2v1a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="border-b border-neutral-100">
              <td class="py-3 px-4 font-medium text-neutral-900">Weekly Customer Report</td>
              <td class="py-3 px-4 text-neutral-600">Customer Analysis</td>
              <td class="py-3 px-4 text-neutral-600">Weekly</td>
              <td class="py-3 px-4 text-neutral-600">June 17, 2024</td>
              <td class="py-3 px-4 text-neutral-600">team@bistrokeep.com</td>
              <td class="py-3 px-4">
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-800">Active</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center space-x-2">
                  <button class="p-1 text-neutral-400 hover:text-primary-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button class="p-1 text-neutral-400 hover:text-success-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.172a1 1 0 01-.707-.293L10.707 4.293a1 1 0 00-.707-.293H9a2 2 0 00-2 2v1a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedReportType = ref('overview')
const dateRange = ref('30d')

const monthlyRevenue = [45000, 52000, 48000, 61000, 58000, 67000, 72000, 69000, 75000, 82000, 78000, 85000]
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}
</script>
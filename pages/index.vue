<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 rounded-2xl">
      <div class="absolute inset-0 bg-grid-white/10"></div>
      <div class="relative px-8 py-12">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold text-white mb-4">
            Welcome to Synthesq
          </h1>
          <p class="text-xl text-primary-100 mb-6">
            Orchestrate Your Business - The modern CRM/ERP platform that brings harmony to your operations. Track our development progress as we bring each phase to life.
          </p>
          <div class="flex items-center space-x-4">
            <Badge variant="success" size="lg" class="bg-white/20 text-white border-white/30">
              🚀 Phase 1 - In Development
            </Badge>
            <span class="text-primary-200">•</span>
            <span class="text-primary-200">Next: Backend Integration Q2 2025</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Development Phases Overview -->
    <Card variant="elevated">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-900">Development Roadmap</h2>
        <p class="text-gray-600 mt-1">Follow our journey as we build your complete business solution</p>
      </template>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Phase 1: CRM Core -->
        <div class="group cursor-pointer" @click="navigateToPhase(1)">
          <div class="p-6 rounded-xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <PhaseIndicator 
              :phase="1" 
              title="CRM Core" 
              description="Essential customer relationship management" 
              status="in-development" 
            />
            <div class="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Leads Management</span>
                <StatusIndicator status="coming-soon" size="sm">Available Soon</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Opportunities Tracking</span>
                <StatusIndicator status="coming-soon" size="sm">UI Ready</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Customer Database</span>
                <StatusIndicator status="coming-soon" size="sm">Coming Soon</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Order Management</span>
                <StatusIndicator status="coming-soon" size="sm">Coming Soon</StatusIndicator>
              </div>
            </div>
          </div>
        </div>

        <!-- Phase 2: ERP Light -->
        <div class="group cursor-pointer" @click="navigateToPhase(2)">
          <div class="p-6 rounded-xl border-2 border-accent-200 bg-gradient-to-br from-accent-50 to-accent-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <PhaseIndicator 
              :phase="2" 
              title="ERP Light" 
              description="Basic enterprise resource planning" 
              status="coming-soon" 
            />
            <div class="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Product Catalog</span>
                <StatusIndicator status="coming-soon" size="sm">Q2 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Invoice Management</span>
                <StatusIndicator status="coming-soon" size="sm">Q2 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Payment Tracking</span>
                <StatusIndicator status="coming-soon" size="sm">Q2 2025</StatusIndicator>
              </div>
            </div>
          </div>
        </div>

        <!-- Phase 3: ERP Full -->
        <div class="group cursor-pointer" @click="navigateToPhase(3)">
          <div class="p-6 rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <PhaseIndicator 
              :phase="3" 
              title="ERP Full" 
              description="Complete enterprise resource planning" 
              status="coming-soon" 
            />
            <div class="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Inventory Management</span>
                <StatusIndicator status="coming-soon" size="sm">Q3 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Procurement</span>
                <StatusIndicator status="coming-soon" size="sm">Q3 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Accounting</span>
                <StatusIndicator status="coming-soon" size="sm">Q3 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">HR Management</span>
                <StatusIndicator status="coming-soon" size="sm">Q3 2025</StatusIndicator>
              </div>
            </div>
          </div>
        </div>

        <!-- Phase 4: Advanced -->
        <div class="group cursor-pointer" @click="navigateToPhase(4)">
          <div class="p-4 sm:p-6 rounded-lg sm:rounded-xl border-2 border-warning-200 bg-gradient-to-br from-warning-50 to-warning-100 hover:shadow-lg transition-all duration-300 lg:hover:scale-[1.02]">
            <PhaseIndicator 
              :phase="4" 
              title="Advanced Features" 
              description="AI-powered automation and insights" 
              status="coming-soon" 
            />
            <div class="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Workflow Automation</span>
                <StatusIndicator status="coming-soon" size="sm">Q4 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">AI Suggestions</span>
                <StatusIndicator status="coming-soon" size="sm">Q4 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Smart Chatbot</span>
                <StatusIndicator status="coming-soon" size="sm">Q4 2025</StatusIndicator>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Customer Portal</span>
                <StatusIndicator status="coming-soon" size="sm">Q4 2025</StatusIndicator>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <!-- Current Metrics (Demo Data) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card hover clickable @click="$router.push('/leads')">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary-100 text-primary-600">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-3 sm:ml-4">
            <p class="text-xs sm:text-sm font-medium text-gray-600">Active Leads</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ metrics.totalLeads }}</p>
            <Badge variant="coming-soon" size="sm" class="mt-1">Demo Data</Badge>
          </div>
        </div>
      </Card>

      <Card hover clickable @click="$router.push('/customers')">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-accent-100 text-accent-600">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-3 sm:ml-4">
            <p class="text-xs sm:text-sm font-medium text-gray-600">Customers</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ metrics.totalCustomers }}</p>
            <Badge variant="coming-soon" size="sm" class="mt-1">Demo Data</Badge>
          </div>
        </div>
      </Card>

      <Card hover clickable @click="$router.push('/products')">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-success-100 text-success-600">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-3 sm:ml-4">
            <p class="text-xs sm:text-sm font-medium text-gray-600">Products</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ metrics.totalProducts }}</p>
            <Badge variant="coming-soon" size="sm" class="mt-1">Demo Data</Badge>
          </div>
        </div>
      </Card>

      <Card hover clickable @click="$router.push('/finance')">
        <div class="flex items-center">
          <div class="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-warning-100 text-warning-600">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-3 sm:ml-4">
            <p class="text-xs sm:text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">${{ formatCurrency(metrics.totalRevenue) }}</p>
            <Badge variant="coming-soon" size="sm" class="mt-1">Demo Data</Badge>
          </div>
        </div>
      </Card>
    </div>

    <!-- Development Progress -->
    <Card variant="elevated">
      <template #header>
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-lg bg-primary-100 text-primary-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Development Progress</h3>
            <p class="text-sm text-gray-600">Current focus: Frontend UI & User Experience</p>
          </div>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Timeline -->
        <div>
          <h4 class="text-base font-semibold text-gray-900 mb-4">Development Timeline</h4>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-gray-900">Q1 2025 - UI/UX Development</p>
                <p class="text-sm text-gray-600">Frontend interface, design system, user experience</p>
                <Badge variant="warning" size="sm" class="mt-1">In Progress</Badge>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-gray-900">Q2 2025 - Phase 1 Backend</p>
                <p class="text-sm text-gray-600">CRM Core: Leads, Opportunities, Customers, Orders</p>
                <Badge variant="coming-soon" size="sm" class="mt-1">Coming Soon</Badge>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-gray-900">Q3 2025 - Phase 2 & 3</p>
                <p class="text-sm text-gray-600">ERP Light & Full: Products, Inventory, Accounting</p>
                <Badge variant="coming-soon" size="sm" class="mt-1">Planned</Badge>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full mt-2"></div>
              <div>
                <p class="font-medium text-gray-900">Q4 2025 - Advanced Features</p>
                <p class="text-sm text-gray-600">AI, Automation, Customer Portal</p>
                <Badge variant="coming-soon" size="sm" class="mt-1">Future</Badge>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Status -->
        <div>
          <h4 class="text-base font-semibold text-gray-900 mb-4">Current Status</h4>
          <div class="space-y-4">
            <div class="p-4 bg-primary-50 rounded-lg border border-primary-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-primary-900">Frontend Development</span>
                <span class="text-sm font-bold text-primary-700">75%</span>
              </div>
              <div class="w-full bg-primary-200 rounded-full h-2">
                <div class="bg-primary-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
              <p class="text-xs text-primary-700 mt-2">Modern UI components, responsive design, navigation</p>
            </div>

            <div class="p-4 bg-accent-50 rounded-lg border border-accent-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-accent-900">Backend Planning</span>
                <span class="text-sm font-bold text-accent-700">25%</span>
              </div>
              <div class="w-full bg-accent-200 rounded-full h-2">
                <div class="bg-accent-500 h-2 rounded-full" style="width: 25%"></div>
              </div>
              <p class="text-xs text-accent-700 mt-2">API design, database schema, authentication system</p>
            </div>

            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-900">Testing & QA</span>
                <span class="text-sm font-bold text-gray-700">0%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gray-400 h-2 rounded-full" style="width: 0%"></div>
              </div>
              <p class="text-xs text-gray-600 mt-2">Unit tests, integration tests, user acceptance testing</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '~/components/ui/Card.vue'
import Badge from '~/components/ui/Badge.vue'
import StatusIndicator from '~/components/ui/StatusIndicator.vue'
import PhaseIndicator from '~/components/ui/PhaseIndicator.vue'

// Apply auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
})

const { dashboardMetrics } = useMockData()
const metrics = dashboardMetrics
const router = useRouter()

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const navigateToPhase = (phase) => {
  // Future: Navigate to phase-specific overview
  console.log(`Navigate to Phase ${phase} overview`)
}
</script>
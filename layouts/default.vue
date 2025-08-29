<template>
  <div class="min-h-screen bg-gray-50" :class="{ 'overflow-hidden': sidebarOpen }">
    <!-- Mobile menu overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"></div>
    
    <!-- Sidebar -->
    <div :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out flex flex-col',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0'
    ]">
      <!-- Logo and Close Button -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <NuxtLink to="/" class="flex items-center hover:opacity-80 transition-opacity" @click="sidebarOpen = false">
          <img src="/logo.png" alt="Synthesq" class="w-8 h-8 rounded-lg object-cover" />
          <span class="ml-3 text-lg font-semibold text-gray-900">Synthesq</span>
        </NuxtLink>
        <!-- Close button for mobile -->
        <button 
          @click="sidebarOpen = false" 
          class="lg:hidden p-2 -mr-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Quick Search -->
      <div class="px-3 mt-6 mb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search modules..."
            class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Navigation - Scrollable -->
      <nav class="flex-1 overflow-y-auto px-3 pb-4">
        <div class="space-y-2">
          <!-- Dashboard -->
          <NuxtLink 
            to="/" 
            :class="$route.path === '/' ? 'sidebar-link-active' : 'sidebar-link-inactive'"
            v-if="!searchQuery || 'dashboard'.includes(searchQuery.toLowerCase())"
          >
            <div class="w-5 h-5 mr-3 flex items-center justify-center">
              <div class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
            <span>Dashboard</span>
            <div class="ml-auto flex items-center space-x-1">
              <div class="w-1.5 h-1.5 bg-success-400 rounded-full"></div>
            </div>
          </NuxtLink>

          <!-- CRM Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.crm.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('crm')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                CRM
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.crm ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.crm"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/crm/leads" 
                :class="$route.path.startsWith('/crm/leads') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'leads'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Leads</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">127</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/crm/opportunities" 
                :class="$route.path.startsWith('/crm/opportunities') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'opportunities'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Opportunities</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">45</span>
                </div>
              </NuxtLink>
              
              <NuxtLink 
                to="/crm/customers" 
                :class="$route.path.startsWith('/crm/customers') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'customers'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span>Customers</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">234</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Sales Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.sales.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('sales')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Sales
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.sales ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.sales"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/sales/orders" 
                :class="$route.path.startsWith('/sales/orders') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'orders'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Orders</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">89</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/sales/invoices" 
                :class="$route.path.startsWith('/sales/invoices') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'invoices'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Invoices</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">156</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/sales/payments" 
                :class="$route.path.startsWith('/sales/payments') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'payments'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Payments</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">67</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Operations Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.operations.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('operations')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                Operations
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.operations ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.operations"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/operations/products" 
                :class="$route.path.startsWith('/operations/products') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'products'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Products</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">342</span>
                </div>
              </NuxtLink>
              
              <NuxtLink 
                to="/operations/inventory" 
                :class="$route.path.startsWith('/operations/inventory') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'inventory'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h8a2 2 0 002-2V7M9 7h6" />
                </svg>
                <span>Inventory</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">78</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/operations/procurement" 
                :class="$route.path.startsWith('/operations/procurement') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'procurement'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-1" />
                </svg>
                <span>Procurement</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">23</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Finance Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.finance.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('finance')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                Finance
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.finance ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.finance"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/finance/accounting" 
                :class="$route.path.startsWith('/finance/accounting') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'accounting'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Accounting</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">145</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- People Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.people.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('people')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                People
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.people ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.people"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/people/hr" 
                :class="$route.path.startsWith('/people/hr') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'human resources'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Human Resources</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">52</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Automation Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.automation.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('automation')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Automation
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.automation ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.automation"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/automation/workflows" 
                :class="$route.path.startsWith('/automation/workflows') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'workflows'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Workflows</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">12</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/automation/ai-suggestions" 
                :class="$route.path.startsWith('/automation/ai-suggestions') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'ai insights'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>AI Insights</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium">NEW</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/automation/chatbot" 
                :class="$route.path.startsWith('/automation/chatbot') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'ai assistant'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>AI Assistant</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium">BETA</span>
                </div>
              </NuxtLink>

              <NuxtLink 
                to="/automation/customer-portal" 
                :class="$route.path.startsWith('/automation/customer-portal') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'customer portal'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Customer Portal</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Analytics & Reports -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.analytics.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('analytics')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Analytics
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.analytics ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.analytics"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <NuxtLink 
                to="/analytics/reports" 
                :class="$route.path.startsWith('/analytics/reports') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'reports analytics'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Reports & Analytics</span>
                <div class="ml-auto">
                  <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">28</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Extensions Section -->
          <div class="pt-2" v-if="!searchQuery || navigationSections.extensions.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))">
            <button 
              @click="toggleSection('extensions')"
              class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-4 h-4 mr-2 rounded bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                Extensions
                <div class="ml-2">
                  <span class="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                </div>
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200" 
                :class="expandedSections.extensions ? 'rotate-90' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              v-show="expandedSections.extensions"
              class="mt-1 space-y-0.5 ml-4 pl-2 border-l border-gray-200"
            >
              <!-- Extension Store/Marketplace -->
              <NuxtLink 
                to="/extensions" 
                :class="$route.path === '/extensions' ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                class="text-sm"
                v-if="!searchQuery || 'marketplace store'.includes(searchQuery.toLowerCase())"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Extension Store</span>
                <div class="ml-auto flex items-center space-x-1">
                  <div class="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
                </div>
              </NuxtLink>

              <!-- Active Extensions -->
              <div class="py-1">
                <div class="text-xs text-gray-400 px-3 mb-2 font-medium">Active Extensions</div>
                
                <!-- Healthcare Extension -->
                <NuxtLink 
                  to="/extensions/healthcare" 
                  :class="$route.path.startsWith('/extensions/healthcare') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                  class="text-sm group"
                  v-if="!searchQuery || 'healthcare hipaa'.includes(searchQuery.toLowerCase())"
                >
                  <div class="w-4 h-4 mr-3 bg-gradient-to-br from-red-400 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
                    <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span class="flex-1">Healthcare Suite</span>
                  <div class="ml-auto flex items-center space-x-1">
                    <span class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Active</span>
                  </div>
                </NuxtLink>

                <!-- Manufacturing Extension -->
                <NuxtLink 
                  to="/extensions/manufacturing" 
                  :class="$route.path.startsWith('/extensions/manufacturing') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                  class="text-sm group"
                  v-if="!searchQuery || 'manufacturing production'.includes(searchQuery.toLowerCase())"
                >
                  <div class="w-4 h-4 mr-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                    <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span class="flex-1">Manufacturing Pro</span>
                  <div class="ml-auto flex items-center space-x-1">
                    <span class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Active</span>
                  </div>
                </NuxtLink>

                <!-- Real Estate Extension -->
                <NuxtLink 
                  to="/extensions/real-estate" 
                  :class="$route.path.startsWith('/extensions/real-estate') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
                  class="text-sm group"
                  v-if="!searchQuery || 'real estate property'.includes(searchQuery.toLowerCase())"
                >
                  <div class="w-4 h-4 mr-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded flex items-center justify-center flex-shrink-0">
                    <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span class="flex-1">Real Estate Plus</span>
                  <div class="ml-auto flex items-center space-x-1">
                    <span class="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">Active</span>
                  </div>
                </NuxtLink>
              </div>

              <!-- Available Extensions Preview -->
              <div class="py-1 border-t border-gray-100 mt-2">
                <div class="text-xs text-gray-400 px-3 mb-2 font-medium">Available Extensions</div>
                
                <div class="text-sm px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div class="flex items-center">
                    <div class="w-4 h-4 mr-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <span class="flex-1">Financial Services</span>
                    <span class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">Install</span>
                  </div>
                </div>

                <div class="text-sm px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div class="flex items-center">
                    <div class="w-4 h-4 mr-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span class="flex-1">Education Management</span>
                    <span class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">Install</span>
                  </div>
                </div>

                <div class="text-sm px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div class="flex items-center">
                    <div class="w-4 h-4 mr-3 bg-gradient-to-br from-rose-400 to-pink-500 rounded flex items-center justify-center flex-shrink-0">
                      <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span class="flex-1">Hospitality Suite</span>
                    <span class="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">Install</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div class="pt-4 border-t border-gray-200 mt-4">
            <NuxtLink 
              to="/settings" 
              :class="$route.path.startsWith('/settings') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              v-if="!searchQuery || 'settings'.includes(searchQuery.toLowerCase())"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-4 sm:px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Mobile menu button -->
            <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex-1 ml-4 lg:ml-0">
              <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 truncate">{{ sectionName }}</h1>
            </div>
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Notifications -->
              <NotificationDropdown />
              
              <!-- User Menu -->
              <div class="relative" ref="userMenuRef">
                <button 
                  @click="userMenuOpen = !userMenuOpen"
                  class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span class="text-primary-600 font-medium text-sm">{{ userInitials }}</span>
                  </div>
                  <div class="hidden sm:block text-sm text-left">
                    <p class="font-medium text-gray-900">{{ authStore.user?.name || 'User' }}</p>
                    <p class="text-gray-500">{{ businessName }}</p>
                  </div>
                  <!-- Chevron -->
                  <svg 
                    class="w-4 h-4 text-gray-400 transition-transform duration-200" 
                    :class="userMenuOpen ? 'rotate-180' : ''"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div 
                    v-show="userMenuOpen"
                    class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <!-- User Info Header -->
                    <div class="px-4 py-3 border-b border-gray-100">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span class="text-primary-600 font-medium">{{ userInitials }}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">{{ authStore.user?.name || 'User' }}</p>
                          <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email || businessName }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Menu Items -->
                    <div class="py-1">
                      <!-- Profile -->
                      <NuxtLink 
                        to="/profile" 
                        @click="userMenuOpen = false"
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Profile
                      </NuxtLink>

                      <!-- Account Settings -->
                      <NuxtLink 
                        to="/settings" 
                        @click="userMenuOpen = false"
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account Settings
                      </NuxtLink>

                      <!-- Billing -->
                      <button 
                        @click="userMenuOpen = false"
                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Billing & Plans
                      </button>

                      <!-- Team Management -->
                      <button 
                        @click="userMenuOpen = false"
                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Team Management
                      </button>

                      <!-- Help & Support -->
                      <button 
                        @click="userMenuOpen = false"
                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help & Support
                      </button>

                      <!-- Divider -->
                      <div class="border-t border-gray-100 my-1"></div>

                      <!-- Keyboard Shortcuts -->
                      <button 
                        @click="userMenuOpen = false"
                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                        </svg>
                        Keyboard Shortcuts
                        <span class="ml-auto text-xs text-gray-400">⌘K</span>
                      </button>

                      <!-- Privacy Settings -->
                      <button 
                        @click="userMenuOpen = false"
                        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Privacy Settings
                      </button>

                      <!-- Divider -->
                      <div class="border-t border-gray-100 my-1"></div>

                      <!-- Sign Out -->
                      <button 
                        @click="handleLogout"
                        class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg class="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6">
        <slot />
      </main>
      
      <!-- Footer -->
      <footer class="mt-auto py-4 px-4 sm:px-6 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200 bg-white">
        <p class="px-2">© 2024 Synthesq - A Product by TheMessieCompany. All rights reserved.</p>
      </footer>
    </div>
    
    <!-- Notification System -->
    <NotificationSystem />
  </div>
</template>

<script setup>
import Badge from '~/components/ui/Badge.vue'
import NotificationSystem from '~/components/ui/NotificationSystem.vue'
import NotificationDropdown from '~/components/ui/NotificationDropdown.vue'

const route = useRoute()
const authStore = useAuthStore()

// Mobile sidebar state
const sidebarOpen = ref(false)

// User menu state
const userMenuOpen = ref(false)
const userMenuRef = ref(null)

// Search functionality
const searchQuery = ref('')

// Section expansion state
const expandedSections = reactive({
  crm: true,
  sales: true, 
  operations: false,
  finance: false,
  people: false,
  automation: false,
  analytics: true,
  extensions: true
})

// Navigation sections for search filtering
const navigationSections = reactive({
  crm: [
    { name: 'Leads', path: '/crm/leads' },
    { name: 'Opportunities', path: '/crm/opportunities' },
    { name: 'Customers', path: '/crm/customers' }
  ],
  sales: [
    { name: 'Orders', path: '/sales/orders' },
    { name: 'Invoices', path: '/sales/invoices' },
    { name: 'Payments', path: '/sales/payments' }
  ],
  operations: [
    { name: 'Products', path: '/operations/products' },
    { name: 'Inventory', path: '/operations/inventory' },
    { name: 'Procurement', path: '/operations/procurement' }
  ],
  finance: [
    { name: 'Accounting', path: '/finance/accounting' }
  ],
  people: [
    { name: 'Human Resources', path: '/people/hr' }
  ],
  automation: [
    { name: 'Workflows', path: '/automation/workflows' },
    { name: 'AI Insights', path: '/automation/ai-suggestions' },
    { name: 'AI Assistant', path: '/automation/chatbot' },
    { name: 'Customer Portal', path: '/automation/customer-portal' }
  ],
  analytics: [
    { name: 'Reports & Analytics', path: '/analytics/reports' }
  ],
  extensions: [
    { name: 'Extension Store', path: '/extensions' },
    { name: 'Healthcare Suite', path: '/extensions/healthcare' },
    { name: 'Manufacturing Pro', path: '/extensions/manufacturing' },
    { name: 'Real Estate Plus', path: '/extensions/real-estate' },
    { name: 'Financial Services', path: '/extensions/financial-services' },
    { name: 'Education Management', path: '/extensions/education' },
    { name: 'Hospitality Suite', path: '/extensions/hospitality' }
  ]
})

// Close sidebar when route changes (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
  userMenuOpen.value = false
})

// Click outside to close user menu
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

// Add/remove click outside listener
watch(userMenuOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

// Prevent body scroll when sidebar is open on mobile
watch(sidebarOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Clean up on unmount
onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
  document.removeEventListener('click', handleClickOutside)
})

// Section toggle functionality
const toggleSection = (sectionName) => {
  expandedSections[sectionName] = !expandedSections[sectionName]
}


// Auto-expand sections when searching
watch(searchQuery, (newQuery) => {
  if (newQuery) {
    // Expand all sections when searching
    Object.keys(expandedSections).forEach(section => {
      const hasMatches = navigationSections[section].some(item => 
        item.name.toLowerCase().includes(newQuery.toLowerCase())
      )
      if (hasMatches) {
        expandedSections[section] = true
      }
    })
  }
})

const sectionName = computed(() => {
  const path = route.path
  
  // Root dashboard
  if (path === '/') return 'DASHBOARD'
  
  // Settings
  if (path === '/settings') return 'SETTINGS'
  
  // CRM Section
  if (path.startsWith('/crm/')) return 'CRM'
  
  // Sales Section
  if (path.startsWith('/sales/')) return 'SALES'
  
  // Operations Section  
  if (path.startsWith('/operations/')) return 'OPERATIONS'
  
  // Finance Section
  if (path.startsWith('/finance/')) return 'FINANCE'
  
  // People Section
  if (path.startsWith('/people/')) return 'PEOPLE'
  
  // Automation Section
  if (path.startsWith('/automation/')) return 'AUTOMATION'
  
  // Analytics Section
  if (path.startsWith('/analytics/')) return 'ANALYTICS'
  
  // Extensions Section
  if (path.startsWith('/extensions/')) return 'EXTENSIONS'
  
  // Default fallback
  return 'SYNTHESQ'
})

const userInitials = computed(() => {
  if (authStore.user?.name) {
    return authStore.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }
  return 'U'
})

const businessName = computed(() => {
  return authStore.businessId || 'Unknown Business'
})

const { info } = useNotifications()

const handleLogout = async () => {
  info('Signing out...', 'Thanks for using Synthesq!', { duration: 2000 })
  await authStore.logout()
}
</script>
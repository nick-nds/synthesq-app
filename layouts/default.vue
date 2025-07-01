<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <!-- Logo -->
      <div class="flex items-center h-16 px-6 border-b border-neutral-200">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">BK</span>
          </div>
          <span class="ml-3 text-lg font-semibold text-neutral-900">BistroKeep</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <!-- Dashboard -->
          <NuxtLink 
            to="/" 
            :class="$route.path === '/' ? 'sidebar-link-active' : 'sidebar-link-inactive'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
            </svg>
            Dashboard
          </NuxtLink>

          <!-- CRM Section -->
          <div class="pt-4">
            <p class="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">CRM</p>
            <div class="mt-2 space-y-1">
              <NuxtLink 
                to="/customers" 
                :class="$route.path.startsWith('/customers') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Customers
              </NuxtLink>
              
              <NuxtLink 
                to="/leads" 
                :class="$route.path.startsWith('/leads') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Leads & Opportunities
              </NuxtLink>
            </div>
          </div>

          <!-- Sales Section -->
          <div class="pt-4">
            <p class="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Sales</p>
            <div class="mt-2 space-y-1">
              <NuxtLink 
                to="/sales" 
                :class="$route.path.startsWith('/sales') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders & Sales
              </NuxtLink>
            </div>
          </div>

          <!-- ERP Section -->
          <div class="pt-4">
            <p class="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">ERP</p>
            <div class="mt-2 space-y-1">
              <NuxtLink 
                to="/inventory" 
                :class="$route.path.startsWith('/inventory') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Inventory
              </NuxtLink>
              
              <NuxtLink 
                to="/finance" 
                :class="$route.path.startsWith('/finance') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Finance
              </NuxtLink>
            </div>
          </div>

          <!-- Analytics -->
          <div class="pt-4">
            <p class="px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Analytics</p>
            <div class="mt-2 space-y-1">
              <NuxtLink 
                to="/reports" 
                :class="$route.path.startsWith('/reports') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
              >
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Reports
              </NuxtLink>
            </div>
          </div>

          <!-- Settings -->
          <div class="pt-4">
            <NuxtLink 
              to="/settings" 
              :class="$route.path.startsWith('/settings') ? 'sidebar-link-active' : 'sidebar-link-inactive'"
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
    <div class="pl-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-neutral-900">{{ pageTitle }}</h1>
            </div>
            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <button class="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zm-5-17h5l-5 5v-5z" />
                </svg>
              </button>
              
              <!-- User Menu -->
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-medium text-sm">JD</span>
                </div>
                <div class="text-sm">
                  <p class="font-medium text-neutral-900">John Doe</p>
                  <p class="text-neutral-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const pageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard',
    '/customers': 'Customers',
    '/customers/add': 'Add New Customer',
    '/leads': 'Leads & Opportunities',
    '/leads/add': 'Add New Lead',
    '/sales': 'Orders & Sales',
    '/inventory': 'Inventory Management',
    '/inventory/add': 'Add New Product',
    '/finance': 'Finance & Accounting',
    '/reports': 'Reports & Analytics',
    '/settings': 'Settings'
  }
  
  // Handle dynamic routes for editing
  if (route.path.includes('/edit')) {
    if (route.path.includes('/customers/')) return 'Edit Customer'
    if (route.path.includes('/leads/')) return 'Edit Lead'
    if (route.path.includes('/inventory/')) return 'Edit Product'
    if (route.path.includes('/sales/orders/')) return 'Edit Order'
  }
  
  // Handle dynamic routes for viewing
  if (route.path.match(/\/\d+$/) && !route.path.includes('/edit') && !route.path.includes('/add')) {
    if (route.path.includes('/customers/')) return 'Customer Details'
    if (route.path.includes('/leads/')) return 'Lead Details'
    if (route.path.includes('/inventory/')) return 'Product Details'
    if (route.path.includes('/sales/orders/')) return 'Order Details'
  }
  
  return titles[route.path] || 'BistroKeep CRM/ERP'
})
</script>
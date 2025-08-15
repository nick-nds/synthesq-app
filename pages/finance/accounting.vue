<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Accounting</h2>
        <p class="text-sm text-gray-600 mt-1">Manage your financial accounts and transactions</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Financial Reports
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Entry
        </button>
      </div>
    </div>

    <!-- Financial Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Assets</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalAssets) }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+8% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Liabilities</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalLiabilities) }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">-3% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Net Income</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(netIncome) }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+15% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Cash Flow</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(cashFlow) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">Positive trend</p>
      </div>
    </div>

    <!-- Chart of Accounts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Account Categories -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Categories</h3>
        <div class="space-y-3">
          <div v-for="category in accountCategories" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="category.color" class="w-3 h-3 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ category.accounts }}</div>
              <div class="text-xs text-gray-500">{{ formatCurrency(category.balance) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div class="space-y-3">
          <div v-for="transaction in recentTransactions.slice(0, 5)" :key="transaction.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="getTransactionTypeColor(transaction.type)" class="w-3 h-3 rounded-full mr-3"></div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ transaction.description }}</div>
                <div class="text-xs text-gray-500">{{ transaction.account }}</div>
              </div>
            </div>
            <div class="text-right">
              <div :class="transaction.type === 'debit' ? 'text-error-600' : 'text-success-600'" class="text-sm font-medium">
                {{ transaction.type === 'debit' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
              </div>
              <div class="text-xs text-gray-500">{{ formatDate(transaction.date) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Balances -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Account Balances</h3>
        <div class="space-y-3">
          <div v-for="account in topAccounts" :key="account.code" class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-gray-900">{{ account.name }}</div>
              <div class="text-xs text-gray-500">{{ account.code }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ formatCurrency(account.balance) }}</div>
              <div class="text-xs text-gray-500">{{ account.type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Journal Entries Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Journal Entries</h3>
      </div>
      
      <!-- Search and Filters -->
      <div class="p-4 border-b border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search entries..." 
            class="input"
          >
          <select v-model="accountFilter" class="input">
            <option value="">All Accounts</option>
            <option v-for="account in allAccounts" :key="account.code" :value="account.code">{{ account.name }}</option>
          </select>
          <select v-model="typeFilter" class="input">
            <option value="">All Types</option>
            <option value="debit">Debits</option>
            <option value="credit">Credits</option>
          </select>
          <input 
            v-model="dateFilter" 
            type="date" 
            class="input"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="entry in filteredJournalEntries" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(entry.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ entry.description }}</div>
                <div class="text-sm text-gray-500">Entry #{{ entry.entryNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ entry.account }}</div>
                <div class="text-sm text-gray-500">{{ entry.accountCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.type === 'debit' ? formatCurrency(entry.amount) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.type === 'credit' ? formatCurrency(entry.amount) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ entry.reference }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Demo Data Notice -->
    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-warning-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-warning-800">Demo Data Active</h4>
          <p class="text-sm text-warning-700 mt-1">This page is displaying mock accounting data for demonstration purposes. Real functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { formatCurrency } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Mock accounting data
const totalAssets = ref(2850000)
const totalLiabilities = ref(875000)
const netIncome = ref(425000)
const cashFlow = ref(185000)

const searchQuery = ref('')
const accountFilter = ref('')
const typeFilter = ref('')
const dateFilter = ref('')

const accountCategories = [
  { name: 'Assets', accounts: 15, balance: 2850000, color: 'bg-green-500' },
  { name: 'Liabilities', accounts: 8, balance: 875000, color: 'bg-red-500' },
  { name: 'Equity', accounts: 5, balance: 1975000, color: 'bg-blue-500' },
  { name: 'Revenue', accounts: 12, balance: 1250000, color: 'bg-emerald-500' },
  { name: 'Expenses', accounts: 18, balance: 825000, color: 'bg-orange-500' }
]

const recentTransactions = [
  { id: 1, date: '2024-08-15', description: 'Office rent payment', account: 'Rent Expense', type: 'debit', amount: 5000 },
  { id: 2, date: '2024-08-15', description: 'Customer payment received', account: 'Accounts Receivable', type: 'credit', amount: 15000 },
  { id: 3, date: '2024-08-14', description: 'Equipment purchase', account: 'Fixed Assets', type: 'debit', amount: 25000 },
  { id: 4, date: '2024-08-14', description: 'Utility bill payment', account: 'Utilities Expense', type: 'debit', amount: 850 },
  { id: 5, date: '2024-08-13', description: 'Sales revenue', account: 'Sales Revenue', type: 'credit', amount: 32000 },
  { id: 6, date: '2024-08-13', description: 'Supplier payment', account: 'Accounts Payable', type: 'debit', amount: 8500 }
]

const topAccounts = [
  { code: '1100', name: 'Cash and Cash Equivalents', balance: 185000, type: 'Asset' },
  { code: '1200', name: 'Accounts Receivable', balance: 95000, type: 'Asset' },
  { code: '1300', name: 'Inventory', balance: 125000, type: 'Asset' },
  { code: '2100', name: 'Accounts Payable', balance: 45000, type: 'Liability' },
  { code: '4100', name: 'Sales Revenue', balance: 1250000, type: 'Revenue' }
]

const allAccounts = [
  { code: '1100', name: 'Cash and Cash Equivalents' },
  { code: '1200', name: 'Accounts Receivable' },
  { code: '1300', name: 'Inventory' },
  { code: '1400', name: 'Fixed Assets' },
  { code: '2100', name: 'Accounts Payable' },
  { code: '2200', name: 'Accrued Expenses' },
  { code: '3100', name: 'Owner\'s Equity' },
  { code: '4100', name: 'Sales Revenue' },
  { code: '5100', name: 'Cost of Goods Sold' },
  { code: '6100', name: 'Rent Expense' },
  { code: '6200', name: 'Utilities Expense' }
]

const journalEntries = [
  { id: 1, entryNumber: 'JE-001', date: '2024-08-15', description: 'Office rent payment', account: 'Rent Expense', accountCode: '6100', type: 'debit', amount: 5000, reference: 'INV-8875' },
  { id: 2, entryNumber: 'JE-001', date: '2024-08-15', description: 'Office rent payment', account: 'Cash', accountCode: '1100', type: 'credit', amount: 5000, reference: 'INV-8875' },
  { id: 3, entryNumber: 'JE-002', date: '2024-08-15', description: 'Customer payment received', account: 'Cash', accountCode: '1100', type: 'debit', amount: 15000, reference: 'PAY-1234' },
  { id: 4, entryNumber: 'JE-002', date: '2024-08-15', description: 'Customer payment received', account: 'Accounts Receivable', accountCode: '1200', type: 'credit', amount: 15000, reference: 'PAY-1234' },
  { id: 5, entryNumber: 'JE-003', date: '2024-08-14', description: 'Equipment purchase', account: 'Fixed Assets', accountCode: '1400', type: 'debit', amount: 25000, reference: 'PO-5567' },
  { id: 6, entryNumber: 'JE-003', date: '2024-08-14', description: 'Equipment purchase', account: 'Cash', accountCode: '1100', type: 'credit', amount: 25000, reference: 'PO-5567' },
  { id: 7, entryNumber: 'JE-004', date: '2024-08-14', description: 'Utility bill payment', account: 'Utilities Expense', accountCode: '6200', type: 'debit', amount: 850, reference: 'UTIL-445' },
  { id: 8, entryNumber: 'JE-004', date: '2024-08-14', description: 'Utility bill payment', account: 'Cash', accountCode: '1100', type: 'credit', amount: 850, reference: 'UTIL-445' }
]

// Computed
const filteredJournalEntries = computed(() => {
  let filtered = [...journalEntries]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(entry => 
      entry.description.toLowerCase().includes(query) ||
      entry.account.toLowerCase().includes(query) ||
      entry.reference.toLowerCase().includes(query)
    )
  }
  
  if (accountFilter.value) {
    filtered = filtered.filter(entry => entry.accountCode === accountFilter.value)
  }
  
  if (typeFilter.value) {
    filtered = filtered.filter(entry => entry.type === typeFilter.value)
  }
  
  if (dateFilter.value) {
    filtered = filtered.filter(entry => entry.date === dateFilter.value)
  }
  
  return filtered
})

// Methods
const getTransactionTypeColor = (type) => {
  return type === 'debit' ? 'bg-red-500' : 'bg-green-500'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
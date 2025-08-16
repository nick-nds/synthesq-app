<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Floating Header with Glassmorphism -->
    <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Edit Order</h1>
            <p class="text-neutral-500 mt-1">Update order details and fulfillment status</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="saveDraft" 
              :disabled="loading"
              class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 transition-all duration-200 hover:shadow-md disabled:opacity-50"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-neutral-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div class="relative flex items-center">
                <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Save as Draft
              </div>
            </button>
            <button 
              @click="updateOrder" 
              :disabled="loading || !isFormValid"
              class="group relative overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 transition-all duration-200 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div class="relative flex items-center">
                <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ loading ? 'Updating...' : 'Update Order' }}
              </div>
            </button>
            <button 
              @click="cancelOrder" 
              :disabled="loading || form.status === 'cancelled'"
              class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-red-200 text-red-700 hover:border-red-300 hover:text-red-900 hover:bg-red-50 transition-all duration-200 hover:shadow-md disabled:opacity-50"
            >
              <div class="relative flex items-center">
                <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Order
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Form Container -->
    <div class="max-w-6xl mx-auto px-6 pb-12">
      <div class="grid grid-cols-12 gap-8">
        <!-- Main Form -->
        <div class="col-span-12 lg:col-span-8">
          <form @submit.prevent="updateOrder" class="space-y-8">
            <!-- Order Status Indicator -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 rounded-full" :class="getStatusIndicatorColor(form.status)"></div>
                  <span class="text-lg font-semibold text-neutral-800">Order #{{ form.orderNumber }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-neutral-500">Last updated:</span>
                  <span class="text-sm font-medium text-neutral-700">{{ lastUpdated }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-neutral-600">Order Status</h3>
                <span 
                  :class="getOrderStatusClass(form.status)"
                  class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStatus(form.status) }}
                </span>
              </div>
            </div>

            <!-- Order Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Order Information</h3>
                    <p class="text-neutral-500 text-sm">Basic order details and customer information</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="customer" class="block text-sm font-semibold text-neutral-700">Customer *</label>
                    <div class="relative group">
                      <input
                        id="customer"
                        v-model="form.customer"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.customer }"
                        placeholder="Enter customer name"
                      >
                      <div v-if="form.customer" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.customer" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.customer }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="status" class="block text-sm font-semibold text-neutral-700">Order Status *</label>
                    <select
                      id="status"
                      v-model="form.status"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.status }"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <p v-if="errors.status" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.status }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="orderDate" class="block text-sm font-semibold text-neutral-700">Order Date</label>
                    <input
                      id="orderDate"
                      v-model="form.orderDate"
                      type="date"
                      readonly
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="expectedDelivery" class="block text-sm font-semibold text-neutral-700">Expected Delivery</label>
                    <input
                      id="expectedDelivery"
                      v-model="form.expectedDelivery"
                      type="date"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                  </div>

                  <div class="md:col-span-2 space-y-2">
                    <label for="shippingAddress" class="block text-sm font-semibold text-neutral-700">Shipping Address *</label>
                    <textarea
                      id="shippingAddress"
                      v-model="form.shippingAddress"
                      rows="3"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.shippingAddress }"
                      placeholder="Enter shipping address"
                    ></textarea>
                    <p v-if="errors.shippingAddress" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.shippingAddress }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-secondary-100 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-4">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-neutral-900">Order Items</h3>
                      <p class="text-neutral-500 text-sm">Products included in this order</p>
                    </div>
                  </div>
                  <button
                    @click="addItem"
                    type="button"
                    class="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Item
                  </button>
                </div>
                
                <div class="space-y-4">
                  <div 
                    v-for="(item, index) in form.items" 
                    :key="index"
                    class="border border-neutral-200 rounded-xl p-6 bg-white/50"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div class="md:col-span-1">
                        <label :for="`product-${index}`" class="block text-sm font-medium text-neutral-700 mb-2">Product</label>
                        <input
                          :id="`product-${index}`"
                          v-model="item.productName"
                          type="text"
                          required
                          class="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-100"
                          placeholder="Product name"
                        >
                      </div>
                      
                      <div>
                        <label :for="`quantity-${index}`" class="block text-sm font-medium text-neutral-700 mb-2">Quantity</label>
                        <input
                          :id="`quantity-${index}`"
                          v-model.number="item.quantity"
                          type="number"
                          min="1"
                          required
                          @input="updateItemTotal(index)"
                          class="w-full px-3 py-2 rounded-lg border border-neutral-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-100"
                          placeholder="1"
                        >
                      </div>
                      
                      <div>
                        <label :for="`price-${index}`" class="block text-sm font-medium text-neutral-700 mb-2">Unit Price</label>
                        <div class="relative">
                          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">$</span>
                          <input
                            :id="`price-${index}`"
                            v-model.number="item.unitPrice"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            @input="updateItemTotal(index)"
                            class="w-full pl-8 pr-3 py-2 rounded-lg border border-neutral-200 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-100"
                            placeholder="0.00"
                          >
                        </div>
                      </div>
                      
                      <div class="flex items-end space-x-2">
                        <div class="flex-1">
                          <label class="block text-sm font-medium text-neutral-700 mb-2">Total</label>
                          <div class="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
                            ${{ formatCurrency(item.total || 0) }}
                          </div>
                        </div>
                        <button
                          @click="removeItem(index)"
                          type="button"
                          class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Total -->
                <div class="mt-6 pt-6 border-t border-neutral-200">
                  <div class="flex justify-end">
                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                      <div class="text-right">
                        <p class="text-green-600 font-medium">Order Total</p>
                        <p class="text-3xl font-bold text-green-800">${{ formatCurrency(orderTotal) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Payment Information</h3>
                    <p class="text-neutral-500 text-sm">Payment method and status</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="paymentMethod" class="block text-sm font-semibold text-neutral-700">Payment Method</label>
                    <select
                      id="paymentMethod"
                      v-model="form.paymentMethod"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label for="paymentStatus" class="block text-sm font-semibold text-neutral-700">Payment Status</label>
                    <select
                      id="paymentStatus"
                      v-model="form.paymentStatus"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Sidebar Preview Panel -->
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-24">
            <!-- Order Preview Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl mb-6">
              <h3 class="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Order Preview
              </h3>
              
              <div class="space-y-4">
                <!-- Order Details -->
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-neutral-900 text-lg">Order #{{ form.orderNumber }}</h4>
                    <p class="text-sm text-neutral-500">{{ form.customer || 'Customer Name' }}</p>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-primary-50 rounded-lg p-3">
                      <p class="text-xs text-primary-600 font-medium">Order Total</p>
                      <p class="text-lg font-bold text-primary-700">${{ formatCurrency(orderTotal) }}</p>
                    </div>
                    <div class="bg-secondary-50 rounded-lg p-3">
                      <p class="text-xs text-secondary-600 font-medium">Items</p>
                      <p class="text-lg font-bold text-secondary-700">{{ form.items.length }}</p>
                    </div>
                  </div>
                  
                  <div class="flex justify-center space-x-2">
                    <span 
                      :class="getOrderStatusClass(form.status)"
                      class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {{ formatStatus(form.status) }}
                    </span>
                    <span 
                      :class="getPaymentStatusClass(form.paymentStatus)"
                      class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {{ formatStatus(form.paymentStatus) }}
                    </span>
                  </div>
                  
                  <div v-if="form.expectedDelivery" class="pt-2 text-center">
                    <p class="text-xs text-neutral-500">Expected Delivery</p>
                    <p class="text-sm font-medium text-neutral-700">{{ formatDate(form.expectedDelivery) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Activity -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 class="text-lg font-bold text-neutral-900 mb-4">Order Activity</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Changes Made</span>
                  <span class="font-semibold text-neutral-900">{{ Object.keys(changedFields).length }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Order Date</span>
                  <span class="font-semibold text-neutral-900">{{ formatDate(form.orderDate) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Status</span>
                  <span :class="hasChanges ? 'text-amber-600' : 'text-green-600'" class="font-semibold">
                    {{ hasChanges ? 'Unsaved Changes' : 'Up to date' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const orderId = route.params.id

// Form data
const form = reactive({
  orderNumber: '',
  customer: '',
  status: 'pending',
  orderDate: '',
  expectedDelivery: '',
  shippingAddress: '',
  paymentMethod: 'credit-card',
  paymentStatus: 'pending',
  items: []
})

// Original data for change tracking
const originalData = reactive({})
const loading = ref(false)
const errors = reactive({})

// Load order data
onMounted(async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock order data
    const orderData = {
      orderNumber: 'ORD-2024-001',
      customer: 'John Smith - Acme Corporation',
      status: 'processing',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-25',
      shippingAddress: '123 Main Street\nNew York, NY 10001\nUnited States',
      paymentMethod: 'credit-card',
      paymentStatus: 'paid',
      items: [
        {
          id: '1',
          productName: 'Professional CRM License',
          quantity: 2,
          unitPrice: 299,
          total: 598
        },
        {
          id: '2',
          productName: 'Support & Maintenance',
          quantity: 1,
          unitPrice: 199,
          total: 199
        }
      ]
    }
    
    Object.assign(form, orderData)
    Object.assign(originalData, JSON.parse(JSON.stringify(orderData)))
  } catch (error) {
    console.error('Error loading order:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const hasChanges = computed(() => {
  return Object.keys(changedFields.value).length > 0
})

const changedFields = computed(() => {
  const changes = {}
  for (const key in form) {
    if (JSON.stringify(form[key]) !== JSON.stringify(originalData[key])) {
      changes[key] = originalData[key]
    }
  }
  return changes
})

const isFormValid = computed(() => {
  return form.customer && form.shippingAddress && form.items.length > 0 && !hasErrors.value
})

const hasErrors = computed(() => {
  return Object.keys(errors).length > 0
})

const orderTotal = computed(() => {
  return form.items.reduce((sum, item) => sum + (item.total || 0), 0)
})

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatStatus = (status) => {
  if (!status) return ''
  return status.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getOrderStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const getPaymentStatusClass = (status) => {
  const classes = {
    pending: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

const getStatusIndicatorColor = (status) => {
  const colors = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500'
  }
  return colors[status] || 'bg-neutral-400'
}

// Item management
const addItem = () => {
  form.items.push({
    id: Date.now().toString(),
    productName: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  })
}

const removeItem = (index) => {
  form.items.splice(index, 1)
}

const updateItemTotal = (index) => {
  const item = form.items[index]
  item.total = (item.quantity || 0) * (item.unitPrice || 0)
}

// Validation
const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.customer) errors.customer = 'Customer is required'
  if (!form.shippingAddress) errors.shippingAddress = 'Shipping address is required'
  if (!form.status) errors.status = 'Order status is required'

  if (form.items.length === 0) {
    errors.items = 'At least one item is required'
  }

  form.items.forEach((item, index) => {
    if (!item.productName) errors[`item_${index}_product`] = 'Product name is required'
    if (!item.quantity || item.quantity <= 0) errors[`item_${index}_quantity`] = 'Valid quantity is required'
    if (!item.unitPrice || item.unitPrice <= 0) errors[`item_${index}_price`] = 'Valid unit price is required'
  })

  return Object.keys(errors).length === 0
}

// Actions
const updateOrder = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Updating order:', form)
    
    Object.assign(originalData, JSON.parse(JSON.stringify(form)))
    await router.push('/sales?success=Order updated successfully')
  } catch (error) {
    console.error('Error updating order:', error)
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving draft:', form)
    alert('Draft saved successfully!')
  } catch (error) {
    console.error('Error saving draft:', error)
  } finally {
    loading.value = false
  }
}

const cancelOrder = async () => {
  if (!confirm('Are you sure you want to cancel this order? This action may not be reversible.')) {
    return
  }

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    form.status = 'cancelled'
    console.log('Cancelling order:', orderId)
    await updateOrder()
  } catch (error) {
    console.error('Error cancelling order:', error)
  } finally {
    loading.value = false
  }
}
</script>
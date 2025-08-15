<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Floating Header with Glassmorphism -->
    <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Edit Product</h1>
            <p class="text-neutral-500 mt-1">Update product information and inventory details</p>
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
              @click="updateProduct" 
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
                {{ loading ? 'Updating...' : 'Update Product' }}
              </div>
            </button>
            <button 
              @click="deleteProduct" 
              :disabled="loading"
              class="group relative overflow-hidden px-6 py-3 rounded-xl border-2 border-red-200 text-red-700 hover:border-red-300 hover:text-red-900 hover:bg-red-50 transition-all duration-200 hover:shadow-md disabled:opacity-50"
            >
              <div class="relative flex items-center">
                <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
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
          <form @submit.prevent="updateProduct" class="space-y-8">
            <!-- Product Status Indicator -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="text-lg font-semibold text-neutral-800">Product ID: {{ productId }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-neutral-500">Last updated:</span>
                  <span class="text-sm font-medium text-neutral-700">{{ lastUpdated }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-neutral-600">Form Changes</h3>
                <span class="text-sm font-medium text-primary-600">{{ hasChanges ? 'Modified' : 'No changes' }}</span>
              </div>
            </div>

            <!-- Basic Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Basic Information</h3>
                    <p class="text-neutral-500 text-sm">Essential product details and identification</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="name" class="block text-sm font-semibold text-neutral-700">Product Name *</label>
                    <div class="relative group">
                      <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.name }"
                        placeholder="Enter product name"
                      >
                      <div v-if="form.name" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.name" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.name }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="sku" class="block text-sm font-semibold text-neutral-700">SKU *</label>
                    <div class="relative">
                      <input
                        id="sku"
                        v-model="form.sku"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 font-mono"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.sku }"
                        placeholder="e.g., PRD-001"
                      >
                      <div v-if="form.sku" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.sku" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.sku }}
                    </p>
                  </div>

                  <div class="md:col-span-2 space-y-2">
                    <label for="description" class="block text-sm font-semibold text-neutral-700">Description</label>
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="3"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="Enter product description"
                    ></textarea>
                  </div>

                  <div class="space-y-2">
                    <label for="category" class="block text-sm font-semibold text-neutral-700">Category *</label>
                    <select
                      id="category"
                      v-model="form.category"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.category }"
                    >
                      <option value="">Select a category</option>
                      <option value="Software">Software</option>
                      <option value="Service">Service</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Training">Training</option>
                    </select>
                    <p v-if="errors.category" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.category }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="status" class="block text-sm font-semibold text-neutral-700">Status</label>
                    <select
                      id="status"
                      v-model="form.status"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pricing Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-secondary-100 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Pricing Information</h3>
                    <p class="text-neutral-500 text-sm">Set pricing and calculate profit margins</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label for="price" class="block text-sm font-semibold text-neutral-700">Selling Price *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span class="text-neutral-400 font-medium">$</span>
                      </div>
                      <input
                        id="price"
                        v-model.number="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-4 py-3 pl-8 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.price }"
                        placeholder="0.00"
                      >
                      <div v-if="form.price" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.price" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.price }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="cost" class="block text-sm font-semibold text-neutral-700">Cost Price</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span class="text-neutral-400 font-medium">$</span>
                      </div>
                      <input
                        id="cost"
                        v-model.number="form.cost"
                        type="number"
                        step="0.01"
                        min="0"
                        class="w-full px-4 py-3 pl-8 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        placeholder="0.00"
                      >
                    </div>
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-neutral-700">Profit Margin</label>
                    <div class="relative">
                      <div class="w-full px-4 py-3 rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 font-semibold text-center">
                        {{ profitMargin }}
                      </div>
                      <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-xs text-neutral-500 text-center">Calculated automatically</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inventory Management -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Inventory Management</h3>
                    <p class="text-neutral-500 text-sm">Stock levels and inventory tracking</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label for="stock" class="block text-sm font-semibold text-neutral-700">Current Stock *</label>
                    <input
                      id="stock"
                      v-model.number="form.stock"
                      type="number"
                      min="0"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.stock }"
                      placeholder="0"
                    >
                    <p v-if="errors.stock" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.stock }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="minStock" class="block text-sm font-semibold text-neutral-700">Minimum Stock Level *</label>
                    <input
                      id="minStock"
                      v-model.number="form.minStock"
                      type="number"
                      min="0"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.minStock }"
                      placeholder="0"
                    >
                    <p v-if="errors.minStock" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.minStock }}
                    </p>
                    <p class="text-xs text-neutral-500">Alert when stock falls below this level</p>
                  </div>

                  <div class="space-y-2">
                    <label for="unit" class="block text-sm font-semibold text-neutral-700">Unit of Measurement</label>
                    <select
                      id="unit"
                      v-model="form.unit"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="lbs">Pounds</option>
                      <option value="liters">Liters</option>
                      <option value="meters">Meters</option>
                      <option value="boxes">Boxes</option>
                      <option value="sets">Sets</option>
                      <option value="licenses">Licenses</option>
                    </select>
                  </div>
                </div>

                <!-- Stock Status Indicator -->
                <div v-if="form.stock !== null && form.minStock !== null" class="mt-6 p-4 rounded-lg" :class="stockStatusClass">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="stockStatus === 'good'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      <path v-else-if="stockStatus === 'warning'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      <path v-else fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <span class="font-medium">{{ stockStatusMessage }}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Sidebar Preview Panel -->
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-24">
            <!-- Product Preview Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl mb-6">
              <h3 class="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Product Preview
              </h3>
              
              <div class="space-y-4">
                <!-- Product Image Placeholder -->
                <div class="aspect-square rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center border-2 border-dashed border-neutral-300">
                  <svg class="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <!-- Product Details -->
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-neutral-900">{{ form.name || 'Product Name' }}</h4>
                    <p class="text-sm text-neutral-500 font-mono">{{ form.sku || 'SKU-000' }}</p>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-primary-50 rounded-lg p-3">
                      <p class="text-xs text-primary-600 font-medium">Price</p>
                      <p class="text-lg font-bold text-primary-700">${{ form.price || '0.00' }}</p>
                    </div>
                    <div class="bg-secondary-50 rounded-lg p-3">
                      <p class="text-xs text-secondary-600 font-medium">Stock</p>
                      <p class="text-lg font-bold text-secondary-700">{{ form.stock || '0' }}</p>
                    </div>
                  </div>
                  
                  <div v-if="form.price && form.cost" class="bg-success-50 rounded-lg p-3">
                    <p class="text-xs text-success-600 font-medium">Profit Margin</p>
                    <p class="text-lg font-bold text-success-700">{{ profitMargin }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Change History -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 class="text-lg font-bold text-neutral-900 mb-4">Change History</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Original Values</span>
                  <span class="font-semibold text-neutral-900">{{ Object.keys(changedFields).length > 0 ? 'Modified' : 'Current' }}</span>
                </div>
                <div v-for="(value, field) in changedFields" :key="field" class="text-xs">
                  <div class="flex justify-between">
                    <span class="text-neutral-600 capitalize">{{ field }}:</span>
                    <span class="font-medium text-neutral-800">{{ value }}</span>
                  </div>
                </div>
                <div class="flex justify-between items-center pt-2 border-t">
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
  layout: 'default'
})

const route = useRoute()
const router = useRouter()

const productId = route.params.id

// Form data
const form = reactive({
  name: '',
  sku: '',
  description: '',
  category: '',
  status: 'active',
  price: null,
  cost: null,
  stock: null,
  minStock: null,
  unit: 'pcs'
})

// Original data for change tracking
const originalData = reactive({})
const loading = ref(false)
const errors = reactive({})

// Load product data
onMounted(async () => {
  loading.value = true
  try {
    // Simulate loading existing product data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock product data - in real app, fetch from API
    const productData = {
      name: 'Professional CRM License',
      sku: 'CRM-PRO-001',
      description: 'Professional CRM software license for small to medium businesses',
      category: 'Software',
      status: 'active',
      price: 299,
      cost: 150,
      stock: 100,
      minStock: 10,
      unit: 'licenses'
    }
    
    // Populate form and original data
    Object.assign(form, productData)
    Object.assign(originalData, productData)
  } catch (error) {
    console.error('Error loading product:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties
const profitMargin = computed(() => {
  if (!form.price || !form.cost) return 'N/A'
  const margin = ((form.price - form.cost) / form.price * 100).toFixed(1)
  return `${margin}%`
})

const stockStatus = computed(() => {
  if (form.stock === null || form.minStock === null) return 'unknown'
  if (form.stock <= form.minStock) return 'critical'
  if (form.stock <= form.minStock * 2) return 'warning'
  return 'good'
})

const stockStatusClass = computed(() => {
  const classes = {
    good: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-warning-700',
    critical: 'bg-danger-50 text-danger-700',
    unknown: 'bg-neutral-50 text-neutral-700'
  }
  return classes[stockStatus.value]
})

const stockStatusMessage = computed(() => {
  const messages = {
    good: 'Stock level is healthy',
    warning: 'Stock level is getting low',
    critical: 'Stock level is critically low!',
    unknown: 'Enter stock levels to see status'
  }
  return messages[stockStatus.value]
})

const hasChanges = computed(() => {
  return Object.keys(changedFields.value).length > 0
})

const changedFields = computed(() => {
  const changes = {}
  for (const key in form) {
    if (form[key] !== originalData[key]) {
      changes[key] = originalData[key]
    }
  }
  return changes
})

const isFormValid = computed(() => {
  return form.name && form.sku && form.category && form.price && 
         form.stock !== null && form.minStock !== null && !hasErrors.value
})

const hasErrors = computed(() => {
  return Object.keys(errors).length > 0
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

// Validation
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  // Validate required fields
  if (!form.name) errors.name = 'Product name is required'
  if (!form.sku) errors.sku = 'SKU is required'
  if (!form.category) errors.category = 'Category is required'
  if (!form.price) errors.price = 'Selling price is required'
  if (form.stock === null) errors.stock = 'Current stock is required'
  if (form.minStock === null) errors.minStock = 'Minimum stock level is required'

  // Validate data types and ranges
  if (form.price && form.price <= 0) errors.price = 'Price must be greater than 0'
  if (form.cost && form.cost < 0) errors.cost = 'Cost cannot be negative'
  if (form.stock !== null && form.stock < 0) errors.stock = 'Stock cannot be negative'
  if (form.minStock !== null && form.minStock < 0) errors.minStock = 'Minimum stock cannot be negative'

  // Validate SKU format (basic)
  if (form.sku && !/^[A-Z0-9-]+$/i.test(form.sku)) {
    errors.sku = 'SKU can only contain letters, numbers, and hyphens'
  }

  return Object.keys(errors).length === 0
}

// Actions
const updateProduct = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Updating product:', form)
    
    // Update original data to reflect changes
    Object.assign(originalData, form)
    
    // Success - redirect to inventory with success message
    await router.push('/inventory?success=Product updated successfully')
  } catch (error) {
    console.error('Error updating product:', error)
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

const deleteProduct = async () => {
  if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    return
  }

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Deleting product:', productId)
    await router.push('/inventory?success=Product deleted successfully')
  } catch (error) {
    console.error('Error deleting product:', error)
  } finally {
    loading.value = false
  }
}
</script>
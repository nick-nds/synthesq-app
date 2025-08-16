<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Floating Header with Glassmorphism -->
    <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Edit Customer</h1>
            <p class="text-neutral-500 mt-1">Update customer information and business relationships</p>
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
              @click="updateCustomer" 
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
                {{ loading ? 'Updating...' : 'Update Customer' }}
              </div>
            </button>
            <button 
              @click="deleteCustomer" 
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
          <form @submit.prevent="updateCustomer" class="space-y-8">
            <!-- Customer Status Indicator -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 rounded-full" :class="form.status === 'active' ? 'bg-green-500' : form.status === 'prospect' ? 'bg-blue-500' : 'bg-neutral-400'"></div>
                  <span class="text-lg font-semibold text-neutral-800">Customer ID: {{ customerId }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-neutral-500">Last updated:</span>
                  <span class="text-sm font-medium text-neutral-700">{{ lastUpdated }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-neutral-600">Account Status</h3>
                <span 
                  :class="getStatusClass(form.status)"
                  class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                >
                  {{ form.status.charAt(0).toUpperCase() + form.status.slice(1) }}
                </span>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Personal Information</h3>
                    <p class="text-neutral-500 text-sm">Basic contact details and identification</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="name" class="block text-sm font-semibold text-neutral-700">Full Name *</label>
                    <div class="relative group">
                      <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.name }"
                        placeholder="Enter full name"
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
                    <label for="email" class="block text-sm font-semibold text-neutral-700">Email Address *</label>
                    <div class="relative">
                      <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.email }"
                        placeholder="email@example.com"
                      >
                      <div v-if="form.email && !errors.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.email" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.email }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="phone" class="block text-sm font-semibold text-neutral-700">Phone Number *</label>
                    <div class="relative">
                      <input
                        id="phone"
                        v-model="form.phone"
                        type="tel"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.phone }"
                        placeholder="+1 (555) 123-4567"
                      >
                      <div v-if="form.phone && !errors.phone" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.phone" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.phone }}
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
                      <option value="prospect">Prospect</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-secondary-100 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Business Information</h3>
                    <p class="text-neutral-500 text-sm">Company details and business relationships</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="company" class="block text-sm font-semibold text-neutral-700">Company Name *</label>
                    <div class="relative">
                      <input
                        id="company"
                        v-model="form.company"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.company }"
                        placeholder="Enter company name"
                      >
                      <div v-if="form.company" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.company" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.company }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="industry" class="block text-sm font-semibold text-neutral-700">Industry</label>
                    <select
                      id="industry"
                      v-model="form.industry"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="">Select industry</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="retail">Retail</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="space-y-2">
                    <label for="website" class="block text-sm font-semibold text-neutral-700">Website</label>
                    <input
                      id="website"
                      v-model="form.website"
                      type="url"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="https://example.com"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="employees" class="block text-sm font-semibold text-neutral-700">Number of Employees</label>
                    <select
                      id="employees"
                      v-model="form.employees"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="">Select range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Additional Information</h3>
                    <p class="text-neutral-500 text-sm">Notes, tags, and custom fields</p>
                  </div>
                </div>
                <div class="space-y-6">
                  <div class="space-y-2">
                    <label for="notes" class="block text-sm font-semibold text-neutral-700">Notes</label>
                    <textarea
                      id="notes"
                      v-model="form.notes"
                      rows="4"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="Add any additional notes about this customer..."
                    ></textarea>
                  </div>

                  <div class="space-y-2">
                    <label for="tags" class="block text-sm font-semibold text-neutral-700">Tags</label>
                    <div class="relative">
                      <input
                        id="tags"
                        v-model="tagInput"
                        @keypress.enter.prevent="addTag"
                        type="text"
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        placeholder="Type a tag and press Enter"
                      >
                    </div>
                    <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
                      <span
                        v-for="(tag, index) in form.tags"
                        :key="index"
                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
                      >
                        {{ tag }}
                        <button
                          @click="removeTag(index)"
                          type="button"
                          class="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Sidebar Preview Panel -->
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-24">
            <!-- Customer Preview Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl mb-6">
              <h3 class="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Customer Preview
              </h3>
              
              <div class="space-y-4">
                <!-- Avatar -->
                <div class="flex items-center justify-center">
                  <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold">
                    {{ getInitials(form.name) }}
                  </div>
                </div>
                
                <!-- Customer Details -->
                <div class="space-y-3 text-center">
                  <div>
                    <h4 class="font-semibold text-neutral-900 text-lg">{{ form.name || 'Customer Name' }}</h4>
                    <p class="text-sm text-neutral-500">{{ form.company || 'Company Name' }}</p>
                  </div>
                  
                  <div class="flex justify-center space-x-2">
                    <span 
                      :class="getStatusClass(form.status)"
                      class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {{ form.status.charAt(0).toUpperCase() + form.status.slice(1) }}
                    </span>
                  </div>
                  
                  <div class="pt-4 space-y-2 text-left">
                    <div v-if="form.email" class="flex items-center text-sm text-neutral-600">
                      <svg class="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ form.email }}
                    </div>
                    <div v-if="form.phone" class="flex items-center text-sm text-neutral-600">
                      <svg class="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ form.phone }}
                    </div>
                    <div v-if="form.industry" class="flex items-center text-sm text-neutral-600">
                      <svg class="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {{ form.industry.charAt(0).toUpperCase() + form.industry.slice(1) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Change History -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 class="text-lg font-bold text-neutral-900 mb-4">Account Activity</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Changes Made</span>
                  <span class="font-semibold text-neutral-900">{{ Object.keys(changedFields).length }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Tags</span>
                  <span class="font-semibold text-neutral-900">{{ form.tags.length }}</span>
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

const customerId = route.params.id

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'active',
  industry: '',
  website: '',
  employees: '',
  notes: '',
  tags: []
})

// Original data for change tracking
const originalData = reactive({})
const loading = ref(false)
const errors = reactive({})
const tagInput = ref('')

// Load customer data
onMounted(async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock customer data
    const customerData = {
      name: 'John Smith',
      email: 'john.smith@acmecorp.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      status: 'active',
      industry: 'technology',
      website: 'https://acmecorp.com',
      employees: '51-200',
      notes: 'Key decision maker for technology purchases. Interested in enterprise solutions.',
      tags: ['enterprise', 'key-account', 'technology']
    }
    
    Object.assign(form, customerData)
    Object.assign(originalData, customerData)
  } catch (error) {
    console.error('Error loading customer:', error)
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
  return form.name && form.email && form.phone && form.company && !hasErrors.value
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

// Helper functions
const getInitials = (name) => {
  if (!name) return 'CN'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-neutral-100 text-neutral-800',
    prospect: 'bg-blue-100 text-blue-800'
  }
  return classes[status] || 'bg-neutral-100 text-neutral-800'
}

// Tag management
const addTag = () => {
  if (tagInput.value.trim() && !form.tags.includes(tagInput.value.trim())) {
    form.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  form.tags.splice(index, 1)
}

// Validation
const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.name) errors.name = 'Customer name is required'
  if (!form.email) errors.email = 'Email address is required'
  if (!form.phone) errors.phone = 'Phone number is required'
  if (!form.company) errors.company = 'Company name is required'

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (form.phone && !/^[\d\s\-\+\(\)]+$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (form.website && !/^https?:\/\/.+/.test(form.website)) {
    errors.website = 'Please enter a valid URL starting with http:// or https://'
  }

  return Object.keys(errors).length === 0
}

// Actions
const updateCustomer = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Updating customer:', form)
    
    Object.assign(originalData, form)
    await router.push('/customers?success=Customer updated successfully')
  } catch (error) {
    console.error('Error updating customer:', error)
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

const deleteCustomer = async () => {
  if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
    return
  }

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Deleting customer:', customerId)
    await router.push('/customers?success=Customer deleted successfully')
  } catch (error) {
    console.error('Error deleting customer:', error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Floating Header with Glassmorphism -->
    <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Edit Lead</h1>
            <p class="text-neutral-500 mt-1">Update sales opportunity and pipeline status</p>
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
              @click="updateLead" 
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
                {{ loading ? 'Updating...' : 'Update Lead' }}
              </div>
            </button>
            <button 
              @click="deleteLead" 
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
          <form @submit.prevent="updateLead" class="space-y-8">
            <!-- Lead Status Indicator -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 rounded-full" :class="getStageIndicatorColor(form.stage)"></div>
                  <span class="text-lg font-semibold text-neutral-800">Lead ID: {{ leadId }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-neutral-500">Last updated:</span>
                  <span class="text-sm font-medium text-neutral-700">{{ lastUpdated }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-neutral-600">Pipeline Stage</h3>
                <span 
                  :class="getStageClass(form.stage)"
                  class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStage(form.stage) }}
                </span>
              </div>
            </div>

            <!-- Lead Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Lead Information</h3>
                    <p class="text-neutral-500 text-sm">Basic opportunity details and identification</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="title" class="block text-sm font-semibold text-neutral-700">Lead Title *</label>
                    <div class="relative group">
                      <input
                        id="title"
                        v-model="form.title"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.title }"
                        placeholder="e.g., Website redesign project"
                      >
                      <div v-if="form.title" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.title" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.title }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="customer" class="block text-sm font-semibold text-neutral-700">Customer/Company *</label>
                    <div class="relative">
                      <input
                        id="customer"
                        v-model="form.customer"
                        type="text"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.customer }"
                        placeholder="Enter customer or company name"
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

                  <div class="md:col-span-2 space-y-2">
                    <label for="description" class="block text-sm font-semibold text-neutral-700">Description</label>
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="3"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="Describe the opportunity, requirements, and key details..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sales Information -->
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
                    <h3 class="text-xl font-bold text-neutral-900">Sales Information</h3>
                    <p class="text-neutral-500 text-sm">Pipeline stage, value, and probability</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label for="value" class="block text-sm font-semibold text-neutral-700">Deal Value *</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span class="text-neutral-400 font-medium">$</span>
                      </div>
                      <input
                        id="value"
                        v-model.number="form.value"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-4 py-3 pl-8 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.value }"
                        placeholder="0.00"
                      >
                      <div v-if="form.value" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p v-if="errors.value" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.value }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="stage" class="block text-sm font-semibold text-neutral-700">Sales Stage *</label>
                    <select
                      id="stage"
                      v-model="form.stage"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.stage }"
                    >
                      <option value="">Select stage</option>
                      <option value="prospect">Prospect</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed-won">Closed Won</option>
                      <option value="closed-lost">Closed Lost</option>
                    </select>
                    <p v-if="errors.stage" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.stage }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="probability" class="block text-sm font-semibold text-neutral-700">Win Probability</label>
                    <div class="relative">
                      <input
                        id="probability"
                        v-model.number="form.probability"
                        type="number"
                        min="0"
                        max="100"
                        class="w-full px-4 py-3 pr-8 rounded-xl border-2 border-neutral-200 focus:border-secondary-400 focus:ring-4 focus:ring-secondary-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                        :placeholder="getStageProbability(form.stage)"
                      >
                      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span class="text-neutral-400 font-medium">%</span>
                      </div>
                    </div>
                    <p class="text-xs text-neutral-500">Auto-filled based on stage</p>
                  </div>
                </div>

                <!-- Weighted Value Display -->
                <div v-if="form.value && form.probability" class="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div class="flex items-center justify-between">
                    <span class="text-green-700 font-medium">Weighted Value:</span>
                    <span class="text-xl font-bold text-green-800">${{ formatCurrency(weightedValue) }}</span>
                  </div>
                  <p class="text-xs text-green-600 mt-1">Deal value × Win probability</p>
                </div>
              </div>
            </div>

            <!-- Timeline Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Timeline & Assignment</h3>
                    <p class="text-neutral-500 text-sm">Expected closing date and responsible person</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="expectedCloseDate" class="block text-sm font-semibold text-neutral-700">Expected Close Date *</label>
                    <input
                      id="expectedCloseDate"
                      v-model="form.expectedCloseDate"
                      type="date"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.expectedCloseDate }"
                    >
                    <p v-if="errors.expectedCloseDate" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.expectedCloseDate }}
                    </p>
                  </div>

                  <div class="space-y-2">
                    <label for="assignedTo" class="block text-sm font-semibold text-neutral-700">Assigned To *</label>
                    <select
                      id="assignedTo"
                      v-model="form.assignedTo"
                      required
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': errors.assignedTo }"
                    >
                      <option value="">Select sales rep</option>
                      <option value="john-doe">John Doe</option>
                      <option value="jane-smith">Jane Smith</option>
                      <option value="mike-johnson">Mike Johnson</option>
                      <option value="sarah-wilson">Sarah Wilson</option>
                    </select>
                    <p v-if="errors.assignedTo" class="text-sm text-red-600 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ errors.assignedTo }}
                    </p>
                  </div>
                </div>

                <!-- Days to Close Indicator -->
                <div v-if="form.expectedCloseDate" class="mt-6 p-4 rounded-xl" :class="getDaysToCloseClass()">
                  <div class="flex items-center justify-between">
                    <span class="font-medium">Days to Close:</span>
                    <span class="text-lg font-bold">{{ daysToClose }}</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Sidebar Preview Panel -->
        <div class="col-span-12 lg:col-span-4">
          <div class="sticky top-24">
            <!-- Lead Preview Card -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl mb-6">
              <h3 class="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Lead Preview
              </h3>
              
              <div class="space-y-4">
                <!-- Lead Details -->
                <div class="space-y-3">
                  <div>
                    <h4 class="font-semibold text-neutral-900 text-lg">{{ form.title || 'Lead Title' }}</h4>
                    <p class="text-sm text-neutral-500">{{ form.customer || 'Customer/Company' }}</p>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-primary-50 rounded-lg p-3">
                      <p class="text-xs text-primary-600 font-medium">Deal Value</p>
                      <p class="text-lg font-bold text-primary-700">${{ formatCurrency(form.value || 0) }}</p>
                    </div>
                    <div class="bg-secondary-50 rounded-lg p-3">
                      <p class="text-xs text-secondary-600 font-medium">Probability</p>
                      <p class="text-lg font-bold text-secondary-700">{{ form.probability || 0 }}%</p>
                    </div>
                  </div>
                  
                  <div v-if="form.stage" class="flex justify-center">
                    <span 
                      :class="getStageClass(form.stage)"
                      class="inline-flex px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {{ formatStage(form.stage) }}
                    </span>
                  </div>
                  
                  <div v-if="form.value && form.probability" class="bg-success-50 rounded-lg p-3">
                    <p class="text-xs text-success-600 font-medium">Weighted Value</p>
                    <p class="text-lg font-bold text-success-700">${{ formatCurrency(weightedValue) }}</p>
                  </div>
                  
                  <div v-if="form.expectedCloseDate" class="pt-2 text-center">
                    <p class="text-xs text-neutral-500">Expected Close</p>
                    <p class="text-sm font-medium text-neutral-700">{{ formatDate(form.expectedCloseDate) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lead Activity -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 class="text-lg font-bold text-neutral-900 mb-4">Lead Activity</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Changes Made</span>
                  <span class="font-semibold text-neutral-900">{{ Object.keys(changedFields).length }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Days to Close</span>
                  <span class="font-semibold text-neutral-900">{{ daysToClose }}</span>
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

const leadId = route.params.id

// Form data
const form = reactive({
  title: '',
  customer: '',
  description: '',
  value: null,
  stage: '',
  probability: null,
  expectedCloseDate: '',
  assignedTo: ''
})

// Original data for change tracking
const originalData = reactive({})
const loading = ref(false)
const errors = reactive({})

// Load lead data
onMounted(async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock lead data
    const leadData = {
      title: 'Enterprise CRM Implementation',
      customer: 'Tech Solutions Inc',
      description: 'Complete CRM system implementation for mid-size technology company',
      value: 50000,
      stage: 'proposal',
      probability: 50,
      expectedCloseDate: '2024-03-15',
      assignedTo: 'jane-smith'
    }
    
    Object.assign(form, leadData)
    Object.assign(originalData, leadData)
  } catch (error) {
    console.error('Error loading lead:', error)
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
    if (form[key] !== originalData[key]) {
      changes[key] = originalData[key]
    }
  }
  return changes
})

const isFormValid = computed(() => {
  return form.title && form.customer && form.value && form.stage && 
         form.expectedCloseDate && form.assignedTo && !hasErrors.value
})

const hasErrors = computed(() => {
  return Object.keys(errors).length > 0
})

const weightedValue = computed(() => {
  if (!form.value || !form.probability) return 0
  return (form.value * form.probability / 100)
})

const daysToClose = computed(() => {
  if (!form.expectedCloseDate) return 'Not set'
  const today = new Date()
  const closeDate = new Date(form.expectedCloseDate)
  const diffTime = closeDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Overdue'
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day'
  return `${diffDays} days`
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

const formatStage = (stage) => {
  if (!stage) return ''
  return stage.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const getStageClass = (stage) => {
  const classes = {
    prospect: 'bg-blue-100 text-blue-800',
    qualified: 'bg-indigo-100 text-indigo-800',
    proposal: 'bg-purple-100 text-purple-800',
    negotiation: 'bg-orange-100 text-orange-800',
    'closed-won': 'bg-green-100 text-green-800',
    'closed-lost': 'bg-red-100 text-red-800'
  }
  return classes[stage] || 'bg-neutral-100 text-neutral-800'
}

const getStageIndicatorColor = (stage) => {
  const colors = {
    prospect: 'bg-blue-500',
    qualified: 'bg-indigo-500',
    proposal: 'bg-purple-500',
    negotiation: 'bg-orange-500',
    'closed-won': 'bg-green-500',
    'closed-lost': 'bg-red-500'
  }
  return colors[stage] || 'bg-neutral-400'
}

const getStageProbability = (stage) => {
  const probabilities = {
    prospect: '10',
    qualified: '25',
    proposal: '50',
    negotiation: '75',
    'closed-won': '100',
    'closed-lost': '0'
  }
  return probabilities[stage] || '0'
}

const getDaysToCloseClass = () => {
  if (!form.expectedCloseDate) return 'bg-neutral-50 text-neutral-700'
  
  const today = new Date()
  const closeDate = new Date(form.expectedCloseDate)
  const diffTime = closeDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'bg-red-50 text-red-700'
  if (diffDays <= 7) return 'bg-orange-50 text-orange-700'
  if (diffDays <= 30) return 'bg-yellow-50 text-yellow-700'
  return 'bg-green-50 text-green-700'
}

// Auto-update probability based on stage
watch(() => form.stage, (newStage) => {
  if (newStage && !form.probability) {
    form.probability = parseInt(getStageProbability(newStage))
  }
})

// Validation
const validateForm = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.title) errors.title = 'Lead title is required'
  if (!form.customer) errors.customer = 'Customer/company is required'
  if (!form.value) errors.value = 'Deal value is required'
  if (!form.stage) errors.stage = 'Sales stage is required'
  if (!form.expectedCloseDate) errors.expectedCloseDate = 'Expected close date is required'
  if (!form.assignedTo) errors.assignedTo = 'Assigned sales rep is required'

  if (form.value && form.value <= 0) errors.value = 'Deal value must be greater than 0'
  if (form.probability && (form.probability < 0 || form.probability > 100)) {
    errors.probability = 'Probability must be between 0 and 100'
  }

  return Object.keys(errors).length === 0
}

// Actions
const updateLead = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Updating lead:', form)
    
    Object.assign(originalData, form)
    await router.push('/leads?success=Lead updated successfully')
  } catch (error) {
    console.error('Error updating lead:', error)
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

const deleteLead = async () => {
  if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
    return
  }

  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Deleting lead:', leadId)
    await router.push('/leads?success=Lead deleted successfully')
  } catch (error) {
    console.error('Error deleting lead:', error)
  } finally {
    loading.value = false
  }
}
</script>
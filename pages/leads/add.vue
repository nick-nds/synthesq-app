<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/20">
    <!-- Floating Header with Glassmorphism -->
    <div class="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-neutral-900/5">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">Add New Lead</h1>
            <p class="text-neutral-500 mt-1">Create a new sales opportunity and track the sales pipeline</p>
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
              @click="saveLead" 
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
                {{ loading ? 'Saving...' : 'Save Lead' }}
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
          <form @submit.prevent="saveLead" class="space-y-8">
            <!-- Progress Indicator -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-neutral-800">Form Progress</h3>
                <span class="text-sm font-medium text-primary-600">{{ formCompletionPercentage }}% Complete</span>
              </div>
              <div class="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-primary-500 to-secondary-400 h-2 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: formCompletionPercentage + '%' }"
                ></div>
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
              </div>
            </div>

            <!-- Contact Information -->
            <div class="group relative">
              <div class="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div class="flex items-center mb-6">
                  <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-neutral-900">Contact Information</h3>
                    <p class="text-neutral-500 text-sm">Primary contact details</p>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="contactName" class="block text-sm font-semibold text-neutral-700">Contact Name</label>
                    <input
                      id="contactName"
                      v-model="form.contactName"
                      type="text"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="Primary contact person"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="contactEmail" class="block text-sm font-semibold text-neutral-700">Contact Email</label>
                    <input
                      id="contactEmail"
                      v-model="form.contactEmail"
                      type="email"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="contact@company.com"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="contactPhone" class="block text-sm font-semibold text-neutral-700">Contact Phone</label>
                    <input
                      id="contactPhone"
                      v-model="form.contactPhone"
                      type="tel"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      placeholder="+1 (555) 123-4567"
                    >
                  </div>

                  <div class="space-y-2">
                    <label for="source" class="block text-sm font-semibold text-neutral-700">Lead Source</label>
                    <select
                      id="source"
                      v-model="form.source"
                      class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <option value="">Select source</option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="cold-call">Cold Call</option>
                      <option value="social-media">Social Media</option>
                      <option value="trade-show">Trade Show</option>
                      <option value="marketing">Marketing Campaign</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Summary -->
            <div v-if="hasErrors" class="card border-l-4 border-danger-500 bg-danger-50">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-danger-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-danger-800">Please fix the following errors:</h3>
                  <div class="mt-2 text-sm text-danger-700">
                    <ul class="list-disc list-inside space-y-1">
                      <li v-for="error in Object.values(errors)" :key="error">{{ error }}</li>
                    </ul>
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

            <!-- Quick Stats -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 class="text-lg font-bold text-neutral-900 mb-4">Quick Stats</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Fields Completed</span>
                  <span class="font-semibold text-neutral-900">{{ completedFields }}/{{ totalFields }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Validation Status</span>
                  <span :class="isFormValid ? 'text-green-600' : 'text-amber-600'" class="font-semibold">
                    {{ isFormValid ? 'Valid' : 'Incomplete' }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-neutral-600">Days to Close</span>
                  <span class="font-semibold text-neutral-900">{{ daysToClose }}</span>
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

const router = useRouter()

// Form data
const form = reactive({
  title: '',
  customer: '',
  description: '',
  value: null,
  stage: '',
  probability: null,
  expectedCloseDate: '',
  assignedTo: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  source: ''
})

// Form state
const loading = ref(false)
const errors = reactive({})

// Computed properties
const totalFields = 6 // Required fields
const completedFields = computed(() => {
  let count = 0
  if (form.title) count++
  if (form.customer) count++
  if (form.value) count++
  if (form.stage) count++
  if (form.expectedCloseDate) count++
  if (form.assignedTo) count++
  return count
})

const formCompletionPercentage = computed(() => {
  return Math.round((completedFields.value / totalFields) * 100)
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

// Auto-update probability based on stage
watch(() => form.stage, (newStage) => {
  if (newStage && !form.probability) {
    form.probability = parseInt(getStageProbability(newStage))
  }
})

// Validation
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])

  // Validate required fields
  if (!form.title) errors.title = 'Lead title is required'
  if (!form.customer) errors.customer = 'Customer/company is required'
  if (!form.value) errors.value = 'Deal value is required'
  if (!form.stage) errors.stage = 'Sales stage is required'
  if (!form.expectedCloseDate) errors.expectedCloseDate = 'Expected close date is required'
  if (!form.assignedTo) errors.assignedTo = 'Assigned sales rep is required'

  // Validate data types and ranges
  if (form.value && form.value <= 0) errors.value = 'Deal value must be greater than 0'
  if (form.probability && (form.probability < 0 || form.probability > 100)) {
    errors.probability = 'Probability must be between 0 and 100'
  }

  // Validate email format
  if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address'
  }

  // Validate date is not in the past
  if (form.expectedCloseDate && new Date(form.expectedCloseDate) < new Date()) {
    errors.expectedCloseDate = 'Expected close date cannot be in the past'
  }

  return Object.keys(errors).length === 0
}

// Actions
const saveLead = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would make an API call
    console.log('Saving lead:', form)
    
    // Success - redirect to leads with success message
    await router.push('/leads?success=Lead created successfully')
  } catch (error) {
    console.error('Error saving lead:', error)
    // Handle error (show notification, etc.)
  } finally {
    loading.value = false
  }
}

const saveDraft = async () => {
  loading.value = true
  
  try {
    // Simulate API call for draft save
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Saving draft:', form)
    
    // Show success notification (in real app)
    alert('Draft saved successfully!')
  } catch (error) {
    console.error('Error saving draft:', error)
  } finally {
    loading.value = false
  }
}
</script>
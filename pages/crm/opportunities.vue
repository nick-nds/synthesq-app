<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Opportunities</h2>
        <p class="text-sm text-gray-600 mt-1">Manage sales opportunities and track deals through to closure</p>
      </div>
    </div>

    <!-- Header with KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Opportunities</p>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.activeOpportunities }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">{{ Math.round((kpis.activeOpportunities / kpis.totalOpportunities) * 100) }}% of total</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pipeline Value</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(kpis.totalPipelineValue) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Weighted by probability</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Win Rate</p>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.winRate }}%</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ kpis.wonOpportunities }} won, {{ kpis.lostOpportunities }} lost</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg Deal Size</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(kpis.avgDealSize) }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Across all opportunities</p>
      </div>
    </div>

    <!-- Forecast Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">This Month Forecast</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Opportunities:</span>
            <span class="text-sm font-medium text-gray-900">{{ forecast.thisMonth.count }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Total Value:</span>
            <span class="text-sm font-medium text-gray-900">{{ formatCurrency(forecast.thisMonth.value) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Weighted Value:</span>
            <span class="text-sm font-bold text-success-600">{{ formatCurrency(forecast.thisMonth.weightedValue) }}</span>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Next Month Forecast</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Opportunities:</span>
            <span class="text-sm font-medium text-gray-900">{{ forecast.nextMonth.count }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Total Value:</span>
            <span class="text-sm font-medium text-gray-900">{{ formatCurrency(forecast.nextMonth.value) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-600">Weighted Value:</span>
            <span class="text-sm font-bold text-primary-600">{{ formatCurrency(forecast.nextMonth.weightedValue) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- View Toggle and Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center space-x-4">
        <button 
          @click="viewMode = 'pipeline'" 
          :class="viewMode === 'pipeline' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
          class="text-sm"
        >
          Pipeline View
        </button>
        <span class="text-gray-400">|</span>
        <button 
          @click="viewMode = 'list'" 
          :class="viewMode === 'list' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
          class="text-sm"
        >
          List View
        </button>
        <span class="text-gray-400">|</span>
        <button 
          @click="viewMode = 'kanban'" 
          :class="viewMode === 'kanban' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
          class="text-sm"
        >
          Kanban Board
        </button>
      </div>
      <div class="flex gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          Filter
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Opportunity
        </button>
      </div>
    </div>

    <!-- Pipeline View -->
    <div v-if="viewMode === 'pipeline'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline Progress</h3>
      
      <div class="space-y-6">
        <div v-for="stageData in opportunitiesByStage.filter(s => s.count > 0)" :key="stageData.stage" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900 capitalize">{{ formatStageName(stageData.stage) }}</h4>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ stageData.count }} opportunities</span>
              <span class="text-sm font-medium text-gray-900">{{ formatCurrency(stageData.totalValue) }}</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div 
              v-for="opportunity in stageData.opportunities" 
              :key="opportunity.id"
              :class="[
                'bg-gray-50 rounded-lg p-3 border-l-4 cursor-pointer hover:shadow-sm transition-shadow',
                getStageColor(stageData.stage)
              ]"
              @click="selectOpportunity(opportunity)"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-900">{{ opportunity.title }}</span>
                <div class="flex items-center space-x-2">
                  <span v-if="opportunity.priority === 'high'" class="text-xs bg-error-100 text-error-800 px-2 py-0.5 rounded-full">High</span>
                  <span v-else-if="opportunity.priority === 'medium'" class="text-xs bg-warning-100 text-warning-800 px-2 py-0.5 rounded-full">Med</span>
                  <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <span class="text-xs text-primary-600">{{ opportunity.ownerInitials }}</span>
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-600 mb-2">{{ opportunity.company }} • {{ opportunity.contact }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-gray-900">{{ formatCurrency(opportunity.value) }}</span>
                <div class="flex items-center">
                  <span class="text-xs text-gray-500 mr-2">{{ opportunity.probability }}%</span>
                  <div class="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      class="bg-primary-600 h-1.5 rounded-full transition-all duration-300" 
                      :style="`width: ${opportunity.probability}%`"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{{ formatDate(opportunity.expectedClose) }}</span>
                <span>{{ getTimeFromNow(opportunity.lastActivity) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kanban Board View -->
    <div v-else-if="viewMode === 'kanban'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Opportunity Kanban Board</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-7 gap-4 min-h-96">
        <div v-for="stageData in opportunitiesByStage" :key="stageData.stage" class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900 capitalize text-sm">{{ formatStageName(stageData.stage) }}</h4>
            <span class="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{{ stageData.count }}</span>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="opportunity in stageData.opportunities" 
              :key="opportunity.id"
              :class="[
                'bg-white rounded-lg p-3 border-l-4 cursor-pointer hover:shadow-sm transition-shadow',
                getStageColor(stageData.stage)
              ]"
              @click="selectOpportunity(opportunity)"
            >
              <div class="mb-2">
                <h5 class="text-sm font-medium text-gray-900 mb-1">{{ opportunity.title }}</h5>
                <p class="text-xs text-gray-600">{{ opportunity.company }}</p>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-bold text-gray-900">{{ formatCurrency(opportunity.value) }}</span>
                <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="text-xs text-primary-600">{{ opportunity.ownerInitials }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ opportunity.probability }}%</span>
                <span>{{ formatDate(opportunity.expectedClose) }}</span>
              </div>
              <div v-if="opportunity.priority === 'high'" class="mt-2">
                <span class="inline-block w-2 h-2 bg-error-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <!-- Search and Filters -->
      <div class="p-4 border-b border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search opportunities..." 
              class="input"
            >
          </div>
          <select v-model="stageFilter" class="input">
            <option value="">All Stages</option>
            <option value="prospecting">Prospecting</option>
            <option value="qualification">Qualification</option>
            <option value="discovery">Discovery</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
            <option value="closed-won">Closed Won</option>
            <option value="closed-lost">Closed Lost</option>
          </select>
          <select v-model="ownerFilter" class="input">
            <option value="">All Owners</option>
            <option value="Alice Parker">Alice Parker</option>
            <option value="Mark Thompson">Mark Thompson</option>
            <option value="Jennifer Liu">Jennifer Liu</option>
            <option value="David Kim">David Kim</option>
            <option value="Lisa Rodriguez">Lisa Rodriguez</option>
            <option value="Sarah Mitchell">Sarah Mitchell</option>
            <option value="Michael Brown">Michael Brown</option>
          </select>
          <select v-model="priorityFilter" class="input">
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Close</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="opportunity in filteredOpportunities" :key="opportunity.id" class="hover:bg-gray-50 cursor-pointer" @click="selectOpportunity(opportunity)">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-0">
                    <div class="text-sm font-medium text-gray-900">{{ opportunity.title }}</div>
                    <div class="text-sm text-gray-500 flex items-center">
                      {{ opportunity.id }}
                      <span v-if="opportunity.priority === 'high'" class="ml-2 w-2 h-2 bg-error-500 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ opportunity.company }}</div>
                <div class="text-sm text-gray-500">{{ opportunity.contact }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(opportunity.stage)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStageName(opportunity.stage) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(opportunity.value) }}</div>
                <div class="text-sm text-gray-500">{{ opportunity.type }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-gray-900 mr-2">{{ opportunity.probability }}%</span>
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                      :style="`width: ${opportunity.probability}%`"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(opportunity.expectedClose) }}</div>
                <div class="text-sm text-gray-500">{{ getTimeFromNow(opportunity.expectedClose) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-2">
                    <span class="text-xs text-accent-600 font-medium">{{ opportunity.ownerInitials }}</span>
                  </div>
                  <span class="text-sm text-gray-900">{{ opportunity.owner }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button class="text-gray-600 hover:text-gray-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Opportunity Detail Modal -->
    <div v-if="selectedOpportunity" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="selectedOpportunity = null">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">{{ selectedOpportunity.title }}</h3>
          <button @click="selectedOpportunity = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Opportunity Details -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Opportunity Information</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Company:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.company }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Contact:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.contact }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Email:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.email }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Phone:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.phone }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Industry:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.industry }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Employees:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.employees }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Deal Details -->
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Deal Information</h4>
                <div class="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Value:</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatCurrency(selectedOpportunity.value) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Probability:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.probability }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Stage:</span>
                    <span :class="getStatusBadgeClass(selectedOpportunity.stage)" class="px-2 py-1 text-xs font-semibold rounded-full">
                      {{ formatStageName(selectedOpportunity.stage) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Expected Close:</span>
                    <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedOpportunity.expectedClose) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Owner:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.owner }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Source:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.source }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Type:</span>
                    <span class="text-sm font-medium text-gray-900">{{ selectedOpportunity.type }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Priority:</span>
                    <span :class="getPriorityBadgeClass(selectedOpportunity.priority)" class="px-2 py-1 text-xs font-semibold rounded-full capitalize">
                      {{ selectedOpportunity.priority }}
                    </span>
                  </div>
                  <div v-if="selectedOpportunity.lostReason" class="flex justify-between">
                    <span class="text-sm text-gray-600">Lost Reason:</span>
                    <span class="text-sm font-medium text-error-600">{{ selectedOpportunity.lostReason }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-sm text-gray-900">{{ selectedOpportunity.description }}</p>
            </div>
          </div>
          
          <!-- Tags -->
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Tags</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in selectedOpportunity.tags" 
                :key="tag"
                class="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Next Action -->
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Next Action</h4>
            <div class="bg-warning-50 rounded-lg p-3 border-l-4 border-warning-400">
              <p class="text-sm text-warning-800">{{ selectedOpportunity.nextAction }}</p>
            </div>
          </div>
          
          <!-- Recent Activities -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Recent Activities</h4>
            <div class="space-y-3">
              <div 
                v-for="activity in selectedOpportunity.activities.slice(0, 3)" 
                :key="activity.date + activity.type"
                class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div :class="getActivityIconClass(activity.type)" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="activity.type === 'call'" d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    <path v-else-if="activity.type === 'email'" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    <path v-else-if="activity.type === 'meeting'" d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    <path v-else d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2v1a1 1 0 102 0V3h2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900">{{ activity.description }}</p>
                  <div class="flex items-center justify-between mt-1">
                    <span class="text-xs text-gray-500">{{ activity.user }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(activity.date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notes -->
          <div v-if="selectedOpportunity.notes && selectedOpportunity.notes.length > 0" class="mt-6">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Notes</h4>
            <div class="space-y-3">
              <div 
                v-for="note in selectedOpportunity.notes" 
                :key="note.date + note.text"
                class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
              >
                <p class="text-sm text-blue-900">{{ note.text }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-blue-700">{{ note.user }}</span>
                  <span class="text-xs text-blue-700">{{ formatDate(note.date) }}</span>
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
const { mockOpportunities, getOpportunityKPIs, getOpportunitiesByStage, getOpportunityForecast, formatCurrency, getStatusColor } = useMockCRM()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const viewMode = ref('pipeline')
const selectedOpportunity = ref(null)
const searchQuery = ref('')
const stageFilter = ref('')
const ownerFilter = ref('')
const priorityFilter = ref('')

// Computed properties
const kpis = computed(() => getOpportunityKPIs())
const opportunitiesByStage = computed(() => getOpportunitiesByStage())
const forecast = computed(() => getOpportunityForecast())

const filteredOpportunities = computed(() => {
  let filtered = [...mockOpportunities]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(opp => 
      opp.title.toLowerCase().includes(query) ||
      opp.company.toLowerCase().includes(query) ||
      opp.contact.toLowerCase().includes(query) ||
      opp.owner.toLowerCase().includes(query)
    )
  }
  
  // Apply stage filter
  if (stageFilter.value) {
    filtered = filtered.filter(opp => opp.stage === stageFilter.value)
  }
  
  // Apply owner filter
  if (ownerFilter.value) {
    filtered = filtered.filter(opp => opp.owner === ownerFilter.value)
  }
  
  // Apply priority filter
  if (priorityFilter.value) {
    filtered = filtered.filter(opp => opp.priority === priorityFilter.value)
  }
  
  return filtered
})

// Methods
const selectOpportunity = (opportunity) => {
  selectedOpportunity.value = opportunity
}

const formatStageName = (stage) => {
  const stageNames = {
    'prospecting': 'Prospecting',
    'qualification': 'Qualification', 
    'discovery': 'Discovery',
    'proposal': 'Proposal',
    'negotiation': 'Negotiation',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost'
  }
  return stageNames[stage] || stage
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'prospecting': 'bg-gray-100 text-gray-800',
    'qualification': 'bg-blue-100 text-blue-800',
    'discovery': 'bg-purple-100 text-purple-800',
    'proposal': 'bg-warning-100 text-warning-800',
    'negotiation': 'bg-accent-100 text-accent-800',
    'closed-won': 'bg-success-100 text-success-800',
    'closed-lost': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStageColor = (stage) => {
  const colors = {
    'prospecting': 'border-l-gray-400',
    'qualification': 'border-l-blue-400',
    'discovery': 'border-l-purple-400',
    'proposal': 'border-l-warning-400',
    'negotiation': 'border-l-accent-400',
    'closed-won': 'border-l-success-400',
    'closed-lost': 'border-l-error-400'
  }
  return colors[stage] || 'border-l-gray-400'
}

const getPriorityBadgeClass = (priority) => {
  const priorityClasses = {
    'high': 'bg-error-100 text-error-800',
    'medium': 'bg-warning-100 text-warning-800',
    'low': 'bg-gray-100 text-gray-800'
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
}

const getActivityIconClass = (type) => {
  const iconClasses = {
    'call': 'bg-green-100 text-green-600',
    'email': 'bg-blue-100 text-blue-600',
    'meeting': 'bg-purple-100 text-purple-600',
    'demo': 'bg-indigo-100 text-indigo-600',
    'proposal': 'bg-yellow-100 text-yellow-600',
    'contract': 'bg-emerald-100 text-emerald-600'
  }
  return iconClasses[type] || 'bg-gray-100 text-gray-600'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getTimeFromNow = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  return `${diffDays} days`
}

// Watch for filter changes
watch([searchQuery, stageFilter, ownerFilter, priorityFilter], () => {
  // Optional: Reset selection when filters change
})
</script>
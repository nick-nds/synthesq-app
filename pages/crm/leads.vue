<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="getHelpText('lead')">
          <h2 class="text-2xl font-bold text-gray-900">Leads</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Track and manage your sales leads through the pipeline</p>
      </div>
    </div>

    <!-- Header with KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total number of leads in your sales pipeline, including all stages from new to closed.'">
              <p class="text-sm text-gray-600 mb-2">Total Leads</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.totalLeads }}</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg flex-shrink-0">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('qualified_lead')">
              <p class="text-sm text-gray-600 mb-2">Qualified</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.qualified }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ kpis.qualificationRate }}% qualification rate</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ kpis.qualificationRate }}% qualification rate</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('pipeline')">
              <p class="text-sm text-gray-600 mb-2">In Pipeline</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(kpis.pipelineValue) }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ kpis.qualified }} opportunities</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ kpis.qualified }} opportunities</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('conversion_rate')">
              <p class="text-sm text-gray-600 mb-2">Conversion</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ kpis.conversionRate }}%</p>
            <p class="text-xs text-warning-600 mt-2">-2% from target</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">-2% from target</p>
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
      </div>
      <div class="flex items-center space-x-3">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4H3m9 12a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
          Import
        </button>
        <button @click="showCreateModal = true" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Lead
        </button>
      </div>
    </div>

    <!-- Pipeline View -->
    <div v-if="viewMode === 'pipeline'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div v-for="stageData in leadsByStage" :key="stageData.stage" class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-medium text-gray-900 capitalize">{{ formatStageName(stageData.stage) }}</h4>
            <span class="text-sm text-gray-500">{{ stageData.leads.length }} leads</span>
          </div>
          <div class="space-y-3">
            <div 
              v-for="lead in stageData.leads" 
              :key="lead.id" 
              :class="[
                'bg-white rounded-lg p-3 border cursor-pointer hover:shadow-sm transition-shadow',
                getStageCardBorder(stageData.stage)
              ]"
              @click="selectLead(lead)"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-900">{{ lead.company }}</span>
                <div class="flex items-center space-x-2">
                  <span v-if="lead.priority === 'hot'" class="text-xs text-warning-600 font-medium">Hot</span>
                  <span class="text-xs text-gray-500">{{ lead.lastActivity }}</span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mb-2">{{ lead.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-gray-900">{{ formatCurrency(lead.value) }}</span>
                <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="text-xs text-primary-600">{{ lead.assigned }}</span>
                </div>
              </div>
              <div v-if="lead.stage === 'closed-won'" class="flex items-center justify-end mt-2">
                <svg class="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-sm">{{ lead.company.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ lead.company }}</div>
                    <div class="text-sm text-gray-500">{{ lead.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ lead.contact }}</div>
                <div class="text-sm text-gray-500">{{ lead.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(lead.stage)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ formatStageName(lead.stage) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(lead.value) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm text-gray-900">{{ lead.probability }}%</span>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                      :style="`width: ${lead.probability}%`"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ lead.source }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                  <span class="text-xs text-accent-600 font-medium">{{ lead.assigned }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click.stop="editLead(lead)" class="text-primary-600 hover:text-primary-900 mr-3">Edit</button>
                <button @click.stop="selectLead(lead)" class="text-gray-600 hover:text-gray-900 mr-3">View</button>
                <button @click.stop="deleteLead(lead.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Lead Detail Modal -->
    <div v-if="selectedLead" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="selectedLead = null">
      <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-white" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ selectedLead.company }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ selectedLead.contact }} • {{ selectedLead.id }}</p>
          </div>
          <button @click="selectedLead = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Information -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Contact Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Contact Information</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Name:</span> {{ selectedLead.contact }}
                </div>
                <div>
                  <span class="text-gray-500">Email:</span> 
                  <a :href="`mailto:${selectedLead.email}`" class="text-primary-600 hover:text-primary-800">{{ selectedLead.email }}</a>
                </div>
                <div>
                  <span class="text-gray-500">Phone:</span> 
                  <a :href="`tel:${selectedLead.phone}`" class="text-primary-600 hover:text-primary-800">{{ selectedLead.phone }}</a>
                </div>
                <div>
                  <span class="text-gray-500">Source:</span> {{ selectedLead.source }}
                </div>
              </div>
            </div>

            <!-- Lead Details -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Lead Details</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Stage:</span> 
                  <span :class="getStatusBadgeClass(selectedLead.stage)" class="ml-2 px-2 py-1 rounded-full text-xs font-semibold">
                    {{ formatStageName(selectedLead.stage) }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Value:</span> 
                  <span class="font-semibold text-gray-900">{{ formatCurrency(selectedLead.value) }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Probability:</span> 
                  <span class="font-semibold">{{ selectedLead.probability }}%</span>
                  <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div class="bg-primary-600 h-2 rounded-full" :style="`width: ${selectedLead.probability}%`"></div>
                  </div>
                </div>
                <div>
                  <span class="text-gray-500">Assigned:</span> {{ selectedLead.assigned }}
                </div>
              </div>
            </div>

            <!-- Description & Tags -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Description</h4>
              <p class="text-sm text-gray-600 mb-3">{{ selectedLead.description }}</p>
              <div v-if="selectedLead.tags" class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in selectedLead.tags" 
                  :key="tag"
                  :class="tag === 'hot' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Side Panel -->
          <div class="space-y-4">
            <!-- Quick Actions -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Actions</h4>
              <div class="space-y-2">
                <button class="w-full btn-primary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Contact
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </button>
                <button class="w-full btn-secondary text-sm">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Meeting
                </button>
              </div>
            </div>

            <!-- Timeline -->
            <div class="bg-white border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Recent Activity</h4>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p class="text-sm text-gray-900 font-medium">Lead created</p>
                    <p class="text-xs text-gray-500">{{ selectedLead.created }}</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p class="text-sm text-gray-900 font-medium">Last activity</p>
                    <p class="text-xs text-gray-500">{{ selectedLead.lastActivity }} ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button @click="selectedLead = null" class="btn-secondary">Close</button>
          <button @click="editLead(selectedLead)" class="btn-primary">Edit Lead</button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Lead Modal -->
    <div v-if="showCreateModal || editingLead" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeCreateModal">
      <div class="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ editingLead ? 'Edit Lead' : 'Create New Lead' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveLead" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <HelpTooltip :content="'The name of the company or organization this lead represents'">
                <label class="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              </HelpTooltip>
              <input v-model="leadForm.company" type="text" class="input" required>
            </div>
            <div>
              <HelpTooltip :content="getHelpText('contact_name')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
              </HelpTooltip>
              <input v-model="leadForm.contact" type="text" class="input" required>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="leadForm.email" type="email" class="input" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="leadForm.phone" type="tel" class="input">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <HelpTooltip :content="getHelpText('estimated_value')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Value *</label>
              </HelpTooltip>
              <input v-model.number="leadForm.value" type="number" class="input" required>
            </div>
            <div>
              <HelpTooltip :content="getHelpText('lead_probability')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Probability</label>
              </HelpTooltip>
              <input v-model.number="leadForm.probability" type="number" min="0" max="100" class="input">
            </div>
            <div>
              <HelpTooltip :content="getHelpText('lead_stage')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              </HelpTooltip>
              <select v-model="leadForm.stage" class="input">
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed-won">Closed Won</option>
                <option value="closed-lost">Closed Lost</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <HelpTooltip :content="getHelpText('lead_source')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
              </HelpTooltip>
              <select v-model="leadForm.source" class="input">
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Outreach">Cold Outreach</option>
                <option value="Trade Show">Trade Show</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Advertisement">Advertisement</option>
              </select>
            </div>
            <div>
              <HelpTooltip :content="getHelpText('assigned_to')">
                <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              </HelpTooltip>
              <select v-model="leadForm.assigned" class="input">
                <option value="JD">John Doe</option>
                <option value="SM">Sarah Mitchell</option>
                <option value="AP">Alice Parker</option>
                <option value="RK">Robert Kim</option>
                <option value="MJ">Maria Johnson</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="leadForm.description" class="input" rows="3" placeholder="Brief description of the lead..."></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeCreateModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">
              {{ editingLead ? 'Update Lead' : 'Create Lead' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { mockLeads, getLeadKPIs, getLeadsByStage, formatCurrency, getStatusColor } = useMockCRM()
const { success, error: notifyError } = useNotifications()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const viewMode = ref('pipeline')
const selectedLead = ref(null)
const showCreateModal = ref(false)
const editingLead = ref(null)

// Lead form data
const leadForm = reactive({
  id: null,
  company: '',
  contact: '',
  email: '',
  phone: '',
  value: 0,
  probability: 20,
  stage: 'new',
  source: 'Website',
  assigned: 'JD',
  description: '',
  tags: [],
  created: new Date().toISOString().split('T')[0],
  lastActivity: '1d'
})

// Make leads reactive so we can add/edit them
const leads = ref([...mockLeads])

// Computed properties
const kpis = computed(() => getLeadKPIs())
const leadsByStage = computed(() => getLeadsByStage())

// Methods
const selectLead = (lead) => {
  selectedLead.value = lead
}

const editLead = (lead) => {
  editingLead.value = lead
  // Populate form with lead data
  Object.keys(leadForm).forEach(key => {
    if (lead[key] !== undefined) {
      leadForm[key] = lead[key]
    }
  })
  selectedLead.value = null
  showCreateModal.value = false
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingLead.value = null
  resetForm()
}

const resetForm = () => {
  Object.keys(leadForm).forEach(key => {
    if (key === 'probability') leadForm[key] = 20
    else if (key === 'stage') leadForm[key] = 'new'
    else if (key === 'source') leadForm[key] = 'Website'
    else if (key === 'assigned') leadForm[key] = 'JD'
    else if (key === 'created') leadForm[key] = new Date().toISOString().split('T')[0]
    else if (key === 'lastActivity') leadForm[key] = '1d'
    else if (key === 'tags') leadForm[key] = []
    else if (typeof leadForm[key] === 'string') leadForm[key] = ''
    else if (typeof leadForm[key] === 'number') leadForm[key] = 0
    else leadForm[key] = null
  })
}

const saveLead = () => {
  if (editingLead.value) {
    // Update existing lead
    const index = leads.value.findIndex(l => l.id === editingLead.value.id)
    if (index !== -1) {
      leads.value[index] = { ...leadForm }
      success('Lead Updated', 'Lead has been successfully updated.', { duration: 3000 })
    }
  } else {
    // Create new lead
    const newLead = {
      ...leadForm,
      id: `LEAD-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      name: leadForm.company,
      created: new Date().toISOString().split('T')[0]
    }
    leads.value.unshift(newLead)
    success('Lead Created', 'New lead has been successfully created.', { duration: 3000 })
  }
  
  closeCreateModal()
}

const deleteLead = (leadId) => {
  if (confirm('Are you sure you want to delete this lead?')) {
    leads.value = leads.value.filter(l => l.id !== leadId)
    success('Lead Deleted', 'Lead has been successfully deleted.', { duration: 3000 })
  }
}

const formatStageName = (stage) => {
  const stageNames = {
    'new': 'New',
    'qualified': 'Qualified', 
    'proposal': 'Proposal',
    'negotiation': 'Negotiation',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost'
  }
  return stageNames[stage] || stage
}

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'new': 'bg-gray-100 text-gray-800',
    'qualified': 'bg-primary-100 text-primary-800',
    'proposal': 'bg-warning-100 text-warning-800',
    'negotiation': 'bg-accent-100 text-accent-800',
    'closed-won': 'bg-success-100 text-success-800',
    'closed-lost': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStageCardBorder = (stage) => {
  const borderClasses = {
    'new': 'border-gray-200',
    'qualified': 'border-primary-200',
    'proposal': 'border-warning-200',
    'negotiation': 'border-accent-200',
    'closed-won': 'border-success-200',
    'closed-lost': 'border-error-200'
  }
  return borderClasses[stage] || 'border-gray-200'
}
</script>
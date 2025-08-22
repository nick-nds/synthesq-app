<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">AI Insights & Suggestions</h2>
        <p class="text-sm text-gray-600 mt-1">Smart recommendations powered by artificial intelligence</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          AI Settings
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Insights
        </button>
      </div>
    </div>

    <!-- AI Insights Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Insights -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Sales Predictions</h3>
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div class="space-y-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-blue-900">Next Month Revenue</span>
              <span class="text-xs text-blue-600">92% confidence</span>
            </div>
            <p class="text-2xl font-bold text-blue-900">$1.2M - $1.4M</p>
            <p class="text-sm text-blue-700 mt-1">Based on current pipeline and historical trends</p>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Hot leads likely to convert</span>
              <span class="text-sm font-medium text-gray-900">23 leads</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Best time to contact prospects</span>
              <span class="text-sm font-medium text-gray-900">2-4 PM Tue-Thu</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Insights -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Customer Intelligence</h3>
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div class="space-y-4">
          <div class="bg-green-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-green-900">Churn Risk Alert</span>
              <span class="text-xs text-green-600">High priority</span>
            </div>
            <p class="text-lg font-bold text-green-900">8 customers at risk</p>
            <p class="text-sm text-green-700 mt-1">Decreased engagement in last 30 days</p>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Upsell opportunities</span>
              <span class="text-sm font-medium text-gray-900">15 accounts</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Customer lifetime value</span>
              <span class="text-sm font-medium text-gray-900">$48K avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Smart Recommendations</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="suggestion in aiSuggestions" :key="suggestion.id" class="p-6 hover:bg-gray-50">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <div :class="suggestion.priority === 'high' ? 'bg-red-100' : suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-gray-100'" class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4" :class="suggestion.priority === 'high' ? 'text-red-600' : suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">{{ suggestion.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">{{ suggestion.description }}</p>
                <div class="flex items-center mt-3 space-x-4">
                  <span class="text-xs text-gray-500">Category: {{ suggestion.category }}</span>
                  <span class="text-xs text-gray-500">Impact: {{ suggestion.impact }}</span>
                  <span class="text-xs text-gray-500">Confidence: {{ suggestion.confidence }}%</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="text-primary-600 hover:text-primary-900 text-sm">Apply</button>
              <button class="text-gray-400 hover:text-gray-600 text-sm">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

// Mock AI suggestions data
const aiSuggestions = [
  {
    id: 1,
    title: 'Follow up with high-value prospects',
    description: 'Contact 5 prospects with deal values over $50K who haven\'t been reached in 7+ days',
    category: 'Sales',
    priority: 'high',
    impact: 'High',
    confidence: 89
  },
  {
    id: 2,
    title: 'Optimize email send times',
    description: 'Send marketing emails on Tuesday-Thursday between 2-4 PM for 23% higher open rates',
    category: 'Marketing',
    priority: 'medium',
    impact: 'Medium',
    confidence: 76
  },
  {
    id: 3,
    title: 'Update product pricing',
    description: 'Consider 8% price increase for Product Suite Pro based on competitor analysis',
    category: 'Pricing',
    priority: 'medium',
    impact: 'High',
    confidence: 82
  },
  {
    id: 4,
    title: 'Schedule customer check-ins',
    description: 'Proactively contact 8 at-risk customers to prevent churn',
    category: 'Customer Success',
    priority: 'high',
    impact: 'High',
    confidence: 94
  }
]
</script>
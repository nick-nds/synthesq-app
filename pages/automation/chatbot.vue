<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="getHelpText('chatbotAssistant')">
          <h2 class="text-2xl font-bold text-gray-900">AI Assistant & Chatbot</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Intelligent assistant for customer support and automation</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h2a2 2 0 012-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z" />
        </svg>
        Knowledge Base
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          New Conversation
        </button>
      </div>
    </div>

    <!-- Chatbot Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Conversations</p>
            <p class="text-2xl font-bold text-gray-900">2,847</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+124 today</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Resolution Rate</p>
            <p class="text-2xl font-bold text-gray-900">87%</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Without human intervention</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Avg Response Time</p>
            <p class="text-2xl font-bold text-gray-900">1.2s</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">-0.3s improvement</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Satisfaction Score</p>
            <p class="text-2xl font-bold text-gray-900">4.6/5</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">From 1,247 ratings</p>
      </div>
    </div>

    <!-- Main Chat Interface -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chat Window -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-96">
        <div class="border-b border-gray-200 p-4">
          <h3 class="text-lg font-semibold text-gray-900">Live Chat Demo</h3>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex-1 p-4 space-y-4 overflow-y-auto">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p class="text-sm">Hello! I'm your AI assistant. How can I help you today?</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 justify-end">
              <div class="bg-primary-500 text-white rounded-lg p-3 max-w-xs">
                <p class="text-sm">I need help with my recent order</p>
              </div>
              <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-xs font-medium">U</span>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p class="text-sm">I'd be happy to help with your order! Could you please provide your order number?</p>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-200 p-4">
            <div class="flex space-x-3">
              <input type="text" placeholder="Type your message..." class="flex-1 input" disabled>
              <button class="btn-primary" disabled>Send</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Sidebar -->
      <div class="space-y-6">
        <!-- Top Intents -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Intents</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Order Status</span>
              <span class="text-sm font-medium text-gray-900">34%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Product Info</span>
              <span class="text-sm font-medium text-gray-900">28%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Billing Support</span>
              <span class="text-sm font-medium text-gray-900">19%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Technical Help</span>
              <span class="text-sm font-medium text-gray-900">12%</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">General Inquiry</span>
              <span class="text-sm font-medium text-gray-900">7%</span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div class="space-y-3">
            <div class="text-sm">
              <div class="font-medium text-gray-900">Customer escalation</div>
              <div class="text-gray-500">Complex billing issue → Human agent</div>
              <div class="text-xs text-gray-400">2 min ago</div>
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Order status resolved</div>
              <div class="text-gray-500">Provided tracking information</div>
              <div class="text-xs text-gray-400">5 min ago</div>
            </div>
            <div class="text-sm">
              <div class="font-medium text-gray-900">Product recommendation</div>
              <div class="text-gray-500">Suggested compatible accessories</div>
              <div class="text-xs text-gray-400">8 min ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Notice -->
    <div class="bg-warning-50 border border-warning-200 rounded-lg p-4">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-warning-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="text-sm font-medium text-warning-800">Demo Interface</h4>
          <p class="text-sm text-warning-700 mt-1">This is a demo chatbot interface. Real AI chatbot functionality will be available when the backend is integrated.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})
</script>
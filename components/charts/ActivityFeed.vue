<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
        <p class="text-sm text-gray-500 mt-1">Real-time business activities and updates</p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex items-center">
          <div class="w-2 h-2 bg-success-500 rounded-full animate-pulse mr-2"></div>
          <span class="text-sm text-success-600 font-medium">Live</span>
        </div>
        <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>
    </div>

    <div class="space-y-4 max-h-96 overflow-y-auto">
      <div v-for="(activity, index) in activities" :key="activity.id" class="flex items-start space-x-3 group">
        <!-- Activity Icon -->
        <div 
          :class="[
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            getActivityColor(activity.type)
          ]"
        >
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type)" />
          </svg>
        </div>
        
        <!-- Activity Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
              {{ activity.title }}
            </p>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">{{ formatTime(activity.timestamp) }}</span>
              <button class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01" />
                </svg>
              </button>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
          
          <!-- Activity metadata -->
          <div class="flex items-center space-x-4 mt-2">
            <div v-if="activity.user" class="flex items-center space-x-1">
              <div class="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-xs text-primary-600 font-medium">{{ getUserInitials(activity.user) }}</span>
              </div>
              <span class="text-xs text-gray-500">{{ activity.user }}</span>
            </div>
            
            <div v-if="activity.amount" class="flex items-center space-x-1">
              <svg class="w-3 h-3 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span class="text-xs text-success-600 font-medium">${{ formatCurrency(activity.amount) }}</span>
            </div>
            
            <div v-if="activity.priority" :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              activity.priority === 'high' ? 'bg-red-100 text-red-700' :
              activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'
            ]">
              {{ activity.priority.toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity summary -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <div class="grid grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-lg font-bold text-primary-600">{{ activityStats.deals }}</div>
          <div class="text-xs text-gray-500">Deals Today</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-success-600">{{ activityStats.leads }}</div>
          <div class="text-xs text-gray-500">New Leads</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-accent-600">{{ activityStats.tasks }}</div>
          <div class="text-xs text-gray-500">Tasks Done</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-warning-600">{{ activityStats.meetings }}</div>
          <div class="text-xs text-gray-500">Meetings</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})

const activityStats = computed(() => ({
  deals: props.activities.filter(a => a.type === 'deal').length,
  leads: props.activities.filter(a => a.type === 'lead').length,
  tasks: props.activities.filter(a => a.type === 'task').length,
  meetings: props.activities.filter(a => a.type === 'meeting').length
}))

const getActivityColor = (type) => {
  const colors = {
    'deal': 'bg-success-500',
    'lead': 'bg-primary-500',
    'customer': 'bg-accent-500',
    'task': 'bg-warning-500',
    'meeting': 'bg-purple-500',
    'invoice': 'bg-indigo-500',
    'payment': 'bg-success-500',
    'order': 'bg-blue-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getActivityIcon = (type) => {
  const icons = {
    'deal': 'M5 13l4 4L19 7',
    'lead': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    'customer': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'task': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'meeting': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    'invoice': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'payment': 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    'order': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  }
  return icons[type] || 'M12 4v16m8-8H4'
}

const formatTime = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diffMs = now - time
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    return `${diffMinutes} minutes ago`
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`
  } else if (diffDays === 1) {
    return '1 day ago'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return time.toLocaleDateString()
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

const getUserInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Generate real-time updates
const generateLiveActivity = () => {
  const activityTypes = ['deal', 'lead', 'customer', 'task', 'meeting', 'invoice', 'payment', 'order']
  const users = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rodriguez']
  
  const newActivity = {
    id: Date.now(),
    type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    title: `New ${activityTypes[Math.floor(Math.random() * activityTypes.length)]} activity`,
    description: 'Activity generated in real-time',
    user: users[Math.floor(Math.random() * users.length)],
    timestamp: new Date().toISOString(),
    amount: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) + 1000 : null,
    priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
  }
  
  // This would typically emit to parent or use a store
  console.log('New activity generated:', newActivity)
}

onMounted(() => {
  // Simulate real-time updates
  const interval = setInterval(generateLiveActivity, 10000)
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>
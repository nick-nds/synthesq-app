<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Revenue Overview</h3>
        <p class="text-sm text-gray-500 mt-1">Monthly revenue vs target performance</p>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          v-for="period in ['7D', '30D', '90D', '1Y']"
          :key="period"
          @click="activePeriod = period"
          :class="[
            'px-3 py-1 text-sm rounded-md transition-colors',
            activePeriod === period 
              ? 'bg-primary-100 text-primary-700 font-medium' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          ]"
        >
          {{ period }}
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
        <div class="text-2xl font-bold text-primary-700">${{ formatCurrency(totalRevenue) }}</div>
        <div class="text-sm text-primary-600 mt-1">Total Revenue</div>
        <div class="flex items-center justify-center mt-2">
          <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span class="text-sm text-success-600 font-medium">+12.5%</span>
        </div>
      </div>
      
      <div class="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-lg">
        <div class="text-2xl font-bold text-success-700">${{ formatCurrency(monthlyGrowth) }}</div>
        <div class="text-sm text-success-600 mt-1">Monthly Growth</div>
        <div class="flex items-center justify-center mt-2">
          <svg class="w-4 h-4 text-success-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span class="text-sm text-success-600 font-medium">+8.2%</span>
        </div>
      </div>
      
      <div class="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-lg">
        <div class="text-2xl font-bold text-accent-700">{{ targetAchievement }}%</div>
        <div class="text-sm text-accent-600 mt-1">Target Achievement</div>
        <div class="w-full bg-accent-200 rounded-full h-2 mt-2">
          <div 
            class="bg-accent-500 h-2 rounded-full transition-all duration-1000" 
            :style="{ width: `${Math.min(targetAchievement, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>
    
    <div class="h-80" ref="chartRef"></div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const chartRef = ref(null)
const activePeriod = ref('30D')

const totalRevenue = computed(() => {
  return props.data.reduce((sum, item) => sum + item.revenue, 0)
})

const monthlyGrowth = computed(() => {
  if (props.data.length < 2) return 0
  const current = props.data[props.data.length - 1]?.revenue || 0
  const previous = props.data[props.data.length - 2]?.revenue || 0
  return current - previous
})

const targetAchievement = computed(() => {
  const totalTarget = props.data.reduce((sum, item) => sum + (item.target || 0), 0)
  return totalTarget > 0 ? Math.round((totalRevenue.value / totalTarget) * 100) : 0
})

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0'
  }
  return new Intl.NumberFormat('en-US').format(amount)
}

const initChart = async () => {
  if (!process.client || !chartRef.value) return
  
  await nextTick()
  
  // This would typically use ApexCharts or Chart.js
  // For demo purposes, we'll create a simple visualization
  const chart = chartRef.value
  chart.innerHTML = `
    <div class="flex items-end justify-between h-full space-x-2 px-4">
      ${props.data.map((item, index) => `
        <div class="flex flex-col items-center flex-1">
          <div class="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style="height: ${Math.max(20, (item.revenue / Math.max(...props.data.map(d => d.revenue))) * 200)}px">
            <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg"></div>
            <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-accent-500/30 to-accent-400/30 rounded-t-lg" style="height: ${Math.max(10, (item.target / Math.max(...props.data.map(d => d.target))) * 200)}px"></div>
          </div>
          <span class="text-xs text-gray-500 mt-2 rotate-45 origin-left">${item.month}</span>
        </div>
      `).join('')}
    </div>
  `
}

watch(() => props.data, initChart, { deep: true })
watch(activePeriod, initChart)

onMounted(() => {
  initChart()
})
</script>
<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
        <p class="text-sm text-gray-500 mt-1">Opportunity distribution by stage</p>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">Total Pipeline Value:</span>
        <span class="text-lg font-bold text-primary-600">${{ formatCurrency(totalPipelineValue) }}</span>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="(stage, index) in pipelineStages" :key="stage.name" class="relative">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <div 
              :class="[
                'w-3 h-3 rounded-full mr-3',
                getStageColor(index)
              ]"
            ></div>
            <span class="text-sm font-medium text-gray-900">{{ stage.name }}</span>
            <span class="ml-2 text-xs text-gray-500">({{ stage.count }} deals)</span>
          </div>
          <div class="text-sm font-semibold text-gray-900">
            ${{ formatCurrency(stage.value) }}
          </div>
        </div>
        
        <div class="relative">
          <div class="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div 
              :class="[
                'h-full rounded-full transition-all duration-1000 ease-out',
                getStageColorBg(index)
              ]"
              :style="{ width: `${(stage.value / totalPipelineValue) * 100}%` }"
            ></div>
          </div>
          
          <!-- Probability indicator -->
          <div class="absolute right-2 top-0 bottom-0 flex items-center">
            <span class="text-xs font-medium text-white drop-shadow-sm">
              {{ stage.probability }}%
            </span>
          </div>
        </div>
        
        <!-- Stage conversion rate -->
        <div class="flex justify-between mt-2">
          <span class="text-xs text-gray-500">
            Conversion Rate: {{ stage.conversionRate }}%
          </span>
          <span class="text-xs text-gray-500">
            Avg. Deal Size: ${{ formatCurrency(stage.value / stage.count) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Pipeline metrics -->
    <div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
      <div class="text-center">
        <div class="text-2xl font-bold text-success-600">{{ pipelineMetrics.velocity }}</div>
        <div class="text-sm text-gray-500">Avg Days in Pipeline</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-primary-600">{{ pipelineMetrics.conversionRate }}%</div>
        <div class="text-sm text-gray-500">Overall Conversion</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-accent-600">${{ formatCurrency(pipelineMetrics.avgDealSize) }}</div>
        <div class="text-sm text-gray-500">Avg Deal Size</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  opportunities: {
    type: Array,
    default: () => []
  }
})

const stageConfig = {
  'PROSPECTING': { color: 'bg-blue-500', bgColor: 'bg-blue-500', probability: 10 },
  'QUALIFICATION': { color: 'bg-indigo-500', bgColor: 'bg-indigo-500', probability: 25 },
  'PROPOSAL': { color: 'bg-purple-500', bgColor: 'bg-purple-500', probability: 50 },
  'NEGOTIATION': { color: 'bg-amber-500', bgColor: 'bg-amber-500', probability: 75 },
  'CLOSED_WON': { color: 'bg-success-500', bgColor: 'bg-success-500', probability: 100 },
  'CLOSED_LOST': { color: 'bg-gray-400', bgColor: 'bg-gray-400', probability: 0 }
}

const pipelineStages = computed(() => {
  const stageGroups = {}
  
  props.opportunities.forEach(opp => {
    if (!stageGroups[opp.stage]) {
      stageGroups[opp.stage] = {
        name: opp.stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
        count: 0,
        value: 0,
        probability: stageConfig[opp.stage]?.probability || 0,
        conversionRate: 0
      }
    }
    stageGroups[opp.stage].count++
    stageGroups[opp.stage].value += opp.amount
  })
  
  // Calculate conversion rates (simplified)
  Object.keys(stageGroups).forEach(stage => {
    stageGroups[stage].conversionRate = Math.round(Math.random() * 30 + 15) // Mock data
  })
  
  return Object.values(stageGroups).sort((a, b) => b.probability - a.probability)
})

const totalPipelineValue = computed(() => {
  return pipelineStages.value.reduce((sum, stage) => sum + stage.value, 0)
})

const pipelineMetrics = computed(() => ({
  velocity: Math.round(Math.random() * 30 + 15), // Mock average days
  conversionRate: Math.round((pipelineStages.value.find(s => s.name.includes('Closed Won'))?.count || 0) / props.opportunities.length * 100) || 23,
  avgDealSize: Math.round(totalPipelineValue.value / Math.max(props.opportunities.length, 1))
}))

const getStageColor = (index) => {
  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-amber-500', 'bg-success-500', 'bg-gray-400']
  return colors[index % colors.length]
}

const getStageColorBg = (index) => {
  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-amber-500', 'bg-success-500', 'bg-gray-400']
  return colors[index % colors.length]
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}
</script>
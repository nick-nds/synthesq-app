<template>
  <div class="space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex-1">
        <HelpTooltip :content="'Human Resources management system for employee data, payroll processing, performance tracking, and organizational structure.'">
          <h2 class="text-2xl font-bold text-gray-900">Human Resources</h2>
        </HelpTooltip>
        <p class="text-sm text-gray-600 mt-1">Manage employees, payroll, and HR processes</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          HR Reports
        </button>
        <button class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3z" />
          </svg>
          Payroll
        </button>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Employee
        </button>
      </div>
    </div>

    <!-- HR Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="'Total number of employees in the organization across all departments and status levels.'">
              <p class="text-sm text-gray-600 mb-1">Total Employees</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ mockEmployees.length }}</p>
            <p class="text-xs text-success-600 mt-2">+3 new hires this month</p>
          </div>
          <div class="p-3 bg-primary-100 rounded-lg">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <HelpTooltip :content="getHelpText('employee_retention')">
              <p class="text-sm text-gray-600 mb-1">Active Employees</p>
            </HelpTooltip>
            <p class="text-2xl font-bold text-gray-900">{{ activeEmployees }}</p>
          </div>
          <div class="p-3 bg-success-100 rounded-lg">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">{{ ((activeEmployees / mockEmployees.length) * 100).toFixed(1) }}% of total</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Monthly Payroll</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalPayroll) }}</p>
          </div>
          <div class="p-3 bg-accent-100 rounded-lg">
            <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-success-600 mt-2">+2.5% from last month</p>
      </div>
      
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Open Positions</p>
            <p class="text-2xl font-bold text-gray-900">{{ openPositions.length }}</p>
          </div>
          <div class="p-3 bg-warning-100 rounded-lg">
            <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
            </svg>
          </div>
        </div>
        <p class="text-xs text-warning-600 mt-2">{{ totalCandidates }} candidates in pipeline</p>
      </div>
    </div>

    <!-- Department and Leave Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Department Breakdown -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Employees by Department</h3>
        <div class="space-y-3">
          <div v-for="dept in departmentBreakdown" :key="dept.name" class="flex items-center justify-between">
            <div class="flex items-center">
              <div :class="dept.color" class="w-3 h-3 rounded-full mr-3"></div>
              <span class="text-sm text-gray-700">{{ dept.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ dept.count }}</div>
              <div class="text-xs text-gray-500">{{ dept.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Requests -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h3>
        <div class="space-y-3">
          <div v-for="leave in recentLeaveRequests.slice(0, 5)" :key="leave.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span class="text-xs font-medium text-gray-600">{{ leave.employee.split(' ').map(n => n[0]).join('') }}</span>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ leave.employee }}</div>
                <div class="text-xs text-gray-500">{{ leave.type }} - {{ leave.days }} days</div>
              </div>
            </div>
            <div class="text-right">
              <span :class="getLeaveStatusBadge(leave.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                {{ leave.status }}
              </span>
              <div class="text-xs text-gray-500 mt-1">{{ formatDate(leave.startDate) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Reviews -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Performance Reviews Due</h3>
        <div class="space-y-3">
          <div v-for="review in upcomingReviews.slice(0, 5)" :key="review.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span class="text-xs font-medium text-gray-600">{{ review.employee.split(' ').map(n => n[0]).join('') }}</span>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">{{ review.employee }}</div>
                <div class="text-xs text-gray-500">{{ review.department }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ formatDate(review.dueDate) }}</div>
              <div class="text-xs text-gray-500">{{ review.type }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex items-center space-x-4">
      <button 
        @click="viewMode = 'employees'" 
        :class="viewMode === 'employees' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
        class="text-sm"
      >
        Employees
      </button>
      <span class="text-gray-400">|</span>
      <button 
        @click="viewMode = 'positions'" 
        :class="viewMode === 'positions' ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-gray-900'"
        class="text-sm"
      >
        Open Positions
      </button>
    </div>

    <!-- Employees View -->
    <div v-if="viewMode === 'employees'">
      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search employees..." 
            class="input"
          >
          <select v-model="departmentFilter" class="input">
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
          <select v-model="statusFilter" class="input">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
          <select v-model="positionFilter" class="input">
            <option value="">All Positions</option>
            <option value="Manager">Manager</option>
            <option value="Senior">Senior</option>
            <option value="Junior">Junior</option>
            <option value="Lead">Lead</option>
          </select>
        </div>
      </div>

      <!-- Employees Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50 cursor-pointer" @click="selectEmployee(employee)">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span class="text-primary-600 font-medium text-sm">{{ employee.name.split(' ').map(n => n[0]).join('') }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ employee.name }}</div>
                      <div class="text-sm text-gray-500">{{ employee.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ employee.position }}</div>
                  <div class="text-sm text-gray-500">{{ employee.level }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ employee.department }}</div>
                  <div class="text-sm text-gray-500">{{ employee.manager }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(employee.hireDate) }}</div>
                  <div class="text-sm text-gray-500">{{ getEmployeeTenure(employee.hireDate) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(employee.salary) }}</div>
                  <div class="text-sm text-gray-500">{{ employee.payType }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getEmployeeStatusBadge(employee.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ employee.status }}
                  </span>
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
    </div>

    <!-- Open Positions View -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="position in openPositions" :key="position.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ position.title }}</h3>
              <p class="text-sm text-gray-500">{{ position.department }}</p>
            </div>
            <span :class="getPositionStatusBadge(position.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ position.status }}
            </span>
          </div>
          
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ position.location }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ position.type }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              {{ position.salaryRange }}
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ position.candidates }}</div>
              <div class="text-xs text-gray-500">Candidates</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-gray-900">{{ position.interviews }}</div>
              <div class="text-xs text-gray-500">Interviews</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-medium text-gray-900">{{ formatDate(position.posted) }}</div>
              <div class="text-xs text-gray-500">Posted</div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
import HelpTooltip from '~/components/ui/HelpTooltip.vue'

const { formatCurrency } = useMockCRM()
const { getHelpText } = useHelpContent()

definePageMeta({
  middleware: 'auth'
})

// Reactive data
const viewMode = ref('employees')
const searchQuery = ref('')
const departmentFilter = ref('')
const statusFilter = ref('')
const positionFilter = ref('')
const selectedEmployee = ref(null)

// Mock HR data
const mockEmployees = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', position: 'Software Engineer', level: 'Senior', department: 'Engineering', manager: 'Sarah Johnson', hireDate: '2022-03-15', salary: 95000, payType: 'Annual', status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', position: 'Engineering Manager', level: 'Manager', department: 'Engineering', manager: 'David Kim', hireDate: '2021-01-10', salary: 120000, payType: 'Annual', status: 'active' },
  { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', position: 'Sales Representative', level: 'Senior', department: 'Sales', manager: 'Lisa Chen', hireDate: '2022-06-20', salary: 75000, payType: 'Annual', status: 'active' },
  { id: 4, name: 'Lisa Chen', email: 'lisa.chen@company.com', position: 'Sales Manager', level: 'Manager', department: 'Sales', manager: 'David Kim', hireDate: '2020-09-05', salary: 105000, payType: 'Annual', status: 'active' },
  { id: 5, name: 'Emily Watson', email: 'emily.watson@company.com', position: 'Marketing Specialist', level: 'Junior', department: 'Marketing', manager: 'Alex Rodriguez', hireDate: '2023-02-12', salary: 55000, payType: 'Annual', status: 'active' },
  { id: 6, name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com', position: 'Marketing Manager', level: 'Manager', department: 'Marketing', manager: 'David Kim', hireDate: '2021-11-30', salary: 90000, payType: 'Annual', status: 'active' },
  { id: 7, name: 'Tom Wilson', email: 'tom.wilson@company.com', position: 'HR Specialist', level: 'Senior', department: 'HR', manager: 'Jessica Brown', hireDate: '2022-04-18', salary: 65000, payType: 'Annual', status: 'on-leave' },
  { id: 8, name: 'Jessica Brown', email: 'jessica.brown@company.com', position: 'HR Manager', level: 'Manager', department: 'HR', manager: 'David Kim', hireDate: '2020-05-22', salary: 85000, payType: 'Annual', status: 'active' }
]

const openPositions = [
  { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', salaryRange: '$85k - $110k', candidates: 15, interviews: 3, posted: '2024-08-01', status: 'Active' },
  { id: 2, title: 'Product Marketing Manager', department: 'Marketing', location: 'San Francisco, CA', type: 'Full-time', salaryRange: '$90k - $120k', candidates: 8, interviews: 2, posted: '2024-07-28', status: 'Active' },
  { id: 3, title: 'DevOps Engineer', department: 'Engineering', location: 'Austin, TX', type: 'Full-time', salaryRange: '$95k - $125k', candidates: 12, interviews: 1, posted: '2024-08-05', status: 'Active' },
  { id: 4, title: 'Sales Development Rep', department: 'Sales', location: 'New York, NY', type: 'Full-time', salaryRange: '$50k - $65k', candidates: 22, interviews: 5, posted: '2024-07-15', status: 'Active' }
]

const recentLeaveRequests = [
  { id: 1, employee: 'John Smith', type: 'Vacation', days: 5, startDate: '2024-08-20', status: 'Approved' },
  { id: 2, employee: 'Emily Watson', type: 'Sick Leave', days: 2, startDate: '2024-08-15', status: 'Pending' },
  { id: 3, employee: 'Mike Davis', type: 'Personal', days: 3, startDate: '2024-08-22', status: 'Approved' },
  { id: 4, employee: 'Tom Wilson', type: 'Parental', days: 30, startDate: '2024-07-01', status: 'Approved' },
  { id: 5, employee: 'Lisa Chen', type: 'Vacation', days: 7, startDate: '2024-09-01', status: 'Pending' }
]

const upcomingReviews = [
  { id: 1, employee: 'John Smith', department: 'Engineering', dueDate: '2024-09-01', type: 'Annual Review' },
  { id: 2, employee: 'Emily Watson', department: 'Marketing', dueDate: '2024-08-25', type: '90-day Review' },
  { id: 3, employee: 'Mike Davis', department: 'Sales', dueDate: '2024-09-10', type: 'Annual Review' },
  { id: 4, employee: 'Alex Rodriguez', department: 'Marketing', dueDate: '2024-09-15', type: 'Annual Review' },
  { id: 5, employee: 'Sarah Johnson', department: 'Engineering', dueDate: '2024-08-30', type: 'Promotion Review' }
]

// Computed properties
const activeEmployees = computed(() => mockEmployees.filter(emp => emp.status === 'active').length)
const totalPayroll = computed(() => mockEmployees.reduce((sum, emp) => sum + emp.salary, 0) / 12)
const totalCandidates = computed(() => openPositions.reduce((sum, pos) => sum + pos.candidates, 0))

const departmentBreakdown = computed(() => {
  const departments = {}
  mockEmployees.forEach(emp => {
    departments[emp.department] = (departments[emp.department] || 0) + 1
  })
  
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500']
  return Object.entries(departments).map(([name, count], index) => ({
    name,
    count,
    percentage: ((count / mockEmployees.length) * 100).toFixed(1),
    color: colors[index % colors.length]
  }))
})

const filteredEmployees = computed(() => {
  let filtered = [...mockEmployees]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(emp => 
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query)
    )
  }
  
  if (departmentFilter.value) {
    filtered = filtered.filter(emp => emp.department === departmentFilter.value)
  }
  
  if (statusFilter.value) {
    filtered = filtered.filter(emp => emp.status === statusFilter.value)
  }
  
  if (positionFilter.value) {
    filtered = filtered.filter(emp => emp.level === positionFilter.value)
  }
  
  return filtered
})

// Methods
const selectEmployee = (employee) => {
  selectedEmployee.value = employee
}

const getEmployeeStatusBadge = (status) => {
  const statusClasses = {
    'active': 'bg-success-100 text-success-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'on-leave': 'bg-warning-100 text-warning-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getLeaveStatusBadge = (status) => {
  const statusClasses = {
    'Approved': 'bg-success-100 text-success-800',
    'Pending': 'bg-warning-100 text-warning-800',
    'Rejected': 'bg-error-100 text-error-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPositionStatusBadge = (status) => {
  const statusClasses = {
    'Active': 'bg-success-100 text-success-800',
    'Paused': 'bg-warning-100 text-warning-800',
    'Closed': 'bg-gray-100 text-gray-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getEmployeeTenure = (hireDate) => {
  const hire = new Date(hireDate)
  const now = new Date()
  const months = Math.floor((now - hire) / (1000 * 60 * 60 * 24 * 30))
  
  if (months < 12) {
    return `${months} months`
  } else {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years} years`
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
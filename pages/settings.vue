<template>
  <div>
    <!-- Settings Navigation -->
    <div class="flex items-center space-x-8 mb-8 border-b border-neutral-200">
      <button 
        v-for="tab in settingsTabs" 
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="activeTab === tab.key ? 'border-blue-600 text-primary-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'"
        class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="space-y-8">
      <!-- Company Information -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Company Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
            <input type="text" value="BistroKeep Inc." class="input">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Industry</label>
            <select class="input">
              <option>Software & Technology</option>
              <option>Retail</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input type="email" value="info@bistrokeep.com" class="input">
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
            <input type="tel" value="+1 (555) 123-4567" class="input">
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 mb-2">Address</label>
            <textarea rows="3" class="input">123 Business Ave, Suite 100
San Francisco, CA 94105
United States</textarea>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Save Changes</button>
        </div>
      </div>

      <!-- System Preferences -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">System Preferences</h3>
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Default Currency</label>
              <select class="input">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Date Format</label>
              <select class="input">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Time Zone</label>
              <select class="input">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Language</label>
              <select class="input">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Save Preferences</button>
        </div>
      </div>
    </div>

    <!-- User Management -->
    <div v-if="activeTab === 'users'" class="space-y-8">
      <!-- Add User -->
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-neutral-900">User Management</h3>
        <button class="btn-gradient">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      <!-- Users Table -->
      <div class="card">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-neutral-200">
                <th class="text-left py-3 px-4 font-medium text-neutral-700">User</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-700">Role</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-700">Department</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-700">Last Login</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
                <th class="text-left py-3 px-4 font-medium text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b border-slate-100 hover:bg-slate-50">
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span class="text-primary-600 font-medium text-sm">{{ getInitials(user.name) }}</span>
                    </div>
                    <div class="ml-3">
                      <p class="font-medium text-neutral-900">{{ user.name }}</p>
                      <p class="text-sm text-neutral-500">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-blue-800">
                    {{ user.role }}
                  </span>
                </td>
                <td class="py-3 px-4 text-neutral-600">{{ user.department }}</td>
                <td class="py-3 px-4 text-neutral-500">{{ user.lastLogin }}</td>
                <td class="py-3 px-4">
                  <span 
                    :class="user.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center space-x-2">
                    <button class="p-1 text-slate-400 hover:text-primary-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-red-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Roles & Permissions -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Roles & Permissions</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="role in roles" :key="role.name" class="border border-neutral-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-medium text-neutral-900">{{ role.name }}</h4>
              <span class="text-xs text-neutral-500">{{ role.userCount }} users</span>
            </div>
            <p class="text-sm text-neutral-600 mb-4">{{ role.description }}</p>
            <div class="space-y-2">
              <div v-for="permission in role.permissions" :key="permission" class="flex items-center text-xs">
                <svg class="w-3 h-3 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ permission }}
              </div>
            </div>
            <button class="w-full mt-4 text-sm py-2 px-3 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
              Edit Role
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Settings -->
    <div v-if="activeTab === 'security'" class="space-y-8">
      <!-- Password Policy -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Password Policy</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Minimum Password Length</label>
              <p class="text-xs text-neutral-500">Require passwords to be at least this many characters</p>
            </div>
            <select class="input w-20">
              <option value="8" selected>8</option>
              <option value="10">10</option>
              <option value="12">12</option>
            </select>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Require Special Characters</label>
              <p class="text-xs text-neutral-500">Passwords must contain at least one special character</p>
            </div>
            <input type="checkbox" checked class="rounded border-slate-300 text-primary-600 focus:ring-blue-500">
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Password Expiration</label>
              <p class="text-xs text-neutral-500">Force users to change passwords every X days</p>
            </div>
            <select class="input w-32">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90" selected>90 days</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Update Policy</button>
        </div>
      </div>

      <!-- Two-Factor Authentication -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Two-Factor Authentication</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Require 2FA for All Users</label>
              <p class="text-xs text-neutral-500">Force all users to enable two-factor authentication</p>
            </div>
            <input type="checkbox" class="rounded border-slate-300 text-primary-600 focus:ring-blue-500">
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">2FA Method</label>
              <p class="text-xs text-neutral-500">Default two-factor authentication method</p>
            </div>
            <select class="input w-48">
              <option>SMS</option>
              <option>Authenticator App</option>
              <option>Email</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Save Settings</button>
        </div>
      </div>

      <!-- Session Management -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Session Management</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Session Timeout</label>
              <p class="text-xs text-neutral-500">Automatically log out inactive users after</p>
            </div>
            <select class="input w-32">
              <option value="30">30 minutes</option>
              <option value="60" selected>1 hour</option>
              <option value="120">2 hours</option>
              <option value="480">8 hours</option>
            </select>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">Concurrent Sessions</label>
              <p class="text-xs text-neutral-500">Maximum number of active sessions per user</p>
            </div>
            <select class="input w-20">
              <option value="1">1</option>
              <option value="3" selected>3</option>
              <option value="5">5</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Update Settings</button>
        </div>
      </div>
    </div>

    <!-- Integrations -->
    <div v-if="activeTab === 'integrations'" class="space-y-8">
      <!-- Available Integrations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="integration in integrations" :key="integration.name" class="card hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <span class="text-neutral-600 font-bold text-sm">{{ integration.name.slice(0, 2).toUpperCase() }}</span>
              </div>
              <div class="ml-3">
                <h3 class="font-medium text-neutral-900">{{ integration.name }}</h3>
                <p class="text-xs text-neutral-500">{{ integration.category }}</p>
              </div>
            </div>
            <span 
              :class="integration.status === 'connected' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'"
              class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ integration.status }}
            </span>
          </div>
          <p class="text-sm text-neutral-600 mb-4">{{ integration.description }}</p>
          <button 
            :class="integration.status === 'connected' ? 'btn-secondary' : 'btn-gradient'"
            class="w-full text-sm py-2"
          >
            {{ integration.status === 'connected' ? 'Manage' : 'Connect' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div v-if="activeTab === 'notifications'" class="space-y-8">
      <!-- Email Notifications -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">Email Notifications</h3>
        <div class="space-y-4">
          <div v-for="notification in emailNotifications" :key="notification.key" class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">{{ notification.title }}</label>
              <p class="text-xs text-neutral-500">{{ notification.description }}</p>
            </div>
            <input 
              type="checkbox" 
              :checked="notification.enabled"
              class="rounded border-slate-300 text-primary-600 focus:ring-blue-500"
            >
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Save Preferences</button>
        </div>
      </div>

      <!-- System Alerts -->
      <div class="card">
        <h3 class="text-lg font-semibold text-neutral-900 mb-6">System Alerts</h3>
        <div class="space-y-4">
          <div v-for="alert in systemAlerts" :key="alert.key" class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium text-neutral-900">{{ alert.title }}</label>
              <p class="text-xs text-neutral-500">{{ alert.description }}</p>
            </div>
            <input 
              type="checkbox" 
              :checked="alert.enabled"
              class="rounded border-slate-300 text-primary-600 focus:ring-blue-500"
            >
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button class="btn-gradient">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Apply auth middleware to protect this page
definePageMeta({
  middleware: 'auth'
})

const activeTab = ref('general')

const settingsTabs = [
  { key: 'general', name: 'General' },
  { key: 'users', name: 'Users' },
  { key: 'security', name: 'Security' },
  { key: 'integrations', name: 'Integrations' },
  { key: 'notifications', name: 'Notifications' }
]

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@bistrokeep.com',
    role: 'Administrator',
    department: 'IT',
    lastLogin: '2 hours ago',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@bistrokeep.com',
    role: 'Sales Manager',
    department: 'Sales',
    lastLogin: '1 day ago',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@bistrokeep.com',
    role: 'Sales Rep',
    department: 'Sales',
    lastLogin: '3 days ago',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lisa Garcia',
    email: 'lisa.garcia@bistrokeep.com',
    role: 'Accountant',
    department: 'Finance',
    lastLogin: '1 week ago',
    status: 'inactive'
  }
]

const roles = [
  {
    name: 'Administrator',
    description: 'Full system access with all permissions',
    userCount: 2,
    permissions: ['User Management', 'System Settings', 'Data Export', 'Financial Data', 'Reports']
  },
  {
    name: 'Sales Manager',
    description: 'Manage sales team and customer relationships',
    userCount: 3,
    permissions: ['Customer Management', 'Lead Management', 'Sales Reports', 'Team Overview']
  },
  {
    name: 'Sales Rep',
    description: 'Access to leads and customer information',
    userCount: 8,
    permissions: ['Customer View', 'Lead Management', 'Basic Reports']
  },
  {
    name: 'Accountant',
    description: 'Financial data access and invoice management',
    userCount: 2,
    permissions: ['Financial Data', 'Invoice Management', 'Financial Reports']
  }
]

const integrations = [
  {
    name: 'QuickBooks',
    category: 'Accounting',
    description: 'Sync financial data and invoices with QuickBooks',
    status: 'connected'
  },
  {
    name: 'Salesforce',
    category: 'CRM',
    description: 'Import contacts and leads from Salesforce',
    status: 'available'
  },
  {
    name: 'MailChimp',
    category: 'Marketing',
    description: 'Sync customer data for email marketing campaigns',
    status: 'connected'
  },
  {
    name: 'Slack',
    category: 'Communication',
    description: 'Get notifications and updates in Slack',
    status: 'available'
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect with 1000+ apps through Zapier',
    status: 'available'
  },
  {
    name: 'Google Workspace',
    category: 'Productivity',
    description: 'Sync with Google Calendar and Gmail',
    status: 'connected'
  }
]

const emailNotifications = [
  {
    key: 'new_lead',
    title: 'New Lead Notifications',
    description: 'Get notified when a new lead is created',
    enabled: true
  },
  {
    key: 'invoice_paid',
    title: 'Invoice Payment Notifications',
    description: 'Receive alerts when invoices are paid',
    enabled: true
  },
  {
    key: 'overdue_invoice',
    title: 'Overdue Invoice Alerts',
    description: 'Get notified about overdue invoices',
    enabled: true
  },
  {
    key: 'low_stock',
    title: 'Low Stock Alerts',
    description: 'Receive notifications when products are low in stock',
    enabled: false
  },
  {
    key: 'weekly_report',
    title: 'Weekly Summary Report',
    description: 'Get a weekly summary of key metrics',
    enabled: true
  }
]

const systemAlerts = [
  {
    key: 'login_attempt',
    title: 'Failed Login Attempts',
    description: 'Alert on multiple failed login attempts',
    enabled: true
  },
  {
    key: 'data_export',
    title: 'Data Export Activities',
    description: 'Get notified when users export large amounts of data',
    enabled: true
  },
  {
    key: 'system_maintenance',
    title: 'System Maintenance',
    description: 'Notifications about scheduled system maintenance',
    enabled: true
  },
  {
    key: 'backup_status',
    title: 'Backup Status',
    description: 'Daily backup completion status',
    enabled: false
  }
]

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>
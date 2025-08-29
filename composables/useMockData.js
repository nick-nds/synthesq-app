import { generateAllMockData, generateAnalyticsData } from '~/utils/mockDataGenerator.js'

export const useMockData = () => {
  // Generate comprehensive mock data
  const mockData = generateAllMockData()
  const analytics = generateAnalyticsData()

  const customers = mockData.customers.map(customer => ({
    ...customer,
    // Convert for compatibility with existing views
    name: customer.primary_contact.first_name + ' ' + customer.primary_contact.last_name,
    company: customer.name,
    value: customer.lifetime_value,
    lastContact: new Date(customer.updated_at).toISOString().split('T')[0],
    createdAt: new Date(customer.created_at).toISOString().split('T')[0]
  }))

  const leads = mockData.leads.map(lead => ({
    ...lead,
    // Convert for compatibility with existing views
    title: `${lead.first_name} ${lead.last_name} - ${lead.company}`,
    customer: lead.company,
    value: lead.expected_value || 0,
    stage: lead.status.toLowerCase(),
    probability: lead.score,
    expectedCloseDate: lead.expected_close_date,
    assignedTo: `User ${lead.assigned_to}`,
    createdAt: new Date(lead.created_at).toISOString().split('T')[0]
  }))

  const products = mockData.products.map(product => ({
    ...product,
    // Convert for compatibility
    stock: product.inventory.quantity_on_hand,
    minStock: product.inventory.reorder_point,
    status: product.status.toLowerCase()
  }))

  const invoices = mockData.invoices.map(invoice => ({
    ...invoice,
    // Convert for compatibility  
    invoiceNumber: invoice.invoice_number,
    customer: `Customer ${invoice.customer_id}`,
    amount: invoice.total_amount,
    dueDate: invoice.due_date,
    createdAt: invoice.issue_date,
    items: invoice.items.map(item => ({
      id: item.id,
      productId: 'product-1',
      productName: item.description,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      total: item.line_total
    }))
  }))

  const orders = mockData.orders.map(order => ({
    ...order,
    // Convert for compatibility
    orderNumber: order.order_number,
    customer: `Customer ${order.customer_id}`,
    customerId: order.customer_id,
    total: order.total_amount,
    orderDate: order.order_date,
    expectedDelivery: order.required_date,
    shippingAddress: '123 Business Ave, City, State 12345',
    paymentMethod: order.payment_method || 'Credit Card',
    paymentStatus: order.status === 'DELIVERED' ? 'paid' : 'pending',
    items: order.items.map(item => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      total: item.line_total
    }))
  }))

  // Enhanced dashboard metrics with real data
  const dashboardMetrics = reactive({
    totalRevenue: analytics.performanceMetrics.monthlyRecurringRevenue || 0,
    totalCustomers: customers.length,
    totalLeads: leads.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    monthlyRevenue: analytics.revenueData.map(d => d.revenue),
    recentLeads: leads.slice(0, 5),
    topCustomers: customers.sort((a, b) => b.value - a.value).slice(0, 5),
    newLeadsToday: Math.floor(Math.random() * 15) + 5,
    activeOpportunities: mockData.opportunities.length,
    monthlyRecurringRevenue: analytics.performanceMetrics.monthlyRecurringRevenue || 0,
    customerAcquisitionCost: analytics.performanceMetrics.customerAcquisitionCost || 0,
    customerLifetimeValue: analytics.performanceMetrics.customerLifetimeValue || 0,
    conversionRate: analytics.performanceMetrics.conversionRate || 0
  })

  const salesMetrics = {
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.reduce((sum, order) => sum + order.total, 0) / orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    monthlyOrders: [15, 22, 18, 28, 25, 32, 29, 35, 38, 42, 45, 48],
    recentOrders: orders.slice(0, 5),
    topProducts: analytics.salesByProduct
  }

  // Generate recent activities for the activity feed
  const recentActivities = reactive([
    {
      id: 1,
      type: 'deal',
      title: 'Deal closed successfully',
      description: `Enterprise CRM Suite deal worth $${(Math.random() * 50000 + 10000).toFixed(0)} closed with ${customers[Math.floor(Math.random() * customers.length)]?.company || 'TechCorp Inc'}`,
      user: 'John Smith',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      amount: Math.floor(Math.random() * 50000) + 10000,
      priority: 'high'
    },
    {
      id: 2,
      type: 'lead',
      title: 'New lead captured',
      description: `High-value lead from ${leads[Math.floor(Math.random() * leads.length)]?.customer || 'Global Solutions'} showing interest in our platform`,
      user: 'Sarah Johnson',
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
      priority: 'medium'
    },
    {
      id: 3,
      type: 'customer',
      title: 'Customer onboarded',
      description: `Successfully onboarded ${customers[Math.floor(Math.random() * customers.length)]?.company || 'Innovation Labs'} as a new enterprise customer`,
      user: 'Mike Chen',
      timestamp: new Date(Date.now() - Math.random() * 10800000).toISOString(),
      priority: 'high'
    },
    {
      id: 4,
      type: 'order',
      title: 'Large order received',
      description: `Order ${orders[Math.floor(Math.random() * orders.length)]?.orderNumber || 'ORD000123'} for multiple product licenses`,
      user: 'Emily Davis',
      timestamp: new Date(Date.now() - Math.random() * 14400000).toISOString(),
      amount: Math.floor(Math.random() * 75000) + 15000,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment received',
      description: `Invoice payment of $${(Math.random() * 25000 + 5000).toFixed(0)} processed successfully`,
      user: 'System',
      timestamp: new Date(Date.now() - Math.random() * 18000000).toISOString(),
      amount: Math.floor(Math.random() * 25000) + 5000,
      priority: 'low'
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Sales meeting scheduled',
      description: `Product demo scheduled with ${customers[Math.floor(Math.random() * customers.length)]?.company || 'TechStart Inc'} for next week`,
      user: 'Alex Rodriguez',
      timestamp: new Date(Date.now() - Math.random() * 21600000).toISOString(),
      priority: 'medium'
    },
    {
      id: 7,
      type: 'task',
      title: 'Proposal submitted',
      description: `Custom proposal submitted to ${mockData.opportunities[Math.floor(Math.random() * mockData.opportunities.length)]?.name || 'Enterprise Software Implementation'}`,
      user: 'Jessica Wilson',
      timestamp: new Date(Date.now() - Math.random() * 25200000).toISOString(),
      priority: 'high'
    },
    {
      id: 8,
      type: 'invoice',
      title: 'Invoice generated',
      description: `Monthly recurring invoice ${invoices[Math.floor(Math.random() * invoices.length)]?.invoiceNumber || 'INV000456'} sent to customer`,
      user: 'System',
      timestamp: new Date(Date.now() - Math.random() * 28800000).toISOString(),
      amount: Math.floor(Math.random() * 15000) + 2500,
      priority: 'low'
    }
  ])

  return {
    customers,
    leads,
    products,
    invoices,
    orders,
    dashboardMetrics,
    salesMetrics,
    recentActivities,
    
    // Enhanced data for charts and analytics
    opportunities: mockData.opportunities,
    employees: mockData.employees,
    revenueData: analytics.revenueData,
    salesByProduct: analytics.salesByProduct,
    customerAcquisition: analytics.customerAcquisition,
    performanceMetrics: analytics.performanceMetrics
  }
}
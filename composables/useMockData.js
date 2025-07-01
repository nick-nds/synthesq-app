export const useMockData = () => {
  const customers = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acmecorp.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      status: 'active',
      createdAt: '2024-01-15',
      lastContact: '2024-06-10',
      value: 25000
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techstartup.io',
      phone: '+1 (555) 987-6543',
      company: 'Tech Startup Inc',
      status: 'active',
      createdAt: '2024-02-20',
      lastContact: '2024-06-12',
      value: 15000
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@enterprise.com',
      phone: '+1 (555) 456-7890',
      company: 'Enterprise Solutions',
      status: 'prospect',
      createdAt: '2024-03-10',
      lastContact: '2024-06-08',
      value: 50000
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa@innovate.com',
      phone: '+1 (555) 321-9876',
      company: 'Innovate Co',
      status: 'active',
      createdAt: '2024-04-05',
      lastContact: '2024-06-14',
      value: 35000
    }
  ]

  const leads = [
    {
      id: '1',
      title: 'Enterprise Software License',
      customer: 'Acme Corporation',
      value: 75000,
      stage: 'negotiation',
      probability: 80,
      expectedCloseDate: '2024-07-15',
      assignedTo: 'Alex Thompson',
      createdAt: '2024-05-20'
    },
    {
      id: '2',
      title: 'Cloud Migration Project',
      customer: 'Tech Startup Inc',
      value: 45000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: '2024-08-01',
      assignedTo: 'Maria Garcia',
      createdAt: '2024-06-01'
    },
    {
      id: '3',
      title: 'CRM Implementation',
      customer: 'Enterprise Solutions',
      value: 120000,
      stage: 'qualified',
      probability: 40,
      expectedCloseDate: '2024-09-30',
      assignedTo: 'David Wilson',
      createdAt: '2024-06-10'
    }
  ]

  const products = [
    {
      id: '1',
      name: 'Professional CRM License',
      sku: 'CRM-PRO-001',
      category: 'Software',
      price: 299,
      cost: 150,
      stock: 100,
      minStock: 10,
      status: 'active',
      description: 'Professional CRM software license for small to medium businesses'
    },
    {
      id: '2',
      name: 'Enterprise ERP Suite',
      sku: 'ERP-ENT-001',
      category: 'Software',
      price: 1299,
      cost: 600,
      stock: 50,
      minStock: 5,
      status: 'active',
      description: 'Complete enterprise resource planning solution'
    },
    {
      id: '3',
      name: 'Support & Maintenance',
      sku: 'SUP-001',
      category: 'Service',
      price: 199,
      cost: 50,
      stock: 999,
      minStock: 0,
      status: 'active',
      description: 'Annual support and maintenance package'
    }
  ]

  const invoices = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customer: 'Acme Corporation',
      amount: 15000,
      status: 'paid',
      dueDate: '2024-06-30',
      createdAt: '2024-06-01',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Professional CRM License',
          quantity: 50,
          unitPrice: 299,
          total: 14950
        }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customer: 'Tech Startup Inc',
      amount: 2597,
      status: 'sent',
      dueDate: '2024-07-15',
      createdAt: '2024-06-15',
      items: [
        {
          id: '2',
          productId: '1',
          productName: 'Professional CRM License',
          quantity: 5,
          unitPrice: 299,
          total: 1495
        },
        {
          id: '3',
          productId: '3',
          productName: 'Support & Maintenance',
          quantity: 5,
          unitPrice: 199,
          total: 995
        }
      ]
    }
  ]

  const dashboardMetrics = {
    totalRevenue: 487500,
    totalCustomers: 248,
    totalLeads: 34,
    totalProducts: 12,
    monthlyRevenue: [45000, 52000, 48000, 61000, 58000, 67000, 72000, 69000, 75000, 82000, 78000, 85000],
    recentLeads: leads.slice(0, 5),
    topCustomers: customers.sort((a, b) => b.value - a.value).slice(0, 5)
  }

  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customer: 'Acme Corporation',
      customerId: '1',
      total: 29850,
      status: 'shipped',
      orderDate: '2024-06-10',
      expectedDelivery: '2024-06-15',
      shippingAddress: '123 Business Ave, New York, NY 10001',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Professional CRM License',
          quantity: 100,
          unitPrice: 299,
          total: 29900
        }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customer: 'Tech Startup Inc',
      customerId: '2',
      total: 2597,
      status: 'processing',
      orderDate: '2024-06-12',
      expectedDelivery: '2024-06-18',
      shippingAddress: '456 Innovation Blvd, San Francisco, CA 94105',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'paid',
      items: [
        {
          id: '2',
          productId: '1',
          productName: 'Professional CRM License',
          quantity: 5,
          unitPrice: 299,
          total: 1495
        },
        {
          id: '3',
          productId: '3',
          productName: 'Support & Maintenance',
          quantity: 5,
          unitPrice: 199,
          total: 995
        }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customer: 'Enterprise Solutions',
      customerId: '3',
      total: 64950,
      status: 'pending',
      orderDate: '2024-06-14',
      expectedDelivery: '2024-06-20',
      shippingAddress: '789 Corporate Dr, Chicago, IL 60601',
      paymentMethod: 'Purchase Order',
      paymentStatus: 'pending',
      items: [
        {
          id: '4',
          productId: '2',
          productName: 'Enterprise ERP Suite',
          quantity: 50,
          unitPrice: 1299,
          total: 64950
        }
      ]
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      customer: 'Innovate Co',
      customerId: '4',
      total: 1796,
      status: 'delivered',
      orderDate: '2024-06-08',
      expectedDelivery: '2024-06-12',
      shippingAddress: '321 Creative Way, Austin, TX 78701',
      paymentMethod: 'Credit Card',
      paymentStatus: 'paid',
      items: [
        {
          id: '5',
          productId: '1',
          productName: 'Professional CRM License',
          quantity: 6,
          unitPrice: 299,
          total: 1794
        }
      ]
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      customer: 'Global Industries',
      customerId: '5',
      total: 15925,
      status: 'cancelled',
      orderDate: '2024-06-05',
      shippingAddress: '555 Industrial Park, Detroit, MI 48201',
      paymentMethod: 'Credit Card',
      paymentStatus: 'refunded',
      items: [
        {
          id: '6',
          productId: '2',
          productName: 'Enterprise ERP Suite',
          quantity: 10,
          unitPrice: 1299,
          total: 12990
        },
        {
          id: '7',
          productId: '3',
          productName: 'Support & Maintenance',
          quantity: 15,
          unitPrice: 199,
          total: 2985
        }
      ]
    }
  ]

  const salesMetrics = {
    totalOrders: orders.length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: orders.reduce((sum, order) => sum + order.total, 0) / orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    monthlyOrders: [15, 22, 18, 28, 25, 32, 29, 35, 38, 42, 45, 48],
    recentOrders: orders.slice(0, 5),
    topProducts: [
      { name: 'Professional CRM License', quantity: 161, revenue: 48183 },
      { name: 'Enterprise ERP Suite', quantity: 60, revenue: 77940 },
      { name: 'Support & Maintenance', quantity: 20, revenue: 3980 }
    ]
  }

  return {
    customers,
    leads,
    products,
    invoices,
    orders,
    dashboardMetrics,
    salesMetrics
  }
}
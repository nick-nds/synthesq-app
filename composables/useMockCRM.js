export const useMockCRM = () => {
  // Mock Customers Data
  const mockCustomers = [
    {
      id: 'CUS-001',
      name: 'John Doe',
      email: 'john.doe@techsolutions.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc',
      industry: 'Technology',
      status: 'active',
      type: 'company',
      value: 45000,
      created: '2024-01-15',
      lastContact: '2024-08-10',
      avatar: 'JD'
    },
    {
      id: 'CUS-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@globalmarketing.com',
      phone: '+1 (555) 234-5678',
      company: 'Global Marketing Corp',
      industry: 'Marketing',
      status: 'active',
      type: 'company',
      value: 22000,
      created: '2024-02-20',
      lastContact: '2024-08-12',
      avatar: 'SJ'
    },
    {
      id: 'CUS-003',
      name: 'Michael Chen',
      email: 'michael.chen@financeplus.com',
      phone: '+1 (555) 345-6789',
      company: 'Finance Plus Ltd',
      industry: 'Finance',
      status: 'active',
      type: 'company',
      value: 78000,
      created: '2024-03-10',
      lastContact: '2024-08-14',
      avatar: 'MC'
    },
    {
      id: 'CUS-004',
      name: 'Emily Rodriguez',
      email: 'emily.r@retailchain.com',
      phone: '+1 (555) 456-7890',
      company: 'Retail Chain Co',
      industry: 'Retail',
      status: 'prospect',
      type: 'company',
      value: 125000,
      created: '2024-04-05',
      lastContact: '2024-08-13',
      avatar: 'ER'
    },
    {
      id: 'CUS-005',
      name: 'David Wilson',
      email: 'david.wilson@healthcare.com',
      phone: '+1 (555) 567-8901',
      company: 'Healthcare Plus',
      industry: 'Healthcare',
      status: 'active',
      type: 'company',
      value: 95000,
      created: '2024-05-12',
      lastContact: '2024-08-11',
      avatar: 'DW'
    }
  ]

  // Mock Leads Data
  const mockLeads = [
    {
      id: 'LEAD-001',
      name: 'Tech Solutions Inc',
      contact: 'John Doe',
      email: 'john.doe@techsolutions.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc',
      stage: 'new',
      value: 45000,
      probability: 20,
      source: 'Website',
      assigned: 'JD',
      created: '2024-08-13',
      lastActivity: '2d',
      description: 'Software implementation project',
      tags: ['enterprise', 'software']
    },
    {
      id: 'LEAD-002',
      name: 'Global Marketing Corp',
      contact: 'Sarah Johnson',
      email: 'sarah.johnson@globalmarketing.com',
      phone: '+1 (555) 234-5678',
      company: 'Global Marketing Corp',
      stage: 'new',
      value: 22000,
      probability: 15,
      source: 'Referral',
      assigned: 'SM',
      created: '2024-08-10',
      lastActivity: '5d',
      description: 'Marketing automation setup',
      tags: ['marketing', 'automation']
    },
    {
      id: 'LEAD-003',
      name: 'Finance Plus Ltd',
      contact: 'Michael Chen',
      email: 'michael.chen@financeplus.com',
      phone: '+1 (555) 345-6789',
      company: 'Finance Plus Ltd',
      stage: 'qualified',
      value: 78000,
      probability: 65,
      source: 'Cold Outreach',
      assigned: 'AP',
      created: '2024-08-05',
      lastActivity: '1w',
      description: 'ERP Integration project',
      tags: ['finance', 'erp', 'integration']
    },
    {
      id: 'LEAD-004',
      name: 'Retail Chain Co',
      contact: 'Emily Rodriguez',
      email: 'emily.r@retailchain.com',
      phone: '+1 (555) 456-7890',
      company: 'Retail Chain Co',
      stage: 'proposal',
      value: 125000,
      probability: 75,
      source: 'Trade Show',
      assigned: 'RK',
      created: '2024-07-20',
      lastActivity: '3d',
      description: 'POS System upgrade',
      tags: ['retail', 'pos', 'hot'],
      priority: 'hot'
    },
    {
      id: 'LEAD-005',
      name: 'Healthcare Plus',
      contact: 'David Wilson',
      email: 'david.wilson@healthcare.com',
      phone: '+1 (555) 567-8901',
      company: 'Healthcare Plus',
      stage: 'negotiation',
      value: 95000,
      probability: 85,
      source: 'LinkedIn',
      assigned: 'MJ',
      created: '2024-07-15',
      lastActivity: '2w',
      description: 'Full system deployment',
      tags: ['healthcare', 'deployment']
    },
    {
      id: 'LEAD-006',
      name: 'StartUp Co',
      contact: 'Alex Thompson',
      email: 'alex@startup.co',
      phone: '+1 (555) 678-9012',
      company: 'StartUp Co',
      stage: 'closed-won',
      value: 32000,
      probability: 100,
      source: 'Website',
      assigned: 'JD',
      created: '2024-07-01',
      lastActivity: '1m',
      description: 'Cloud migration project',
      tags: ['startup', 'cloud', 'won']
    }
  ]

  // Mock Products Data
  const mockProducts = [
    {
      id: 'PROD-001',
      sku: 'SYN-CRM-STD',
      name: 'Synthesq CRM Standard',
      description: 'Complete CRM solution for small to medium businesses',
      category: 'Software',
      price: 49,
      unit: 'user/month',
      stock: 999,
      status: 'active',
      created: '2024-01-01'
    },
    {
      id: 'PROD-002',
      sku: 'SYN-CRM-PRO',
      name: 'Synthesq CRM Professional',
      description: 'Advanced CRM with automation and integrations',
      category: 'Software',
      price: 99,
      unit: 'user/month',
      stock: 999,
      status: 'active',
      created: '2024-01-01'
    },
    {
      id: 'PROD-003',
      sku: 'SYN-ERP-ENT',
      name: 'Synthesq ERP Enterprise',
      description: 'Full ERP solution for large organizations',
      category: 'Software',
      price: 199,
      unit: 'user/month',
      stock: 999,
      status: 'active',
      created: '2024-01-01'
    },
    {
      id: 'PROD-004',
      sku: 'SYN-SETUP',
      name: 'Professional Setup Service',
      description: 'One-time professional implementation service',
      category: 'Service',
      price: 2500,
      unit: 'one-time',
      stock: 50,
      status: 'active',
      created: '2024-01-01'
    },
    {
      id: 'PROD-005',
      sku: 'SYN-TRAINING',
      name: 'Training Package',
      description: 'Comprehensive user training program',
      category: 'Service',
      price: 500,
      unit: 'per session',
      stock: 100,
      status: 'active',
      created: '2024-01-01'
    }
  ]

  // Mock Orders Data
  const mockOrders = [
    {
      id: 'ORD-001',
      number: 'ORD-2024-001',
      customer: 'Tech Solutions Inc',
      customerId: 'CUS-001',
      status: 'completed',
      date: '2024-08-01',
      dueDate: '2024-08-15',
      total: 4900,
      items: [
        { product: 'Synthesq CRM Professional', quantity: 10, price: 99, total: 990 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 },
        { product: 'Training Package', quantity: 2, price: 500, total: 1000 }
      ]
    },
    {
      id: 'ORD-002',
      number: 'ORD-2024-002',
      customer: 'Global Marketing Corp',
      customerId: 'CUS-002',
      status: 'processing',
      date: '2024-08-10',
      dueDate: '2024-08-20',
      total: 2940,
      items: [
        { product: 'Synthesq CRM Standard', quantity: 5, price: 49, total: 245 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 }
      ]
    },
    {
      id: 'ORD-003',
      number: 'ORD-2024-003',
      customer: 'Finance Plus Ltd',
      customerId: 'CUS-003',
      status: 'pending',
      date: '2024-08-12',
      dueDate: '2024-08-25',
      total: 7800,
      items: [
        { product: 'Synthesq ERP Enterprise', quantity: 20, price: 199, total: 3980 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 },
        { product: 'Training Package', quantity: 4, price: 500, total: 2000 }
      ]
    }
  ]

  // Mock Opportunities Data
  const mockOpportunities = [
    {
      id: 'OPP-001',
      title: 'Enterprise CRM Implementation',
      company: 'Tech Solutions Inc',
      contact: 'John Doe',
      email: 'john.doe@techsolutions.com',
      phone: '+1 (555) 123-4567',
      stage: 'qualification',
      value: 125000,
      probability: 75,
      expectedClose: '2024-09-30',
      source: 'Website',
      type: 'New Business',
      priority: 'high',
      owner: 'Alice Parker',
      ownerInitials: 'AP',
      created: '2024-07-15',
      lastActivity: '2024-08-14',
      nextAction: 'Schedule product demo',
      description: 'Large enterprise looking to replace legacy CRM system with modern solution',
      industry: 'Technology',
      employees: 500,
      tags: ['enterprise', 'crm', 'hot-lead'],
      activities: [
        { type: 'call', date: '2024-08-14', description: 'Discovery call completed', user: 'Alice Parker' },
        { type: 'email', date: '2024-08-12', description: 'Sent proposal document', user: 'Alice Parker' },
        { type: 'meeting', date: '2024-08-10', description: 'Initial meeting with stakeholders', user: 'Alice Parker' }
      ],
      notes: [
        { date: '2024-08-14', text: 'Very interested in automation features. Key decision maker is CTO.', user: 'Alice Parker' },
        { date: '2024-08-10', text: 'Current system is causing major productivity issues. Budget approved.', user: 'Alice Parker' }
      ]
    },
    {
      id: 'OPP-002',
      title: 'Marketing Automation Platform',
      company: 'Global Marketing Corp',
      contact: 'Sarah Johnson',
      email: 'sarah.johnson@globalmarketing.com',
      phone: '+1 (555) 234-5678',
      stage: 'proposal',
      value: 85000,
      probability: 60,
      expectedClose: '2024-10-15',
      source: 'Referral',
      type: 'Upsell',
      priority: 'medium',
      owner: 'Mark Thompson',
      ownerInitials: 'MT',
      created: '2024-06-20',
      lastActivity: '2024-08-13',
      nextAction: 'Follow up on proposal',
      description: 'Existing client looking to expand with marketing automation tools',
      industry: 'Marketing',
      employees: 150,
      tags: ['marketing', 'automation', 'existing-client'],
      activities: [
        { type: 'email', date: '2024-08-13', description: 'Proposal sent for review', user: 'Mark Thompson' },
        { type: 'meeting', date: '2024-08-08', description: 'Requirements gathering session', user: 'Mark Thompson' },
        { type: 'call', date: '2024-08-05', description: 'Initial consultation call', user: 'Mark Thompson' }
      ],
      notes: [
        { date: '2024-08-13', text: 'Proposal includes 3 different packages. Waiting for budget approval.', user: 'Mark Thompson' },
        { date: '2024-08-08', text: 'They need integration with existing email platform. Confirmed feasible.', user: 'Mark Thompson' }
      ]
    },
    {
      id: 'OPP-003',
      title: 'ERP System Upgrade',
      company: 'Finance Plus Ltd',
      contact: 'Michael Chen',
      email: 'michael.chen@financeplus.com',
      phone: '+1 (555) 345-6789',
      stage: 'negotiation',
      value: 180000,
      probability: 85,
      expectedClose: '2024-09-15',
      source: 'Cold Outreach',
      type: 'New Business',
      priority: 'high',
      owner: 'Jennifer Liu',
      ownerInitials: 'JL',
      created: '2024-05-10',
      lastActivity: '2024-08-15',
      nextAction: 'Contract review meeting',
      description: 'Financial services company needs comprehensive ERP solution',
      industry: 'Finance',
      employees: 300,
      tags: ['erp', 'finance', 'enterprise'],
      activities: [
        { type: 'meeting', date: '2024-08-15', description: 'Contract negotiation meeting', user: 'Jennifer Liu' },
        { type: 'call', date: '2024-08-12', description: 'Technical requirements review', user: 'Jennifer Liu' },
        { type: 'demo', date: '2024-08-08', description: 'Full system demonstration', user: 'Jennifer Liu' }
      ],
      notes: [
        { date: '2024-08-15', text: 'Minor contract adjustments requested. Very close to closing.', user: 'Jennifer Liu' },
        { date: '2024-08-12', text: 'All technical requirements confirmed. Implementation timeline discussed.', user: 'Jennifer Liu' }
      ]
    },
    {
      id: 'OPP-004',
      title: 'Retail POS Integration',
      company: 'Retail Chain Co',
      contact: 'Emily Rodriguez',
      email: 'emily.r@retailchain.com',
      phone: '+1 (555) 456-7890',
      stage: 'discovery',
      value: 65000,
      probability: 40,
      expectedClose: '2024-11-30',
      source: 'Trade Show',
      type: 'New Business',
      priority: 'medium',
      owner: 'David Kim',
      ownerInitials: 'DK',
      created: '2024-07-25',
      lastActivity: '2024-08-11',
      nextAction: 'Site visit scheduled',
      description: 'Multi-location retail chain needs POS system integration',
      industry: 'Retail',
      employees: 200,
      tags: ['retail', 'pos', 'multi-location'],
      activities: [
        { type: 'call', date: '2024-08-11', description: 'Discovery call with IT team', user: 'David Kim' },
        { type: 'meeting', date: '2024-08-05', description: 'Initial consultation', user: 'David Kim' },
        { type: 'email', date: '2024-08-01', description: 'Follow-up after trade show', user: 'David Kim' }
      ],
      notes: [
        { date: '2024-08-11', text: 'Complex integration requirements. Need to assess current POS systems.', user: 'David Kim' },
        { date: '2024-08-05', text: 'Multiple stakeholders involved. Decision timeline is flexible.', user: 'David Kim' }
      ]
    },
    {
      id: 'OPP-005',
      title: 'Healthcare Management System',
      company: 'Healthcare Plus',
      contact: 'David Wilson',
      email: 'david.wilson@healthcare.com',
      phone: '+1 (555) 567-8901',
      stage: 'closed-won',
      value: 95000,
      probability: 100,
      expectedClose: '2024-08-01',
      actualClose: '2024-08-01',
      source: 'LinkedIn',
      type: 'New Business',
      priority: 'high',
      owner: 'Lisa Rodriguez',
      ownerInitials: 'LR',
      created: '2024-04-15',
      lastActivity: '2024-08-01',
      nextAction: 'Implementation kickoff',
      description: 'Healthcare provider needs patient management and billing system',
      industry: 'Healthcare',
      employees: 100,
      tags: ['healthcare', 'patient-management', 'won'],
      activities: [
        { type: 'contract', date: '2024-08-01', description: 'Contract signed - Deal closed!', user: 'Lisa Rodriguez' },
        { type: 'meeting', date: '2024-07-28', description: 'Final approval meeting', user: 'Lisa Rodriguez' },
        { type: 'demo', date: '2024-07-15', description: 'System demonstration to board', user: 'Lisa Rodriguez' }
      ],
      notes: [
        { date: '2024-08-01', text: 'Deal successfully closed! Implementation starts next week.', user: 'Lisa Rodriguez' },
        { date: '2024-07-28', text: 'Board approved the purchase. Contract ready for signature.', user: 'Lisa Rodriguez' }
      ]
    },
    {
      id: 'OPP-006',
      title: 'Startup Growth Package',
      company: 'Innovation Labs',
      contact: 'Alex Chen',
      email: 'alex@innovationlabs.co',
      phone: '+1 (555) 678-9012',
      stage: 'prospecting',
      value: 25000,
      probability: 25,
      expectedClose: '2024-12-15',
      source: 'Website',
      type: 'New Business',
      priority: 'low',
      owner: 'Sarah Mitchell',
      ownerInitials: 'SM',
      created: '2024-08-10',
      lastActivity: '2024-08-12',
      nextAction: 'Qualification call',
      description: 'Early-stage startup looking for basic CRM and project management tools',
      industry: 'Technology',
      employees: 15,
      tags: ['startup', 'small-business', 'new-lead'],
      activities: [
        { type: 'email', date: '2024-08-12', description: 'Welcome email and resource packet sent', user: 'Sarah Mitchell' },
        { type: 'form', date: '2024-08-10', description: 'Website contact form submitted', user: 'System' }
      ],
      notes: [
        { date: '2024-08-12', text: 'New lead from website. Need to qualify budget and timeline.', user: 'Sarah Mitchell' }
      ]
    },
    {
      id: 'OPP-007',
      title: 'Manufacturing ERP Solution',
      company: 'Industrial Solutions Inc',
      contact: 'Robert Martinez',
      email: 'robert@industrialsolutions.com',
      phone: '+1 (555) 789-0123',
      stage: 'closed-lost',
      value: 150000,
      probability: 0,
      expectedClose: '2024-08-15',
      actualClose: '2024-08-15',
      source: 'Partner Referral',
      type: 'New Business',
      priority: 'high',
      owner: 'Michael Brown',
      ownerInitials: 'MB',
      created: '2024-05-20',
      lastActivity: '2024-08-15',
      nextAction: 'Post-mortem analysis',
      description: 'Manufacturing company needed full ERP implementation',
      industry: 'Manufacturing',
      employees: 400,
      tags: ['manufacturing', 'erp', 'lost'],
      lostReason: 'Price - chose competitor with lower cost solution',
      activities: [
        { type: 'call', date: '2024-08-15', description: 'Decision call - lost to competitor', user: 'Michael Brown' },
        { type: 'proposal', date: '2024-08-10', description: 'Final proposal submitted', user: 'Michael Brown' },
        { type: 'meeting', date: '2024-08-05', description: 'Proposal presentation', user: 'Michael Brown' }
      ],
      notes: [
        { date: '2024-08-15', text: 'Lost due to pricing. Competitor was 30% lower. Good learning experience.', user: 'Michael Brown' },
        { date: '2024-08-10', text: 'Strong technical fit but pricing concerns raised by CFO.', user: 'Michael Brown' }
      ]
    }
  ]

  // Mock Payments Data
  const mockPayments = [
    {
      id: 'PAY-001',
      invoiceId: 'INV-001',
      invoiceNumber: 'INV-2024-001',
      customer: 'Tech Solutions Inc',
      customerId: 'CUS-001',
      amount: 4939,
      method: 'Bank Transfer',
      status: 'completed',
      date: '2024-08-15',
      transactionId: 'TXN-789456123',
      reference: 'Payment for CRM setup',
      processingFee: 15.50,
      netAmount: 4923.50,
      gateway: 'Stripe',
      type: 'invoice'
    },
    {
      id: 'PAY-002',
      invoiceId: 'INV-002',
      invoiceNumber: 'INV-2024-002',
      customer: 'Global Marketing Corp',
      customerId: 'CUS-002',
      amount: 3019.5,
      method: 'Credit Card',
      status: 'pending',
      date: '2024-08-14',
      transactionId: 'TXN-789456124',
      reference: 'Monthly subscription payment',
      processingFee: 87.57,
      netAmount: 2931.93,
      gateway: 'PayPal',
      type: 'subscription'
    },
    {
      id: 'PAY-003',
      invoiceId: 'INV-003',
      invoiceNumber: 'INV-2024-003',
      customer: 'Finance Plus Ltd',
      customerId: 'CUS-003',
      amount: 8580,
      method: 'ACH',
      status: 'failed',
      date: '2024-08-13',
      transactionId: 'TXN-789456125',
      reference: 'ERP system payment',
      processingFee: 25.74,
      netAmount: 8554.26,
      gateway: 'Stripe',
      type: 'invoice',
      failureReason: 'Insufficient funds'
    }
  ]

  // Mock Procurement Data
  const mockPurchaseOrders = [
    {
      id: 'PO-001',
      number: 'PO-2024-001',
      vendor: 'Office Supplies Co',
      vendorId: 'VEN-001',
      status: 'approved',
      date: '2024-08-10',
      expectedDelivery: '2024-08-20',
      total: 2500,
      items: [
        { product: 'Office Chairs', quantity: 10, price: 150, total: 1500 },
        { product: 'Desk Supplies', quantity: 50, price: 20, total: 1000 }
      ],
      approver: 'John Manager',
      department: 'Administration',
      notes: 'Quarterly office supplies replenishment'
    },
    {
      id: 'PO-002',
      number: 'PO-2024-002',
      vendor: 'Tech Equipment Ltd',
      vendorId: 'VEN-002',
      status: 'pending',
      date: '2024-08-12',
      expectedDelivery: '2024-08-25',
      total: 15000,
      items: [
        { product: 'Laptops', quantity: 5, price: 2500, total: 12500 },
        { product: 'Monitors', quantity: 10, price: 250, total: 2500 }
      ],
      approver: 'Sarah Director',
      department: 'IT',
      notes: 'New employee equipment setup'
    }
  ]

  const mockVendors = [
    {
      id: 'VEN-001',
      name: 'Office Supplies Co',
      contact: 'Mike Johnson',
      email: 'mike@officesupplies.com',
      phone: '+1 (555) 111-2222',
      address: '123 Supply St, Business City, BC 12345',
      category: 'Office Supplies',
      paymentTerms: 'Net 30',
      status: 'active',
      totalSpent: 25000,
      ordersCount: 12
    },
    {
      id: 'VEN-002',
      name: 'Tech Equipment Ltd',
      contact: 'Lisa Chen',
      email: 'lisa@techequipment.com',
      phone: '+1 (555) 333-4444',
      address: '456 Tech Ave, Innovation City, IC 67890',
      category: 'Technology',
      paymentTerms: 'Net 15',
      status: 'active',
      totalSpent: 45000,
      ordersCount: 8
    }
  ]

  // Mock Accounting Data
  const mockAccounts = [
    {
      id: 'ACC-001',
      code: '1000',
      name: 'Cash',
      type: 'Asset',
      category: 'Current Assets',
      balance: 125000,
      description: 'Primary business checking account'
    },
    {
      id: 'ACC-002',
      code: '1200',
      name: 'Accounts Receivable',
      type: 'Asset',
      category: 'Current Assets',
      balance: 45000,
      description: 'Outstanding customer invoices'
    },
    {
      id: 'ACC-003',
      code: '2000',
      name: 'Accounts Payable',
      type: 'Liability',
      category: 'Current Liabilities',
      balance: 28000,
      description: 'Outstanding vendor bills'
    },
    {
      id: 'ACC-004',
      code: '4000',
      name: 'Revenue',
      type: 'Revenue',
      category: 'Operating Revenue',
      balance: 185000,
      description: 'Sales revenue'
    }
  ]

  const mockTransactions = [
    {
      id: 'TXN-001',
      date: '2024-08-15',
      description: 'Payment from Tech Solutions Inc',
      account: 'Cash',
      accountCode: '1000',
      debit: 4939,
      credit: 0,
      reference: 'INV-2024-001',
      type: 'Payment'
    },
    {
      id: 'TXN-002',
      date: '2024-08-15',
      description: 'Payment from Tech Solutions Inc',
      account: 'Accounts Receivable',
      accountCode: '1200',
      debit: 0,
      credit: 4939,
      reference: 'INV-2024-001',
      type: 'Payment'
    }
  ]

  // Mock HR Data
  const mockEmployees = [
    {
      id: 'EMP-001',
      employeeId: 'E001',
      name: 'John Smith',
      email: 'john.smith@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      manager: 'Sarah Johnson',
      hireDate: '2023-03-15',
      salary: 85000,
      status: 'active',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, ST 12345',
      emergencyContact: 'Jane Smith - (555) 987-6543',
      benefits: ['Health Insurance', '401k', 'Paid Time Off'],
      skills: ['JavaScript', 'React', 'Node.js']
    },
    {
      id: 'EMP-002',
      employeeId: 'E002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      position: 'Engineering Manager',
      department: 'Engineering',
      manager: 'David Chen',
      hireDate: '2022-01-10',
      salary: 120000,
      status: 'active',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, City, ST 12345',
      emergencyContact: 'Mike Johnson - (555) 876-5432',
      benefits: ['Health Insurance', '401k', 'Paid Time Off', 'Stock Options'],
      skills: ['Team Management', 'Python', 'System Architecture']
    }
  ]

  const mockLeaveRequests = [
    {
      id: 'LEAVE-001',
      employeeId: 'EMP-001',
      employeeName: 'John Smith',
      type: 'Vacation',
      startDate: '2024-08-25',
      endDate: '2024-08-30',
      days: 6,
      status: 'approved',
      approver: 'Sarah Johnson',
      reason: 'Family vacation',
      appliedDate: '2024-08-01'
    },
    {
      id: 'LEAVE-002',
      employeeId: 'EMP-002',
      employeeName: 'Sarah Johnson',
      type: 'Sick Leave',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      days: 3,
      status: 'pending',
      approver: 'David Chen',
      reason: 'Medical appointment',
      appliedDate: '2024-08-15'
    }
  ]

  // Mock Invoices Data
  const mockInvoices = [
    {
      id: 'INV-001',
      number: 'INV-2024-001',
      customer: 'Tech Solutions Inc',
      customerId: 'CUS-001',
      orderId: 'ORD-001',
      status: 'paid',
      issueDate: '2024-08-01',
      dueDate: '2024-08-31',
      paidDate: '2024-08-15',
      subtotal: 4490,
      tax: 449,
      total: 4939,
      items: [
        { product: 'Synthesq CRM Professional', quantity: 10, price: 99, total: 990 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 },
        { product: 'Training Package', quantity: 2, price: 500, total: 1000 }
      ]
    },
    {
      id: 'INV-002',
      number: 'INV-2024-002',
      customer: 'Global Marketing Corp',
      customerId: 'CUS-002',
      status: 'sent',
      issueDate: '2024-08-10',
      dueDate: '2024-09-09',
      subtotal: 2745,
      tax: 274.5,
      total: 3019.5,
      items: [
        { product: 'Synthesq CRM Standard', quantity: 5, price: 49, total: 245 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 }
      ]
    },
    {
      id: 'INV-003',
      number: 'INV-2024-003',
      customer: 'Finance Plus Ltd',
      customerId: 'CUS-003',
      status: 'overdue',
      issueDate: '2024-07-15',
      dueDate: '2024-08-14',
      subtotal: 7800,
      tax: 780,
      total: 8580,
      items: [
        { product: 'Synthesq ERP Enterprise', quantity: 20, price: 199, total: 3980 },
        { product: 'Professional Setup Service', quantity: 1, price: 2500, total: 2500 },
        { product: 'Training Package', quantity: 4, price: 500, total: 2000 }
      ]
    }
  ]

  // Analytics/KPI Data
  const getLeadKPIs = () => {
    const totalLeads = mockLeads.length
    const qualified = mockLeads.filter(l => ['qualified', 'proposal', 'negotiation'].includes(l.stage)).length
    const pipelineValue = mockLeads.filter(l => l.stage !== 'closed-lost').reduce((sum, l) => sum + l.value, 0)
    const wonLeads = mockLeads.filter(l => l.stage === 'closed-won').length
    const conversionRate = Math.round((wonLeads / totalLeads) * 100)

    return {
      totalLeads,
      qualified,
      pipelineValue,
      conversionRate,
      qualificationRate: Math.round((qualified / totalLeads) * 100)
    }
  }

  const getLeadsByStage = () => {
    const stages = ['new', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
    return stages.map(stage => ({
      stage,
      leads: mockLeads.filter(lead => lead.stage === stage)
    }))
  }

  // Opportunity Analytics
  const getOpportunityKPIs = () => {
    const totalOpportunities = mockOpportunities.length
    const activeOpportunities = mockOpportunities.filter(o => !['closed-won', 'closed-lost'].includes(o.stage)).length
    const wonOpportunities = mockOpportunities.filter(o => o.stage === 'closed-won').length
    const lostOpportunities = mockOpportunities.filter(o => o.stage === 'closed-lost').length
    
    const totalPipelineValue = mockOpportunities
      .filter(o => !['closed-won', 'closed-lost'].includes(o.stage))
      .reduce((sum, o) => sum + (o.value * (o.probability / 100)), 0)
    
    const totalWonValue = mockOpportunities
      .filter(o => o.stage === 'closed-won')
      .reduce((sum, o) => sum + o.value, 0)
    
    const totalValue = mockOpportunities.reduce((sum, o) => sum + o.value, 0)
    const avgDealSize = totalValue / totalOpportunities
    const winRate = totalOpportunities > 0 ? Math.round((wonOpportunities / (wonOpportunities + lostOpportunities)) * 100) : 0

    return {
      totalOpportunities,
      activeOpportunities,
      wonOpportunities,
      lostOpportunities,
      totalPipelineValue,
      totalWonValue,
      avgDealSize,
      winRate
    }
  }

  const getOpportunitiesByStage = () => {
    const stages = ['prospecting', 'qualification', 'discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost']
    return stages.map(stage => ({
      stage,
      opportunities: mockOpportunities.filter(opp => opp.stage === stage),
      totalValue: mockOpportunities.filter(opp => opp.stage === stage).reduce((sum, o) => sum + o.value, 0),
      count: mockOpportunities.filter(opp => opp.stage === stage).length
    }))
  }

  const getOpportunityForecast = () => {
    const thisMonth = mockOpportunities.filter(o => {
      const closeDate = new Date(o.expectedClose)
      const now = new Date()
      return closeDate.getMonth() === now.getMonth() && closeDate.getFullYear() === now.getFullYear()
    })
    
    const nextMonth = mockOpportunities.filter(o => {
      const closeDate = new Date(o.expectedClose)
      const nextMonthDate = new Date()
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)
      return closeDate.getMonth() === nextMonthDate.getMonth() && closeDate.getFullYear() === nextMonthDate.getFullYear()
    })

    return {
      thisMonth: {
        count: thisMonth.length,
        value: thisMonth.reduce((sum, o) => sum + o.value, 0),
        weightedValue: thisMonth.reduce((sum, o) => sum + (o.value * (o.probability / 100)), 0)
      },
      nextMonth: {
        count: nextMonth.length,
        value: nextMonth.reduce((sum, o) => sum + o.value, 0),
        weightedValue: nextMonth.reduce((sum, o) => sum + (o.value * (o.probability / 100)), 0)
      }
    }
  }

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status) => {
    const colors = {
      'active': 'success',
      'inactive': 'gray',
      'prospect': 'warning',
      'new': 'gray',
      'qualified': 'primary',
      'proposal': 'warning',
      'negotiation': 'accent',
      'closed-won': 'success',
      'closed-lost': 'error',
      'pending': 'warning',
      'processing': 'primary',
      'completed': 'success',
      'cancelled': 'error',
      'paid': 'success',
      'sent': 'warning',
      'overdue': 'error',
      'draft': 'gray'
    }
    return colors[status] || 'gray'
  }

  return {
    // Data
    mockCustomers,
    mockLeads,
    mockProducts,
    mockOrders,
    mockInvoices,
    mockOpportunities,
    mockPayments,
    mockPurchaseOrders,
    mockVendors,
    mockAccounts,
    mockTransactions,
    mockEmployees,
    mockLeaveRequests,
    
    // Analytics
    getLeadKPIs,
    getLeadsByStage,
    getOpportunityKPIs,
    getOpportunitiesByStage,
    getOpportunityForecast,
    
    // Utilities
    formatCurrency,
    getStatusColor
  }
}
// Helper functions for generating random data
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomElement = (array) => array[randomInt(0, array.length - 1)]
const randomFloat = (min, max, decimals = 2) => 
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals))

// Date helper functions
const addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const subtractDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

const formatDateTime = (date) => {
  return date.toISOString()
}

// Sample data pools
const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin']
const companies = ['TechCorp Solutions', 'Global Innovations Inc', 'FutureVision Systems', 'DataDrive Analytics', 'CloudPeak Technologies', 'Nexus Enterprises', 'Quantum Dynamics', 'Apex Industries', 'Synergy Partners', 'Velocity Ventures', 'Pinnacle Group', 'Horizon Digital', 'Summit Solutions', 'Pioneer Technologies', 'Catalyst Consulting']
const jobTitles = ['CEO', 'CTO', 'VP Sales', 'Marketing Director', 'Product Manager', 'Operations Manager', 'IT Director', 'Finance Manager', 'HR Director', 'Business Analyst', 'Project Manager', 'Sales Manager', 'Account Executive', 'Software Engineer', 'Consultant']
const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Real Estate', 'Transportation', 'Energy', 'Telecommunications', 'Media', 'Hospitality', 'Construction', 'Agriculture', 'Automotive']
const productNames = ['Enterprise CRM Suite', 'Cloud Analytics Platform', 'AI Customer Service Bot', 'Marketing Automation Tool', 'Project Management System', 'HR Management Platform', 'Financial Planning Software', 'Inventory Management System', 'Business Intelligence Dashboard', 'Customer Portal Solution']
const departments = ['Sales', 'Marketing', 'Engineering', 'Product', 'Operations', 'Finance', 'Human Resources', 'Customer Success', 'Support', 'Legal']

// Lead Generator
export const generateLeads = (count = 50) => {
  const leads = []
  const sources = ['WEBSITE', 'REFERRAL', 'COLD_CALL', 'EMAIL_CAMPAIGN', 'SOCIAL_MEDIA', 'TRADE_SHOW', 'ADVERTISEMENT', 'OTHER']
  const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'CONVERTED', 'LOST', 'DISQUALIFIED']
  
  for (let i = 1; i <= count; i++) {
    const firstName = randomElement(firstNames)
    const lastName = randomElement(lastNames)
    const company = randomElement(companies)
    
    leads.push({
      id: `lead-${i}`,
      lead_number: `LEAD${String(i).padStart(6, '0')}`,
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      company: company,
      job_title: randomElement(jobTitles),
      source: randomElement(sources),
      status: randomElement(statuses),
      score: randomInt(0, 100),
      assigned_to: `user-${randomInt(1, 5)}`,
      expected_value: randomFloat(10000, 500000),
      expected_close_date: formatDate(addDays(new Date(), randomInt(1, 90))),
      last_contact_date: formatDate(subtractDays(new Date(), randomInt(1, 30))),
      notes: `Initial contact made. ${randomElement(['Very interested', 'Needs follow-up', 'Budget confirmed', 'Decision maker identified', 'Competitive evaluation ongoing'])}.`,
      tags: randomElement([['hot-lead'], ['enterprise'], ['smb'], ['high-value'], ['partner-referral'], []]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(1, 60))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 7)))
    })
  }
  
  return leads
}

// Customer Generator
export const generateCustomers = (count = 30) => {
  const customers = []
  const types = ['INDIVIDUAL', 'BUSINESS', 'ENTERPRISE', 'NON_PROFIT', 'GOVERNMENT']
  const statuses = ['ACTIVE', 'INACTIVE', 'PROSPECT', 'CHURNED']
  const sizes = ['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']
  const stages = ['LEAD', 'MARKETING_QUALIFIED', 'SALES_QUALIFIED', 'CUSTOMER', 'EVANGELIST']
  
  for (let i = 1; i <= count; i++) {
    const companyName = randomElement(companies)
    const contactFirstName = randomElement(firstNames)
    const contactLastName = randomElement(lastNames)
    
    customers.push({
      id: `customer-${i}`,
      customer_number: `CUST${String(i).padStart(6, '0')}`,
      name: companyName,
      email: `contact@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      type: randomElement(types),
      status: randomElement(statuses),
      industry: randomElement(industries),
      company_size: randomElement(sizes),
      annual_revenue: randomFloat(100000, 50000000),
      website: `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      billing_address: {
        line_1: `${randomInt(100, 9999)} Business Ave`,
        line_2: `Suite ${randomInt(100, 999)}`,
        city: randomElement(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']),
        state: randomElement(['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'CA', 'TX', 'CA']),
        postal_code: String(randomInt(10000, 99999)),
        country: 'USA'
      },
      primary_contact: {
        id: `contact-${i}`,
        first_name: contactFirstName,
        last_name: contactLastName,
        email: `${contactFirstName.toLowerCase()}.${contactLastName.toLowerCase()}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
        job_title: randomElement(jobTitles),
        department: randomElement(departments),
        is_primary: true,
        is_decision_maker: Math.random() > 0.5
      },
      assigned_account_manager: `user-${randomInt(1, 5)}`,
      lifecycle_stage: randomElement(stages),
      acquisition_date: formatDate(subtractDays(new Date(), randomInt(30, 365))),
      lifetime_value: randomFloat(50000, 2000000),
      tags: randomElement([['vip'], ['enterprise'], ['strategic'], ['at-risk'], []]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(30, 365))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 30)))
    })
  }
  
  return customers
}

// Opportunity Generator
export const generateOpportunities = (count = 25) => {
  const opportunities = []
  const stages = ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']
  const sources = ['Direct Sales', 'Partner Referral', 'Marketing Campaign', 'Trade Show', 'Customer Referral', 'Website', 'Cold Call']
  const competitors = ['CompetitorX', 'RivalCorp', 'AlternativeSolutions', 'TechGiant', 'StartupDisruptor']
  
  for (let i = 1; i <= count; i++) {
    const stage = randomElement(stages)
    const amount = randomFloat(25000, 1000000)
    
    opportunities.push({
      id: `opp-${i}`,
      opportunity_number: `OPP${String(i).padStart(6, '0')}`,
      name: `${randomElement(productNames)} - ${randomElement(companies)}`,
      description: `Implementation of ${randomElement(productNames)} for improved business operations`,
      customer_id: `customer-${randomInt(1, 30)}`,
      lead_id: Math.random() > 0.5 ? `lead-${randomInt(1, 50)}` : null,
      stage: stage,
      probability: stage === 'CLOSED_WON' ? 100 : stage === 'CLOSED_LOST' ? 0 : randomInt(10, 90),
      amount: amount,
      currency: 'USD',
      expected_close_date: formatDate(addDays(new Date(), randomInt(1, 120))),
      actual_close_date: ['CLOSED_WON', 'CLOSED_LOST'].includes(stage) ? formatDate(subtractDays(new Date(), randomInt(1, 30))) : null,
      source: randomElement(sources),
      assigned_to: `user-${randomInt(1, 5)}`,
      competitors: randomInt(0, 3) > 0 ? [randomElement(competitors)] : [],
      products_interested: [randomElement(productNames)],
      decision_makers: [`contact-${randomInt(1, 30)}`],
      next_steps: randomElement(['Schedule demo', 'Send proposal', 'Follow up call', 'Contract review', 'Final negotiation']),
      loss_reason: stage === 'CLOSED_LOST' ? randomElement(['Budget', 'Competitor', 'No decision', 'Poor fit']) : null,
      tags: randomElement([['high-priority'], ['q4-target'], ['expansion'], []]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(1, 90))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 7)))
    })
  }
  
  return opportunities
}

// Order Generator
export const generateOrders = (count = 40) => {
  const orders = []
  const statuses = ['DRAFT', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
  const types = ['SALE', 'RETURN', 'EXCHANGE', 'SAMPLE']
  
  for (let i = 1; i <= count; i++) {
    const itemCount = randomInt(1, 5)
    const items = []
    let subtotal = 0
    
    for (let j = 1; j <= itemCount; j++) {
      const quantity = randomInt(1, 10)
      const unitPrice = randomFloat(100, 5000)
      const lineTotal = quantity * unitPrice
      
      items.push({
        id: `order-item-${i}-${j}`,
        product_id: `product-${randomInt(1, 20)}`,
        product_name: randomElement(productNames),
        product_sku: `SKU-${randomInt(1000, 9999)}`,
        quantity: quantity,
        unit_price: unitPrice,
        discount_percentage: randomInt(0, 20),
        discount_amount: lineTotal * (randomInt(0, 20) / 100),
        tax_rate: 10,
        tax_amount: lineTotal * 0.1,
        line_total: lineTotal
      })
      
      subtotal += lineTotal
    }
    
    const taxAmount = subtotal * 0.1
    const shippingAmount = randomFloat(10, 100)
    const discountAmount = subtotal * (randomInt(0, 15) / 100)
    const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount
    
    orders.push({
      id: `order-${i}`,
      order_number: `ORD${String(i).padStart(6, '0')}`,
      customer_id: `customer-${randomInt(1, 30)}`,
      opportunity_id: Math.random() > 0.5 ? `opp-${randomInt(1, 25)}` : null,
      status: randomElement(statuses),
      type: randomElement(types),
      order_date: formatDate(subtractDays(new Date(), randomInt(1, 60))),
      required_date: formatDate(addDays(new Date(), randomInt(1, 30))),
      shipped_date: ['SHIPPED', 'DELIVERED'].includes(randomElement(statuses)) ? formatDate(subtractDays(new Date(), randomInt(1, 10))) : null,
      subtotal: subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      currency: 'USD',
      payment_terms: randomElement(['Net 30', 'Net 60', 'Due on Receipt', '2/10 Net 30']),
      items: items,
      assigned_to: `user-${randomInt(1, 5)}`,
      tags: randomElement([['urgent'], ['vip'], ['recurring'], []]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(1, 60))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 7)))
    })
  }
  
  return orders
}

// Invoice Generator
export const generateInvoices = (count = 35) => {
  const invoices = []
  const statuses = ['DRAFT', 'SENT', 'VIEWED', 'PARTIAL_PAYMENT', 'PAID', 'OVERDUE', 'CANCELLED']
  const types = ['STANDARD', 'RECURRING', 'CREDIT_NOTE', 'PROFORMA']
  
  for (let i = 1; i <= count; i++) {
    const itemCount = randomInt(1, 4)
    const items = []
    let subtotal = 0
    
    for (let j = 1; j <= itemCount; j++) {
      const quantity = randomInt(1, 10)
      const unitPrice = randomFloat(100, 5000)
      const lineTotal = quantity * unitPrice
      
      items.push({
        id: `invoice-item-${i}-${j}`,
        description: randomElement(productNames),
        quantity: quantity,
        unit_price: unitPrice,
        discount_percentage: randomInt(0, 15),
        discount_amount: lineTotal * (randomInt(0, 15) / 100),
        tax_rate: 10,
        tax_amount: lineTotal * 0.1,
        line_total: lineTotal
      })
      
      subtotal += lineTotal
    }
    
    const taxAmount = subtotal * 0.1
    const discountAmount = subtotal * (randomInt(0, 10) / 100)
    const totalAmount = subtotal + taxAmount - discountAmount
    const paidAmount = randomElement(statuses) === 'PAID' ? totalAmount : randomElement(statuses) === 'PARTIAL_PAYMENT' ? totalAmount * randomFloat(0.3, 0.7) : 0
    
    invoices.push({
      id: `invoice-${i}`,
      invoice_number: `INV${String(i).padStart(6, '0')}`,
      order_id: Math.random() > 0.3 ? `order-${randomInt(1, 40)}` : null,
      customer_id: `customer-${randomInt(1, 30)}`,
      status: randomElement(statuses),
      type: randomElement(types),
      issue_date: formatDate(subtractDays(new Date(), randomInt(1, 45))),
      due_date: formatDate(addDays(new Date(), randomInt(1, 30))),
      payment_date: ['PAID', 'PARTIAL_PAYMENT'].includes(randomElement(statuses)) ? formatDate(subtractDays(new Date(), randomInt(1, 15))) : null,
      subtotal: subtotal,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      paid_amount: paidAmount,
      balance_due: totalAmount - paidAmount,
      currency: 'USD',
      payment_terms: randomElement(['Net 30', 'Net 60', 'Due on Receipt']),
      items: items,
      assigned_to: `user-${randomInt(1, 5)}`,
      created_at: formatDateTime(subtractDays(new Date(), randomInt(1, 45))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 7)))
    })
  }
  
  return invoices
}

// Product Generator
export const generateProducts = (count = 20) => {
  const products = []
  const types = ['PHYSICAL', 'DIGITAL', 'SERVICE', 'SUBSCRIPTION', 'BUNDLE']
  const statuses = ['ACTIVE', 'INACTIVE', 'DISCONTINUED', 'OUT_OF_STOCK', 'BACK_ORDER']
  const categories = ['Software', 'Hardware', 'Services', 'Training', 'Support', 'Consulting']
  
  for (let i = 1; i <= count; i++) {
    const price = randomFloat(100, 10000)
    const cost = price * randomFloat(0.3, 0.7)
    
    products.push({
      id: `product-${i}`,
      sku: `SKU-${randomInt(1000, 9999)}`,
      name: randomElement(productNames),
      description: `Professional ${randomElement(['enterprise', 'business', 'premium'])} solution for ${randomElement(['automation', 'optimization', 'management', 'analytics'])}`,
      short_description: `${randomElement(['Advanced', 'Professional', 'Enterprise'])} ${randomElement(['solution', 'platform', 'system'])}`,
      category_id: `category-${randomInt(1, 6)}`,
      category_name: randomElement(categories),
      type: randomElement(types),
      status: randomElement(statuses),
      price: price,
      cost: cost,
      currency: 'USD',
      images: [`https://via.placeholder.com/400x300?text=Product+${i}`],
      inventory: {
        quantity_on_hand: randomInt(0, 500),
        quantity_reserved: randomInt(0, 50),
        quantity_available: randomInt(0, 450),
        reorder_point: randomInt(10, 50),
        reorder_quantity: randomInt(50, 200)
      },
      tags: randomElement([['featured'], ['bestseller'], ['new'], ['sale'], []]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(30, 365))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 30)))
    })
  }
  
  return products
}

// Employee Generator
export const generateEmployees = (count = 25) => {
  const employees = []
  const types = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN', 'TEMPORARY']
  const statuses = ['ACTIVE', 'INACTIVE', 'ON_LEAVE', 'SUSPENDED']
  const positions = ['Sales Representative', 'Account Manager', 'Software Engineer', 'Product Manager', 'Marketing Specialist', 'HR Manager', 'Financial Analyst', 'Operations Manager', 'Customer Success Manager', 'Support Engineer']
  
  for (let i = 1; i <= count; i++) {
    const firstName = randomElement(firstNames)
    const lastName = randomElement(lastNames)
    
    employees.push({
      id: `employee-${i}`,
      employee_number: `EMP${String(i).padStart(6, '0')}`,
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      employment_type: randomElement(types),
      status: randomElement(statuses),
      department_id: `dept-${randomInt(1, 10)}`,
      department_name: randomElement(departments),
      position: randomElement(positions),
      manager_id: i > 5 ? `employee-${randomInt(1, 5)}` : null,
      hire_date: formatDate(subtractDays(new Date(), randomInt(30, 1825))),
      salary: randomFloat(40000, 150000),
      currency: 'USD',
      working_hours_per_week: 40,
      skills: randomElement([['JavaScript', 'React'], ['Sales', 'Negotiation'], ['Marketing', 'SEO'], ['Finance', 'Excel'], ['Management', 'Leadership']]),
      created_at: formatDateTime(subtractDays(new Date(), randomInt(30, 365))),
      updated_at: formatDateTime(subtractDays(new Date(), randomInt(0, 30)))
    })
  }
  
  return employees
}

// Analytics Data Generator
export const generateAnalyticsData = () => {
  // Revenue by month
  const revenueData = []
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentDate)
    date.setMonth(date.getMonth() - i)
    const monthName = months[date.getMonth()]
    const year = date.getFullYear()
    
    revenueData.push({
      month: `${monthName} ${year}`,
      revenue: randomFloat(100000, 500000),
      target: randomFloat(120000, 450000)
    })
  }
  
  // Sales by product
  const salesByProduct = productNames.slice(0, 5).map(product => ({
    product: product,
    sales: randomInt(50, 500),
    revenue: randomFloat(50000, 300000)
  }))
  
  // Customer acquisition
  const customerAcquisition = []
  for (let i = 29; i >= 0; i--) {
    customerAcquisition.push({
      date: formatDate(subtractDays(new Date(), i)),
      newCustomers: randomInt(1, 15),
      churnedCustomers: randomInt(0, 3)
    })
  }
  
  // Performance metrics
  const performanceMetrics = {
    conversionRate: randomFloat(15, 35, 1),
    averageDealSize: randomFloat(25000, 75000),
    customerLifetimeValue: randomFloat(100000, 500000),
    customerAcquisitionCost: randomFloat(1000, 5000),
    monthlyRecurringRevenue: randomFloat(200000, 800000),
    annualRecurringRevenue: randomFloat(2400000, 9600000),
    netPromoterScore: randomInt(30, 80),
    customerSatisfaction: randomFloat(4.0, 5.0, 1)
  }
  
  return {
    revenueData,
    salesByProduct,
    customerAcquisition,
    performanceMetrics
  }
}

// Master data generator
export const generateAllMockData = () => {
  return {
    leads: generateLeads(50),
    customers: generateCustomers(30),
    opportunities: generateOpportunities(25),
    orders: generateOrders(40),
    invoices: generateInvoices(35),
    products: generateProducts(20),
    employees: generateEmployees(25),
    analytics: generateAnalyticsData()
  }
}
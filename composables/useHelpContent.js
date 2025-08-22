export const useHelpContent = () => {
  const helpContent = {
    // General Business Terms
    crm: 'Customer Relationship Management - A system to manage interactions with current and potential customers',
    lead: 'A potential customer who has shown interest in your product or service but hasn\'t made a purchase yet',
    opportunity: 'A qualified lead with a high probability of converting into a sale',
    pipeline: 'The stages a lead goes through from initial contact to closing a deal',
    conversion_rate: 'The percentage of leads that become paying customers',
    
    // Lead Management
    lead_stage: 'Current status of the lead in your sales process:<br><strong>New:</strong> Just identified<br><strong>Qualified:</strong> Meets buying criteria<br><strong>Proposal:</strong> Quote/proposal sent<br><strong>Negotiation:</strong> Discussing terms<br><strong>Closed Won/Lost:</strong> Final outcome',
    lead_source: 'How the lead found out about your company (website, referral, advertisement, etc.)',
    lead_probability: 'Estimated likelihood (0-100%) that this lead will convert into a sale',
    lead_value: 'Estimated monetary value if this lead converts to a customer',
    lead_qualification: 'Process of determining if a lead is worth pursuing based on budget, authority, need, and timeline',
    
    // Customer Management
    customer_lifetime_value: 'Total revenue expected from a customer over their entire relationship with your company',
    customer_acquisition_cost: 'Average cost to acquire one new customer',
    customer_churn: 'Rate at which customers stop doing business with you',
    customer_segmentation: 'Grouping customers by shared characteristics (industry, size, behavior, etc.)',
    
    // Sales Terms
    sales_funnel: 'Visual representation of the customer journey from awareness to purchase',
    sales_cycle: 'Average time it takes to close a deal from first contact',
    quota: 'Sales target assigned to a salesperson or team for a specific period',
    deal_size: 'Average monetary value of closed deals',
    win_rate: 'Percentage of opportunities that result in closed deals',
    
    // Financial Terms
    mrr: 'Monthly Recurring Revenue - Predictable revenue generated each month from subscriptions',
    arr: 'Annual Recurring Revenue - Yearly recurring revenue from subscriptions',
    gross_margin: 'Revenue minus cost of goods sold, expressed as a percentage',
    accounts_receivable: 'Money owed to your company by customers for goods/services already delivered',
    accounts_payable: 'Money your company owes to suppliers for goods/services received',
    cash_flow: 'Movement of money in and out of your business',
    
    // Operations Terms
    inventory_turnover: 'How quickly inventory is sold and replaced over a period',
    reorder_point: 'Inventory level that triggers a new order to avoid stockouts',
    lead_time: 'Time between placing an order and receiving the goods',
    procurement: 'Process of finding, acquiring, and buying goods or services from external sources',
    vendor_management: 'Process of managing relationships with suppliers',
    
    // HR Terms
    employee_retention: 'Ability to keep employees over time, reducing turnover',
    performance_review: 'Regular evaluation of employee job performance and productivity',
    onboarding: 'Process of integrating new employees into the organization',
    org_chart: 'Visual representation of company structure and reporting relationships',
    
    // Analytics Terms
    kpi: 'Key Performance Indicator - Measurable value showing how effectively objectives are achieved',
    dashboard: 'Visual display of key metrics and data points in real-time',
    conversion_funnel: 'Analysis of steps customers take to complete a desired action',
    cohort_analysis: 'Analysis of user behavior over time by grouping users with shared characteristics',
    
    // Form Fields
    business_id: 'Unique identifier for your business account in the system',
    contact_name: 'Primary person you communicate with at the lead\'s company',
    estimated_value: 'Rough calculation of potential revenue if this lead becomes a customer',
    assigned_to: 'Team member responsible for managing this lead',
    last_contact: 'Most recent date you had any interaction with this lead',
    next_action: 'Planned next step in the sales process for this lead',
    
    // Status Terms
    active_customer: 'Customer currently doing business with you',
    prospect: 'Potential customer who matches your target profile but hasn\'t been contacted yet',
    qualified_lead: 'Lead that meets specific criteria (budget, authority, need, timeline)',
    hot_lead: 'Lead showing strong buying signals and high conversion probability',
    cold_lead: 'Lead with little engagement or low conversion probability',
    
    // Process Terms
    sales_enablement: 'Tools and processes that help sales teams sell more effectively',
    lead_nurturing: 'Process of developing relationships with prospects at every stage',
    lead_scoring: 'Ranking system to prioritize leads based on their conversion likelihood',
    territory_management: 'Assignment of sales representatives to specific geographic or market areas',
    
    // Technology Terms
    integration: 'Connecting different software systems to work together seamlessly',
    automation: 'Using technology to perform tasks without human intervention',
    workflow: 'Series of steps that tasks go through from start to completion',
    api: 'Application Programming Interface - How different software systems communicate',
    
    // Payment Processing Terms
    totalPayments: 'Total number of payment transactions processed across all customers and payment methods',
    completedPayments: 'Payment transactions that have been successfully processed and funds received',
    failedPayments: 'Payment attempts that were unsuccessful due to insufficient funds, expired cards, or other issues',
    totalRevenue: 'Sum of all successfully completed payment amounts, representing actual money received',
    paymentMethods: 'Different ways customers can pay: credit cards, bank transfers, digital wallets, ACH, etc.',
    paymentGateways: 'Third-party services (Stripe, PayPal, Square) that process payments securely between customers and merchants',
    recentPayments: 'Latest payment transactions showing current payment activity and trends',
    paymentReconciliation: 'Process of matching payment records with bank statements to ensure accuracy',
    processingFee: 'Cost charged by payment processors (typically 2-3%) for handling transactions',
    chargeback: 'Dispute initiated by customer\'s bank to reverse a payment, often due to fraud or dissatisfaction',
    refund: 'Money returned to customer for returned goods, cancelled services, or dispute resolution',
    netAmount: 'Final amount received after deducting processing fees from gross payment amount',
    paymentStatus: 'Current state of payment: pending (processing), completed (successful), failed (unsuccessful), or refunded',
    
    // Operations & Inventory Terms
    totalProducts: 'Complete count of all items in your product catalog, including active and inactive products',
    activeProducts: 'Products currently available for sale to customers (not discontinued or out of stock)',
    inventoryValue: 'Total monetary worth of all products currently in stock, calculated using cost or retail prices',
    lowStockProducts: 'Items with inventory levels below the minimum threshold, requiring immediate restocking',
    stockLevel: 'Current quantity of a product available in inventory',
    reorderLevel: 'Minimum stock quantity that triggers automatic or manual reordering process',
    safetyStock: 'Extra inventory kept as buffer against demand fluctuations and supply delays',
    productCategory: 'Grouping system to organize products by type, function, or target market for easier management',
    sku: 'Stock Keeping Unit - Unique identifier assigned to each product for inventory tracking',
    productLifecycle: 'Stages a product goes through: introduction, growth, maturity, and decline phases',
    discontinuedProduct: 'Item no longer being produced or sold, but may still have remaining inventory',
    
    // Procurement Terms
    procurement: 'Strategic process of sourcing, purchasing, and managing supplier relationships to acquire goods and services',
    purchaseOrders: 'Formal documents issued to vendors specifying products, quantities, prices, and delivery terms for procurement',
    activeVendors: 'Suppliers currently engaged in business relationships and approved for ongoing transactions',
    totalSpend: 'Complete amount of money spent on procurement activities across all vendors and categories',
    pendingApprovals: 'Purchase orders awaiting management authorization before being sent to suppliers',
    vendorManagement: 'Process of evaluating, selecting, and maintaining relationships with suppliers',
    buyerApproval: 'Authorization process requiring management sign-off for purchases above specified thresholds',
    procurementPolicy: 'Guidelines defining spending limits, approval workflows, and vendor selection criteria',
    costCenter: 'Department or division budgets that track and control procurement expenses',
    contractManagement: 'Administration of supplier agreements, including terms, renewals, and compliance monitoring',
    procurementWorkflow: 'End-to-end process from requisition creation to goods receipt, including approvals and vendor coordination',
    purchaseOrderStatus: 'Current stage of procurement: pending (awaiting approval), approved (sent to vendor), delivered (completed), or cancelled',
    procurementFilters: 'Search and filtering tools to quickly find specific purchase orders by vendor, department, status, or other criteria',
    purchaseOrderTracking: 'Comprehensive view of all purchase orders with status updates, delivery dates, and vendor information',
    vendorCategories: 'Classification system grouping suppliers by industry, product type, or service category for better management',
    
    // Inventory Management Terms
    inventoryManagement: 'Comprehensive system for tracking, controlling, and optimizing stock levels across all product categories',
    totalSKUs: 'Stock Keeping Units - Complete count of unique product identifiers tracked in the inventory system',
    inStock: 'Products currently available with quantities above the minimum reorder threshold',
    lowStock: 'Items with inventory levels at or below the reorder point, requiring immediate attention',
    outOfStock: 'Products with zero available quantity, requiring immediate restocking to fulfill orders',
    inventoryTurnover: 'Rate at which inventory is sold and replaced over a specific period, indicating demand and efficiency',
    stockMovement: 'Record of all inventory transactions including sales, returns, adjustments, and restocking activities',
    reorderAlerts: 'Automated notifications triggered when inventory levels fall below predetermined minimum thresholds',
    stockAdjustment: 'Manual corrections to inventory quantities due to damage, loss, counting errors, or other factors',
    inventoryValuation: 'Financial worth of all stock calculated using cost, market value, or other accounting methods',
    cycleCounting: 'Regular physical inventory counts of specific products to verify accuracy and identify discrepancies',
    
    // Accounting & Finance Terms
    accounting: 'Systematic recording, measuring, and communication of financial information about a business or organization',
    totalAssets: 'Complete value of everything a company owns: cash, equipment, property, investments, and accounts receivable',
    totalLiabilities: 'Sum of all debts and obligations owed by the company to creditors, suppliers, and lenders',
    netIncome: 'Company\'s total revenue minus all expenses, taxes, and costs - also known as profit or net earnings',
    cashFlow: 'Net amount of cash moving in and out of the business, indicating liquidity and operational efficiency',
    accountCategories: 'Chart of accounts organized by type: assets, liabilities, equity, revenue, and expenses for financial reporting',
    recentTransactions: 'Latest financial activities recorded in the accounting system, including debits and credits',
    accountBalances: 'Current monetary amounts in each account, showing the company\'s financial position at a point in time',
    journalEntries: 'Detailed records of all financial transactions using double-entry bookkeeping with debits and credits',
    accountingFilters: 'Search and filtering tools to locate specific transactions, accounts, or entries within financial records',
    chartOfAccounts: 'Organized listing of all accounts used by the company to categorize and track financial transactions',
    generalLedger: 'Master record containing all company accounts and their balances, serving as the foundation for financial statements',
    trialBalance: 'Report listing all accounts and their balances to verify that total debits equal total credits',
    doubleEntry: 'Accounting principle requiring every transaction to have equal debits and credits, maintaining balanced books',
    
    // Automation & Workflow Terms
    workflowAutomation: 'Technology-driven system that automatically executes business processes and tasks based on predefined rules and triggers',
    totalWorkflows: 'Complete count of all automated processes created in the system, including active, paused, and draft workflows',
    activeWorkflows: 'Currently running automated processes that are monitoring for triggers and executing actions',
    workflowExecutions: 'Number of times automated processes have been triggered and run, showing system activity and usage',
    workflowSuccessRate: 'Percentage of workflow executions that completed successfully without errors or failures',
    recentExecutions: 'Latest automated process runs showing which workflows triggered, when, and their completion status',
    workflowCategories: 'Classification system organizing workflows by business function: sales, marketing, operations, customer service',
    workflowTriggers: 'Events or conditions that initiate an automated process: form submissions, time schedules, data changes, or external signals',
    businessProcessAutomation: 'Use of technology to streamline and automate repetitive business tasks and workflows',
    workflowTemplate: 'Pre-built automation blueprint that can be customized and deployed for common business processes',
    conditionalLogic: 'If-then rules within workflows that determine different paths based on data values or conditions',
    workflowIntegration: 'Connection between automated processes and external systems, APIs, or applications',
    
    // AI & Chatbot Terms
    chatbotAssistant: 'Intelligent virtual assistant using artificial intelligence to automatically respond to customer inquiries and support requests',
    aiSuggestions: 'Machine learning-powered recommendations and insights generated from data analysis to improve business decisions',
    customerPortal: 'Self-service platform where customers can access account information, submit requests, and find support resources',
    naturalLanguageProcessing: 'AI technology that enables computers to understand, interpret, and respond to human language',
    conversationalAI: 'Advanced AI systems designed to engage in natural, human-like conversations with users',
    machineLearning: 'AI technology that automatically improves and adapts based on experience and data without explicit programming'
  }

  const getHelpText = (key) => {
    return helpContent[key] || 'Help content not available for this field'
  }

  const getFieldHelp = (context, field) => {
    const contextKey = `${context}_${field}`
    return helpContent[contextKey] || helpContent[field] || null
  }

  return {
    helpContent,
    getHelpText,
    getFieldHelp
  }
}
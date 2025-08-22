# Frontend Specification - Laravel-DDD CRM System

## Overview

This document provides comprehensive specifications for building a frontend application for our multi-tenant CRM/ERP system. The backend is built using Laravel 11 with Domain-Driven Design architecture and supports six major business modules.

## System Architecture

### Multi-Tenancy
- **Database per Tenant**: Each client has their own isolated database
- **Subdomain Resolution**: `client1.crm.test`, `client2.crm.test`
- **Tenant Context**: All data is automatically scoped to the current tenant
- **Cross-Tenant Security**: Complete data isolation between tenants

### Authentication & Authorization
- **Laravel Sanctum**: API token-based authentication
- **Role-Based Access Control**: Multiple user roles with granular permissions
- **Session Management**: Stateful authentication for SPAs
- **Multi-Device Support**: Token management across devices

## Module Specifications

## 1. CRM Module

### Lead Management

**Lead Entity Structure:**
```typescript
interface Lead {
  id: string;
  lead_number: string; // Auto-generated: LEAD######
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title?: string;
  source: 'WEBSITE' | 'REFERRAL' | 'COLD_CALL' | 'EMAIL_CAMPAIGN' | 'SOCIAL_MEDIA' | 'TRADE_SHOW' | 'ADVERTISEMENT' | 'OTHER';
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'CONVERTED' | 'LOST' | 'DISQUALIFIED';
  score: number; // 0-100 calculated score
  assigned_to?: string; // User ID
  expected_value?: number;
  expected_close_date?: string;
  last_contact_date?: string;
  notes?: string;
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

**Lead Features:**
- **Lead Capture Forms**: Multi-step lead capture with validation
- **Lead Scoring**: Real-time score calculation based on engagement
- **Lead Assignment**: Manual and automatic assignment to sales reps
- **Lead Qualification**: Qualification workflow with status progression
- **Lead Conversion**: Convert leads to customers and opportunities
- **Activity Tracking**: Timeline of all interactions and touchpoints
- **Lead Source Tracking**: Attribution and ROI analysis by source
- **Bulk Operations**: Import, export, and bulk status updates

**Lead UI Components Needed:**
- Lead list view with filtering, sorting, pagination
- Lead detail view with activity timeline
- Lead capture forms (embedded and standalone)
- Lead scoring dashboard
- Lead assignment interface
- Lead conversion workflow
- Activity logging interface
- Lead source analytics

### Customer Management

**Customer Entity Structure:**
```typescript
interface Customer {
  id: string;
  customer_number: string; // Auto-generated: CUST######
  name: string;
  email: string;
  phone?: string;
  type: 'INDIVIDUAL' | 'BUSINESS' | 'ENTERPRISE' | 'NON_PROFIT' | 'GOVERNMENT';
  status: 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'CHURNED' | 'BLACKLISTED';
  industry?: string;
  company_size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
  annual_revenue?: number;
  website?: string;
  billing_address: Address;
  shipping_address?: Address;
  primary_contact: Contact;
  additional_contacts: Contact[];
  assigned_account_manager?: string;
  lifecycle_stage: 'LEAD' | 'MARKETING_QUALIFIED' | 'SALES_QUALIFIED' | 'CUSTOMER' | 'EVANGELIST' | 'LOST';
  acquisition_date: string;
  lifetime_value: number;
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  job_title?: string;
  department?: string;
  is_primary: boolean;
  is_decision_maker: boolean;
}

interface Address {
  line_1: string;
  line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
```

**Customer Features:**
- **360-Degree Customer View**: Complete customer profile with history
- **Contact Management**: Multiple contacts per customer with roles
- **Customer Segmentation**: Dynamic segmentation based on criteria
- **Customer Journey Tracking**: Lifecycle stage progression
- **Account Management**: Assigned account managers and territories
- **Customer Health Scoring**: Engagement and satisfaction metrics
- **Customer Communications**: Email, call, and meeting history
- **Document Management**: Contracts, proposals, and attachments

### Opportunity Management

**Opportunity Entity Structure:**
```typescript
interface Opportunity {
  id: string;
  opportunity_number: string; // Auto-generated: OPP######
  name: string;
  description?: string;
  customer_id: string;
  lead_id?: string; // If converted from lead
  stage: 'PROSPECTING' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  probability: number; // 0-100 percentage
  amount: number;
  currency: string;
  expected_close_date: string;
  actual_close_date?: string;
  source: string;
  assigned_to: string; // Sales rep
  competitors: string[];
  products_interested: string[];
  decision_makers: string[];
  next_steps: string;
  loss_reason?: string;
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

**Opportunity Features:**
- **Sales Pipeline**: Visual pipeline with drag-drop stage progression
- **Opportunity Scoring**: Win probability calculation
- **Forecasting**: Revenue forecasting based on pipeline
- **Competitive Analysis**: Competitor tracking and win/loss analysis
- **Product Association**: Link opportunities to specific products/services
- **Team Collaboration**: Shared opportunity management
- **Proposal Management**: Proposal generation and tracking
- **Sales Process Automation**: Automated workflows and reminders

## 2. Sales Module

### Order Management

**Order Entity Structure:**
```typescript
interface Order {
  id: string;
  order_number: string; // Auto-generated: ORD######
  customer_id: string;
  opportunity_id?: string;
  status: 'DRAFT' | 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
  type: 'SALE' | 'RETURN' | 'EXCHANGE' | 'SAMPLE' | 'WARRANTY';
  order_date: string;
  required_date?: string;
  shipped_date?: string;
  delivery_date?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  payment_terms: string;
  payment_method?: string;
  billing_address: Address;
  shipping_address: Address;
  items: OrderItem[];
  notes?: string;
  internal_notes?: string;
  assigned_to: string; // Sales rep
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  line_total: number;
  notes?: string;
}
```

**Order Features:**
- **Order Creation**: Multi-step order creation with product selection
- **Order Status Tracking**: Real-time order status updates
- **Order Fulfillment**: Pick, pack, ship workflow
- **Order Modifications**: Edit orders before confirmation
- **Order Templates**: Reusable order templates for repeat customers
- **Bulk Order Processing**: Process multiple orders simultaneously
- **Order Analytics**: Order performance and trend analysis
- **Print/Export**: Order confirmations, packing slips, shipping labels

### Invoice Management

**Invoice Entity Structure:**
```typescript
interface Invoice {
  id: string;
  invoice_number: string; // Auto-generated: INV######
  order_id?: string;
  customer_id: string;
  status: 'DRAFT' | 'SENT' | 'VIEWED' | 'PARTIAL_PAYMENT' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'REFUNDED';
  type: 'STANDARD' | 'RECURRING' | 'CREDIT_NOTE' | 'DEBIT_NOTE' | 'PROFORMA';
  issue_date: string;
  due_date: string;
  payment_date?: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  balance_due: number;
  currency: string;
  payment_terms: string;
  billing_address: Address;
  items: InvoiceItem[];
  notes?: string;
  terms_conditions?: string;
  assigned_to: string;
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  discount_amount: number;
  tax_rate: number;
  tax_amount: number;
  line_total: number;
}
```

**Invoice Features:**
- **Invoice Generation**: Automatic and manual invoice creation
- **Invoice Templates**: Customizable invoice templates with branding
- **Payment Tracking**: Payment status and history tracking
- **Recurring Invoices**: Automated recurring billing
- **Payment Reminders**: Automated overdue payment reminders
- **Credit Notes**: Refund and credit management
- **Multi-Currency**: Support for multiple currencies
- **Payment Gateway Integration**: Online payment processing
- **Invoice Analytics**: Payment performance and aging reports

### Payment Management

**Payment Entity Structure:**
```typescript
interface Payment {
  id: string;
  payment_number: string; // Auto-generated: PAY######
  invoice_id?: string;
  customer_id: string;
  type: 'FULL_PAYMENT' | 'PARTIAL_PAYMENT' | 'ADVANCE_PAYMENT' | 'REFUND' | 'CHARGEBACK';
  method: 'CASH' | 'CHECK' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'STRIPE' | 'OTHER';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  amount: number;
  currency: string;
  payment_date: string;
  processed_date?: string;
  transaction_id?: string;
  gateway_response?: Record<string, any>;
  reference_number?: string;
  notes?: string;
  processed_by: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}
```

**Payment Features:**
- **Payment Processing**: Multiple payment method support
- **Payment Gateway Integration**: Stripe, PayPal, bank transfers
- **Payment Reconciliation**: Automatic invoice payment matching
- **Refund Management**: Full and partial refund processing
- **Payment Analytics**: Payment performance and failure analysis
- **Payment Schedules**: Installment and recurring payment plans
- **Payment Security**: PCI compliance and secure processing
- **Payment Reporting**: Detailed payment reports and statements

## 3. Operations Module

### Product Management

**Product Entity Structure:**
```typescript
interface Product {
  id: string;
  sku: string; // Unique product identifier
  name: string;
  description?: string;
  short_description?: string;
  category_id: string;
  brand_id?: string;
  type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE' | 'SUBSCRIPTION' | 'BUNDLE';
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'OUT_OF_STOCK' | 'BACK_ORDER';
  price: number;
  cost: number;
  currency: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  images: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  inventory: InventoryData;
  seo: {
    meta_title?: string;
    meta_description?: string;
    keywords: string[];
  };
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface ProductAttribute {
  id: string;
  name: string;
  value: string;
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'SELECT' | 'MULTI_SELECT';
}

interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  cost: number;
  attributes: Record<string, string>;
  inventory: InventoryData;
}

interface InventoryData {
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number;
  reorder_point: number;
  reorder_quantity: number;
  warehouse_locations: string[];
}
```

**Product Features:**
- **Product Catalog**: Comprehensive product catalog management
- **Product Variants**: Size, color, and attribute-based variants
- **Product Bundling**: Bundle products for promotional pricing
- **Product Categories**: Hierarchical category management
- **Product Images**: Multiple image uploads with optimization
- **Product Attributes**: Custom attributes and specifications
- **Product Search**: Advanced search and filtering
- **Product Import/Export**: Bulk product data management
- **Product Analytics**: Performance tracking and insights

### Inventory Management

**Inventory Entity Structure:**
```typescript
interface Inventory {
  id: string;
  product_id: string;
  warehouse_id: string;
  location: string; // Specific location within warehouse
  quantity_on_hand: number;
  quantity_reserved: number;
  quantity_available: number;
  quantity_incoming: number;
  reorder_point: number;
  reorder_quantity: number;
  last_counted_date?: string;
  last_movement_date?: string;
  average_cost: number;
  total_value: number;
  movements: StockMovement[];
  created_at: string;
  updated_at: string;
}

interface StockMovement {
  id: string;
  type: 'INBOUND' | 'OUTBOUND' | 'TRANSFER' | 'ADJUSTMENT' | 'RETURN';
  reason: 'PURCHASE' | 'SALE' | 'TRANSFER' | 'ADJUSTMENT' | 'RETURN' | 'DAMAGE' | 'THEFT' | 'EXPIRED';
  quantity: number;
  unit_cost?: number;
  reference_number?: string;
  reference_type?: string;
  notes?: string;
  processed_by: string;
  processed_at: string;
}
```

**Inventory Features:**
- **Real-Time Inventory**: Live inventory level tracking
- **Multi-Warehouse**: Support for multiple warehouse locations
- **Stock Movements**: Detailed stock movement history
- **Inventory Adjustments**: Manual inventory corrections
- **Reorder Management**: Automatic reorder point notifications
- **Inventory Transfers**: Inter-warehouse stock transfers
- **Cycle Counting**: Periodic inventory counting schedules
- **Inventory Valuation**: FIFO, LIFO, and average cost methods
- **Low Stock Alerts**: Automated low stock notifications
- **Inventory Analytics**: Turnover rates and optimization insights

### Purchase Order Management

**Purchase Order Entity Structure:**
```typescript
interface PurchaseOrder {
  id: string;
  po_number: string; // Auto-generated: PO######
  supplier_id: string;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT' | 'ACKNOWLEDGED' | 'PARTIAL_RECEIVED' | 'RECEIVED' | 'INVOICED' | 'CLOSED' | 'CANCELLED';
  type: 'STANDARD' | 'BLANKET' | 'PLANNED' | 'CONTRACT' | 'EMERGENCY';
  order_date: string;
  expected_delivery_date?: string;
  delivery_date?: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  currency: string;
  payment_terms: string;
  delivery_address: Address;
  items: PurchaseOrderItem[];
  notes?: string;
  terms_conditions?: string;
  created_by: string;
  approved_by?: string;
  approved_at?: string;
  tags: string[];
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}

interface PurchaseOrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  quantity_ordered: number;
  quantity_received: number;
  unit_price: number;
  tax_rate: number;
  tax_amount: number;
  line_total: number;
  expected_delivery_date?: string;
  notes?: string;
}
```

**Purchase Order Features:**
- **PO Creation**: Multi-step purchase order creation
- **Supplier Management**: Supplier database and performance tracking
- **Approval Workflows**: Multi-level approval processes
- **Receiving Management**: Goods receipt and inspection
- **Partial Deliveries**: Handle partial shipments and backorders
- **PO Templates**: Reusable templates for recurring orders
- **Cost Analysis**: Price comparison and cost tracking
- **Vendor Performance**: Delivery and quality metrics
- **PO Analytics**: Purchasing insights and optimization

## 4. Finance Module

### Chart of Accounts

**Account Entity Structure:**
```typescript
interface ChartOfAccount {
  id: string;
  account_code: string; // Unique account code
  account_name: string;
  account_type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  account_subtype: 'CURRENT_ASSET' | 'FIXED_ASSET' | 'CURRENT_LIABILITY' | 'LONG_TERM_LIABILITY' | 'OWNERS_EQUITY' | 'OPERATING_REVENUE' | 'NON_OPERATING_REVENUE' | 'OPERATING_EXPENSE' | 'NON_OPERATING_EXPENSE';
  parent_account_id?: string;
  is_active: boolean;
  is_system_account: boolean;
  normal_balance: 'DEBIT' | 'CREDIT';
  description?: string;
  tax_account: boolean;
  bank_account: boolean;
  reconcilable: boolean;
  current_balance: number;
  created_at: string;
  updated_at: string;
}
```

### Journal Entries

**Journal Entry Entity Structure:**
```typescript
interface JournalEntry {
  id: string;
  entry_number: string; // Auto-generated: JE######
  transaction_date: string;
  posting_date: string;
  reference: string;
  description: string;
  source_module: 'MANUAL' | 'SALES' | 'PURCHASING' | 'INVENTORY' | 'PAYROLL' | 'BANKING';
  source_document_id?: string;
  source_document_type?: string;
  total_debit: number;
  total_credit: number;
  currency: string;
  status: 'DRAFT' | 'POSTED' | 'REVERSED';
  posted_by?: string;
  posted_at?: string;
  reversal_entry_id?: string;
  lines: JournalEntryLine[];
  attachments: string[];
  notes?: string;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface JournalEntryLine {
  id: string;
  account_id: string;
  account_code: string;
  account_name: string;
  debit_amount: number;
  credit_amount: number;
  description?: string;
  reference?: string;
  cost_center?: string;
  project_id?: string;
}
```

**Finance Features:**
- **Double-Entry Bookkeeping**: Enforced balanced journal entries
- **General Ledger**: Complete transaction history by account
- **Trial Balance**: Real-time trial balance reporting
- **Financial Statements**: P&L, Balance Sheet, Cash Flow
- **Budget Management**: Budget creation and variance analysis
- **Cost Center Tracking**: Department and project cost allocation
- **Multi-Currency**: Foreign exchange and currency conversion
- **Bank Reconciliation**: Automated bank statement matching
- **Tax Management**: Tax calculation and reporting
- **Financial Analytics**: Financial KPIs and trend analysis

## 5. HRM Module

### Employee Management

**Employee Entity Structure:**
```typescript
interface Employee {
  id: string;
  employee_number: string; // Auto-generated: EMP######
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  mobile?: string;
  address: Address;
  hire_date: string;
  termination_date?: string;
  employment_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'TEMPORARY' | 'CONSULTANT';
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'TERMINATED' | 'RESIGNED' | 'RETIRED' | 'DECEASED';
  manager_id?: string;
  department_id: string;
  position_id: string;
  salary?: number;
  currency: string;
  hourly_rate?: number;
  working_hours_per_week: number;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  };
  skills: string[];
  qualifications: string[];
  is_active: boolean;
  is_eligible_for_rehire: boolean;
  custom_fields: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

### Department & Position Management

**Department Entity Structure:**
```typescript
interface Department {
  id: string;
  name: string;
  description?: string;
  code: string;
  parent_department_id?: string;
  manager_id?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'RESTRUCTURING' | 'DISBANDED';
  budget?: number;
  currency: string;
  location?: string;
  cost_center?: string;
  is_active: boolean;
  employee_count: number;
  created_at: string;
  updated_at: string;
}

interface Position {
  id: string;
  title: string;
  description?: string;
  department_id: string;
  reports_to_position_id?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED' | 'UNDER_REVIEW';
  employment_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY';
  salary_min?: number;
  salary_max?: number;
  currency: string;
  required_skills: string[];
  preferred_qualifications: string[];
  responsibilities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

### Time & Attendance

**Time Entry Entity Structure:**
```typescript
interface TimeEntry {
  id: string;
  employee_id: string;
  date: string;
  start_time?: string;
  end_time?: string;
  hours_worked: number;
  overtime_hours: number;
  entry_type: 'REGULAR' | 'OVERTIME' | 'DOUBLE_TIME' | 'HOLIDAY' | 'SICK' | 'VACATION' | 'TRAINING';
  project_id?: string;
  task_description?: string;
  location?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  billable: boolean;
  rate_per_hour?: number;
  created_at: string;
  updated_at: string;
}
```

### Leave Management

**Leave Entity Structure:**
```typescript
interface Leave {
  id: string;
  employee_id: string;
  leave_type: 'ANNUAL' | 'SICK' | 'MATERNITY' | 'PATERNITY' | 'BEREAVEMENT' | 'PERSONAL' | 'UNPAID';
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'IN_PROGRESS' | 'COMPLETED';
  approved_by?: string;
  approved_at?: string;
  rejection_reason?: string;
  covering_employee_id?: string;
  attachments: string[];
  emergency_contact_notified: boolean;
  created_at: string;
  updated_at: string;
}
```

**HRM Features:**
- **Employee Directory**: Comprehensive employee database
- **Organizational Chart**: Visual hierarchy and reporting structure
- **Time Tracking**: Clock in/out with project allocation
- **Leave Management**: Leave requests and approval workflows
- **Performance Reviews**: Goal setting and evaluation tracking
- **Payroll Integration**: Salary and time data for payroll
- **Employee Self-Service**: Employee portal for personal data
- **HR Analytics**: Workforce metrics and insights
- **Document Management**: Employee documents and records
- **Compliance Tracking**: Regulatory compliance monitoring

## 6. Analytics Module

### Metrics & KPIs

**Metric Entity Structure:**
```typescript
interface Metric {
  id: string;
  name: string;
  description?: string;
  type: 'COUNT' | 'SUM' | 'AVERAGE' | 'PERCENTAGE' | 'RATIO' | 'GROWTH_RATE' | 'CONVERSION_RATE' | 'CUSTOM';
  configuration: MetricConfiguration;
  thresholds: MetricThreshold[];
  current_value?: number;
  target_value?: number;
  unit?: string;
  calculation_frequency: 'REAL_TIME' | 'MINUTELY' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  is_active: boolean;
  data_source_id?: string;
  tags: string[];
  last_calculated_at?: string;
  next_calculation_at?: string;
  created_at: string;
  updated_at: string;
}

interface MetricConfiguration {
  data_source: string;
  query: string;
  aggregations: string[];
  filters: Record<string, any>;
  group_by: string[];
  time_field?: string;
  value_field?: string;
}

interface MetricThreshold {
  name: string;
  condition: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS' | 'NOT_EQUALS' | 'PERCENTAGE_CHANGE';
  value: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}
```

### Dashboards & Visualizations

**Dashboard Entity Structure:**
```typescript
interface Dashboard {
  id: string;
  name: string;
  description?: string;
  type: 'EXECUTIVE' | 'OPERATIONAL' | 'ANALYTICAL' | 'REAL_TIME';
  layout: DashboardLayout;
  filters: DashboardFilter[];
  is_public: boolean;
  is_favorite: boolean;
  refresh_interval_seconds: number;
  shared_with: string[];
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface DashboardLayout {
  grid_size: {
    columns: number;
    rows: number;
  };
  widgets: WidgetLayout[];
}

interface WidgetLayout {
  widget_id: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

interface Widget {
  id: string;
  name: string;
  type: 'LINE_CHART' | 'BAR_CHART' | 'PIE_CHART' | 'SCATTER_PLOT' | 'HEATMAP' | 'GAUGE' | 'TABLE' | 'SCORECARD' | 'TREND';
  configuration: WidgetConfiguration;
  metric_id?: string;
  query_id?: string;
  refresh_interval_seconds: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WidgetConfiguration {
  visualization_type: string;
  data_source: string;
  series: any[];
  axes: any;
  colors: string[];
  styling: Record<string, any>;
}
```

### Reports & Alerts

**Report Entity Structure:**
```typescript
interface Report {
  id: string;
  name: string;
  description?: string;
  type: 'TABULAR' | 'CHART' | 'DASHBOARD' | 'EXECUTIVE_SUMMARY' | 'DETAILED_ANALYSIS';
  configuration: ReportConfiguration;
  schedule?: ReportSchedule;
  recipients: string[];
  format: 'PDF' | 'EXCEL' | 'CSV' | 'HTML';
  is_active: boolean;
  last_generated_at?: string;
  next_generation_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface Alert {
  id: string;
  name: string;
  description?: string;
  metric_id: string;
  conditions: AlertCondition[];
  notification_channels: NotificationChannel[];
  escalation_rules: EscalationRule[];
  is_active: boolean;
  is_snoozed: boolean;
  snooze_until?: string;
  last_triggered_at?: string;
  trigger_count: number;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
```

**Analytics Features:**
- **Real-Time Dashboards**: Live data visualization with auto-refresh
- **Custom Metrics**: User-defined KPIs with complex calculations
- **Interactive Charts**: Drill-down and cross-filtering capabilities
- **Alert System**: Threshold-based alerts with escalation
- **Report Generation**: Scheduled and on-demand reports
- **Data Exploration**: Ad-hoc query and analysis tools
- **Performance Monitoring**: System and business performance tracking
- **Predictive Analytics**: Trend analysis and forecasting
- **Mobile Analytics**: Mobile-optimized dashboard views
- **Export Capabilities**: Multiple format data export options

## Frontend Architecture Recommendations

### Technology Stack Suggestions

**Framework Options:**
- **React + TypeScript**: Component-based with strong typing
- **Vue 3 + TypeScript**: Progressive framework with composition API
- **Angular**: Full-featured framework with built-in features

**State Management:**
- **Redux Toolkit** (React): Predictable state management
- **Pinia** (Vue): Intuitive state management
- **NgRx** (Angular): Reactive state management

**UI Component Libraries:**
- **Material-UI** or **Ant Design** (React)
- **Vuetify** or **Quasar** (Vue)
- **Angular Material** (Angular)

**Additional Libraries:**
- **React Query/TanStack Query**: Server state management
- **Chart.js** or **D3.js**: Data visualization
- **React Hook Form** or **Formik**: Form management
- **React Router** or **Vue Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Application Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (buttons, inputs, etc.)
│   ├── charts/          # Chart components for analytics
│   ├── forms/           # Form components
│   └── layout/          # Layout components (header, sidebar, etc.)
├── pages/               # Page components
│   ├── crm/            # CRM module pages
│   ├── sales/          # Sales module pages
│   ├── operations/     # Operations module pages
│   ├── finance/        # Finance module pages
│   ├── hrm/            # HRM module pages
│   ├── analytics/      # Analytics module pages
│   └── auth/           # Authentication pages
├── hooks/              # Custom React hooks (or composables for Vue)
├── services/           # API service layer
├── store/              # State management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
└── assets/             # Static assets
```

### Key Frontend Features to Implement

**Authentication & Security:**
- Login/logout with token management
- Role-based route protection
- Multi-tenant context switching
- Session timeout handling
- Password reset functionality

**Navigation & Layout:**
- Responsive sidebar navigation
- Breadcrumb navigation
- Module-based menu organization
- Search functionality
- User profile dropdown
- Tenant switcher (for multi-tenant users)

**Data Management:**
- Infinite scrolling or pagination
- Real-time data updates
- Optimistic updates
- Offline support (optional)
- Data caching and synchronization
- Form validation and error handling

**User Experience:**
- Loading states and skeletons
- Error boundaries and fallbacks
- Toast notifications
- Confirmation dialogs
- Keyboard shortcuts
- Accessibility compliance (WCAG 2.1)

**Analytics & Visualization:**
- Interactive charts and graphs
- Dashboard builder interface
- Real-time data streaming
- Export functionality
- Print-friendly views
- Mobile-responsive charts

### API Integration Patterns

**Base API Service:**
```typescript
class ApiService {
  private baseURL: string;
  private token: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  setToken(token: string) {
    this.token = token;
  }
  
  setTenant(tenantId: string) {
    // Set tenant context for multi-tenancy
  }
  
  async get<T>(endpoint: string, params?: any): Promise<T> {
    // Implement GET request
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    // Implement POST request
  }
  
  async put<T>(endpoint: string, data: any): Promise<T> {
    // Implement PUT request
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    // Implement DELETE request
  }
}
```

**Module-Specific Services:**
```typescript
class CRMService extends ApiService {
  async getLeads(filters?: LeadFilters): Promise<PaginatedResponse<Lead>> {
    return this.get('/api/v1/crm/leads', filters);
  }
  
  async createLead(lead: CreateLeadDTO): Promise<Lead> {
    return this.post('/api/v1/crm/leads', lead);
  }
  
  async updateLead(id: string, lead: UpdateLeadDTO): Promise<Lead> {
    return this.put(`/api/v1/crm/leads/${id}`, lead);
  }
  
  async convertLead(id: string, conversion: LeadConversionDTO): Promise<LeadConversionResult> {
    return this.post(`/api/v1/crm/leads/${id}/convert`, conversion);
  }
}
```

### Mock Data Strategy

For initial development with mock data:

**Mock Data Structure:**
```typescript
// Mock data generators
const generateMockLeads = (count: number): Lead[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${i + 1}`,
    lead_number: `LEAD${String(i + 1).padStart(6, '0')}`,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    company: faker.company.companyName(),
    source: faker.helpers.arrayElement(['WEBSITE', 'REFERRAL', 'COLD_CALL']),
    status: faker.helpers.arrayElement(['NEW', 'CONTACTED', 'QUALIFIED']),
    score: faker.datatype.number({ min: 0, max: 100 }),
    // ... other fields
  }));
};
```

**Mock API Layer:**
```typescript
class MockApiService {
  private mockData: {
    leads: Lead[];
    customers: Customer[];
    opportunities: Opportunity[];
    // ... other entities
  };
  
  constructor() {
    this.mockData = {
      leads: generateMockLeads(100),
      customers: generateMockCustomers(50),
      opportunities: generateMockOpportunities(30),
      // ... initialize other mock data
    };
  }
  
  async getLeads(filters?: LeadFilters): Promise<PaginatedResponse<Lead>> {
    let filteredLeads = this.mockData.leads;
    
    // Apply filters
    if (filters?.status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === filters.status);
    }
    
    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      data: filteredLeads.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredLeads.length,
        totalPages: Math.ceil(filteredLeads.length / limit)
      }
    };
  }
}
```

### Performance Considerations

**Optimization Strategies:**
- Code splitting by module/route
- Lazy loading of components
- Image optimization and lazy loading
- Virtual scrolling for large lists
- Debounced search inputs
- Memoization of expensive calculations
- Service worker for caching
- Bundle size optimization

**Real-Time Features:**
- WebSocket connections for live updates
- Server-Sent Events for notifications
- Optimistic updates for better UX
- Background data synchronization
- Conflict resolution for concurrent edits

### Testing Strategy

**Testing Levels:**
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API integration and complex workflows
- **E2E Tests**: Complete user journeys across modules
- **Visual Regression Tests**: UI consistency validation
- **Performance Tests**: Load time and responsiveness testing

**Testing Tools:**
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress** or **Playwright**: E2E testing
- **Storybook**: Component development and testing
- **MSW**: API mocking for tests

This specification provides a comprehensive foundation for building a modern, scalable frontend for the Laravel-DDD CRM system. The frontend team can use this as a reference to understand all available features, data structures, and integration patterns needed to create a complete user interface for the system.
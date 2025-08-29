# 🚀 Synthesq CRM Demo

A modern, extensible CRM/ERP platform built with **Nuxt 3**, **Vue 3**, and **Tailwind CSS**. This demo showcases industry-specific extensions and comprehensive business management capabilities.

[![Deploy to GitHub Pages](https://github.com/username/repo/actions/workflows/deploy.yml/badge.svg)](https://github.com/username/repo/actions/workflows/deploy.yml)

## 🌟 **Live Demo**
**[app.synthesq.com](https://app.synthesq.com)** 

## 📋 **Demo Credentials**
- **Business ID**: `synthesq-demo`
- **Email**: `admin@synthesq.com`
- **Password**: `admin123`

---

## ✨ **Key Features**

### 🏢 **Core CRM/ERP Modules**
- **📊 Dashboard** - Real-time business metrics and analytics
- **👥 CRM** - Lead management, customer 360°, opportunity tracking
- **💰 Sales** - Order management, invoicing, payment tracking
- **🏭 Operations** - Product catalog, inventory, procurement
- **💼 Finance** - Accounting, chart of accounts, financial reporting
- **👨‍💼 People** - HR management, employee tracking
- **📈 Analytics** - Custom reports and business intelligence

### 🔌 **Industry Extensions System**
Transform your CRM for specific industries with ready-to-install extensions:

#### **🏥 Active Extensions**
- **Healthcare Suite** - HIPAA compliance, patient management, medical billing
- **Manufacturing Pro** - Production planning, quality control, supply chain
- **Real Estate Plus** - Property listings, transaction tracking, market analysis

#### **📦 Available Extensions**
- **Financial Services** - Portfolio management, compliance tracking
- **Education Management** - Student records, grade management
- **Hospitality Suite** - Reservations, guest services, event coordination
- **Legal Practice** - Case management, time tracking
- **Retail Management** - POS systems, loyalty programs

#### **🎯 Custom Extensions**
Request custom-built extensions for your specific industry needs through our integrated request system.

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Themes** - Professional color schemes with industry-specific gradients
- **Interactive Notifications** - Real-time notification dropdown with smart filtering
- **Intuitive Navigation** - Collapsible sidebar with search functionality

---

## 🛠️ **Tech Stack**

| Technology | Purpose | Version |
|------------|---------|---------|
| **Nuxt 3** | Vue.js Framework | Latest |
| **Vue 3** | Frontend Framework | Latest |
| **Pinia** | State Management | Latest |
| **Tailwind CSS** | Styling Framework | Latest |
| **Node.js** | Runtime | 20+ |

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 20 or higher
- npm or yarn package manager

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/synthesq-crm-demo.git
cd synthesq-crm-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `https://localhost:3000` to see your local instance.

### **Docker Development (Optional)**

If you prefer using Docker for development:

```bash
# Using Docker Compose (recommended)
docker-compose up

# Or build and run manually
docker build -t synthesq-crm .
docker run -p 3000:3000 -v $(pwd):/app synthesq-crm
```

### **Available Scripts**

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run generate     # Generate static site for deployment
npm run preview      # Preview production build

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
```

---

## 📁 **Project Structure**

```
├── components/              # Reusable Vue components
│   ├── charts/             # Dashboard chart components
│   └── ui/                 # UI components (notifications, dropdowns)
├── composables/            # Vue composition functions
│   ├── useMockCRM.js      # Mock data provider
│   ├── useAuth.js         # Authentication logic
│   └── useNotifications.js # Notification system
├── pages/                  # File-based routing
│   ├── extensions/        # Extension system pages
│   ├── crm/              # CRM module pages
│   ├── sales/            # Sales module pages
│   └── ...               # Other modules
├── stores/                 # Pinia stores
├── utils/                  # Utility functions
├── middleware/            # Route protection
├── layouts/               # Layout components
└── tests/                 # Test suites
```

---

## 🔧 **Configuration**

### **Environment Variables**

```bash
# API Configuration (for future backend integration)
NUXT_PUBLIC_API_BASE=https://api.synthesq.com
NUXT_PUBLIC_API_PREFIX=/api/v1
```

### **Mock Data System**

The demo uses comprehensive mock data to simulate real CRM/ERP functionality:
- **Realistic business data** - customers, leads, orders, invoices
- **Multi-tenant support** - business-specific contexts
- **Role-based permissions** - different user access levels
- **Industry-specific data** - tailored for each extension

---

## 🧪 **Testing**

### **Run Tests**

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test
npm test tests/unit/components/NotificationDropdown.test.js
```

### **Test Coverage**
- ✅ **Unit Tests** - Components and utilities
- ✅ **Integration Tests** - Authentication flows
- ✅ **E2E Tests** - Complete user journeys

---

## 🚢 **Deployment**

### **GitHub Pages (Automated)**

The project automatically deploys to GitHub Pages on push to `main`:

1. **Enable GitHub Pages** in repository settings
2. **Set source** to "GitHub Actions"
3. **Configure custom domain** (optional): `app.synthesq.com`
4. **Push to main** to trigger deployment

### **Manual Deployment**

```bash
# Generate static site
npm run generate

# Deploy dist/ folder to your hosting provider
```

---

## 🎯 **Demo Highlights**

### **🏢 Multi-Module Business Platform**
Experience a complete business management solution with 6 integrated modules covering every aspect of modern business operations.

### **🔌 Extension Marketplace**
See how the platform adapts to specific industries through our extension system - from healthcare compliance to manufacturing workflows.

### **📊 Interactive Dashboards**
Explore real-time business metrics with interactive charts and KPI tracking across all modules.

### **🔔 Smart Notifications**
Experience the notification system with real-time updates, smart filtering, and contextual actions.

### **📱 Responsive Design**
Test the platform across devices to see how it maintains functionality and aesthetics on any screen size.

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**

- Follow **Vue 3 Composition API** patterns
- Use **Tailwind CSS** for styling
- Maintain **responsive design** principles
- Include **tests** for new features
- Follow **conventional commits** format

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 **Support**

- **📧 Email**: support@synthesq.com
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/repo/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/repo/discussions)

---

## 🏢 **About Synthesq**

**Synthesq** is a modern CRM/ERP platform designed to adapt to any industry through our innovative extension system. Built by **TheMessieCompany**, we're transforming how businesses manage their operations with flexible, scalable solutions.

### **🎯 Why Synthesq?**

- **🔧 Industry Adaptability** - Extensions for any business vertical
- **⚡ Modern Technology** - Built with cutting-edge web technologies
- **📈 Scalable Architecture** - Grows with your business needs
- **🎨 Professional Design** - Intuitive interface for any user
- **🔒 Enterprise Security** - Built-in compliance and security features

---

<div align="center">

**[🚀 Try the Demo](https://app.synthesq.com)** | **[📖 Documentation](https://docs.synthesq.com)** | **[🛒 Extensions Store](https://app.synthesq.com/extensions)**

---

**Built with ❤️ by TheMessieCompany**

*Orchestrate Your Business with Synthesq*

</div>
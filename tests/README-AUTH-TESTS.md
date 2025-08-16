# Authentication Test Suite

This directory contains comprehensive feature tests for the authentication flow in the Nuxt 3 + Vue 3 + Pinia CRM application.

## Overview

The authentication system uses Laravel Sanctum with CSRF protection and supports multi-tenant access. These tests ensure all authentication scenarios work correctly including edge cases and error handling.

## Test Structure

### 📁 Unit Tests (`/unit/`)

**stores/auth.test.js** - Auth Store Unit Tests
- State management (user, businessId, isLoading)
- CSRF token extraction and cookie management
- Authenticated API requests with proper headers
- Login/logout flows with all error scenarios
- Session persistence via localStorage
- Loading state management and concurrent request protection

**pages/login.test.js** - Login Page Component Tests
- Form validation (business ID, email format, password length)
- User interactions (form filling, password visibility toggle)
- Demo credentials auto-fill functionality
- Error display and clearing mechanisms
- Accessibility features (labels, autocomplete, ARIA)
- Loading states and disabled button behavior

**middleware/auth.test.js** - Auth Middleware Tests
- Route protection for authenticated/unauthenticated users
- Automatic redirects between login and protected routes
- Loading state handling with proper timeouts
- Edge cases (undefined routes, missing auth store)
- Performance and concurrent access scenarios

### 📁 Integration Tests (`/integration/`)

**auth-flow.test.js** - Complete Authentication Flow
- End-to-end login process with proper API mocking
- CSRF token refresh and automatic retry mechanisms
- Session persistence across application reloads
- Form validation integration with backend responses
- Error categorization and user feedback
- Middleware integration with authentication state

### 📁 E2E Tests (`/e2e/`)

**auth-user-journeys.test.js** - Critical User Journeys
- Happy path: successful login and dashboard access
- Error scenarios: invalid credentials, network failures
- Session management: logout, expiration, persistence
- Multi-tenant: switching between business environments
- Recovery flows: retry after errors, CSRF token refresh
- Accessibility and UX: loading states, clear error messages

## Key Authentication Features Tested

### 🔐 Security & Authentication
- **CSRF Protection**: Token extraction, rotation, and mismatch handling
- **Session Management**: Secure cookie-based authentication with Laravel Sanctum
- **Multi-Tenancy**: Business ID-based tenant isolation
- **Route Protection**: Middleware-based access control
- **Auto-Logout**: Automatic session cleanup on authentication failures

### 🎯 User Experience
- **Form Validation**: Real-time validation with clear error messages
- **Demo Credentials**: One-click form population for testing
- **Password Visibility**: Toggle between hidden/visible password
- **Loading States**: Clear feedback during authentication attempts
- **Error Recovery**: Ability to retry after fixing validation issues

### 🛡️ Error Handling
- **API Errors**: 401 (invalid credentials), 403 (access denied), 422 (validation)
- **Network Issues**: Connection failures and timeout handling  
- **CSRF Mismatches**: Automatic token refresh and request retry
- **Session Expiration**: Graceful handling and redirect to login
- **Corrupted Data**: Recovery from invalid localStorage contents

## Running the Tests

### Run All Authentication Tests
```bash
npm test tests/unit/stores/auth.test.js
npm test tests/unit/pages/login.test.js  
npm test tests/unit/middleware/auth.test.js
npm test tests/integration/auth-flow.test.js
npm test tests/e2e/auth-user-journeys.test.js
```

### Run Test Suite with Detailed Reporting
```bash
node tests/auth-test-suite.js
```

### Run Specific Test Categories
```bash
# Unit tests only
npm test tests/unit/

# Integration tests
npm test tests/integration/

# E2E-style tests  
npm test tests/e2e/
```

### Run with Coverage
```bash
npm test -- --coverage tests/
```

## Test Configuration

The tests use the following setup:

- **Test Framework**: Jest with jsdom environment
- **Vue Testing**: Vue Test Utils for component testing
- **State Management**: Pinia with test setup
- **Mocking**: Comprehensive API and browser API mocks
- **Globals**: Nuxt composables and utilities mocked appropriately

Key mock setup files:
- `/tests/setup.js` - Global test configuration
- Mock implementations for `$fetch`, `localStorage`, `document.cookie`
- Nuxt composables: `useRouter`, `useAuthStore`, `navigateTo`

## API Endpoints Tested

The authentication system integrates with these Laravel Sanctum endpoints:

- `POST /api/v1/csrf-cookie` - Get CSRF token
- `POST /api/v1/login` - Authenticate user  
- `GET /api/v1/user` - Get authenticated user data
- `POST /api/v1/logout` - Logout user

All endpoints are properly mocked with realistic responses including:
- Success scenarios with proper headers and data
- Error scenarios with appropriate HTTP status codes
- CSRF token handling and rotation
- Business ID header validation

## Expected Test Results

When all tests pass, you should see:

✅ **130+ total test cases** covering:
- 45+ auth store unit tests (state, CSRF, API calls, errors)
- 35+ login page component tests (validation, interaction, UI)
- 25+ middleware tests (protection, redirects, edge cases)
- 15+ integration tests (complete flows, API integration)
- 20+ E2E user journey tests (realistic scenarios)

## Debugging Failed Tests

### Common Issues:

1. **Mock Setup**: Ensure global mocks are properly reset between tests
2. **Async Operations**: Use proper `await` for async operations
3. **Vue Reactivity**: Use `wrapper.vm.$nextTick()` for DOM updates
4. **API Mocking**: Verify mock functions return expected data structures

### Debug Commands:
```bash
# Run single test file with verbose output
npm test tests/unit/stores/auth.test.js -- --verbose

# Run tests in watch mode for development
npm test tests/unit/stores/auth.test.js -- --watch

# Get detailed error output
npm test tests/unit/stores/auth.test.js -- --no-coverage
```

## Contributing

When adding new authentication features:

1. **Add Unit Tests**: Test individual functions and state changes
2. **Add Integration Tests**: Test complete flows with mocked APIs
3. **Add E2E Tests**: Test critical user journeys end-to-end
4. **Update Documentation**: Update this README with new test coverage

### Test Naming Convention:
- `describe('Feature Name', () => {})` - Group related tests
- `test('should do something when condition', async () => {})` - Clear test intent
- Use `beforeEach()` for test setup and `afterEach()` for cleanup

## Security Considerations

These tests verify security-critical functionality:

⚠️ **CSRF Protection**: Tests ensure tokens are properly managed
⚠️ **Session Security**: Tests verify secure cookie handling  
⚠️ **Access Control**: Tests confirm route protection works
⚠️ **Data Validation**: Tests ensure user input is properly validated
⚠️ **Error Handling**: Tests confirm sensitive data isn't leaked in errors

Any changes to authentication logic should include comprehensive security testing.
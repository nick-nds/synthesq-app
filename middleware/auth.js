export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Initialize auth store from storage on first load
  if (process.client && !authStore.user && !authStore.isLoading) {
    authStore.initializeFromStorage()
    
    // If we have stored data, check if it's still valid
    if (authStore.token) {
      await authStore.checkAuthStatus()
    }
  }
  
  // If auth store is currently loading, wait for it to complete
  if (authStore.isLoading) {
    // Wait for loading to complete or timeout
    let attempts = 0
    while (authStore.isLoading && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100))
      attempts++
    }
  }
  
  // If trying to access login page while authenticated, redirect to dashboard
  if (to.path === '/login' && authStore.isAuthenticated) {
    return navigateTo('/')
  }
  
  // If trying to access protected route while not authenticated, redirect to login
  if (to.path !== '/login' && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
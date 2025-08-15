export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()
  
  // If trying to access login page while authenticated, redirect to dashboard
  if (to.path === '/login' && isAuthenticated.value) {
    return navigateTo('/')
  }
  
  // If trying to access protected route while not authenticated, redirect to login
  if (to.path !== '/login' && !isAuthenticated.value) {
    // Check if business_id exists in localStorage (basic auth check)
    if (process.client) {
      const businessId = localStorage.getItem('business_id')
      if (!businessId) {
        return navigateTo('/login')
      }
    }
  }
})
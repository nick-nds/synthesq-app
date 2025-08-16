export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  
  // Initialize auth store from localStorage on client side
  authStore.initializeFromStorage()
  
  // Check authentication status and handle redirects on page reload
  await authStore.handleAuthRedirect()
})
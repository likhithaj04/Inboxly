const API_URL = import.meta.env.VITE_API_URL
import api from './api'

export function handleLogin() {
  try {
    console.log("clicked");
    
    window.location.href = `${API_URL}/auth/google`
  } catch (err) {
    console.log(err)
  }
}

export async function handleLogout() {
  try {
    await api.post('/auth/logout')
  } catch (err) {
    console.log('Logout failed', err)
  } finally {
    window.location.href = '/'
  }
}
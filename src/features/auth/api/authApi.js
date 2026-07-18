// src/features/auth/api/authApi.js
import { baseRequest } from '@/shared/api/baseClient'
import { data } from 'autoprefixer'

export async function login(username, password) {
  return baseRequest('/login', {
    method: 'POST',
    data: { username, password }
  })
}

export async function register({username, email, password, nickname = null}) {
  return baseRequest('/register', {
    method: 'POST',
    data: {
      username,
      email,
      password,
      nickname: nickname || null
    }
  })
}

export function logout() {
  localStorage.removeItem('token')
}
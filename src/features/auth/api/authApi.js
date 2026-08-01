// src/features/auth/api/authApi.js
import { baseRequest } from '@/shared/api/baseClient'

export async function login(username, password) {
  return baseRequest('/users/login', {
    method: 'POST',
    data: { username, password }
  })
}

export async function register({username, email, password, nickname = null}) {
  return baseRequest('/users/register', {
    method: 'POST',
    data: {
      username,
      email,
      password,
      nickname: nickname || null
    }
  })
}

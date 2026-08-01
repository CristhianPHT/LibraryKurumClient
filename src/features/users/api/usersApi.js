import { baseRequest } from '@/shared/api/baseClient'

export async function getUserByNickname(nickname) {
  return baseRequest(`/users/${nickname}`, {
    method: 'GET'
  })
}

export async function getUser() { // Mi perfil privado (aún en proceso, e incompleto)
  return baseRequest('/me', {
    method: 'GET',
    auth: true
  })
}

export async function getUserHeader() { // Mi perfil indispensable (completado)
  return baseRequest('/me/header', {
    method: 'GET',
    auth: true
  })
}

export async function updateUserPassword(old_password, new_password) {
  return baseRequest('/me/password', {
    method: 'PUT',
    auth: true,
    data: { old_password, new_password }
  })
}

export async function updateUserNickname(nickname) {
  return baseRequest('/me/nickname', {
    method: 'PUT',
    auth: true,
    data: { nickname }
  })
}
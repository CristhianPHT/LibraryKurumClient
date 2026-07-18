import { baseRequest } from '@/shared/api/baseClient'

export async function getUser() {
  return baseRequest('/me/header', {
    method: 'GET',
    auth: true
  })
}
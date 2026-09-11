import { getToken } from '@/shared/auth/tokenStorage'

const API_BASE =
  import.meta.env.VITE_API_URL ?? ''

export async function baseRequest( endpoint,
  { method = 'GET', data = null, headers = {}, auth = false} = {} ) {
  const options = {
    method,
    headers: {
      ...headers,
    },
  }

  if (auth) {
    const token = getToken()
    if (token) {
      options.headers.Authorization =
        `Bearer ${token}`
    }
  }

  if (data !== null) {
    options.headers['Content-Type'] =
    'application/json'
    options.body = JSON.stringify(data)
  }
  const res = await fetch(
    `${API_BASE}${endpoint}`,
    options
  )
  // console.log("El resultado de link es: ", options)
  let result = null

  try {
    const contentType =
      res.headers.get('content-type')
    if (
      contentType?.includes('application/json')
    ) {
      result = await res.json()
    }
  } catch {
    result = null
  }
  if (!res.ok) {
    const error = new Error(
      result?.error || 'API Error'
    )
    error.status = res.status
    throw error
  }
  return result
}
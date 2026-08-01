import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { clearToken, getToken, setToken } from '@/shared/auth/tokenStorage'
import { getUserHeader } from '@/features/users/api/usersApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = user != null

  const clearSession = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  const login = useCallback(async (token) => {
    setToken(token)

    try {
      const data = await getUserHeader()
      setUser(data)
    } catch {
      clearSession()
    }
  }, [clearSession])

  const logout = useCallback(() => {
    clearSession()
  }, [clearSession])

  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      const token = getToken()

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const data = await getUserHeader()
        if (!cancelled) {
          setUser(data)
        }
      } catch {
        if (!cancelled) {
          clearSession()
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      cancelled = true
    }
  }, [clearSession])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context == null) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

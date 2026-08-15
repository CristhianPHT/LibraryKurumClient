import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { clearToken, getToken, setToken } from '@/shared/auth/tokenStorage'
import { getUser, getUserHeader } from '@/features/users/api/usersApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProfileLoading, setIsProfileLoading] = useState(false)

  const profileRef = useRef(null)

  const isAuthenticated = user != null

  const clearSession = useCallback(() => {
    clearToken()
    setUser(null)
    profileRef.current = null
    setProfile(null)
  }, [])

  const login = useCallback(async (token) => {
    setToken(token)
    profileRef.current = null
    setProfile(null)

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

  const loadProfile = useCallback(async ({ force = false } = {}) => {
    if (!getToken()) {
      return null
    }

    if (!force && profileRef.current) {
      return profileRef.current
    }

    setIsProfileLoading(true)
    try {
      const data = await getUser()
      profileRef.current = data
      setProfile(data)
      return data
    } catch {
      profileRef.current = null
      setProfile(null)
      return null
    } finally {
      setIsProfileLoading(false)
    }
  }, [])

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
      profile,
      isAuthenticated,
      isLoading,
      isProfileLoading,
      login,
      logout,
      loadProfile,
    }),
    [
      user,
      profile,
      isAuthenticated,
      isLoading,
      isProfileLoading,
      login,
      logout,
      loadProfile,
    ],
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

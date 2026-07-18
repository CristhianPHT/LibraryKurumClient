// 'src/shared/context/authContext'
import { createContext, useContext, useEffect, useState } from 'react'
import { getUser } from '@/features/users/api/header'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(token) {
    localStorage.setItem('token', token)

    try {
      const data = await getUser()
      setUser(data)
    } catch {
      setUser(null)
    }
  }
  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    getUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
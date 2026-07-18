// pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login as loginRequest } from '@/features/auth/api/authApi'
import { useAuth } from '@srd/context/authContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const response = await loginRequest(
        formData.username,
        formData.password
      )
      console.log(response)
      await login(response.token)

      navigate('/')
    } catch (err) {
      setError(
        err.message || 'Error al iniciar sesión'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-70px)]">
      
      {/* Lado izquierdo — solo en desktop */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Bienvenido</h2>
          <p className="text-lg text-white/70 mb-8">
            Descubre miles de historias esperando por ti
          </p>
          <img 
            src="/books-hero.png" 
            alt="Libros" 
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Lado derecho — formulario */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold mb-8 text-center">CloudKurum</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Usuario"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-white/60 mt-6">
            ¿No tienes cuenta? <a href="/register" className="text-white hover:underline">Regístrate</a>
          </p>
        </div>
      </div>

    </div>
  )
}

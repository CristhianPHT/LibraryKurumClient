import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { register } from '@/features/auth/api/authApi'

export default function Register() {

  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (
      formData.password !==
      formData.passwordConfirm
    ) {
      setError('Las contraseñas no coinciden')
      return
    }
    const {
      passwordConfirm,
      ...payload
    } = formData

    try {
      setLoading(true)
      const result = await register(payload)
      console.log(result)
      /*
        { token: "..." }
      */

      if (result?.token) {
        localStorage.setItem(
          'token',
          result.token
        )
        navigate('/')
      }
    } catch (err) {
      setError(
        err.message ||
        'Error al registrarse'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-70px)] md:grid-cols-2">

      {/* izquierda */}

      <div className="hidden flex-col items-center justify-center bg-gradient-to-br from-green-900 via-blue-900 to-black p-8 md:flex">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Únete a nosotros
          </h2>
          <p className="mb-8 text-lg text-white/70">
            Crea tu cuenta y comienza
            a explorar miles de historias
          </p>
          <img
            src="/books-register.png"
            alt="Libros"
            className="mx-auto w-full max-w-sm rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* formulario */}

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          <h1 className="mb-8 text-center text-3xl font-bold">
            CloudKurum
          </h1>

          {error && (
            <div className="mb-4 rounded bg-red-500/20 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" >

            {/* username */}
            <div>
              <label className="mb-1 block text-sm text-white/70">
                Usuario
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Elige tu usuario"
                required
                className="w-full rounded border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 transition-colors focus:border-white/50 focus:outline-none"
              />
            </div>

            {/* email */}
            <div>
              <label className="mb-1 block text-sm text-white/70">
                Correo
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
                className="w-full rounded border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 transition-colors focus:border-white/50 focus:outline-none"
              />
            </div>

            {/* password */}
            <div>
              <label className="mb-1 block text-sm text-white/70">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña"
                required
                className="w-full rounded border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 transition-colors focus:border-white/50 focus:outline-none"
              />
            </div>

            {/* confirm */}
            <div>
              <label className="mb-1 block text-sm text-white/70">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Repite la contraseña"
                required
                className="w-full rounded border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 transition-colors focus:border-white/50 focus:outline-none"
              />
            </div>

            {/* nickname */}
            <div>
              <label className="mb-1 block text-sm text-white/70">
                Apodo (opcional)
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Tu nombre o apodo"
                className="w-full rounded border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 transition-colors focus:border-white/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded bg-white px-4 py-2 font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-50"
            >
              {loading
                ? 'Registrando...'
                : 'Registrarse'}
            </button>

          </form>

          <p className="mt-6 text-center text-white/60">
            ¿Ya tienes cuenta?
            <Link to="/login" className="ml-1 text-white hover:underline" >
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/shared/context/authContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, isLoading, isProfileLoading, loadProfile, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      loadProfile()
    }
  }, [isLoading, isAuthenticated, loadProfile])

  if (isLoading) {
    return <p>Cargando sesión…</p>
  }

  if (!isAuthenticated) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>
  }

  if (isProfileLoading && !profile) {
    return <p>Cargando perfil…</p>
  }

  const display = profile ?? user
  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
  <main className="mx-auto max-w-2xl px-6 py-8">
    <header className="mb-8 flex items-center gap-4">
      <div className="flex h-18 w-18 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
        {display?.nickname?.charAt(0).toUpperCase()}
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-600">
          Mi Perfil
        </h1>

        <p className="text-slate-500">
          {display?.nickname}
        </p>
      </div>
    </header>

    <section className="rounded-xl border border-slate-200 bg-slate-800 p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Información de la cuenta
      </h2>

      <div className="divide-y divide-slate-200">
        <div className="flex items-center justify-between py-4">
          <span className="text-slate-500">Nickname</span>
          <strong className="font-medium text-slate-400">
            {display?.nickname ?? "—"}
          </strong>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-slate-500">Username</span>
          <strong className="font-medium text-slate-400">
            {display?.username ?? "—"}
          </strong>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-slate-500">Correo</span>
          <strong className="font-medium text-slate-400">
            {display?.email ?? "—"}
          </strong>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-slate-500">Contraseña</span>

          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Cambiar
          </button>
        </div>
      </div>
    </section>

    <div className="mt-8 flex justify-end">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700">
        Cerrar sesión
      </button>
    </div>
  </main>
  )
}

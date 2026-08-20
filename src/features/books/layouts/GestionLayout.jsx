import { Outlet } from 'react-router-dom'
import GestionNav from '../components/GestionNav'

export default function GestionLayout() {
  return (
    <main className="min-h-full bg-[#111827] p-6">
      <div className="mx-auto max-w-6xl space-y-6">

        <header>
          <h1 className="text-2xl font-semibold text-gray-300">
            Gestión
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Administra tus libros y recursos.
          </p>

          <GestionNav />
        </header>

        <Outlet />

      </div>
    </main>
  )
}
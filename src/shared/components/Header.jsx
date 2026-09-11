// components/layout/Header.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '@srd/context/authContext'
import UserMenu from "./Usermenu"
import SearchBar from "./Searchbar"

export default function Header() {
  const { user } = useAuth()
  return (
  <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#181E37] text-slate-200">
      
      {/* Navegación principal */}
    <div className="flex items-center gap-6">
        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold tracking-wide text-white transition-colors hover:text-indigo-300" >
          Kurum
        </Link>
        {/* Docs - temporal */}
        <Link to="/docs" className="text-sm text-slate-300 transition-colors hover:text-white" >
          Docs
        </Link>
        {/* Biblioteca */}
        <Link to="/books/1" className="text-sm text-slate-300 transition-colors hover:text-white" >
          Mi biblioteca
        </Link>
        {/* Búsqueda avanzada */}
        <Link to="/virtualizacion" className="text-sm text-slate-300 transition-colors hover:text-white" >  {/* Buscar */}
          Buscar
        </Link>
        {/* Gestión / Creador */}
        <Link to="/books/manage/config" className="text-sm text-slate-300 transition-colors hover:text-white" >
          Gestión
        </Link>
        <Link to="/libro/date-a-live6" className="text-sm text-slate-300 transition-colors hover:text-white" >
          LibrosOld
        </Link>
        {/* Búsqueda rápida */}
        <SearchBar />
    </div>

    <nav className="flex items-center gap-4">
      {user ? (
        <UserMenu/>
      ) : (
      <>
      <Link to="/login" className="text-sm hover:text-white/70 transition-colors text-slate-300">
        Iniciar sesión
      </Link>
      <Link to="/register" className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors font-medium">
        Registrarse
      </Link>
      </>
      )}
    </nav>

  </header>
  )
}
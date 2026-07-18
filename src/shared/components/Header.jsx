// components/layout/Header.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '@srd/context/authContext'
import UserMenu from "./Usermenu"
import SearchBar from "./Searchbar"

export default function Header() {
const { user } = useAuth()

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10">
      
    <div className="flex items-center gap-6">
        {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">Kurum</Link>
      <Link to="/explore">Explorar</Link>
      <SearchBar />
    </div>

      {/* Nav */}
      <nav className="flex items-center gap-4">
        {user ? (
        <UserMenu/>
        ) : (
      <>
        <Link to="/login" className="text-sm hover:text-white/70 transition-colors">
          Iniciar sesión
        </Link>
        <Link to="/register" className="text-sm bg-white text-black px-4 py-1.5 rounded hover:bg-white/90 transition-colors">
          Registrarse
        </Link>
      </>
        )}
      </nav>

    </header>
  )
}
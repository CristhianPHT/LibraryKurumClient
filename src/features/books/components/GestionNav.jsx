import { NavLink } from 'react-router-dom'

const links = [
  { to: '/books/manage', label: 'Panel', end: true },
  { to: '/books/manage/mebooks', label: 'Mis libros' },
  { to: '/books/manage/create', label: 'Crear libro' },
  { to: '/books/manage/drafts', label: 'Borradores' },
  { to: '/books/manage/config', label: 'Configuración' },
]

export default function GestionNav() {
  return (
    <nav className="mt-6 flex gap-6 border-b border-white/10">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `pb-3 text-sm transition-colors ${
              isActive
                ? 'border-b-2 border-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
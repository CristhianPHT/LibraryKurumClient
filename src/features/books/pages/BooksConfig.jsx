import SimpleCatalog from '@/features/books/components/SimpleCatalog'
import { bookStatesApi, bookTypesApi } from '@/features/books/api/bookCatalogsApi'
import { useCatalog } from '@/features/books/hooks/useCatalog'
import { Link } from 'react-router-dom'

export default function BooksConfig() {
  const bookTypes = useCatalog(bookTypesApi)
  const bookStates = useCatalog(bookStatesApi)

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

  <nav className="mt-6 flex gap-6 border-b border-white/10">
    <Link to="/manage">Panel</Link>
    <Link to="/manage/books">Mis libros</Link>
    <Link to="/manage/books/create">Crear libro</Link>
    <Link to="/manage/books/drafts">Borradores</Link>
    <Link to="/manage/config">Configuración</Link>
  </nav>
</header>

<section className="pt-6">
  <h2 className="text-2xl font-semibold text-gray-300">
    Configuración de libros
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Administra los valores utilizados por los libros.
  </p>

  {/* SimpleCatalog... */}
</section>
        <div className="grid gap-6 md:grid-cols-2">
          <SimpleCatalog
            title="Tipos de libro"
            items={bookTypes.items}
            loading={bookTypes.loading}
            error={bookTypes.error}
            onCreate={bookTypes.create}
            onUpdate={bookTypes.update}
            onDelete={bookTypes.remove}
          />
          <SimpleCatalog
            title="Estados de libro"
            items={bookStates.items}
            loading={bookStates.loading}
            error={bookStates.error}
            onCreate={bookStates.create}
            onUpdate={bookStates.update}
            onDelete={bookStates.remove}
          />
        </div>
      </div>
    </main>
  )
}
{/* <div>
Gestión
Gestión
────────────────────────────────────────────────────────────
Panel    Mis libros    Crear libro    Borradores    Configuración
├── Panel

├── Mis libros

├── Crear libro


└── Configuración
</div> */}
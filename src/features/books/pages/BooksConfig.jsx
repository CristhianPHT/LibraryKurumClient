import SimpleCatalog from '@/features/books/components/SimpleCatalog'
import {
  bookStatesApi,
  bookTypesApi
} from '@/features/books/api/bookCatalogsApi'
import { useCatalog } from '@/features/books/hooks/useCatalog'

export default function BooksConfig() {
  const bookTypes = useCatalog(bookTypesApi)
  const bookStates = useCatalog(bookStatesApi)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-300">
          Configuración de libros
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Administra los valores utilizados por los libros.
        </p>
      </div>

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
    </section>
  )
}

// Gestión
// ─────────────────────────────────────────────────────────────────
// Panel    Mis libros    Crear libro    Borradores    Configuración

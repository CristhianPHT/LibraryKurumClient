import { useState } from 'react'

import { getCatalogName } from '@/features/books/utils/catalogItem'

export default function SimpleCatalog({
  title,
  items = [],
  loading = false,
  error = null,
  onCreate,
  onUpdate,
  onDelete,
}) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()

    const name = newName.trim()
    if (!name) return

    setSubmitting(true)
    try {
      await onCreate({ nombre: name })
      setNewName('')
    } catch {
      // El error ya queda en useCatalog
    } finally {
      setSubmitting(false)
    }
  }

  const startEditing = (item) => {
    setEditingId(item.id)
    setEditingName(getCatalogName(item))
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingName('')
  }

  const handleUpdate = async (id) => {
    const name = editingName.trim()
    if (!name) return

    setSubmitting(true)
    try {
      await onUpdate(id, { nombre: name })
      cancelEditing()
    } catch {
      // El error ya queda en useCatalog
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    setSubmitting(true)
    try {
      await onDelete(id)
    } catch {
      // El error ya queda en useCatalog
    } finally {
      setSubmitting(false)
    }
  }

  const busy = loading || submitting

  return (
    <section className="w-full max-w-2xl">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-400">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Administra los valores disponibles.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error.message || 'Ocurrió un error.'}
          </p>
        </div>
      )}

      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={`Nuevo ${title.toLowerCase().replace('s de libro', '')}`}
          maxLength={50}
          disabled={busy}
          className="
            flex-1 rounded-lg border border-gray-300
            bg-gray-400 px-3 py-2 text-sm
            outline-none transition
            placeholder:text-gray-700
            focus:border-gray-500 focus:ring-2 focus:ring-gray-100
            disabled:cursor-not-allowed disabled:opacity-50
          "
        />

        <button
          type="submit"
          disabled={!newName.trim() || busy}
          className="
            rounded-lg bg-gray-900 px-4 py-2
            text-sm font-medium text-white
            transition hover:bg-gray-800
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          {submitting ? 'Guardando...' : 'Agregar'}
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {loading && items.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm text-gray-500">Cargando...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm text-gray-500">
              No hay registros todavía.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 px-4 py-3"
              >
                {editingId === item.id ? (
                  <>
                    <input
                      autoFocus
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      maxLength={50}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdate(item.id)
                        }
                        if (e.key === 'Escape') {
                          cancelEditing()
                        }
                      }}
                      className="
                        flex-1 rounded-md border border-gray-300
                        px-2.5 py-1.5 text-sm
                        outline-none focus:border-gray-500
                      "
                    />

                    <button
                      type="button"
                      onClick={() => handleUpdate(item.id)}
                      disabled={busy}
                      className="text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-40"
                    >
                      Guardar
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={busy}
                      className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-40"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm text-gray-800">
                      {getCatalogName(item)}
                    </span>

                    <button
                      type="button"
                      onClick={() => startEditing(item)}
                      disabled={busy}
                      className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-40"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={busy}
                      className="text-sm text-gray-400 hover:text-red-600 disabled:opacity-40"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

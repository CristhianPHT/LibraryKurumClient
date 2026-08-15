import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createBook } from '@/features/books/api/booksApi'
import { bookStatesApi, bookTypesApi } from '@/features/books/api/bookCatalogsApi'
import { useCatalog } from '@/features/books/hooks/useCatalog'

export default function CreateBookPage() {
  const navigate = useNavigate()

  const bookTypes = useCatalog(bookTypesApi)
  const bookStates = useCatalog(bookStatesApi)

  const [form, setForm] = useState({
    titulo: '',
    slug: '',
    sinopsis: '',
    tipo_id: '',
    publicacion: '',
    estado_id: '',
    visibilidad: true,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const data = {
        titulo: form.titulo,
        ...(form.slug && { slug: form.slug }),
        ...(form.sinopsis && { sinopsis: form.sinopsis }),
        ...(form.tipo_id && { tipo_id: Number(form.tipo_id) }),
        ...(form.publicacion && { publicacion: form.publicacion }),
        ...(form.estado_id && { estado_id: Number(form.estado_id) }),
        visibilidad: form.visibilidad,
      }

      console.log("la data a enviar: ", data)
      const result = await createBook(data)
      console.log(result, "el resultado")

      navigate(`/book/${result.slug}`)
    } catch (error) {
      setError(error.message || 'No se pudo crear el libro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-full bg-[#111827] px-6 py-8 text-slate-200">
      <div className="mx-auto max-w-4xl">

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Crear libro
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Crea un nuevo libro y configura su información principal.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Información principal */}
          <section className="rounded-xl border border-white/10 bg-[#181E37] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white">
                Información principal
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Información básica que identifica el libro.
              </p>
            </div>

            <div className="space-y-5">

              {/* Título */}
              <div>
                <label
                  htmlFor="titulo"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Título
                </label>

                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                  placeholder="Título del libro"
                  className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Slug
                  <span className="ml-2 text-xs font-normal text-slate-500">
                    Opcional
                  </span>
                </label>

                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="titulo-del-libro"
                  className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Si lo omites, el servidor puede generarlo a partir del título.
                </p>
              </div>

              {/* Sinopsis */}
              <div>
                <label
                  htmlFor="sinopsis"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Sinopsis
                  <span className="ml-2 text-xs font-normal text-slate-500">
                    Opcional
                  </span>
                </label>

                <textarea
                  id="sinopsis"
                  name="sinopsis"
                  value={form.sinopsis}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe brevemente el contenido del libro..."
                  className="w-full resize-y rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

            </div>
          </section>

          {/* Clasificación */}
          <section className="rounded-xl border border-white/10 bg-[#181E37] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white">
                Clasificación
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Define el tipo y estado inicial del libro.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Tipo */}
              <div>
                <label
                  htmlFor="tipo_id"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Tipo de libro
                </label>

                <select
                  id="tipo_id"
                  name="tipo_id"
                  value={form.tipo_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Seleccionar tipo</option>

                  {bookTypes.items.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div>
                <label
                  htmlFor="estado_id"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Estado
                </label>

                <select
                  id="estado_id"
                  name="estado_id"
                  value={form.estado_id}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Seleccionar estado</option>

                  {bookStates.items.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.nombre}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </section>

          {/* Publicación */}
          <section className="rounded-xl border border-white/10 bg-[#181E37] p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white">
                Publicación
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Configura la fecha y visibilidad inicial del libro.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Fecha */}
              <div>
                <label
                  htmlFor="publicacion"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Fecha de publicación
                </label>

                <input
                  id="publicacion"
                  name="publicacion"
                  type="date"
                  value={form.publicacion}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Visibilidad */}
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    name="visibilidad"
                    checked={form.visibilidad}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-white/20 bg-[#111827] text-indigo-600 focus:ring-indigo-500"
                  />

                  <span>
                    <span className="block text-sm font-medium text-slate-300">
                      Libro visible
                    </span>

                    <span className="block text-xs text-slate-500">
                      El libro podrá ser visible según su estado.
                    </span>
                  </span>
                </label>
              </div>

            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6">

            <button
              type="button"
              onClick={() => navigate('/manage/books')}
              className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear libro'}
            </button>

          </div>

        </form>
      </div>
    </main>
  )
}
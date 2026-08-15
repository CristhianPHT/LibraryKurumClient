import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getBookBySlug } from '@/features/books/api/booksApi'
import BookDetail from '@/features/books/components/BookDetail'

const BookDetailPage = () => {
  const { slug } = useParams()

  const [book, setBook] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadBook() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getBookBySlug(slug)
        console.log(data, "Esto es extraido de mi función slug")
        if (!cancelled) {
          setBook(data.data)
        }
      } catch (error) {
        if (!cancelled) {
          setError(error)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    if (slug) {
      loadBook()
    }

    return () => {
      cancelled = true
    }
  }, [slug])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-400">
          Cargando libro...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-xl border border-red-900 bg-red-950/40 p-6">
          <h1 className="text-lg font-semibold text-red-300">
            No se pudo cargar el libro
          </h1>

          <p className="mt-2 text-sm text-red-400">
            {error.message}
          </p>
        </div>
      </main>
    )
  }
  console.log("antes de mandarlo: ", book)
  if (!book) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-400">
          Libro no encontrado.
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 md:px-8">
      <BookDetail book={book} />
    </main>
  )
}

export default BookDetailPage
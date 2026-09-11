import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getBooksByPage } from '@/features/books/api/booksApi'
import BookList from '@/features/books/components/BookList'

const BooksPage = () => {
  const { page } = useParams()

  const currentPage = Number(page) || 1

  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadBooks() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getBooksByPage(currentPage)
        
        if (!cancelled) {
          console.log(data)
          setBooks(data?.libros ?? [])
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

    loadBooks()

    return () => {
      cancelled = true
    }
  }, [currentPage])

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
            Libros
          </h1>

          <p className="mt-2 text-slate-400">
            Explora los libros disponibles.
          </p>
        </header>

        {isLoading && (
          <div className="py-10 text-center text-slate-400">
            Cargando libros...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-6">
            <h2 className="font-semibold text-red-300">
              No se pudieron cargar los libros
            </h2>

            <p className="mt-2 text-sm text-red-400">
              {error.message}
            </p>
          </div>
        )}

        {!isLoading && !error && (
          <BookList books={books} />
        )}

      </div>
    </main>
  )
}

export default BooksPage
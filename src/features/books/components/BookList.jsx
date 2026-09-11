import { Link } from 'react-router-dom'
import tokisaki from '@/assets/img/tokisaki.jpg'

const BookList = ({ books }) => {
  if (!books?.length) {
    return (
      <div className="py-10 text-center text-slate-400">
        No hay libros disponibles.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {books.map((book) => (
        <Link
          key={book.id_libro}
          to={`/book/${book.slug}`}
          className="overflow-hidden rounded-lg border border-slate-700 bg-slate-900 transition hover:border-slate-500"
        >
          <article>
            <img
              src={tokisaki}
              alt={`Portada de ${book.titulo}`}
              className="aspect-[2/3] w-full object-cover"
            />

            <div className="p-3">
              <h2 className="line-clamp-2 text-sm font-medium text-slate-100">
                {book.titulo}
              </h2>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

export default BookList
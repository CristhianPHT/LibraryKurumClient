import tokisaki from '@/assets/img/tokisaki.jpg'

function BookDetail({ book }) {
  return (
    <article className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-slate-100 shadow-xl">

      {/* Título */}
      <header className="border-b border-slate-700 px-6 py-5 md:px-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {book.titulo}
        </h1>
      </header>

      {/* Información principal */}
      <div className="grid gap-8 p-6 md:grid-cols-[280px_1fr] md:p-8">

        {/* Portada */}
        <div className="mx-auto w-full max-w-[280px]">
          <img
            src={tokisaki}
            alt={`Portada de ${book.titulo}`}
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col gap-6">

          <section>
            <h2 className="mb-4 text-lg font-semibold">
              Información
            </h2>

            <dl className="grid gap-3 sm:grid-cols-2">

              <div>
                <dt className="text-sm text-slate-400">
                  Tipo
                </dt>
                <dd className="font-medium">
                  {book.tipo_id ?? 'No especificado'}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Estado
                </dt>
                <dd className="font-medium">
                  {book.estado_id ?? 'No especificado'}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Publicación
                </dt>
                <dd className="font-medium">
                  {book.publicacion ?? 'No especificada'}
                </dd>
              </div>

              <div>
                <dt className="text-sm text-slate-400">
                  Visibilidad
                </dt>
                <dd className="font-medium">
                  {book.visibilidad ? 'Público' : 'Privado'}
                </dd>
              </div>

            </dl>
          </section>

          {/* Sinopsis */}
          <section>
            <h2 className="mb-3 text-lg font-semibold">
              Sinopsis
            </h2>

            <p className="leading-7 text-slate-300">
              {book.sinopsis || 'Este libro todavía no tiene una sinopsis.'}
            </p>
          </section>

        </div>
      </div>

      {/* Futuras extensiones */}
      <section className="border-t border-slate-700 px-6 py-5 md:px-8">
        <h2 className="text-lg font-semibold">
          Más información
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Autores, géneros, puntuación, enlaces y libros relacionados
          podrán incorporarse posteriormente.
        </p>
      </section>

    </article>
  )
}

export default BookDetail
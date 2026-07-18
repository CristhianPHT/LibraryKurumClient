// pages/Home.jsx
export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">CloudKurum</h1>
        <p className="text-lg text-white/70">
          Tu librería virtual de libros. Lee, descubre y explora miles de historias.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">📚 Amplio catálogo</h2>
          <p className="text-white/60">
            Miles de libros disponibles para explorar en cualquier momento.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">🔍 Búsqueda avanzada</h2>
          <p className="text-white/60">
            Encuentra exactamente lo que buscas por género, autor o título.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">✨ Experiencia fluida</h2>
          <p className="text-white/60">
            Lectura sin interrupciones en una interfaz limpia y moderna.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="text-white/50 mb-6">
          ¿Listo para comenzar tu viaje literario?
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/login" className="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors">
            Iniciar sesión
          </a>
          <a href="/register" className="px-6 py-2 border border-white text-white rounded hover:bg-white/10 transition-colors">
            Registrarse
          </a>
        </div>
      </section>

    </div>
  )
}
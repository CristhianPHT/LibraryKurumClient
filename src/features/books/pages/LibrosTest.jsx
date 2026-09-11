import { useEffect, useState } from 'react'
import Kurumi from '@/assets/img/tokisaki.jpg'
import { useParams } from 'react-router-dom'
import { getBookBySlug } from '@/features/books/api/booksApi'

export default function LibrosTest () {
  let img01="https://m.media-amazon.com/images/I/91-tAXfHPCL._SY342_.jpg"
  var titulo = " text-3xl tracking-tight text-left line-clamp-2 hover:line-clamp-3 font-semibold break-words hyphens-auto text-wrap whitespace-pre-line"
  let imgur01 = "https://i.imgur.com/uQe1MyF.jpeg"
  const { slug } = useParams()
  // const currentPage = Number(page) || 1
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  console.log(slug)

  useEffect(() => {
    console.log('🔥 useEffect ejecutado, slug:', slug)
    let cancelled = false
    async function loadBooks() {
      console.log('🔥 loadBooks ejecutado')
      setIsLoading(true)
      setError(null)
      try {
        console.log('🔥 llamando getBookBySlug con:', slug)
        const data = await getBookBySlug(slug)
        console.log('🔥 respuesta de getBookBySlug:', data)
  
        if (!cancelled) {
          setBooks(data?.data ?? [])
        }
      } catch (error) {
        console.error('❌ error:', error)
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
  }, [slug])

  console.log(books)
return (
  <div className="grid bg-red-800 text-white py-5 px-10 "> {/* crear marco 10 columnas en grid */}
    <div className="bg-red-500 border-4 border-fuchsia-500/75 rounded-md">
      
      <div className="px-2 py-1 text-green-200">
        <span className={titulo}>Date a Bullet NL  {books.titulo ?? 'No especificado'}  </span>
      </div>

      <div className="flex flex-row space-x-6 content-center bg-gray-800 p-6">
        <div className="content-center w-1/3" >
          <img className="box-border bg-green-500" src={Kurumi} alt="Descripción" />
        </div>
        <div className="basis-1/3 bg-emerald-700 p-3"> {/* Características */}
          <span>Tipo:</span> <span>{books.tipo_nombre ?? 'No especificado'}</span><br />
          <span>Capítulo:</span> <span> xxxxxxxx </span><br />
          <span>Escritor:</span> <span>Yuichiro Higashide</span><br />
          <span>Ilustrador:</span> <span>NOCO</span><br />
          <span>Géneros:</span> <span>Mecha Sobrenatural Acción Escolar</span><br />
          <span>Fecha de publicación:</span> <span> {books.publicacion ?? 'No especificado'} </span><br />
          <span>Última de publicación:</span> <span> xxxxxxxx </span><br />
          <span>Estado:</span> <span>{books.estado_nombre ?? 'No especificado'}</span><br />
          <span>Nombre Inglés:</span> <span>Date a Bullet</span><br />
          <span>Nombre Origen:</span> <span>デート・ア・ライブ</span><br />
          <span>Enlace Original:</span> <span>link sss</span><br />
          {/* <div className="flex"><span className="pr-1">Puntaje:</span>
            {estrellaLlena}{estrellaDecimal}{estrellaVacia}{start.toString()}
          </div> */}

        </div>
        <div className="basis-1/3 bg-emerald-600 p-3"> {/* Sinopsis */}
          <span>Sinopsis:</span>
          <p > {books.sinopsis ?? 'No especificado'} </p>
        </div>
      </div>
      {/* ---------------------------------------------------------------------------------------- */}
      <div className="bg-yellow-800 text-lg rounded-lg flex flex-col w-1/2 m-auto h-auto justify-center content-center space-x-2">
        <span className="px-2">Enlaces de Visualización: </span>
        <div className="px-2 space-x-2"><a className="underline text-pink-300 hover:text-sky-400 decoration-cyan-300 text-ellipsis underline-offset-2 overflow-hidden after:content-['_↗🛫'] " href="https://novelasligera.com/novela/la-vida-despues-de-la-muerte/">The Beginning After The End</a>
          <span className="cursor-pointer hover:text-blue-500" title="Actualización: 10-10-2024"  >Último Capítulo: 350/474</span>
        <span>Web: <a className="text-pink-300 hover:text-sky-400 after:content-['_↗'] ..." href="https://novelasligera.com/" target="_blank">novelasligera</a></span> </div>
      </div>
        <div className="text-gray-600 ml-10 text-lg">
          <span className=" bg-gray-100  ">Relacionados: </span>
        </div>
      <div className="flex px-center justify-center content-center bg-orange-500 ">
        <div className="bg-emerald-500 flex max-w-screen-xl content-center py-4 overflow-x-auto gap-4 px-4 py-1 " >
          <div className="min-w-52 max-w-64"> <img className="box-border" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={img01} alt="Kurumi Tokisaki 01" /> </div>
          <div className="min-w-52 max-w-64"> <img className="box-border bg-green-500" src={imgur01} alt="Kurumi Tokisaki 01" /> </div>
        </div>
      </div>
    </div>
  </div>
  )
}
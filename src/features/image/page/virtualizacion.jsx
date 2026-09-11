import { useEffect, useRef, useState } from 'react'
import { getImageUploadUrl, uploadImage } from '@/features/image/api/imageApi'

const MAX_SIZE_MB = 5
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const VirtualizacionPage = () => {
  const inputRef = useRef(null)
  const [uploadUrl, setUploadUrl] = useState(null)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUploadUrl = async () => {
      const response = await getImageUploadUrl()
      setUploadUrl(response)
    }

    fetchUploadUrl()
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  function validateFile(candidate) {
    if (!candidate) return 'No se seleccionó ningún archivo.'

    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      return 'Formato no válido. Usa JPG, PNG, WebP o GIF.'
    }

    if (candidate.size > MAX_SIZE_BYTES) {
      return `La imagen no debe superar ${MAX_SIZE_MB} MB.`
    }

    return null
  }

  function selectFile(candidate) {
    const validationError = validateFile(candidate)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setFile(candidate)

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return URL.createObjectURL(candidate)
    })
  }

  function handleInputChange(event) {
    selectFile(event.target.files?.[0] ?? null)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
    selectFile(event.dataTransfer.files?.[0] ?? null)
  }

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(event) {
    event.preventDefault()
    setIsDragOver(false)
  }

  function clearSelection() {
    setFile(null)
    setError(null)
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current)
      return null
    })
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  async function handleUpload() {
    if (!file || !uploadUrl) return
  
    try {
      await uploadImage(uploadUrl, file)
      console.log('Imagen subida correctamente')
    } catch (error) {
      console.error(error)
      setError('No se pudo subir la imagen.')
    }
  }
  return (
    <div className="mx-auto max-w-lg space-y-6 p-6">
      <h1 className="text-2xl font-bold">Virtualización</h1>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="sr-only"
        onChange={handleInputChange}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={[
            'flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors',
            isDragOver
              ? 'border-white bg-white/10'
              : 'border-white/25 bg-white/5 hover:border-white/50 hover:bg-white/10',
          ].join(' ')}
        >
          <span className="text-4xl" aria-hidden="true">
            🖼️
          </span>
          <span className="text-lg font-medium">
            Arrastra una imagen aquí
          </span>
          <span className="text-sm text-white/60">
            o haz clic para elegir un archivo
          </span>
          <span className="text-xs text-white/40">
            JPG, PNG, WebP o GIF · máx. {MAX_SIZE_MB} MB
          </span>
        </button>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/20 bg-white/5">
          <div className="relative aspect-video bg-black/40">
            <img
              src={previewUrl}
              alt={`Vista previa de ${file.name}`}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex items-start justify-between gap-4 border-t border-white/10 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-sm text-white/60">
                {formatFileSize(file.size)}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded border border-white/20 px-3 py-1.5 text-sm transition-colors hover:bg-white/10"
              >
                Cambiar
              </button>
              <button
                type="button"
                onClick={clearSelection}
                className="rounded border border-red-500/40 px-3 py-1.5 text-sm text-red-300 transition-colors hover:bg-red-500/10"
              >
                Quitar
              </button>
              <button type="button" onClick={handleUpload} disabled={!uploadUrl}
                className="rounded border border-green-500/40 px-3 py-1.5 text-sm text-green-300 transition-colors hover:bg-green-500/10"
              >
                Subir {/* className="bg-white px-4 py-2 text-black disabled:opacity-50" */}
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {uploadUrl && (
        <p className="text-sm text-white/60">
          URL de subida recibida correctamente.
        </p>
      )}
    </div>
  )
}

export default VirtualizacionPage

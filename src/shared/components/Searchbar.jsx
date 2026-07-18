import { useState, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function SearchBar() {
  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const inputRef = useRef(null)
  const navigate = useNavigate()

  function handleOpen() {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  function handleClose() {
    setOpen(false)
    setQuery("")
  }

  async function doSearch(q) {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      console.log("[SearchBar] resultado:", data)
      navigate(`/search?q=${encodeURIComponent(q)}`)
    } catch (err) { 
      console.error("[SearchBar] query enviado:", q)
      console.error("[SearchBar] error:", err.message)
    }
  }

  // Debounce 500ms
  useEffect(() => {
    if (!query.trim()) return
    const timer = setTimeout(() => doSearch(query.trim()), 500)
    return () => clearTimeout(timer)
  }, [query])

  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) doSearch(query.trim())
    if (e.key === "Escape") handleClose()
  }

  return (
    <div className="flex items-center gap-2">
      {open ? (
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleClose}
          placeholder="Buscar libros..."
          className="bg-white/10 text-sm text-white placeholder-white/40 px-3 py-1.5 rounded-lg outline-none border border-white/20 focus:border-white/40 transition-colors w-52"
        />
      ) : (
        <button onClick={handleOpen} className="cursor-pointer hover:text-white/70 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}
// <button onClick={handleOpen} className="hover:text-white/70 transition-colors">
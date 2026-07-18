import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ayanokouji from "@/assets/img/ayanokouji.png"
import { useAuth } from "@srd/context/authContext"

export default function UserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20">
          <img src={ayanokouji} alt={user?.nickname} className="w-full h-full object-cover" />
        </div>
        <span className="max-w-[7rem] text-sm font-medium line-clamp-1 break-words">
          {user?.nickname}
        </span>
        <svg
          className={`w-4 h-4 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown, Falta configuración, mi lista, mis libros, etc. */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-xs text-white/40 uppercase tracking-widest">Cuenta</p>
            <p className="text-sm font-semibold text-white truncate mt-0.5">{user?.nickname}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/10 hover:text-red-300 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
// old versión image y nickname para mostrar luego del login.
        // <div className="flex justify-self-center bg-gray-500">
        //   <Link className=" flex bg-green-900" to="home">
        //     <div className=" content-center max-w-10 bg-green-500" >
        //       <img className="box-border " src={ayanokouji} alt="Descripción de la imagen" />
        //     </div>
        //     <div className="min-w-14 max-w-28 ml-2 mr-4 content-center bg-gray-400"> {/* max-w-28 para que no se desborde el texto, max-w-24 (originalmente) */}
        //       <span className="line-clamp-2 leading-5 bg-red-400 break-words">
        //         {user.nickname}
        //         {/* Ana */}
        //         {/* Ayanokouji Kiyotaka */}
        //         {/* AyanokoujiKiyotakaRamiroGomezFernandezSuperMegaLargo */}
        //         {/* あやのこうじきよたかあやのこうじきよたか */}
        //       </span>
        //     </div>
        //   </Link>
        // </div>
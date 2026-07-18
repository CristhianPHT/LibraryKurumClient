import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '@srd/layouts/MainLayout'
// import PrivateRoute from '@srd/routes/PrivateRoute'
import Login from '@/features/auth/pages/Login'
import Register from '@/features/auth/pages/Register'
import Home from '@/features/home/pages/Home'
import { AuthProvider } from '@/shared/context/authContext'
// import User from '@features/users/pages/User'

export default function App() {
  return (
  <AuthProvider>
    <Routes>
      <Route element={<MainLayout />}>
        públicas
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        privadas
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/user/:username" element={<User />} /> */}
        {/* </Route> */}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
  )
}


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // React-dom rutas,navegación
// import './App.css' // Css, Tailwind...
// import { Header } from './Componentes/header' // Header general
// import { Footer } from './Componentes/footer' // Footer General
// import { Home } from './pages/home' // Home, página principal
// import { Generos } from "./pages/generos"; // Todo sobre los Géneros, CRUD
// import { Tipos } from './pages/tipos';    // Todo sobre los Tipos, CRUD
// import { FormCard } from './pages/FormCard'
// import { Testing01 } from './pages/testing' // 
// import { Portal } from "./pages/portada";
// import { FPortada } from "./pages/FPortada";

// function App() {
//   return (
//     <BrowserRouter>
//     <div className="flex flex-col min-h-screen">
//       {/* <Navigation/> */}
//       <Header/>
//       <div className="flex-grow">
//         <Routes>
//           <Route path='/' element={<Navigate to="/home"/>} />
//           <Route path="/home" element={<Home/>} />
//           <Route path='/gender' element={<Generos />} />
//           <Route path='/type' element={<Tipos />} />
//           <Route path='/portal' element={<Portal />} />
//           <Route path='/fportada' element={<FPortada/>} />
//           <Route path="/testing" element={<Testing01 />} />
//           <Route path="/testing/:id" element={<Testing01 />} />
//           <Route path="/formcard" element={<FormCard />} />
//           <Route path="/formcard/:id" element={<FormCard />} />
//           {/* <Route path='/2' element={<NewPage/>} /> */}
//         </Routes>
//       </div>
//       <Footer/>
//     </div>
//   </BrowserRouter>
//   )
// }

// export default App

import { Outlet } from 'react-router-dom'

import Header from '@/shared/components/Header'

// import Footer from '@/shared/components/Footer'

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">  {/* ocupa toda la pantalla */}
      <Header />
      <main className="flex-grow">   {/* empuja el footer abajo */}
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
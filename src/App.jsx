import React from 'react'
import MainRoutes from './Routes/MainRoutes'
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation();

  // ❌ pages jaha navbar nahi chahiye
  const hideNavbarRoutes = ["/", "/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
   <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden">

  {!shouldHideNavbar && <Navbar />}

  <div className="flex-1 overflow-y-auto px-2 sm:px-4">
    <MainRoutes />
  </div>

</div>
  )
}

export default App;
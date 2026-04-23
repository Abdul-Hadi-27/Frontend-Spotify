import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Artist from '../pages/Artist'
import Music from '../pages/Music'
import Login from '../pages/Login'
import Albums from '../pages/Albums'
import AlbumDetail from '../pages/AlbumDetail'
import ProtectedRoutes from '../ProtectedRoutes'



const MainRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

      {/* 🔥 Protected (any logged user) */}
      <Route
        path='/music'
        element={
          <ProtectedRoutes>
            <Music/>
          </ProtectedRoutes>
        }
      />

      <Route
        path='/albums/:id'
        element={
          <>
            <AlbumDetail/>
          </>
        }
      />

      {/* 🔥 Artist only */}
      <Route
        path='/artist'
        element={
          <ProtectedRoutes roleRequired="artist">
            <Artist/>
          </ProtectedRoutes>
        }
      />

      <Route
        path='/artist/album'
        element={
          <ProtectedRoutes roleRequired="artist">
            <Albums/>
          </ProtectedRoutes>
        }
      />

    </Routes>
  )
}

export default MainRoutes
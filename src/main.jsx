import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
     <ToastContainer  autoClose={2500}          // speed (2.5 sec)
      hideProgressBar={false}   // progress bar show
      newestOnTop               // latest toast upar
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"   />
  </BrowserRouter>,
)

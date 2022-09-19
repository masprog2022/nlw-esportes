import React from 'react'
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom/client'
import App from './App'
import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer/>
    <App />
  </React.StrictMode>
)

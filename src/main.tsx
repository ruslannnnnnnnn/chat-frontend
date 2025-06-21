import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './shared/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.tsx'
import "./styles/global.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='w-full h-[100vh] bg-background'>
      <RouterProvider router={routes}/>
    </div>
  </StrictMode>
)
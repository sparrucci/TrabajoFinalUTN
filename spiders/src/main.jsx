import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Index from './pages/Index'
import Spiders from './pages/Spiders'
import PaginaError from './pages/PaginaError'
import DetalleSpider from './pages/DetalleSpider'
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

//createBrowserRouter se encargará de armar las rutas de la app
const mapaRutas = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // primero debo indicar cual ser la pagina inicial
      { index: true, element: <Index/> },
      { path: "spiders", element: <Spiders/>},
      { path: "spiders/:id", element: <DetalleSpider/>},
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro /> },
      { path: "*", element: <PaginaError/>}
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={mapaRutas} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)

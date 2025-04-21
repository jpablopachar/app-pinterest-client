import { Outlet } from 'react-router-dom'
import LeftBar from '../../components/LeftBar/LeftBar'
import TopBar from '../../components/TopBar/TopBar'
import './Main.css'

/**
 * Componente principal de la aplicación que estructura el layout general.
 * 
 * Renderiza la barra lateral izquierda (LeftBar), la barra superior (TopBar)
 * y un área de contenido dinámico gestionada por el componente <Outlet />.
 * 
 * @component
 * @returns {JSX.Element} El layout principal de la aplicación.
 */
const Main = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  )
}

export default Main

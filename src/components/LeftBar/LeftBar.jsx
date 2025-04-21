import { Link } from 'react-router'
import Image from '../Image/Image'
import './LeftBar.css'

/**
 * Renderiza una barra lateral izquierda con iconos de navegación para la aplicación.
 * Incluye enlaces a la página principal, creación de contenido, actualizaciones, mensajes y configuración.
 * Cada icono utiliza el componente `Image` para mostrar la imagen correspondiente.
 *
 * @component
 * @returns {JSX.Element} Barra lateral con iconos de navegación.
 */
const LeftBar = () => {
	return (
		<div className="leftBar">
			<div className="menuIcons">
				<Link to="/" className="menuIcon">
					<Image path="/general/logo.png" alt="" className="logo" />
				</Link>
				<Link to="/" className="menuIcon">
					<Image path="/general/home.svg" alt="" />
				</Link>
				<Link to="/create" className="menuIcon">
					<Image path="/general/create.svg" alt="" />
				</Link>
				<Link to="/" className="menuIcon">
					<Image path="/general/updates.svg" alt="" />
				</Link>
				<Link to="/" className="menuIcon">
					<Image path="/general/messages.svg" alt="" />
				</Link>
			</div>
			<Link to="/" className="menuIcon">
				<Image path="/general/settings.svg" alt="" />
			</Link>
		</div>
	)
}

export default LeftBar

import { useNavigate } from 'react-router'
import Image from '../Image/Image'
import UserButton from '../UserButton/UserButton'
import './TopBar.css'

/**
 * Barra superior de la aplicación que incluye un formulario de búsqueda y un botón de usuario.
 * Al enviar el formulario, navega a la ruta de búsqueda con el término ingresado.
 *
 * @component
 *
 * @returns {JSX.Element} Elemento JSX que representa la barra superior con búsqueda y botón de usuario.
 */
const TopBar = () => {
	const navigate = useNavigate()

  /**
   * Maneja el evento de envío del formulario de búsqueda.
   * Previene el comportamiento por defecto del formulario y navega a la ruta de búsqueda
   * utilizando el valor ingresado en el primer campo del formulario.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - El evento de envío del formulario.
   */
	const handleSubmit = (event) => {
		event.preventDefault()

		navigate(`/search?search=${event.target[0].value}`)
	}

	return (
		<div className="topBar">
			<form onSubmit={handleSubmit} className="search">
				<Image path="/general/search.svg" alt="" />
				<input type="text" placeholder="Search" />
			</form>
			<UserButton />
		</div>
	)
}

export default TopBar

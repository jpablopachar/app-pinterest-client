import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { baseApi } from '../../api/baseApi'
import useAuthStore from '../../store/authStore'
import Image from '../Image/Image'
import './UserButton.scss'

/**
 * Muestra un botón de usuario que permite acceder a opciones como ver el perfil, configuración y cerrar sesión.
 * Si no hay un usuario autenticado, muestra un enlace para iniciar sesión o registrarse.
 *
 * @component
 *
 * @returns {JSX.Element} Elemento JSX que representa el botón de usuario y sus opciones.
 *
 * @description
 * - Si el usuario está autenticado, muestra su avatar y un menú desplegable con opciones.
 * - Permite cerrar sesión llamando a la API y eliminando el usuario actual del estado global.
 * - Si no hay usuario autenticado, muestra un enlace para autenticarse.
 */
const UserButton = () => {
	const navigate = useNavigate()

	const [open, setOpen] = useState(false)

	const { currentUser, removeCurrentUser } = useAuthStore()

	/**
	 * Maneja el proceso de cierre de sesión del usuario.
	 *
	 * Realiza una solicitud POST al endpoint de cierre de sesión, elimina la información
	 * del usuario actual y redirige a la página de autenticación. Si ocurre un error,
	 * lo muestra en la consola.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>} No retorna ningún valor.
	 */
	const handleLogout = async () => {
		try {
			await baseApi.post('/users/auth/logout', {})

			removeCurrentUser()

			navigate('/auth')
		} catch (error) {
			console.error(error)
		}
	}

	return currentUser ? (
		<div className="userButton">
			<Image path={currentUser.img || '/general/noAvatar.png'} alt="" />
			<div onClick={() => setOpen((prev) => !prev)}>
				<Image path="/general/arrow.svg" alt="" className="arrow" />
			</div>
			{open && (
				<div className="userOptions">
					<Link to={`/profile/${currentUser.username}`} className="userOption">
						Profile
					</Link>
					<div className="userOption">Setting</div>
					<div className="userOption" onClick={handleLogout}>
						Logout
					</div>
				</div>
			)}
		</div>
	) : (
		<Link to="/auth" className="loginLink">
			Login / Sign Up
		</Link>
	)
}

export default UserButton

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { baseApi } from '../../../api/baseApi'
import useAuthStore from '../../../store/authStore'

/**
 * Hook personalizado para manejar la autenticación de usuarios.
 *
 * Proporciona lógica para el inicio de sesión y registro, así como el manejo de errores y el cambio entre modos.
 *
 * @returns {Object} Un objeto con las siguientes propiedades:
 *   @property {boolean} isRegister - Indica si el modo actual es registro (true) o inicio de sesión (false).
 *   @property {string|null} error - Mensaje de error si ocurre alguno durante la autenticación.
 *   @property {function} handleSubmit - Función para manejar el envío del formulario de autenticación.
 *   @property {function} toggleAuthMode - Función para alternar entre los modos de registro e inicio de sesión.
 */
const useAuth = () => {
	const navigate = useNavigate()

	const [isRegister, setIsRegister] = useState(false)
	const [error, setError] = useState(null)

	const { setCurrentUser } = useAuthStore()

	/**
	 * Maneja el envío del formulario de autenticación (registro o inicio de sesión).
	 *
	 * @async
	 * @function
	 * @param {Event} event - El evento de envío del formulario.
	 * @returns {Promise<void>} No retorna ningún valor.
	 * @description
	 * Previene el comportamiento por defecto del formulario, recopila los datos ingresados,
	 * realiza una petición POST a la API para autenticar o registrar al usuario según corresponda,
	 * actualiza el usuario actual en el estado y navega a la página principal.
	 * Si ocurre un error, establece el mensaje de error correspondiente.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		const formData = new FormData(event.target)
		const data = Object.fromEntries(formData.entries())

		try {
			const res = await baseApi.post(
				`/users/auth/${isRegister ? 'register' : 'login'}`,
				data,
			)

			setCurrentUser(res.data)
			navigate('/')
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	/**
	 * Alterna el modo de autenticación entre registro e inicio de sesión.
	 * Cambia el estado de `isRegister` al valor opuesto y limpia cualquier error existente.
	 */
	const toggleAuthMode = () => {
		setIsRegister((prev) => !prev)
		setError(null)
	}

	return {
		isRegister,
		error,
		handleSubmit,
		toggleAuthMode,
	}
}

export default useAuth

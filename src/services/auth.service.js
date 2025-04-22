import { baseApi } from '../api/baseApi'

/**
 * Realiza una solicitud de registro o inicio de sesión de usuario.
 *
 * @async
 * @function
 * @param {string} action - La acción a realizar, puede ser 'register' o 'login'.
 * @param {Object} data - Los datos del usuario necesarios para la autenticación.
 * @returns {Promise<Object>} Los datos de respuesta de la API.
 */
export const registerLogin = async (action, data) => {
	const res = await baseApi.post(`/users/auth/${action}`, data)

	return res.data
}

/**
 * Cierra la sesión del usuario actual enviando una solicitud al endpoint de logout.
 * 
 * @async
 * @function
 * @returns {Promise<any>} Una promesa que resuelve con la respuesta del servidor tras cerrar la sesión.
 */
export const logout = async () => {
	const res = await baseApi.post('/users/auth/logout', {})

	return res.data
}

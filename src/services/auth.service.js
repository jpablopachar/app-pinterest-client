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

/**
 * Obtiene la información de un usuario específico por su nombre de usuario.
 *
 * @async
 * @function
 * @param {string} username - Nombre de usuario a consultar.
 * @returns {Promise<Object>} La información del usuario solicitado.
 */
export const getUser = async (username) => {
	const res = await baseApi.get(`/users/${username}`)

	return res.data
}

/**
 * Permite a un usuario seguir a otro usuario.
 *
 * @async
 * @function
 * @param {string} username - Nombre del usuario al que se desea seguir.
 * @returns {Promise<Object>} Los datos de respuesta de la API tras la operación de seguimiento.
 */
export const followUser = async (username) => {
	const res = await baseApi.post(`/users/follow/${username}`)

	return res.data
}

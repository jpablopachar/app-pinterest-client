import { baseApi } from '../api/baseApi'

/**
 * Obtiene los tableros de un usuario específico.
 *
 * @async
 * @function
 * @param {string} userId - El identificador único del usuario cuyos tableros se desean obtener.
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de los tableros del usuario.
 */
export const getBoardsByUserId = async (userId) => {
	const res = await baseApi.get(`/boards/${userId}`)

	return res.data
}

/**
 * Obtiene todos los tableros disponibles.
 *
 * @async
 * @function
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de todos los tableros.
 */
export const getBoards = async () => {
	const res = await baseApi.get('/boards')

	return res.data
}

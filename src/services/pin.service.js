import { baseApi } from '../api/baseApi'

/**
 * Obtiene una lista de pines desde la API, permitiendo filtrar por búsqueda, usuario o tablero, y paginar los resultados.
 *
 * @async
 * @function
 * @param {Object} params - Parámetros para la consulta de pines.
 * @param {string} params.pageParam - Cursor para la paginación de resultados.
 * @param {string} [params.search] - Término de búsqueda para filtrar los pines.
 * @param {string} [params.userId] - ID del usuario para filtrar los pines.
 * @param {string} [params.boardId] - ID del tablero para filtrar los pines.
 * @returns {Promise<Object>} Los datos de la respuesta de la API con la lista de pines.
 */
export const getPins = async ({ pageParam, search, userId, boardId }) => {
	const res = await baseApi.get(
		`/pins?cursor=${pageParam}&search=${search || ''}&userId=${
			userId || ''
		}&boardId=${boardId || ''}`,
	)

	return res.data
}

/**
 * Verifica si el usuario actual ha interactuado con un pin específico.
 *
 * @async
 * @function
 * @param {string} postId - ID del pin a verificar interacción.
 * @returns {Promise<Object>} Datos que indican el estado de interacción con el pin.
 */
export const checkPinInteraction = async (postId) => {
	const res = await baseApi.get(`/pins/interaction-check/${postId}`)

	return res.data
}

/**
 * Realiza una interacción del usuario con un pin específico.
 *
 * @async
 * @function
 * @param {string} id - ID del pin con el que se va a interactuar.
 * @param {string} type - Tipo de interacción (ej. "like", "save").
 * @returns {Promise<Object>} Resultado de la interacción con el pin.
 */
export const interactWithPin = async (id, type) => {
	const res = await baseApi.post(`/pins/interact/${id}`, { type })

	return res.data
}

/**
 * Crea un nuevo pin en la plataforma.
 *
 * @async
 * @function
 * @param {Object} post - Datos del pin a crear.
 * @returns {Promise<Object>} El pin creado con todos sus datos.
 */
export const addPin = async (post) => {
	const res = await baseApi.post('/pins', post)

	return res.data
}

/**
 * Obtiene un pin específico por su ID.
 *
 * @async
 * @function
 * @param {string} id - ID del pin que se desea obtener.
 * @returns {Promise<Object>} El pin con todos sus datos.
 */
export const getPinById = async (id) => {
	const res = await baseApi.get(`/pins/${id}`)

	return res.data
}

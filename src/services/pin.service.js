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

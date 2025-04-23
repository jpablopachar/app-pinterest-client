import { baseApi } from "../api/baseApi"

/**
 * Obtiene los comentarios asociados a un identificador específico.
 *
 * @async
 * @function
 * @param {string|number} id - El identificador del recurso para el cual se desean obtener los comentarios.
 * @returns {Promise<Object>} Una promesa que resuelve con los datos de los comentarios obtenidos de la API.
 */
export const getComments = async (id) => {
  const res = await baseApi.get(`/comments/${id}`)

  return res.data
}

/**
 * Agrega un nuevo comentario enviando los datos al endpoint de la API.
 *
 * @async
 * @function
 * @param {Object} data - Los datos del comentario a agregar.
 * @returns {Promise<Object>} La respuesta de la API con los datos del comentario agregado.
 */
export const addComment = async (data) => {
  const res = await baseApi.post(`/comments`, data)

  return res.data
}
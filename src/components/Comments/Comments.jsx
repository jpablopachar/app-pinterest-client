import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getComments } from '../../services/comment.service'
import './Comments.css'
import Comment from './components/Comment/Comment'
import CommentForm from './components/CommentForm/CommentForm'

/**
 * @typedef {Object} CommentsProps
 * @property {string} id - Identificador del pin al que se le agregarán los comentarios.
 */

/**
 * Componente Comments
 *
 * Muestra la lista de comentarios asociados a un elemento identificado por `id`.
 * Utiliza React Query para obtener los comentarios desde el backend.
 * Muestra un mensaje de carga mientras se obtienen los datos y un mensaje de error si ocurre algún problema.
 * Si no hay comentarios, muestra "No comments". Si hay comentarios, muestra la cantidad y la lista de comentarios.
 * Incluye un formulario para agregar nuevos comentarios.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador del elemento para el cual se obtienen los comentarios.
 * @returns {JSX.Element} El componente de comentarios renderizado.
 */
const Comments = ({ id }) => {
	/**
	 * Hook de React Query para obtener los comentarios asociados a un identificador específico.
	 *
	 * @constant
	 * @type {Object}
	 * @property {boolean} isPending - Indica si la consulta está en proceso.
	 * @property {Error|null} error - Contiene el error si la consulta falla, o null si no hay error.
	 * @property {Array|undefined} data - Los datos de los comentarios obtenidos, o undefined si aún no se han cargado.
	 */
	const { isPending, error, data } = useQuery({
		queryKey: ['comments', id],
		queryFn: async () => await getComments(id),
	})

	if (isPending) return 'Loading...'

	if (error) return `An error has occurred: ${error.message}`

	return (
		<div className="comments">
			<div className="commentList">
				<span className="commentCount">
					{data.length === 0 ? 'No comments' : data.length + ' Comments'}
				</span>
				{data.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
			</div>
			<CommentForm id={id} />
		</div>
	)
}

export default Comments

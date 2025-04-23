import { format } from 'timeago.js'
import Image from '../../../Image/Image'

/**
 * @typedef {Object} CommentProps
 * @property {Object} comment - Objeto que representa el comentario.
 * @property {Object} comment.user - Usuario que realizó el comentario.
 * @property {string} comment.user.img - Ruta de la imagen del usuario.
 * @property {string} comment.user.displayName - Nombre visible del usuario.
 * @property {string} comment.description - Texto del comentario.
 * @property {string|number|Date} comment.createdAt - Fecha de creación del comentario.
 */

/**
 * Componente para mostrar un comentario individual, incluyendo la imagen del usuario, nombre, texto del comentario y la fecha de creación.
 *
 * @component
 * @param {CommentProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa el comentario renderizado.
 */
const Comment = ({ comment }) => {
	return (
		<div className="comment">
			<Image path={comment.user.img || '/general/noAvatar.png'} alt="" />
			<div className="commentContent">
				<span className="commentUsername">{comment.user.displayName}</span>
				<p className="commentText">{comment.description}</p>
				<span className="commentTime">{format(comment.createdAt)}</span>
			</div>
		</div>
	)
}

export default Comment

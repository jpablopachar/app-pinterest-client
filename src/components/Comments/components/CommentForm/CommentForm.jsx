import { useMutation, useQueryClient } from '@tanstack/react-query'
import EmojiPicker from 'emoji-picker-react'
import { useState } from 'react'
import { addComment } from '../../../../services/comment.service'

/**
 * @typedef {Object} CommentFormProps
 * @property {string} id - Identificador del pin al que se le agregarán los comentarios.
 */

/**
 * Componente CommentForm
 *
 * Un formulario para agregar comentarios a un pin específico.
 * Permite al usuario escribir un comentario, seleccionar un emoji y enviarlo.
 * Al enviar el comentario, se actualiza la lista de comentarios asociada al pin.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @returns {JSX.Element} Formulario de comentario renderizado.
 */
const CommentForm = ({ id }) => {
	const queryClient = useQueryClient()

	const [open, setOpen] = useState(false)
	const [desc, setDesc] = useState('')

	/**
	 * Mutación para agregar un comentario utilizando React Query.
	 *
	 * @constant
	 * @type {import('@tanstack/react-query').UseMutationResult}
	 * @description
	 * Utiliza la función `addComment` para enviar un nuevo comentario.
	 * Al completarse exitosamente, invalida la consulta de comentarios asociada al `id`,
	 * limpia el campo de descripción y cierra el formulario.
	 */
	const mutation = useMutation({
		mutationFn: addComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments', id] })
			setDesc('')
			setOpen(false)
		},
	})

	/**
	 * Maneja el evento de clic en un emoji.
	 * Agrega el emoji seleccionado al final de la descripción actual y cierra el selector de emojis.
	 *
	 * @param {Object} emoji - Objeto que representa el emoji seleccionado.
	 * @param {string} emoji.emoji - El carácter del emoji seleccionado.
	 */
	const handleEmojiClick = (emoji) => {
		setDesc((prev) => prev + ' ' + emoji.emoji)
		setOpen(false)
	}

	/**
	 * Maneja el evento de envío del formulario de comentarios.
	 * Previene el comportamiento por defecto del formulario y ejecuta una mutación
	 * para enviar el comentario asociado a un pin específico.
	 *
	 * @async
	 * @param {React.FormEvent<HTMLFormElement>} event - El evento de envío del formulario.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		mutation.mutate({
			description: desc,
			pin: id,
		})
	}

	return (
		<form className="commentForm" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Add a comment"
				onChange={(e) => setDesc(e.target.value)}
				value={desc}
			/>
			<div className="emoji">
				<div onClick={() => setOpen((prev) => !prev)}>😊</div>
				{open && (
					<div className="emojiPicker">
						<EmojiPicker onEmojiClick={handleEmojiClick} />
					</div>
				)}
			</div>
		</form>
	)
}

export default CommentForm

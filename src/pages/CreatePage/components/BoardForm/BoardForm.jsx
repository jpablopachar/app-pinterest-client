import Image from '../../../../components/Image/Image'

/**
 * @typedef BoardFormProps
 * @property {function} setNewBoard - Función para establecer el título del nuevo tablero.
 * @property {function} setIsNewBoardOpen - Función para alternar la visibilidad del formulario de nuevo tablero.
 * @returns {JSX.Element} El componente BoardForm renderizado.
 */

/**
 * Componente BoardForm
 *
 * Muestra un formulario modal para crear un nuevo tablero.
 * Permite al usuario ingresar el título del tablero y enviarlo.
 * Al enviar el formulario, actualiza el estado del nuevo tablero y cierra el modal.
 *
 * @component
 * @param {BoardFormProps} props - Propiedades del componente.
 * @param {function(string):void} props.setNewBoard - Función para establecer el título del nuevo tablero.
 * @param {function(boolean):void} props.setIsNewBoardOpen - Función para abrir o cerrar el modal del formulario.
 * @returns {JSX.Element} El formulario para crear un nuevo tablero.
 */
const BoardForm = ({ setNewBoard, setIsNewBoardOpen }) => {
	/**
	 * Maneja el evento de envío del formulario para crear un nuevo tablero.
	 * Previene el comportamiento por defecto del formulario, obtiene el título ingresado,
	 * actualiza el estado con el nuevo título del tablero y cierra el formulario modal.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event - El evento de envío del formulario.
	 */
	const handleSubmit = (event) => {
		event.preventDefault()

		const title = event.target[0].value

		setNewBoard(title)
		setIsNewBoardOpen(false)
	}

	return (
		<div className="boardForm">
			<div className="boardFormContainer">
				<div
					className="boardFormClose"
					onClick={() => setIsNewBoardOpen(false)}
				>
					<Image path="/general/cancel.svg" alt="" w={20} h={20} />
				</div>
				<form onSubmit={handleSubmit}>
					<h1>Create a new board</h1>
					<input type="text" placeholder="Board Title" />
					<button>Create</button>
				</form>
			</div>
		</div>
	)
}

export default BoardForm

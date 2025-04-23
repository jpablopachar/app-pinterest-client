import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Editor from '../../components/Editor/Editor'
import Image from '../../components/Image/Image'
import { getBoards } from '../../services/board.service'
import { addPin } from '../../services/pin.service'
import useAuthStore from '../../store/authStore'
import useEditorStore from '../../store/editorStore'
import BoardForm from './components/BoardForm/BoardForm'

/**
 * Componente CreatePage
 *
 * Página para crear un nuevo Pin, permitiendo al usuario subir una imagen o video,
 * editarlo, agregar título, descripción, enlace, seleccionar o crear un tablero,
 * y añadir etiquetas. Utiliza formularios controlados y maneja la previsualización
 * de archivos, así como la navegación tras la creación exitosa del Pin.
 *
 * Características:
 * - Permite subir y previsualizar archivos de imagen o video.
 * - Permite editar el Pin antes de publicarlo.
 * - Permite seleccionar un tablero existente o crear uno nuevo.
 * - Incluye campos para título, descripción, enlace y etiquetas.
 * - Redirige al usuario al Pin creado tras la publicación.
 * - Protege la ruta para usuarios autenticados.
 *
 * Hooks utilizados:
 * - useRef: Referencia al formulario.
 * - useNavigate: Navegación programática.
 * - useAuthStore: Obtención del usuario autenticado.
 * - useEditorStore: Manejo de opciones de edición.
 * - useMutation: Envío de datos para crear el Pin.
 * - useQuery: Obtención de tableros existentes.
 * - useState: Manejo de estados locales (archivo, previsualización, edición, etc).
 * - useEffect: Efectos secundarios para autenticación y previsualización de archivos.
 *
 * @component
 * @returns {JSX.Element} El componente CreatePage.
 */
const CreatePage = () => {
	const formRef = useRef()

	const navigate = useNavigate()

	const { currentUser } = useAuthStore()

	const { textOptions, canvasOptions, resetStore } = useEditorStore()

	const mutation = useMutation({
		mutationFn: addPin,
		onSuccess: (data) => {
			resetStore()
			navigate(`/pin/${data._id}`)
		},
	})

	const { data, isPending, error } = useQuery({
		queryKey: ['formBoards'],
		queryFn: async () => await getBoards(),
	})

	const [file, setFile] = useState(null)
	const [previewImg, setPreviewImg] = useState({ url: '', height: 0, width: 0 })
	const [isEditing, setIsEditing] = useState(false)
	const [newBoard, setNewBoard] = useState('')
	const [isNewBoardOpen, setIsNewBoardOpen] = useState(false)

	/**
	 * Maneja el envío del formulario para crear o editar un elemento.
	 *
	 * Si está en modo edición (`isEditing`), desactiva el modo edición.
	 * Si no está en modo edición, recopila los datos del formulario,
	 * agrega archivos y opciones adicionales, y ejecuta la mutación para enviar los datos.
	 *
	 * @async
	 * @function
	 * @returns {Promise<void>} No retorna ningún valor.
	 */
	const handleSubmit = async () => {
		if (isEditing) {
			setIsEditing(false)
		} else {
			const formData = new FormData(formRef.current)

			formData.append('media', file)
			formData.append('textOptions', JSON.stringify(textOptions))
			formData.append('canvasOptions', JSON.stringify(canvasOptions))
			formData.append('newBoard', newBoard)

			mutation.mutate(formData)
		}
	}

	/**
	 * Alterna el estado de visibilidad para la creación de un nuevo tablero.
	 * Cambia el valor de `isNewBoardOpen` entre verdadero y falso.
	 *
	 * @function
	 * @returns {void}
	 */
	const handleNewBoard = () => {
		setIsNewBoardOpen((prev) => !prev)
	}

	useEffect(() => {
		if (!currentUser) {
			navigate('/auth')
		}
	}, [navigate, currentUser])

	useEffect(() => {
		if (file) {
			const img = new Image()

			img.src = URL.createObjectURL(file)

			img.onload = () => {
				setPreviewImg({
					url: URL.createObjectURL(file),
					width: img.width,
					height: img.height,
				})
			}
		}
	}, [file])

	return (
		<div className="createPage">
			<div className="createTop">
				<h1>{isEditing ? 'Design your Pin' : 'Create Pin'}</h1>
				<button onClick={handleSubmit}>{isEditing ? 'Done' : 'Publish'}</button>
			</div>
			{isEditing ? (
				<Editor previewImg={previewImg} />
			) : (
				<div className="createBottom">
					{previewImg.url ? (
						<div className="preview">
							<img src={previewImg.url} alt="" />
							<div className="editIcon" onClick={() => setIsEditing(true)}>
								<Image path="/general/edit.svg" alt="" />
							</div>
						</div>
					) : (
						<>
							<label htmlFor="file" className="upload">
								<div className="uploadTitle">
									<Image path="/general/upload.svg" alt="" />
									<span>Choose a file</span>
								</div>
								<div className="uploadInfo">
									We recommend using high quality .jpg files less than 20 MB or
									.mp4 files less than 200 MB.
								</div>
							</label>
							<input
								type="file"
								id="file"
								hidden
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</>
					)}
					<form className="createForm" ref={formRef}>
						<div className="createFormItem">
							<label htmlFor="title">Title</label>
							<input
								type="text"
								placeholder="Add a title"
								name="title"
								id="title"
							/>
						</div>
						<div className="createFormItem">
							<label htmlFor="description">Description</label>
							<textarea
								rows={6}
								type="text"
								placeholder="Add a detailed description"
								name="description"
								id="description"
							/>
						</div>
						<div className="createFormItem">
							<label htmlFor="link">Link</label>
							<input
								type="text"
								placeholder="Add a link"
								name="link"
								id="link"
							/>
						</div>
						{(!isPending || !error) && (
							<div className="createFormItem">
								<label htmlFor="board">Board</label>
								<select name="board" id="board">
									<option value="">Choose a board</option>
									{data?.map((board) => (
										<option value={board._id} key={board._id}>
											{board.title}
										</option>
									))}
								</select>
								<div className="newBoard">
									{newBoard && (
										<div className="newBoardContainer">
											<div className="newBoardItem">{newBoard}</div>
										</div>
									)}
									<div className="createBoardButton" onClick={handleNewBoard}>
										Create new board
									</div>
								</div>
							</div>
						)}
						<div className="createFormItem">
							<label htmlFor="tags">Tagged topics</label>
							<input type="text" placeholder="Add tags" name="tags" id="tags" />
							<small>Don&apos;t worry, people won&apos;t see your tags</small>
						</div>
					</form>
					{isNewBoardOpen && (
						<BoardForm
							setIsNewBoardOpen={setIsNewBoardOpen}
							setNewBoard={setNewBoard}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default CreatePage

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getBoards } from '../../../services/board.service'
import { addPin } from '../../../services/pin.service'
import useAuthStore from '../../../store/authStore'
import useEditorStore from '../../../store/editorStore'

/**
 * @typedef {Object} CreatePageHook
 * @property {Object} formRef - Referencia al formulario.
 * @property {Object} previewImg - Datos de previsualización de la imagen.
 * @property {boolean} isEditing - Indica si el usuario está editando el Pin.
 * @property {string} newBoard - Nombre del nuevo tablero.
 * @property {boolean} isNewBoardOpen - Controla la visibilidad del formulario de nuevo tablero.
 * @property {Object} boardsData - Datos de los tableros obtenidos de la API.
 * @property {boolean} isBoardsLoading - Indica si se están cargando los tableros.
 * @property {Object|null} boardsError - Error al cargar los tableros.
 * @property {boolean} isPinCreating - Indica si se está creando un Pin.
 * @property {function} handleSubmit - Función para manejar el envío del formulario.
 * @property {function} handleNewBoard - Función para alternar el formulario de nuevo tablero.
 * @property {function} setFile - Función para actualizar el archivo.
 * @property {function} setNewBoard - Función para actualizar el nombre del nuevo tablero.
 * @property {function} setIsNewBoardOpen - Función para actualizar la visibilidad del formulario.
 */

/**
 * Hook personalizado para gestionar la creación de un nuevo Pin.
 *
 * Proporciona la lógica y el estado necesarios para crear un Pin, incluyendo:
 * - Manejo del archivo (imagen/video)
 * - Previsualización del archivo
 * - Edición del Pin
 * - Selección y creación de tableros
 * - Envío del formulario
 * - Validación de usuario autenticado
 *
 * @returns {CreatePageHook} Un objeto con las siguientes propiedades:
 * - `formRef`: Referencia al formulario.
 * - `previewImg`: Datos de previsualización de la imagen.
 * - `isEditing`: Indica si el usuario está editando el Pin.
 * - `newBoard`: Nombre del nuevo tablero.
 * - `isNewBoardOpen`: Controla la visibilidad del formulario de nuevo tablero.
 * - `boardsData`: Datos de los tableros obtenidos de la API.
 * - `isBoardsLoading`: Indica si se están cargando los tableros.
 * - `boardsError`: Error al cargar los tableros.
 * - `isPinCreating`: Indica si se está creando un Pin.
 * - `handleSubmit`: Función para manejar el envío del formulario.
 * - `handleNewBoard`: Función para alternar el formulario de nuevo tablero.
 * - `setFile`: Función para actualizar el archivo.
 * - `setNewBoard`: Función para actualizar el nombre del nuevo tablero.
 * - `setIsNewBoardOpen`: Función para actualizar la visibilidad del formulario.
 */
const useCreatePage = () => {
	const formRef = useRef()

	const navigate = useNavigate()

	const { currentUser } = useAuthStore()

	const { textOptions, canvasOptions, resetStore } = useEditorStore()

	const [file, setFile] = useState(null)
	const [previewImg, setPreviewImg] = useState({ url: '', height: 0, width: 0 })
	const [isEditing, setIsEditing] = useState(false)
	const [newBoard, setNewBoard] = useState('')
	const [isNewBoardOpen, setIsNewBoardOpen] = useState(false)

	const mutation = useMutation({
		mutationFn: addPin,
		onSuccess: (data) => {
			resetStore()
			navigate(`/pin/${data._id}`)
		},
	})

	const {
		data: boardsData,
		isPending: isBoardsLoading,
		error: boardsError,
	} = useQuery({
		queryKey: ['formBoards'],
		queryFn: async () => await getBoards(),
	})

	/**
	 * Maneja el envío del formulario para crear o editar un elemento.
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

	return {
		formRef,
		previewImg,
		isEditing,
		newBoard,
		isNewBoardOpen,
		boardsData: boardsData,
		isBoardsLoading,
		boardsError,
		isPinCreating: mutation.isPending,
		handleSubmit,
		handleNewBoard,
		setFile,
		setIsEditing,
		setNewBoard,
		setIsNewBoardOpen,
	}
}

export default useCreatePage

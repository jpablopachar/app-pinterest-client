import { useEffect, useRef } from 'react'
import useEditorStore from '../../../../../store/editorStore'

/**
 * @typedef {Object} PreviewImg
 * @property {string} url - URL de la imagen previa
 * @property {number} height - Altura de la imagen previa
 * @property {number} width - Ancho de la imagen previa
 */

/**
 * @typedef {Object} WorkspaceHook
 * @property {Object} refs - Referencias DOM para el componente
 * @property {Object} textOptions - Opciones de texto actuales
 * @property {Object} canvasOptions - Opciones del canvas actuales
 * @property {function} handleMouseMove - Manejador para el evento de movimiento del mouse
 * @property {function} handleMouseUp - Manejador para el evento cuando se suelta el botón del mouse
 * @property {function} handleMouseLeave - Manejador para el evento cuando el mouse sale del área
 * @property {function} handleMouseDown - Manejador para el evento cuando se presiona el botón del mouse
 * @property {function} handleTextChange - Manejador para el cambio de texto
 * @property {function} handleDeleteText - Manejador para eliminar el texto
 */

/**
 * Hook personalizado para manejar la lógica del área de trabajo del editor.
 *
 * Proporciona funcionalidades para manipular texto en el canvas, como arrastrar,
 * editar y eliminar. También gestiona el ajuste dinámico del tamaño del canvas
 * según las dimensiones de la imagen de previsualización.
 *
 * @param {PreviewImg} previewImg - Objeto que contiene la URL y dimensiones de la imagen previa
 * @returns {WorkspaceHook} - Objeto que contiene las siguientes propiedades:
 * - `refs`: Referencias DOM para el componente
 * - `textOptions`: Opciones de texto actuales (posición, tamaño, etc.)
 * - `canvasOptions`: Opciones del canvas actuales (dimensiones, color de fondo, etc.)
 * - `handleMouseMove`: Manejador para el evento de movimiento del mouse
 * - `handleMouseUp`: Manejador para el evento cuando se suelta el botón del mouse
 * - `handleMouseLeave`: Manejador para el evento cuando el mouse sale del área
 * - `handleMouseDown`: Manejador para el evento cuando se presiona el botón del mouse
 * - `handleTextChange`: Manejador para el cambio de texto
 * - `handleDeleteText`: Manejador para eliminar el texto
 */
const useWorkspace = (previewImg) => {
	const itemRef = useRef(null)
	const containerRef = useRef(null)
	const draggingRef = useRef(false)
	const offsetRef = useRef({ x: 0, y: 0 })

	const {
		textOptions,
		canvasOptions,
		setSelectedLayer,
		setTextOptions,
		setCanvasOptions,
	} = useEditorStore()

	/**
	 * Manejador del evento de movimiento del mouse durante una operación de arrastre.
	 * Actualiza la posición del texto en función de la posición actual del cursor y el desplazamiento inicial.
	 *
	 * @param {MouseEvent} event - El evento de movimiento del mouse.
	 */
	const handleMouseMove = (event) => {
		if (!draggingRef.current) return

		setTextOptions({
			...textOptions,
			top: event.clientY - offsetRef.current.y,
			left: event.clientX - offsetRef.current.x,
		})
	}

	/**
	 * Manejador del evento mouseup.
	 *
	 * Esta función se encarga de finalizar la acción de arrastre estableciendo
	 * el valor de la referencia `draggingRef.current` a `false` cuando el usuario
	 * suelta el botón del ratón.
	 */
	const handleMouseUp = () => {
		draggingRef.current = false
	}

	/**
	 * Manejador del evento cuando el mouse sale del área del componente.
	 * Establece la referencia de arrastre (`draggingRef.current`) en falso,
	 * indicando que la acción de arrastre ha finalizado.
	 */
	const handleMouseLeave = () => {
		draggingRef.current = false
	}

	/**
	 * Maneja el evento de mouse down sobre el área de trabajo.
	 *
	 * - Selecciona la capa de texto estableciendo 'text' como la capa activa.
	 * - Marca que se está iniciando una operación de arrastre.
	 * - Calcula y almacena el desplazamiento inicial entre la posición del mouse y la posición actual del texto.
	 *
	 * @param {React.MouseEvent} event - El evento de mouse down generado por el usuario.
	 */
	const handleMouseDown = (event) => {
		setSelectedLayer('text')

		draggingRef.current = true

		offsetRef.current = {
			x: event.clientX - textOptions.left,
			y: event.clientY - textOptions.top,
		}
	}

	/**
	 * Maneja el cambio en el texto del elemento de entrada.
	 * Actualiza el estado de textOptions con el nuevo valor del texto.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - El evento de cambio de la entrada de texto
	 */
	const handleTextChange = (event) => {
		setTextOptions({ ...textOptions, text: event.target.value })
	}

	/**
	 * Maneja la eliminación del texto estableciendo el valor de texto a una cadena vacía.
	 */
	const handleDeleteText = () => {
		setTextOptions({ ...textOptions, text: '' })
	}

	useEffect(() => {
		if (canvasOptions.height === 0) {
			const canvasHeight = (375 * previewImg.height) / previewImg.width

			setCanvasOptions({
				...canvasOptions,
				height: canvasHeight,
				orientation: canvasHeight > 375 ? 'portrait' : 'landscape',
			})
		}
	}, [previewImg, canvasOptions, setCanvasOptions])

	return {
		refs: {
			itemRef,
			containerRef,
		},
		textOptions,
		canvasOptions,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
		handleMouseDown,
		handleTextChange,
		handleDeleteText,
	}
}

export default useWorkspace

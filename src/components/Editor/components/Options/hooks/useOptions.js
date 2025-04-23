import { useState } from 'react'
import useEditorStore from '../../../../../store/editorStore'

/**
 * @typedef {Object} PreviewImg
 * @property {string} url - URL de la imagen previa
 * @property {number} height - Altura de la imagen previa
 * @property {number} width - Ancho de la imagen previa
 */

/**
 * @typedef {Object} OptionsHook
 * @property {string} selectedLayer - Capa seleccionada actualmente en el editor
 * @property {Object} textOptions - Opciones de texto actuales
 * @property {Object} canvasOptions - Opciones del lienzo actuales
 * @property {boolean} isColorPickerOpen - Indica si el selector de color está abierto
 * @property {'portrait'|'landscape'} originalOrientation - Orientación original de la imagen
 * @property {function} setTextOptions - Función para actualizar opciones de texto
 * @property {function} setCanvasOptions - Función para actualizar opciones del lienzo
 * @property {function} toggleColorPicker - Función para alternar la visibilidad del selector de color
 * @property {function} handleOrientationClick - Función para manejar cambio de orientación
 * @property {function} handleSizeClick - Función para manejar cambio de tamaño
 */

/**
 * Hook personalizado para manejar las opciones del editor de imágenes.
 *
 * Proporciona la lógica para manejar la orientación, tamaño y color en el editor,
 * separando estas responsabilidades del componente de UI.
 *
 * @param {PreviewImg} previewImg - Objeto que contiene las dimensiones de la imagen previa.
 * @returns {OptionsHook} Un objeto que contiene las siguientes propiedades:
 * - `selectedLayer`: Capa seleccionada actualmente en el editor.
 * - `textOptions`: Opciones de texto actuales.
 * - `canvasOptions`: Opciones del lienzo actuales.
 * - `isColorPickerOpen`: Indica si el selector de color está abierto.
 * - `originalOrientation`: Orientación original de la imagen.
 * - `setTextOptions`: Función para actualizar opciones de texto.
 * - `setCanvasOptions`: Función para actualizar opciones del lienzo.
 * - `toggleColorPicker`: Función para alternar la visibilidad del selector de color.
 * - `handleOrientationClick`: Función para manejar el cambio de orientación.
 * - `handleSizeClick`: Función para manejar el cambio de tamaño.
 */
const useOptions = (previewImg) => {
	const {
		selectedLayer,
		textOptions,
		canvasOptions,
		setTextOptions,
		setCanvasOptions,
	} = useEditorStore()

	/**
	 * Estado que indica si el selector de color (Color Picker) está abierto o cerrado.
	 * @type {[boolean, Function]}
	 * @property {boolean} isColorPickerOpen - Verdadero si el selector de color está abierto, falso en caso contrario.
	 * @property {Function} setIsColorPickerOpen - Función para actualizar el estado de apertura del selector de color.
	 */
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

	/**
	 * Determina la orientación original de la imagen de vista previa.
	 * @type {'portrait' | 'landscape'}
	 */
	const originalOrientation =
		previewImg.width < previewImg.height ? 'portrait' : 'landscape'

	/**
	 * Alterna el estado de visibilidad del selector de color.
	 * Si el selector está abierto, lo cierra; si está cerrado, lo abre.
	 *
	 * @function
	 * @returns {void}
	 */
	const toggleColorPicker = () => {
		setIsColorPickerOpen((prev) => !prev)
	}

	/**
	 * Maneja el cambio de orientación de la imagen en el editor.
	 *
	 * @param {string} orientation - La nueva orientación seleccionada para la imagen.
	 */
	const handleOrientationClick = (orientation) => {
		let newHeight

		if (originalOrientation === orientation) {
			newHeight = (375 * previewImg.height) / previewImg.width
		} else {
			newHeight = (375 * previewImg.width) / previewImg.height
		}

		setCanvasOptions({
			...canvasOptions,
			orientation,
			size: 'original',
			height: newHeight,
		})
	}

	/**
	 * Maneja el evento de selección de tamaño para el lienzo.
	 *
	 * @param {('original'|{name: string, width: number, height: number})} size - El tamaño seleccionado.
	 */
	const handleSizeClick = (size) => {
		let newHeight

		if (size === 'original') {
			if (originalOrientation === canvasOptions.orientation) {
				newHeight = (375 * previewImg.height) / previewImg.width
			} else {
				newHeight = (375 * previewImg.width) / previewImg.height
			}
		} else {
			newHeight = (375 * size.height) / size.width
		}

		setCanvasOptions({
			...canvasOptions,
			size: size === 'original' ? 'original' : size.name,
			height: newHeight,
		})
	}

	return {
		selectedLayer,
		textOptions,
		canvasOptions,
		isColorPickerOpen,
		originalOrientation,
		setTextOptions,
		setCanvasOptions,
		toggleColorPicker,
		handleOrientationClick,
		handleSizeClick,
	}
}

export default useOptions

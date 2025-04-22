import { useEffect, useRef } from 'react'
import useEditorStore from '../../../../store/editorStore'
import Image from '../../../Image/Image'

/**
 * @typedef {Object} WorkspaceProps
 * @property {Object} previewImg - Objeto que contiene la URL y las dimensiones de la imagen previa.
 * @property {string} previewImg.url - URL de la imagen previa.
 * @property {number} previewImg.height - Altura de la imagen previa.
 * @property {number} previewImg.width - Ancho de la imagen previa.
 */

/**
 * Componente Workspace
 *
 * Renderiza un área de trabajo interactiva donde el usuario puede visualizar una imagen de previsualización
 * y manipular una capa de texto sobre la misma. Permite mover el texto arrastrándolo, editar su contenido,
 * y eliminarlo. Ajusta dinámicamente la altura del canvas según las dimensiones de la imagen de previsualización.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 *
 * @returns {JSX.Element} El área de trabajo interactiva con la imagen y la capa de texto editable.
 */
const Workspace = ({ previewImg }) => {
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

	return (
		<div className="workspace">
			<div
				className="canvas"
				style={{
					height: canvasOptions.height,
					backgroundColor: canvasOptions.backgroundColor,
				}}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				ref={containerRef}
			>
				<img src={previewImg.url} alt="" />
				{textOptions.text && (
					<div
						className="text"
						style={{
							left: textOptions.left,
							top: textOptions.top,
							fontSize: `${textOptions.fontSize}px`,
						}}
						ref={itemRef}
						onMouseDown={handleMouseDown}
					>
						<input
							type="text"
							value={textOptions.text}
							onChange={(e) =>
								setTextOptions({ ...textOptions, text: e.target.value })
							}
							style={{
								color: textOptions.color,
							}}
						/>
						<div
							className="deleteTextButton"
							onClick={() => setTextOptions({ ...textOptions, text: '' })}
						>
							<Image path="/general/delete.svg" alt="" />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Workspace

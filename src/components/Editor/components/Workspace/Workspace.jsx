import Image from '../../../Image/Image'
import useWorkspace from './hooks/useWorkspace'

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
	const {
		refs,
		textOptions,
		canvasOptions,
		handleMouseMove,
		handleMouseUp,
		handleMouseLeave,
		handleMouseDown,
		handleTextChange,
		handleDeleteText,
	} = useWorkspace(previewImg)

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
				ref={refs.containerRef}
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
						ref={refs.itemRef}
						onMouseDown={handleMouseDown}
					>
						<input
							type="text"
							value={textOptions.text}
							onChange={handleTextChange}
							style={{
								color: textOptions.color,
							}}
						/>
						<div className="deleteTextButton" onClick={handleDeleteText}>
							<Image path="/general/delete.svg" alt="" />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Workspace

import useEditorStore from '../../../../store/editorStore'
import Image from '../../../Image/Image'

/**
 * Componente Layer
 *
 * Muestra una lista de capas disponibles para editar en el editor, permitiendo al usuario seleccionar entre la capa de texto y la del lienzo (canvas).
 * Al seleccionar la capa de texto, se agrega automáticamente un nuevo texto al lienzo.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX que representa el panel de selección de capas.
 */
const Layer = () => {
	const { selectedLayer, canvasOptions, addText, setSelectedLayer } =
		useEditorStore()

	/**
	 * Maneja la selección de una capa en el editor.
	 *
	 * Establece la capa seleccionada y, si la capa seleccionada es 'text',
	 * agrega una nueva capa de texto.
	 *
	 * @param {string} layer - El identificador de la capa seleccionada.
	 */
	const handleSelectedLayer = (layer) => {
		setSelectedLayer(layer)

		if (layer === 'text') {
			addText()
		}
	}

	return (
		<div className="layers">
			<div className="layersTitle">
				<h3>Layers</h3>
				<p>Select a layer to edit</p>
			</div>
			<div
				onClick={() => handleSelectedLayer('text')}
				className={`layer ${selectedLayer === 'text' ? 'selected' : ''}`}
			>
				<div className="layerImage">
					<Image path="/general/text.png" alt="" w={48} h={48} />
				</div>
				<span>Add Text</span>
			</div>
			<div
				onClick={() => handleSelectedLayer('canvas')}
				className={`layer ${selectedLayer === 'canvas' ? 'selected' : ''}`}
			>
				<div
					className="layerImage"
					style={{ backgroundColor: canvasOptions.backgroundColor }}
				></div>
				<span>Canvas</span>
			</div>
		</div>
	)
}

export default Layer

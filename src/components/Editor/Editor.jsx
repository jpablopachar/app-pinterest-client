import Layer from './components/Layer/Layer'
import Options from './components/Options/Options'
import Workspace from './components/Workspace/Workspace'

/**
 * @typedef {Object} EditorProps
 * @property {Object} previewImg - Objeto que contiene la URL y las dimensiones de la imagen previa.
 * @property {string} previewImg.url - URL de la imagen previa.
 * @property {number} previewImg.height - Altura de la imagen previa.
 * @property {number} previewImg.width - Ancho de la imagen previa.
 */

/**
 * Componente Editor
 *
 * Renderiza la interfaz principal del editor, incluyendo las capas, el área de trabajo y las opciones.
 *
 * @component
 * @param {EditorProps} props - Propiedades del componente.
 * @param {string} props.previewImg - URL o ruta de la imagen de previsualización que se utiliza en las subcomponentes.
 * @returns {JSX.Element} El componente Editor.
 */
const Editor = ({ previewImg }) => {
	return (
		<div className="editor">
			<Layer previewImg={previewImg} />
			<Workspace previewImg={previewImg} />
			<Options previewImg={previewImg} />
		</div>
	)
}

export default Editor

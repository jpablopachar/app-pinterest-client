import { Link } from 'react-router-dom'
import Image from '../Image/Image'
import './GalleryItem.css'

/**
 * @typedef {Object} GalleryItemProps
 * @property {Object} item - Objeto que contiene la información del elemento a mostrar en la galería.
 * @property {string} item._id - Identificador único del elemento.
 * @property {string} item.media - Ruta de la imagen en el servidor.
 * @property {number} item.width - Ancho original de la imagen.
 * @property {number} item.height - Alto original de la imagen.
 */

/**
 * Componente que muestra un elemento individual dentro de la galería tipo Pinterest.
 * Calcula la altura optimizada y aplica un diseño responsivo con grid.
 *
 * @component
 * @param {GalleryItemProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento de galería renderizado con imagen, enlace y botones de acción.
 */
const GalleryItem = ({ item }) => {
	const optimizedHeight = (372 * item.height) / item.width

	return (
		<div
			className="galleryItem"
			style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
		>
			<Image path={item.media} alt="" w={372} h={optimizedHeight} />
			<Link to={`/pin/${item._id}`} className="overlay" />
			<button className="saveButton">Save</button>
			<div className="overlayIcons">
				<button>
					<Image path="/general/share.svg" alt="" />
				</button>
				<button>
					<Image path="/general/more.svg" alt="" />
				</button>
			</div>
		</div>
	)
}

export default GalleryItem

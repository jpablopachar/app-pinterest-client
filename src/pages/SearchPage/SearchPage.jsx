import { useSearchParams } from 'react-router'
import Gallery from '../../components/Gallery/Gallery'

/**
 * Página de búsqueda que obtiene los parámetros de búsqueda y boardId de la URL,
 * y renderiza el componente Gallery con dichos parámetros.
 *
 * @component
 * @returns {JSX.Element} El componente de la galería filtrado por búsqueda y/o boardId.
 */
const SearchPage = () => {
	let [searchParams] = useSearchParams()

	const search = searchParams.get('search')
	const boardId = searchParams.get('boardId')

	return <Gallery search={search} boardId={boardId} />
}

export default SearchPage

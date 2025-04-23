import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { format } from 'timeago.js'
import { getBoardsByUserId } from '../../services/board.service'
import Image from '../Image/Image'
import './Boards.css'

/**
 * @typedef {Object} BoardProps
 * @property {string} userId - ID del usuario al que pertenecen los tableros.
 */

/**
 * Componente que muestra los tableros de un usuario en formato de colección.
 * Utiliza React Query para obtener los datos de los tableros asociados al usuario.
 *
 * @component
 * @param {BoardProps} props - Propiedades del componente.
 * @returns {JSX.Element} Listado de tableros del usuario con vista previa de imagen y detalles.
 */
const Boards = ({ userId }) => {
	const { isPending, error, data } = useQuery({
		queryKey: ['boards', userId],
		queryFn: async () => await getBoardsByUserId(userId),
	})

	if (isPending) return 'Loading...'

	if (error) return `An error has occurred: ${error.message}`

	return (
		<div className="collections">
			{data?.map((board) => (
				<Link
					to={`/search?boardId=${board._id}`}
					className="collection"
					key={board._id}
				>
					<Image path={board.firstPin.media} alt="" />
					<div className="collectionInfo">
						<h1>{board.title}</h1>
						<span>
							{board.pinCount} Pins · {format(board.createdAt)}
						</span>
					</div>
				</Link>
			))}
		</div>
	)
}

export default Boards

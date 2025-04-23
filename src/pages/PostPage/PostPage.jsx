import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, useParams } from 'react-router'
import Comments from '../../components/Comments/Comments'
import Image from '../../components/Image/Image'
import PostInteractions from '../../components/PostInteractions/PostInteractions'
import { getPinById } from '../../services/pin.service'
import './PostPage.css'

/**
 * Página de detalle de un pin (publicación) individual.
 *
 * Este componente obtiene y muestra la información de un pin específico utilizando su ID desde la URL.
 * Muestra la imagen del pin, las interacciones disponibles, información del usuario que lo publicó y los comentarios asociados.
 * Gestiona los estados de carga, error y ausencia de datos.
 *
 * @component
 * @returns {JSX.Element} Elemento de la página de detalle del pin.
 */
const PostPage = () => {
	const { id } = useParams()

	const { isPending, error, data } = useQuery({
		queryKey: ['pin', id],
		queryFn: async () => await getPinById(id),
	})

	if (isPending) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	if (!data) return 'Pin not found!'

	return (
		<div className="postPage">
			<svg
				height="20"
				viewBox="0 0 24 24"
				width="20"
				style={{ cursor: 'pointer' }}
			>
				<path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
			</svg>
			<div className="postContainer">
				<div className="postImg">
					<Image path={data.media} alt="" w={736} />
				</div>
				<div className="postDetails">
					<PostInteractions postId={id} />
					<Link to={`/${data.user.username}`} className="postUser">
						<Image path={data.user.img || '/general/noAvatar.png'} />
						<span>{data.user.displayName}</span>
					</Link>
					<Comments id={data._id} />
				</div>
			</div>
		</div>
	)
}

export default PostPage

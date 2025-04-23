import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'
import Boards from '../../components/Boards/Boards'
import Gallery from '../../components/Gallery/Gallery'
import Image from '../../components/Image/Image'
import { followUser } from '../../services/auth.service'
import FollowButton from './components/FollowButton/FollowButton'
import './ProfilePage.css'

/**
 * Componente de página de perfil de usuario.
 *
 * Este componente muestra la información del perfil de un usuario, incluyendo su imagen, nombre, nombre de usuario,
 * cantidad de seguidores y seguidos, así como botones de interacción (mensaje, seguir/dejar de seguir, compartir, más opciones).
 * Permite alternar entre las vistas de pines creados y guardados por el usuario.
 *
 * @component
 *
 * @returns {JSX.Element} La interfaz de la página de perfil del usuario.
 */
const ProfilePage = () => {
	const [type, setType] = useState('saved')

	const { username } = useParams()

	const { isPending, error, data } = useQuery({
		queryKey: ['profile', username],
		queryFn: async () => await followUser(username),
	})

	if (isPending) return 'Loading...'

	if (error) return 'An error has occurred: ' + error.message

	if (!data) return 'User not found!'

	return (
		<div className="profilePage">
			<Image
				className="profileImg"
				w={100}
				h={100}
				path={data.img || '/general/noAvatar.png'}
				alt=""
			/>
			<h1 className="profileName">{data.displayName}</h1>
			<span className="profileUsername">@{data.username}</span>
			<div className="followCounts">
				{data.followerCount} followers · {data.followingCount} followings
			</div>
			<div className="profileInteractions">
				<Image path="/general/share.svg" alt="" />
				<div className="profileButtons">
					<button>Message</button>
					<FollowButton
						isFollowing={data.isFollowing}
						username={data.username}
					/>
				</div>
				<Image path="/general/more.svg" alt="" />
			</div>
			<div className="profileOptions">
				<span
					onClick={() => setType('created')}
					className={type === 'created' ? 'active' : ''}
				>
					Created
				</span>
				<span
					onClick={() => setType('saved')}
					className={type === 'saved' ? 'active' : ''}
				>
					Saved
				</span>
			</div>
			{type === 'created' ? (
				<Gallery userId={data._id} />
			) : (
				<Boards userId={data._id} />
			)}
		</div>
	)
}

export default ProfilePage

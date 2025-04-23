import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUser } from '../../../../services/auth.service'

/**
 * @typedef {Object} FollowButtonProps
 *
 * @property {boolean} isFollowing - Indica si el usuario está siendo seguido.
 * @property {string} username - El nombre de usuario del usuario a seguir o dejar de seguir.
 */

/**
 * Botón para seguir o dejar de seguir a un usuario.
 *
 * @component
 * @param {FollowButtonProps} props - Propiedades del componente.
 * @param {boolean} props.isFollowing - Indica si el usuario actual ya sigue al usuario objetivo.
 * @param {string} props.username - Nombre de usuario del perfil objetivo.
 * @returns {JSX.Element} Botón que permite seguir o dejar de seguir al usuario.
 */
const FollowButton = ({ isFollowing, username }) => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: followUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', username] })
		},
	})

	return (
		<button
			onClick={() => mutation.mutate(username)}
			disabled={mutation.isPending}
		>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</button>
	)
}

export default FollowButton

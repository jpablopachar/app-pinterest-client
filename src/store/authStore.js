import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Hook de estado global para la autenticación de usuarios.
 * 
 * Utiliza Zustand y persistencia para manejar el usuario autenticado actual.
 * Proporciona funciones para establecer, eliminar y actualizar el usuario actual.
 *
 * @function useAuthStore
 * @returns {Object} Estado y acciones relacionadas con la autenticación.
 * @property {Object|null} currentUser - El usuario autenticado actualmente, o null si no hay ninguno.
 * @property {Function} setCurrentUser - Establece el usuario actual.
 * @property {Function} removeCurrentUser - Elimina el usuario actual (lo establece en null).
 * @property {Function} updateCurrentUser - Actualiza la información del usuario actual.
 */
const useAuthStore = create(
	persist((set) => ({
		currentUser: null,
		setCurrentUser: (newUser) => set({ currentUser: newUser }),
		removeCurrentUser: () => set({ currentUser: null }),
		updateCurrentUser: (updatedUser) => set({ currentUser: updatedUser }),
	})),
)

export default useAuthStore

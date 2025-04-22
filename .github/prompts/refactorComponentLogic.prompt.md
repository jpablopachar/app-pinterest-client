# Extract Component Logic into a Custom Hook

## Meta

- **Purpose**: Extract business logic from a React component into a custom hook
- **Input**: React component file path and identification of the logic to be extracted
- **Output**: A custom hook that encapsulates the extracted logic

## Response Format

1. First, analyze the component to identify:

   - State variables that should be moved to the hook
   - Event handlers and functions that manipulate this state
   - Any external dependencies (API calls, context/store usage)

2. Create a custom hook in a separate file that:

   - Is properly named with the `use` prefix
   - Contains all the necessary state and logic
   - Includes comprehensive JSDoc documentation in Spanish
   - Returns an object with all the values and functions needed by the component

3. Refactor the original component to:
   - Import and use the newly created custom hook
   - Remove the logic that has been extracted
   - Maintain the same functionality and user experience

## Guidelines

- The custom hook should follow the Single Responsibility Principle
- State and logic that is specific to UI rendering should stay in the component
- Business logic, API calls, and state management should be moved to the hook
- Use destructuring in the component when consuming the hook
- All JSDoc comments should be written in Spanish
- The hook should be placed in a `hooks` folder in the same directory as the component
- Name the hook following the convention: `use[Feature][Action]` (e.g., `usePinCollection`)

## Example

Given a component that handles a pin collection:

```jsx
// Before: PinCollection.jsx with mixed concerns
const PinCollection = ({ userId }) => {
	const [pins, setPins] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchPins = async () => {
		setIsLoading(true)
		try {
			const response = await baseApi.get(`/pins/user/${userId}`)
			setPins(response.data)
			setIsLoading(false)
		} catch (error) {
			setError(error.response.data.message)
			setIsLoading(false)
		}
	}

	const deletePin = async (pinId) => {
		try {
			await baseApi.delete(`/pins/${pinId}`)
			setPins(pins.filter((pin) => pin._id !== pinId))
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	useEffect(() => {
		fetchPins()
	}, [userId])

	return (
		<div className="pin-collection">
			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} />}
			<div className="pins-grid">
				{pins.map((pin) => (
					<PinItem
						key={pin._id}
						pin={pin}
						onDelete={() => deletePin(pin._id)}
					/>
				))}
			</div>
		</div>
	)
}
```

Create a custom hook:

```javascript
// After: usePinCollection.js
import { useState, useEffect } from 'react'
import { baseApi } from '../../../api/baseApi'

/**
 * Hook personalizado para gestionar una colección de pines.
 *
 * @param {string} userId - ID del usuario cuyos pines se quieren obtener.
 * @returns {Object} Un objeto con las siguientes propiedades:
 *   @property {Array} pins - Lista de pines del usuario.
 *   @property {boolean} isLoading - Indica si se está cargando la información.
 *   @property {string|null} error - Mensaje de error si ocurre alguno.
 *   @property {function} deletePin - Función para eliminar un pin.
 */
const usePinCollection = (userId) => {
	const [pins, setPins] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchPins = async () => {
		setIsLoading(true)
		try {
			const response = await baseApi.get(`/pins/user/${userId}`)
			setPins(response.data)
			setIsLoading(false)
		} catch (error) {
			setError(error.response.data.message)
			setIsLoading(false)
		}
	}

	const deletePin = async (pinId) => {
		try {
			await baseApi.delete(`/pins/${pinId}`)
			setPins(pins.filter((pin) => pin._id !== pinId))
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	useEffect(() => {
		fetchPins()
	}, [userId])

	return {
		pins,
		isLoading,
		error,
		deletePin,
	}
}

export default usePinCollection
```

And refactor the component:

```jsx
// After: PinCollection.jsx with hooks
import usePinCollection from './hooks/usePinCollection'

const PinCollection = ({ userId }) => {
	const { pins, isLoading, error, deletePin } = usePinCollection(userId)

	return (
		<div className="pin-collection">
			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} />}
			<div className="pins-grid">
				{pins.map((pin) => (
					<PinItem
						key={pin._id}
						pin={pin}
						onDelete={() => deletePin(pin._id)}
					/>
				))}
			</div>
		</div>
	)
}
```

## Additional Context

The goal of this refactoring is to:

- Improve component readability by separating concerns
- Make business logic more testable
- Enable reusing the same logic across multiple components
- Keep components focused on rendering UI rather than handling complex state and side effects

Use the provided [useAuth.js](../../src/pages/Auth/hooks/useAuth.js) hook as a reference for style, structure and documentation standards when creating your custom hook.

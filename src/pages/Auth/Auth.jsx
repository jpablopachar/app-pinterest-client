import Image from '../../components/Image/Image'
import './Auth.css'
import useAuth from './hooks/useAuth'

/**
 * Componente Auth
 *
 * Este componente gestiona la autenticación de usuarios, permitiendo tanto el inicio de sesión como el registro.
 * Cambia dinámicamente entre los formularios de registro y login según el estado `isRegister`.
 *
 * Props: No recibe props directamente.
 *
 * Hooks:
 * - useAuth: Hook personalizado que provee el estado y funciones necesarias para la autenticación:
 *   - isRegister: Booleano que indica si se muestra el formulario de registro o de login.
 *   - error: Mensaje de error a mostrar en caso de fallo en la autenticación.
 *   - handleSubmit: Función que maneja el envío de los formularios.
 *   - toggleAuthMode: Función para alternar entre los modos de registro e inicio de sesión.
 *
 * Estructura:
 * - Muestra el logo y un título acorde al modo actual.
 * - Formulario de registro: Solicita nombre de usuario, nombre, correo y contraseña.
 * - Formulario de login: Solicita correo y contraseña.
 * - Permite alternar entre ambos formularios.
 * - Muestra mensajes de error si existen.
 *
 * @component
 */
const Auth = () => {
	const { isRegister, error, handleSubmit, toggleAuthMode } = useAuth()

	return (
		<div className="authPage">
			<div className="authContainer">
				<Image path="/general/logo.png" w={36} h={36} alt="" />
				<h1>{isRegister ? 'Create an Account' : 'Login to your account'}</h1>
				{isRegister ? (
					<form key="register" onSubmit={handleSubmit}>
						<div className="formGroup">
							<label htmlFor="username">Username</label>
							<input
								type="username"
								placeholder="Username"
								required
								name="username"
								id="username"
							/>
						</div>
						<div className="formGroup">
							<label htmlFor="displayName">Name</label>
							<input
								type="displayName"
								placeholder="Name"
								required
								name="displayName"
								id="displayName"
							/>
						</div>
						<div className="formGroup">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								id="email"
							/>
						</div>
						<div className="formGroup">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
								id="password"
							/>
						</div>
						<button type="submit">Register</button>
						<p onClick={toggleAuthMode}>
							Do you have an account? <b>Login</b>
						</p>
						{error && <p className="error">{error}</p>}
					</form>
				) : (
					<form key="loginForm" onSubmit={handleSubmit}>
						<div className="formGroup">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								placeholder="Email"
								required
								name="email"
								id="email"
							/>
						</div>
						<div className="formGroup">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								placeholder="Password"
								required
								name="password"
								id="password"
							/>
						</div>
						<button type="submit">Login</button>
						<p onClick={toggleAuthMode}>
							Don&apos;t have an account? <b>Register</b>
						</p>
						{error && <p className="error">{error}</p>}
					</form>
				)}
			</div>
		</div>
	)
}

export default Auth

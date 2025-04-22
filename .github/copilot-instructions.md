# GitHub Copilot Project Instructions

## Project Overview
This project is a Pinterest-like application developed with React. The application allows users to view, create, save, and share visual content in the form of boards and pins. It is built with React 19, uses React Router for navigation, React Query for server data management, Zustand for global state, and follows a modular component-oriented architecture.

## Architecture Guidelines
- Component-based architecture with clear separation of responsibilities.
- Use Custom Hooks for reusable logic and to separate business logic from the UI.
- Lazy loading for components and routes to optimize performance.
- Implement container/presentation pattern where appropriate.
- Use React Query for server data management and caching.
- Manage global state with Zustand for shared state between components.

## Folder Structure
```
src/
├── assets/          # Static resources (images, fonts, etc.)
├── components/      # Reusable components
│   ├── ui/          # Base UI components
│   └── features/    # Feature-specific components
├── hooks/           # Custom hooks
├── layouts/         # Layout components
├── pages/           # Main pages/views
├── services/        # Services and API calls
├── store/           # Global state (Zustand)
├── utils/           # Utility functions
└── constants/       # Constants and configuration
```

### Component Pattern
- Each component should be in its own folder with the following pattern:
```
ComponentName/
├── ComponentName.jsx          # Main component
├── ComponentName.css          # Component-specific styles
├── ComponentName.test.jsx     # Unit tests (optional)
└── index.js                   # Export file
```
- Prefer functional components with hooks.
- For complex components, use subdirectories for related components.

### Custom Hooks Structure
- Hooks should begin with the prefix `use`.
- Each hook should be in its own file.
- Recommended structure:
```
hooks/
├── useAuth.js
├── useForm.js
├── usePins.js
└── api/              # Hooks related to API calls
    ├── useGetPins.js
    └── useCreatePin.js
```

## Code Style Guideline

### Naming Conventions
- **Components**: PascalCase (e.g., `PinCard.jsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.js`)
- **Functions**: camelCase (e.g., `formatDate()`)
- **Variables**: camelCase (e.g., `userData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PIN_SIZE`)
- **CSS Files**: Same name as the component (e.g., `PinCard.css`)

### Documentation
- Include JSDoc for main functions and components (in Spanish):
```javascript
/**
 * Componente que muestra un pin en la interfaz
 * @param {Object} props - Propiedades del componente
 * @param {string} props.imageUrl - URL de la imagen del pin
 * @param {string} props.title - Título del pin
 * @returns {JSX.Element} Componente Pin
 */
```
- Comment complex sections of code.
- Keep an updated README with installation and usage instructions.

### State Management
- **Local state**: Use `useState` and `useReducer` for component-specific state.
- **Global state**: Use Zustand for state shared between components.
- **Server state**: Implement React Query for data from APIs.
- Store structure with Zustand:
```javascript
export const useStore = create((set) => ({
  // State
  count: 0,
  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Performance Optimization
- Implement `React.memo` for frequently rendering components.
- Use `useMemo` and `useCallback` to optimize calculations and function references.
- Virtualize long lists with `react-infinite-scroll-component`.
- Implement lazy loading for images and components.
- Avoid unnecessary renders by minimizing re-renders.

### Error Handling
- Use `try/catch` to handle errors in asynchronous operations.
- Implement error boundary components to capture errors in components.
- Show appropriate visual feedback to the user when errors occur.
- Log errors for debugging and monitoring.

## Specific Patterns to Follow

### Authentication Flow
- Use context and custom hook to manage authentication state:
```javascript
const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);
  return { user, isAuthenticated: !!user, login, logout };
};
```
- Implement route protection with HOC components or protected route components.
- Store authentication tokens in localStorage or sessionStorage according to security requirements.
- Handle token expiration and automatic renewal.

### Form Handling
- Use custom hooks for form handling:
```javascript
const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  // Form handling logic
  
  return { values, errors, handleChange, handleSubmit };
};
```
- Implement form validation.
- Show visual feedback for errors and loading states.
- Maintain accessibility in forms with appropriate labels and error messages.

### API Integration
- Centralize API configuration in a service:
```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pinterest-app.com',
});

// Interceptors for tokens, error handling, etc.

export default api;
```
- Use React Query for API requests:
```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['pins'],
  queryFn: () => pinService.getPins()
});
```
- Implement appropriate caching and revalidation policies.
- Handle loading and error states consistently.

## Styling Approach
- Use modular CSS for component-specific styles.
- Organize styles with a consistent design system.
- CSS variables for themes and coherent design:
```css
:root {
  --primary-color: #e60023;
  --secondary-color: #333333;
  --font-family: 'Helvetica Neue', sans-serif;
  --border-radius: 16px;
}
```
- Implement responsive design with media queries.
- Follow a methodology like BEM for CSS class names when appropriate.

## Important Note
- While the codebase and instructions are in English, all documentation, comments, and user-facing text should be maintained in Spanish.
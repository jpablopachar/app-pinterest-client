# Component Generator Prompt

## Meta
- Purpose: Generate a new React component for Pinterest-like application
- Input requirements: Component name, description, and props
- Output: Complete component file structure following project standards

## Response Format
Please generate a component with the following structure:

1. Component folder with the appropriate name in PascalCase
2. Main component file with JSX implementation and JSDoc comments in Spanish
3. CSS file with basic styling
4. Index.js export file
5. Optional test file if testing is required

## Warnings
- Make sure the component follows the functional component pattern with hooks
- Component names must be in PascalCase
- Props should be properly destructured
- Include JSDoc documentation in Spanish
- Follow the container/presentation pattern when appropriate
- Include proper imports for React and any other dependencies

## Additional Context
This component will be part of a Pinterest-like application built with React. The application uses:
- React Router for navigation
- React Query for data management
- Zustand for global state
- CSS modules for styling

### Example Component Structure

```
ComponentName/
├── ComponentName.jsx      # Main component implementation
├── ComponentName.css      # Component styles
├── ComponentName.test.jsx # Tests (optional)
└── index.js               # Export file
```

### Example Component Implementation

```jsx
import './ComponentName.css';

/**
 * Componente que [descripción del componente]
 * @param {Object} props - Propiedades del componente
 * @param {string} props.propName - Descripción de la propiedad
 * @returns {JSX.Element} Componente renderizado
 */
const ComponentName = ({ propName }) => {
  // Component logic here
  
  return (
    <div className="component-name">
      {/* Component JSX structure */}
    </div>
  );
};

export default ComponentName;
```

### Example index.js file

```jsx
export { default } from './ComponentName';
```

---

**Instructions for Use:**
1. Provide the component name in PascalCase
2. Describe what the component should do
3. List the props it should accept with their types and descriptions
4. Specify any hooks or special logic the component needs
5. Describe the component's appearance and behavior

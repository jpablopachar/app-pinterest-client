# Code Generation Instructions

## General Preferences
- All code should be written using ES6+ syntax and features
- Use modern React patterns with functional components and hooks
- Maintain consistent formatting with 2-space indentation
- Use semi-colons at the end of statements
- Prefer object destructuring for props and state
- Always include proper type definitions with JSDoc comments in Spanish
- Implement lazy loading for components when possible for performance optimization
- Prefer named exports over default exports for better refactoring capabilities

## Hook Structure
- Name custom hooks with the `use` prefix (e.g., `useAuth`, `useForm`, `usePins`)
- Each hook should have a single responsibility and be focused on a specific concern
- For API interaction hooks, follow this pattern:
  ```javascript
  // For data fetching
  const useGetResource = () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ['resourceName'],
      queryFn: () => resourceService.getResource()
    });
    
    return { data, isLoading, error };
  };
  
  // For data mutations
  const useCreateResource = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError } = useMutation({
      mutationFn: (data) => resourceService.createResource(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['resourceName'] });
      }
    });
    
    return { createResource: mutate, isCreating: isPending, hasError: isError };
  };
  ```
- Include proper JSDoc comments in Spanish explaining the purpose and return values of the hook
- Export hooks from their own files to ensure proper organization
- For complex state management, use reducers with clear action types

## Common Patterns
- Authentication handling:
  ```javascript
  // Use auth store with Zustand
  const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    setCurrentUser: (userData) => 
      set({ user: userData, isAuthenticated: !!userData }),
    logout: () => set({ user: null, isAuthenticated: false }),
  }));
  ```

- Form handling:
  ```javascript
  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues(prev => ({...prev, [name]: value}));
    };
    
    const handleSubmit = (callback) => (e) => {
      e.preventDefault();
      callback(values);
    };
    
    return { values, errors, handleChange, handleSubmit };
  };
  ```

- Infinite scrolling implementation:
  ```javascript
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam }) => fetchItems({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<LoadingIndicator />}
    >
      {/* Render items */}
    </InfiniteScroll>
  );
  ```

- Error handling:
  ```javascript
  try {
    // Operation that might fail
  } catch (error) {
    // Log the error for debugging
    console.error('Error occurred:', error);
    
    // Set user-friendly error message
    setError(error.response?.data?.message || 'Ha ocurrido un error');
  }
  ```

## Component Pattern
- Follow this file structure for components:
  ```
  ComponentName/
  ├── ComponentName.jsx      # Main component implementation
  ├── ComponentName.css      # Component styles
  ├── ComponentName.test.jsx # Tests (optional)
  └── index.js               # Export file
  ```

- Component implementation pattern:
  ```javascript
  import './ComponentName.css';
  
  /**
   * Descripción del componente en español
   * @param {Object} props - Descripción de las props
   * @returns {JSX.Element} Elemento JSX
   */
  const ComponentName = ({ prop1, prop2 }) => {
    // Component logic
    
    return (
      <div className="component-name">
        {/* Component JSX */}
      </div>
    );
  };
  
  export default ComponentName;
  ```

- For container/presentation pattern:
  ```javascript
  // Container
  const PinListContainer = () => {
    const { data, isLoading } = usePins();
    
    if (isLoading) return <Skeleton />;
    
    return <PinList pins={data} />;
  };
  
  // Presentation
  const PinList = ({ pins }) => (
    <div className="pin-list">
      {pins.map(pin => <PinItem key={pin.id} pin={pin} />)}
    </div>
  );
  ```

## Naming Conventions
- **Files and Components**: Use PascalCase for component files and names
  - `PinCard.jsx`, `UserProfile.jsx`, `BoardGallery.jsx`
  
- **Hooks**: Use camelCase with the "use" prefix
  - `useAuth.js`, `usePinData.js`, `useFormValidation.js`
  
- **Services**: Use camelCase with descriptive names and `.service.js` suffix
  - `pin.service.js`, `user.service.js`, `board.service.js`
  
- **CSS Classes**: Use kebab-case for CSS class names
  - `.pin-card`, `.user-avatar`, `.gallery-grid`
  
- **JSX Event Handlers**: Use camelCase with "handle" prefix or "on" prefix for props
  - `handleClick`, `handleSubmit`, `onPinSave`, `onBoardCreate`
  
- **Constants**: Use UPPER_SNAKE_CASE for global constants
  - `MAX_PIN_WIDTH`, `DEFAULT_IMAGE_SIZE`, `API_ENDPOINTS`
  
- **Props**: Use descriptive camelCase names
  - `imageUrl`, `userName`, `isActive`, `onDelete`
  
- **Boolean Props**: Use "is", "has", or "should" prefix
  - `isLoading`, `hasError`, `shouldRefresh`
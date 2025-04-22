# Code Review Instructions

## Things to Check

### 1. Code Quality
- **Naming Conventions**: Verify that PascalCase is used for components, camelCase for hooks (with "use" prefix), functions and variables, and UPPER_SNAKE_CASE for constants.
- **Documentation**: Ensure JSDoc comments in Spanish are present for all components, hooks, and major functions.
- **Component Structure**: Check that component files follow the established pattern with proper separation of concerns.
- **Consistency**: Code should maintain consistent formatting with 2-space indentation and semi-colons.

### 2. React Patterns
- **Proper Hook Usage**: Confirm hooks follow React's rules (only called at top level, not in conditionals).
- **Component Composition**: Check for appropriate component breakdown to avoid large monolithic components.
- **State Management**: Verify correct usage of useState/useReducer for local state and Zustand for global state.
- **Effect Dependencies**: Ensure useEffect has proper dependency arrays to prevent unnecessary renders.

### 3. Performance Considerations
- **Memoization**: Check if React.memo, useMemo, and useCallback are used where appropriate.
- **Lazy Loading**: Verify lazy loading for components and routes is implemented properly.
- **List Rendering**: Ensure long lists use virtualization with react-infinite-scroll-component.
- **Bundle Size**: Consider if imports could be optimized (e.g., cherry-picking imports).

### 4. Data Handling
- **React Query Usage**: Verify correct implementation of queryKeys, query functions, and cache invalidation.
- **Error Handling**: Check for proper error boundaries and error states in async operations.
- **Loading States**: Ensure loading states are handled gracefully with Skeleton components.
- **Form Management**: Verify that forms use custom hook patterns properly.

## Analysis Approach

### 1. Static Analysis
- Start with an overall examination of the project structure to ensure it follows the established patterns.
- Use ESLint output (if available) to identify potential issues.
- Check for consistent file naming and component organization.

### 2. Component-Level Review
- Examine each component for proper separation of logic from presentation.
- Verify components follow the single-responsibility principle.
- Check for component reusability and appropriate prop usage.

### 3. Hook Analysis
- Review custom hooks for focused functionality and proper abstraction.
- Ensure hooks related to API calls follow the established pattern.
- Check that shared logic is properly extracted into hooks.

### 4. Data Flow Audit
- Trace data flow from API requests through the component tree.
- Verify appropriate use of global state vs. local state vs. props.
- Check that data fetching is optimized with proper caching strategies.

### 5. Performance Review
- Look for unnecessary re-renders by examining component render logic.
- Check for appropriate memoization usage.
- Verify that expensive computations are properly optimized.

## Feedback Format

### Structure your code review feedback as follows:

**1. Summary**
- Brief overview of the code quality and major findings

**2. Critical Issues**
- High-priority problems that need immediate attention
- Each issue should include file location, problem description, and suggested solution

**3. Improvement Suggestions**
- Non-critical recommendations for better code organization, performance, or readability
- Include code examples where appropriate

**4. Positive Aspects**
- Highlight good practices found in the code to reinforce them

**5. Specific Component/Feature Feedback**
- Detailed analysis of specific components or features
- Group related issues together

**Example:**
```
## Summary
The codebase is generally well-structured but has some performance issues in the Gallery component and inconsistent error handling patterns.

## Critical Issues
1. **Memory Leak in useEffect (Gallery.jsx:27-35)**
   - The subscription is not being cleaned up on component unmount
   - Solution: Return a cleanup function from useEffect

## Improvement Suggestions
- Consider extracting the pin loading logic in GalleryItem into a custom hook for better reusability

## Positive Aspects
- Excellent component structure and separation of concerns
- Good use of React Query for data fetching
```

## Common React Anti-patterns to Identity

1. **Prop Drilling**
   - Passing props through multiple levels of components
   - Suggest using context or Zustand for deeply shared state

2. **Huge Components**
   - Components exceeding 200-300 lines of code
   - Recommend breaking them down into smaller, focused components

3. **Inline Anonymous Function Props**
   - Creating new functions on every render: `onClick={() => handleClick(id)}`
   - Suggest using useCallback or moving function definitions to prevent unnecessary re-renders

4. **Incorrect Dependency Arrays**
   - Missing or unnecessary dependencies in useEffect/useCallback/useMemo
   - Recommend correcting arrays to prevent bugs or unnecessary re-calculations

5. **Direct DOM Manipulation**
   - Using document.getElementById or direct DOM access
   - Suggest using refs for necessary DOM interactions

6. **Not Using Keys Properly in Lists**
   - Missing keys or using array indices as keys in dynamic lists
   - Recommend using stable, unique IDs as keys

7. **Complex State Management**
   - Complex state updates that could benefit from useReducer
   - Suggest refactoring to useReducer for better state management

8. **Premature Optimization**
   - Over-using memoization where it's not needed
   - Suggest focusing optimization efforts where measurable performance issues exist

## Performance Optimization Suggestions

1. **Component Splitting**
   - Identify large components that render frequently and split them
   - Separate static content from dynamic content

2. **Code Splitting**
   - Use React.lazy and Suspense for route-based code splitting
   - Apply dynamic imports for large libraries or rarely used features

3. **List Virtualization**
   - Implement windowing for long lists using react-infinite-scroll-component
   - Only render visible items in the DOM

4. **State Management Optimization**
   - Keep state as local as possible
   - Split Zustand stores into smaller, focused stores when appropriate

5. **Memoization Strategy**
   - Use React.memo for expensive render components
   - Apply useMemo for expensive calculations
   - Employ useCallback for functions passed as props to memoized components

6. **Image Optimization**
   - Lazy load images using loading="lazy" or a library
   - Use proper image sizes and formats (WebP)

7. **Debouncing and Throttling**
   - Apply debouncing to search inputs and other frequent user inputs
   - Use throttling for window resize handlers and scroll events

8. **Batch Related Updates**
   - Group multiple state updates together
   - Use functional updates for state that depends on previous state
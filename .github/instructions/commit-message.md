# Commit Message Generation Instructions

## Format

All commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short description>

[optional body]

[optional footer(s)]
```

**Rules to follow:**
1. The first line (header) is limited to 72 characters
2. Type and scope should be lowercase
3. Description should be in imperative, present tense: "change" not "changed" or "changes"
4. No period at the end of the description
5. Body should explain WHY, not HOW (the code shows how)
6. Footer should reference GitHub issues that this commit closes

## Content

### Header

The header consists of three parts:

1. **Type**: Identifies the kind of change being made
2. **Scope** (optional): Specifies what part of the codebase is affected
3. **Description**: Brief summary of the changes

### Body

- Include contextual information about the changes
- Explain the motivation for the change
- Compare with previous behavior
- Use multiple paragraphs if needed (separated by blank lines)
- Each line should be limited to 72 characters

### Footer

- Use to reference issues: `Closes #123, #456`
- Breaking changes should start with `BREAKING CHANGE:` followed by a description
- Co-authors can be mentioned with `Co-authored-by: name <email>`

## Type definitions

| Type       | Description |
|------------|-------------|
| `feat`     | A new feature (correlates with MINOR in semantic versioning) |
| `fix`      | A bug fix (correlates with PATCH in semantic versioning) |
| `docs`     | Documentation only changes |
| `style`    | Changes that do not affect the meaning of the code (white-space, formatting, etc) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf`     | A code change that improves performance |
| `test`     | Adding missing tests or correcting existing tests |
| `build`    | Changes that affect the build system or external dependencies |
| `ci`       | Changes to CI configuration files and scripts |
| `chore`    | Other changes that don't modify src or test files |
| `revert`   | Reverts a previous commit |

## Common Scopes

| Scope          | Description |
|----------------|-------------|
| `auth`         | Authentication related changes |
| `pins`         | Pin-related functionality |
| `boards`       | Board-related functionality |
| `ui`           | UI components that aren't specific to a feature |
| `components`   | Changes to shared components |
| `hooks`        | Changes to custom hooks |
| `routes`       | Changes related to routing |
| `api`          | Changes to API service calls |
| `store`        | Zustand store related changes |
| `layout`       | Layout changes |
| `utils`        | Utility function changes |
| `query`        | React Query related changes |
| `styles`       | Style-related changes |
| `deps`         | Dependency updates |

## Examples

**Adding a new feature:**
```
feat(pins): implement pin creation with drag and drop

Add ability for users to create pins by dragging and dropping images.
The feature includes:
- Image preview before uploading
- Form validation for required fields
- Progress indicator during upload

Closes #123
```

**Fixing a bug:**
```
fix(auth): resolve login form submission errors

Fix issue where login form would not submit when pressing Enter key.
Also improves error handling by showing specific messages for different
error conditions.

Closes #456
```

**Refactoring code:**
```
refactor(hooks): extract pin data fetching logic to custom hook

Move the pin fetching logic from components to a dedicated useGetPins
hook to improve code reusability and separation of concerns.
```

**Documentation update:**
```
docs: update README with installation instructions

Add detailed step-by-step guide for setting up the project locally.
Include troubleshooting section for common issues.
```

**Multiple scopes:**
```
feat(pins,boards): add ability to move pins between boards

Users can now select multiple pins and move them to a different board
in a single operation. Includes drag and drop support and a modal for
board selection.

Closes #789
```

**Breaking change:**
```
feat(api): migrate to new authentication API

BREAKING CHANGE: The authentication flow has been completely reworked
to use the new API. Existing tokens will no longer work and users will
need to log in again.

Migration guide added to the documentation.

Closes #101
```
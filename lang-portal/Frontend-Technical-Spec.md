# Frontend Technical Specs

## Project Overview

A React-based single-page application (SPA) that provides:
1. A vocabulary management interface
2. Study activity launching capabilities
3. Learning progress tracking visualization

## Technical Stack

- React 18+
- TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- React Query for API state management
- Axios for API requests

## Page Structure

### Main Pages

1. **Home Page** (`/`)
   - Overview dashboard
   - Quick access to recent word groups
   - Study activity shortcuts
   - Recent study session statistics
     - Last activity played (time, numer correct/incorrect)
   - Overall progress tracking
     - The total words studied out of the total words available
     - Total number of sessions
     - Study streak (e.g., 3 days in a row)

2. **Study Activities** (`/activities`)
   - Comprehensive list of available study activities
   - Activity descriptions and previews
      - Thumbnail image
      - Name of the activity
      - Description of the activity
      - Number of times played
   - Usage statistics per activity
   - Quick launch options

3. **Word List** (`/words`)
   - Paginated list of all vocabulary
   - Sorting and filtering capabilities
   - Individual word statistics
   - Search functionality

4. **Groups** (`/groups`)
   - List of word groups
   - Group creation/editing
   - Word count per group
   - Study activity launch buttons

5. **Group Details** (`/groups/:id`)
   - Words in the selected group
   - Group statistics
   - Study activity options
   - Review history

6. **Study Sessions** (`/study/:activityId/:groupId`)
   - Study interface wrapper
   - Progress tracking
   - Session controls

7. **Settings** (`/settings`)
   - Theme preferences (Light/Dark mode)
   - Display preferences
   - Default sorting preferences
   - Study session preferences
   - Interface language options
   - Notification settings

## Component Architecture

This tree structure represents the React component hierarchy and shows the relationship between components. Components are organized into:
- Layout components that form the application shell
- Page components that correspond to each route
- Shared components that are reused across different pages

Each major page component is broken down into its constituent parts, showing the main functional areas and their sub-components.

```tsx
// Layout Components
App
├── Router
└── Layout
    ├── Navigation
    │   ├── NavLinks
    │   └── DarkModeToggle
    ├── Content
    └── Footer

// Page Components
Pages
├── HomePage
│   ├── ProgressOverview
│   │   ├── StudyStreak
│   │   └── TotalProgress
│   ├── RecentActivities
│   └── QuickAccessGroups
│
├── StudyActivitiesPage
│   ├── ActivityGrid
│   │   └── ActivityCard
│   │       ├── ActivityThumbnail
│   │       ├── ActivityInfo
│   │       └── LaunchButton
│   ├── SearchActivities
│   └── ActivityFilters
│
├── WordListPage
│   ├── WordGrid
│   │   └── WordCard
│   ├── SearchWords
│   ├── SortControls
│   └── Pagination
│
├── GroupsPage
│   ├── GroupList
│   │   └── GroupCard
│   ├── CreateGroupButton
│   └── GroupFilters
│
├── GroupDetailsPage
│   ├── GroupHeader
│   ├── WordTable
│   ├── GroupStats
│   └── ActivityOptions
│
├── StudySessionPage
│   ├── ActivityFrame
│   ├── ProgressTracker
│   └── SessionControls
│
└── SettingsPage
    ├── ThemeSettings
    ├── DisplaySettings
    ├── SortingPreferences
    ├── StudyPreferences
    ├── LanguageSettings
    └── NotificationSettings

// Shared Components
SharedComponents
├── Common
│   ├── Button
│   ├── Card
│   ├── Input
│   ├── Select
│   ├── Modal
│   ├── Alert
│   ├── Pagination
│   ├── LoadingSpinner
│   └── ErrorBoundary
│
└── Feature
    ├── WordCard
    ├── GroupCard
    ├── StudyActivityLauncher
    ├── StatisticsChart
    ├── SearchBar
    ├── FilterControls
    └── SortControls
```

## Data Management

### API Integration
- Use React Query for server state management
- Implement custom hooks for each API endpoint
- Handle loading, error, and success states consistently

Example Query Hook:
```typescript
function useWords(page: number, sortBy: string, order: 'asc' | 'desc') {
  return useQuery({
    queryKey: ['words', page, sortBy, order],
    queryFn: () => api.getWords({ page, sortBy, order })
  });
}
```

### State Management
- Use React Context for global UI state
- Local component state for UI-specific behavior
- React Query for server state

## UI Components

### Common Components
- Button (primary, secondary, danger variants)
- Card
- Input
- Select
- Modal
- Alert
- Pagination
- Loading Spinner
- Error Boundary

### Feature Components
- WordCard
- GroupCard
- StudyActivityLauncher
- StatisticsChart
- SearchBar
- FilterControls
- SortControls

## Styling Guidelines

- Use TailwindCSS utility classes
- Maintain consistent spacing scale
- Follow accessible color contrast ratios
- Support both light and dark themes
- Use CSS variables for theme colors
- Include a Dark Mode toggle in the UI

## Error Handling

- Implement error boundaries for component-level errors
- Show user-friendly error messages
- Provide retry mechanisms where appropriate
- Log errors to console in development

## Performance Considerations

- Implement virtualization for long lists
- Lazy load routes and heavy components
- Use memo and useMemo for expensive computations
- Optimize images and assets
- Implement proper loading states

## Testing Strategy

- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for main user flows
- E2E tests for critical paths

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Development Guidelines

- Follow React best practices
- Use TypeScript for type safety
- Implement proper prop validation
- Document components with JSDoc
- Follow consistent code formatting

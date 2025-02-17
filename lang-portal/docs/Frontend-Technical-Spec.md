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

2. **Activities** (`/activities`)
   - Comprehensive list of available activities
   - Abbreviated activity descriptions and previews
      - Thumbnail image
      - Name of the activity
      - Description of the activity
      - Number of times played
   - Usage statistics per activity
   - Quick launch options

3. **Activity Details** (`/activities/:id`)
   - Detailed view of a specific activity
   - Thumbnail image
   - Name of the activity
   - Description of the activity
   - Number of times played
   - Usage statistics
   - Form for launch options
   - Launch button

4. **Word List** (`/words`)
   - Paginated list of all vocabulary
   - Sorting and filtering capabilities
   - Individual word statistics
      - Correct/incorrect count
   - Search functionality

5. **Groups** (`/groups`)
   - List of word groups
   - Group creation/editing
   - Word count per group
   - Study activity launch buttons

6. **Group Details** (`/groups/:id`)
   - Words in the selected group
   - Group statistics
   - Study activity options
   - Review history

7. **Sessions** (`/sessions/:activityId/:groupId`)
   - Session interface wrapper
   - Details regarding the session
      - Name of the activity
      - Start/end time of the session
      - Number of words studied
      - Number of correct/incorrect answers
   - Progress tracking
   - Session controls

8. **Settings** (`/settings`)
   - Theme preferences (Light/Dark mode)
   - Display preferences
   - Default sorting preferences
   - Study session preferences
   - Interface language options
   - Notification settings

## Component Architecture

The application follows a modular structure with clear separation of concerns:

```tsx
src/
├── api/
│   └── axios.ts              // API client configuration
├── assets/
│   └── styles/
│       └── index.css         // Global styles
├── config/
│   └── routes.ts             // Route definitions
├── contexts/
│   └── ThemeContext/
│       └── index.tsx         // Theme management
├── layouts/
│   ├── ActivityLayout/       // Layout for activity pages
│   │   └── index.tsx
│   └── MainLayout/          // Main application layout
│       ├── Navigation/
│       │   └── index.tsx
│       ├── Footer/
│       │   └── index.tsx
│       └── index.tsx
├── pages/
│   ├── Activities/          // Activity listing and details
│   │   ├── [id].tsx
│   │   └── index.tsx
│   ├── Error/              // Error handling pages
│   │   └── index.tsx
│   ├── Groups/             // Group management
│   │   ├── [id].tsx
│   │   └── index.tsx
│   ├── Home/               // Dashboard
│   │   └── index.tsx
│   ├── Sessions/           // Session management
│   │   └── index.tsx
│   ├── Settings/           // User preferences
│   │   └── index.tsx
│   └── Words/              // Word management
│       └── index.tsx
├── test/                   // Test configurations
│   ├── mocks/
│   │   ├── handlers.ts
│   │   └── server.ts
│   └── setup.ts
├── types/                  // TypeScript type definitions
│   └── api.ts
├── utils/                  // Utility functions
│   └── format.ts
├── App.tsx                 // Root component
├── Router.tsx             // Route configuration
└── main.tsx              // Application entry point

```

### Component Hierarchy

```tsx
// Root Components
App
├── Router
└── Layout
    ├── MainLayout
    │   ├── Navigation
    │   ├── Content
    │   └── Footer
    └── ActivityLayout
        ├── Header
        └── Content

// Page Components
Pages
├── HomePage
│   ├── ProgressOverview
│   │   ├── Streak
│   │   └── TotalProgress
│   ├── RecentActivities
│   └── QuickAccessGroups
│
├── ActivitiesPage
│   ├── ActivityGrid
│   │   └── ActivityCard
│   │       ├── ActivityThumbnail
│   │       ├── ActivityInfo
│   │       └── LaunchButton
│   ├── SearchActivities
│   └── ActivityFilters
│
├── WordsPage
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
├── SessionPage
│   ├── ActivityFrame
│   ├── ProgressTracker
│   └── SessionControls
│
└── SettingsPage
    ├── ThemeSettings
    ├── DisplaySettings
    ├── SortingPreferences
    ├── ActivityPreferences
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
    ├── ActivityLauncher
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
- ActivityLauncher
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

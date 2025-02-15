# Frontend Project Structure

this is our planned file structure, not all files and directories have necessarily been created yet.  Some items may also be removed if we determine they are not necessary, but we should keep this current as we proceed:

```bash
frontend-react/
├── .eslintrc.js               # ESLint configuration
├── .prettierrc               # Prettier configuration
├── index.html               # Entry HTML file
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration for Tailwind
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── public/                  # Static assets
│   ├── favicon.ico
│   └── images/
│       └── activities/      # Study activity thumbnails
├── src/
│   ├── main.tsx            # Application entry point
│   ├── App.tsx             # Root component
│   ├── vite-env.d.ts       # Vite environment types
│   ├── api/                # API integration
│   │   ├── axios.ts        # Axios instance and interceptors
│   │   ├── types.ts        # API types
│   │   └── endpoints/
│   │       ├── words.ts
│   │       ├── groups.ts
│   │       └── study-sessions.ts
│   ├── assets/             # Local static assets
│   │   ├── styles/
│   │   │   └── index.css   # Global styles
│   │   └── icons/
│   ├── components/         # Shared components
│   │   ├── common/         # Basic UI components
│   │   │   ├── Button/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.test.tsx
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   ├── Modal/
│   │   │   ├── Alert/
│   │   │   ├── Pagination/
│   │   │   ├── LoadingSpinner/
│   │   │   └── ErrorBoundary/
│   │   └── feature/        # Feature-specific components
│   │       ├── WordCard/
│   │       ├── GroupCard/
│   │       ├── StudyActivityLauncher/
│   │       ├── StatisticsChart/
│   │       ├── SearchBar/
│   │       ├── FilterControls/
│   │       └── SortControls/
│   ├── config/             # Configuration files
│   │   ├── routes.ts       # Route definitions
│   │   └── constants.ts    # Application constants
│   ├── contexts/           # React contexts
│   │   ├── ThemeContext/
│   │   └── SettingsContext/
│   ├── hooks/              # Custom hooks
│   │   ├── api/           # API hooks
│   │   │   ├── useWords.ts
│   │   │   ├── useGroups.ts
│   │   │   └── useStudySessions.ts
│   │   ├── useTheme.ts
│   │   └── useSettings.ts
│   ├── layouts/            # Layout components
│   │   ├── MainLayout/
│   │   │   ├── index.tsx
│   │   │   ├── Navigation/
│   │   │   └── Footer/
│   │   └── StudyLayout/    # Layout for study sessions
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   │   ├── ProgressOverview/
│   │   │   │   ├── RecentActivities/
│   │   │   │   └── QuickAccessGroups/
│   │   │   └── Home.test.tsx
│   │   ├── StudyActivities/
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   │   ├── ActivityGrid/
│   │   │   │   ├── ActivityCard/
│   │   │   │   └── ActivityFilters/
│   │   │   └── [id].tsx   # Activity details page
│   │   ├── Words/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── WordGrid/
│   │   │       └── WordFilters/
│   │   ├── Groups/
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   │   ├── GroupList/
│   │   │   │   └── GroupFilters/
│   │   │   └── [id].tsx   # Group details page
│   │   ├── Study/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │       ├── ActivityFrame/
│   │   │       ├── ProgressTracker/
│   │   │       └── SessionControls/
│   │   └── Settings/
│   │       ├── index.tsx
│   │       └── components/
│   │           ├── ThemeSettings/
│   │           ├── DisplaySettings/
│   │           └── StudyPreferences/
│   ├── services/           # Business logic services
│   │   ├── api.ts         # API service
│   │   └── storage.ts     # Local storage service
│   ├── store/             # State management
│   │   └── settings/      # Settings state
│   ├── types/             # TypeScript type definitions
│   │   ├── api.ts         # API types
│   │   ├── models.ts      # Domain models
│   │   └── common.ts      # Shared types
│   └── utils/             # Utility functions
│       ├── format.ts      # Formatting utilities
│       ├── validation.ts  # Validation utilities
│       └── test/          # Test utilities
└── tests/                 # Test configuration and setup
    ├── setup.ts           # Test setup file
    └── mocks/             # Test mocks
        └── handlers.ts    # MSW request handlers
```

## Key Directories and Files

### Root Configuration Files
- `.eslintrc.js`: ESLint rules and plugins configuration
- `.prettierrc`: Code formatting rules
- `tsconfig.json`: TypeScript compiler options
- `vite.config.ts`: Vite bundler configuration
- `tailwind.config.js`: Tailwind CSS customization
- `postcss.config.js`: PostCSS plugins configuration

### Source Code (`src/`)
- `main.tsx`: Application entry point
- `App.tsx`: Root component with routing setup
- `api/`: API integration layer
- `components/`: Reusable UI components
- `contexts/`: React context providers
- `hooks/`: Custom React hooks
- `layouts/`: Page layout components
- `pages/`: Page components
- `services/`: Business logic
- `store/`: State management
- `types/`: TypeScript type definitions
- `utils/`: Utility functions

### Components Organization
- `common/`: Basic UI components (buttons, inputs, etc.)
- `feature/`: Feature-specific components
- Each component folder contains:
  - Main component file
  - Index file for exports
  - Test file
  - Additional subcomponents if needed

### Testing (`tests/`)
- Setup files for testing environment
- Mock data and handlers
- Test utilities

## Development Workflow

### Installation
```bash
cd frontend
yarn install
```

### Development
```bash
# Start development server
yarn dev

# Type checking
yarn type-check

# Linting
yarn lint

# Formatting
yarn format

# Testing
yarn test
yarn test:watch
yarn test:coverage
```

### Building
```bash
# Production build
yarn build

# Preview production build
yarn preview
```

## Key Features

1. **Type Safety**
   - Full TypeScript support
   - Strict type checking
   - Type definitions for API responses

2. **Code Quality**
   - ESLint for code linting
   - Prettier for code formatting
   - Husky for pre-commit hooks

3. **Testing**
   - Jest for unit testing
   - React Testing Library for component testing
   - MSW for API mocking

4. **State Management**
   - React Query for server state
   - React Context for global UI state
   - Local state for component-specific state

5. **Styling**
   - TailwindCSS for utility-first styling
   - PostCSS for processing
   - Dark mode support
   - Responsive design

6. **Performance**
   - Code splitting
   - Lazy loading
   - Asset optimization
   - Caching strategies

7. **Developer Experience**
   - Hot module replacement
   - Fast refresh
   - Source maps
   - Error boundaries

# Japanese Learning Portal Frontend

A React-based single-page application (SPA) that provides:
1. A vocabulary management interface
2. Study activity launching capabilities
3. Learning progress tracking visualization

## Tech Stack

- React 18+ with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- React Query for API state management
- Axios for API requests
- ESLint and Prettier for code quality
- Vitest and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn dev
```

The application will be available at http://localhost:3000

### Available Scripts

Development:
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

Testing:
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

Code Quality:
- `yarn lint` - Check for linting issues
- `yarn lint:fix` - Fix linting issues automatically
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check if files are properly formatted
- `yarn type-check` - Run TypeScript type checking

## Development

### Code Organization

The project follows a feature-based organization:

```
src/
├── api/          # API integration
│   ├── common/   # Basic UI components
│   └── feature/  # Feature-specific components
├── components/   # Shared components
├── contexts/     # React contexts
├── hooks/        # Custom hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── services/     # Business logic
├── store/        # State management
├── types/        # TypeScript types
└── utils/        # Utilities
```

### Key Features

1. **Vocabulary Management**
   - View and search words
   - Create and edit word groups
   - Track learning progress
   - Filter and sort vocabulary lists
   - Batch operations on words

2. **Study Activities**
   - Launch different learning activities
   - Track study sessions
   - View progress statistics
   - Real-time progress updates
   - Session history

3. **User Interface**
   - Responsive design
   - Dark mode support
   - Accessible components
   - Loading states
   - Error handling
   - Toast notifications

### API Integration

The application communicates with a FastAPI backend running on `http://localhost:8000`. All API requests are automatically proxied through the development server.

### State Management

- React Query for server state
- React Context for global UI state
- Local state for component-specific data

### Styling

- TailwindCSS for utility-first styling
- Consistent design system
- Dark mode support
- Responsive breakpoints
- Custom component variants

## Testing

The project uses Vitest and React Testing Library for testing:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

### Testing Strategy

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for main user flows
- API mocking with MSW
- Snapshot testing for UI components

## Best Practices

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Accessible components (WCAG 2.1)
- Performance optimization
- Error boundaries
- Loading states
- Proper error handling

## Contributing

1. Ensure you have the latest dependencies:
```bash
yarn install
```

2. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

3. Before committing, run:
```bash
yarn lint && yarn format && yarn type-check && yarn test
```

4. Push your changes and create a pull request

## Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

Additional environment variables can be added as needed.

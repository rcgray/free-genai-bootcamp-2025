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

The application will be available at http://localhost:5173

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking

## Development

### Code Organization

The project follows a feature-based organization:

```
src/
├── api/          # API integration
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

2. **Study Activities**
   - Launch different learning activities
   - Track study sessions
   - View progress statistics

3. **User Interface**
   - Responsive design
   - Dark mode support
   - Accessible components

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

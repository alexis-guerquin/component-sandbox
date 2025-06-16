# Component Sandbox

This project is a modern React application built with TypeScript and Vite, designed to serve as a sandbox for React component development and testing.

## 🚀 Technologies Used

- React 18+
- TypeScript
- Vite
- ESLint
- React Testing Library
- Storybook
- CSS Modules

## 📦 Installation

```bash
# Clone the repository
git clone [REPO_URL]

# Install dependencies
npm install
```

## 🏃‍♂️ Getting Started

```bash
# Run the application in development mode
npm run dev

# Run tests
npm run test

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Application pages
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript types
└── styles/        # Global styles and themes
```

## 🧪 Testing

The project uses React Testing Library for testing. Each component should have its associated test file:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Check test coverage
npm run test:coverage
```

## 📚 Documentation

Component documentation is managed through Storybook:

```bash
# Run Storybook
npm run storybook
```

## 🎨 Code Conventions

### Components
- Use functional components
- Type all props with interfaces
- Isolate styles with CSS Modules
- Document props and behaviors

### Testing
- Test component rendering
- Test user interactions
- Test accessibility
- Avoid snapshots for dynamic components

### Documentation
- Create stories for each component
- Document props and variants
- Include usage examples

## 🔧 ESLint Configuration

The project uses a strict ESLint configuration with TypeScript support:

```js
// eslint.config.js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

[Insert project license]

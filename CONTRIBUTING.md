# Contributing to MedFlow HMS

Thank you for your interest in contributing to MedFlow HMS! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/medflow-hms.git`
3. **Install** dependencies: `npm install`
4. **Start** development server: `npm run dev`
5. **Create** a feature branch: `git checkout -b feature/your-feature`

## Development Workflow

### Branch Naming
- `feature/` — New features
- `fix/` — Bug fixes
- `refactor/` — Code improvements
- `docs/` — Documentation updates

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add patient risk assessment module
fix: resolve pagination offset issue
docs: update architecture diagram
refactor: extract reusable table component
```

### Code Quality
- Run `npm run lint` before committing
- Ensure `npm run build` passes
- Follow existing code patterns and naming conventions
- Use TypeScript strictly — no `any` types

## Architecture Guidelines

### Components
- Place reusable UI in `src/components/ui/`
- Place layout-specific in `src/components/layout/`
- Keep page components in `src/pages/`
- One component per file

### Styling
- Use Tailwind utility classes exclusively
- Follow the design token system in `tailwind.config.js`
- Use component classes from `index.css` for consistency
- Never use inline styles

### State Management
- Use React Context for shared state
- Keep component-local state with `useState`
- Memoize expensive computations with `useMemo`

### Data
- All mock data lives in `src/data/`
- Use generator utilities for scalable data
- Keep TypeScript interfaces in `src/types/`

## Pull Request Process

1. Update documentation if needed
2. Ensure all TypeScript checks pass
3. Verify production build succeeds
4. Add description of changes
5. Request review from maintainers

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on the technical merit of contributions
- Maintain a professional and inclusive environment

## Questions?

Open a [Discussion](../../discussions) for questions or ideas.

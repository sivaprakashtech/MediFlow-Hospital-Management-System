# Changelog

All notable changes to MedFlow HMS are documented in this file.

## [2.0.0] - 2024-03-15

### 🚀 Enterprise Upgrade

#### Data & Scale
- **520 patients** with realistic demographics, allergies, insurance, and contact data
- **120 doctors** across 16 departments with ratings, experience, and availability
- **1,200 appointments** with varied statuses, types, and scheduling patterns
- **500 invoices** with multi-item billing, insurance claims, and payment methods
- **300 laboratory tests** across 7 test types with urgency levels
- **100 medicines** with stock tracking, batch numbers, and expiry management
- Data generator utility (`utils/generators.ts`) for reproducible large-scale mock data

#### UI/UX Improvements
- Premium color palette based on Indigo primary with semantic success/warning/danger tokens
- Glassmorphism effects on navigation (`glass-nav`) and cards (`glass-card`)
- Custom shadow system: `shadow-card`, `shadow-card-hover`, `shadow-elevated`, `shadow-glow`
- Rounded-2xl cards with subtle borders and refined hover states
- Improved typography with tighter tracking and optimized font features
- Consistent spacing rhythm (4/5/6/8px scale)
- Gradient mesh backgrounds for visual depth
- Premium table styling with `table-header`, `table-cell`, `table-row` utilities

#### New Components
- **Toast Notifications** — Success/error/warning/info toasts with auto-dismiss and animations
- **Confirm Dialog** — Accessible modal with danger/warning/info variants
- **Pagination** — Enterprise pagination with page size selector and ellipsis navigation
- **usePagination Hook** — Reusable pagination logic with memoized range calculation
- **ChartSkeleton** — Loading skeleton specifically for chart containers

#### Enterprise Table Features (Patients Page)
- Column sorting (click to toggle asc/desc)
- Multi-criteria filtering (status + gender + search)
- Real-time search across name, email, and ID
- Configurable pagination (10/20/50/100 per page)
- Export button with toast confirmation
- Delete action with confirmation dialog
- Responsive overflow handling

#### Performance Optimizations
- Route-based code splitting with `React.lazy()` for all 14 pages
- Manual chunk splitting: vendor (164KB), charts (411KB), animations (102KB)
- Memoized filtered/sorted data with `useMemo`
- Suspense fallback with animated spinner
- Reduced initial bundle from 814KB to 48KB (entry chunk)
- Total gzipped payload: ~226KB (down from monolithic bundle)

#### Accessibility
- ARIA labels on all interactive elements (buttons, inputs, navigation)
- `role` attributes: table, alert, alertdialog, banner, main, navigation, status
- `aria-current="page"` on active navigation items
- `aria-expanded` and `aria-haspopup` on dropdown menus
- `aria-live="polite"` on toast notification container
- `focus-visible` ring styling with proper offset
- `sr-only` text for screen readers on loading states
- Keyboard-navigable pagination and table sorting
- Semantic HTML throughout (nav, main, header, aside, article)

#### Animations
- Staggered container animations with `variants` pattern
- Spring-based layout animations on sidebar active indicator
- Smooth page transitions via Framer Motion `motion.div` wrapper
- Card hover scale effects with `group-hover:scale-105`
- Animated bed occupancy progress bars with delay
- Toast enter/exit transitions with popLayout mode
- Theme toggle icon rotation animation
- Notification badge scale-in animation

#### Dark Mode
- Refined dark palette (`#0a0e17` background vs previous `#020617`)
- Proper contrast ratios for text and interactive elements
- Subtle border opacities (60-80% for light separation)
- Dark-mode-specific gradient mesh with increased opacity

---

## [1.0.0] - 2024-03-10

### Initial Release
- 8 user roles with role-based navigation
- 14 page modules (Dashboard through Settings)
- Dark/Light theme with localStorage persistence
- Mock data for 8 patients, 6 doctors, 10 appointments
- Framer Motion animations
- Responsive sidebar with mobile overlay
- React Router with protected routes
- Context API state management (Auth, Theme, Notifications)
- Tailwind CSS utility-first styling
- TypeScript interfaces for all data models
- Vite build tooling

---

## Legend

- 🚀 Major feature addition
- ✨ UI/UX improvement
- 🐛 Bug fix
- ♿ Accessibility improvement
- ⚡ Performance optimization
- 🔧 Code quality improvement

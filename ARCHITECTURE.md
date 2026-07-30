# Architecture

## System Overview

MedFlow HMS follows a **modular frontend architecture** designed for scalability, maintainability, and eventual backend integration.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Presentation Layer                         │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │ │
│  │  │  Pages   │  │  Layout  │  │    UI    │  │   Forms  │   │ │
│  │  │ (Lazy)   │  │Components│  │Components│  │          │   │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                     State Layer                               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────────┐  │ │
│  │  │  Auth    │  │  Theme   │  │     Notifications        │  │ │
│  │  │ Context  │  │ Context  │  │       Context            │  │ │
│  │  └──────────┘  └──────────┘  └──────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      Data Layer                               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────────┐  │ │
│  │  │   Mock   │  │  Types   │  │   Generator Utilities    │  │ │
│  │  │   Data   │  │ (TS)     │  │   (Scalable)             │  │ │
│  │  └──────────┘  └──────────┘  └──────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│              Build: Vite 5 + TypeScript 5 + Tailwind 3            │
└─────────────────────────────────────────────────────────────────┘
```

## Design Principles

1. **Separation of Concerns** — UI, state, and data are cleanly separated
2. **Lazy Loading** — Route-based code splitting for optimal performance
3. **Type Safety** — Comprehensive TypeScript interfaces for all entities
4. **Composability** — Small, reusable components composed into pages
5. **API-Ready** — Mock data layer designed for 1:1 API replacement

## Module Architecture

### Pages (14 route-level modules)
Each page is lazy-loaded and self-contained with its own state management.

### Components
- `layout/` — Structural components (Sidebar, TopNav, DashboardLayout)
- `ui/` — Reusable primitives (StatsCard, StatusBadge, Pagination, Toast, etc.)

### Contexts
- `AuthContext` — Authentication, user session, role management
- `ThemeContext` — Dark/light theme with system preference detection
- `NotificationContext` — Real-time notification state

### Data Flow
```
User Action → Component State → Context (if shared) → Re-render
```

## Performance Strategy

| Technique | Implementation |
|-----------|---------------|
| Code Splitting | React.lazy() on all pages |
| Chunk Strategy | Vendor, Charts, Animations as separate chunks |
| Memoization | useMemo for filtered/sorted data |
| Virtual Rendering | Limited display items for large datasets |
| CSS Purging | Tailwind production purge |

## Future Integration Points

The architecture supports seamless backend integration:

```typescript
// Current: Mock data import
import { patients } from '../data';

// Future: API service call
import { usePatients } from '../hooks/usePatients';
const { data: patients, isLoading } = usePatients();
```

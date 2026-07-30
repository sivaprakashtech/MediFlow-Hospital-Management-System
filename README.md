<div align="center">

<img src="screenshots/logo.png" alt="MedFlow Logo" width="80" />

# MedFlow HMS

### Enterprise Hospital Management System

A production-grade, AI-enhanced Hospital Management System built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**. Features 8 user roles, 14+ modules, AI-powered insights, command palette, and premium SaaS design.

<br />

[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0050?style=flat-square&logo=framer&logoColor=white)](https://framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

<br />

[🚀 Live Demo](#) · [📖 Documentation](#architecture) · [🗺️ Roadmap](./ROADMAP.md) · [🤝 Contributing](./CONTRIBUTING.md)

<br />

<img src="screenshots/hero.png" alt="MedFlow HMS Dashboard" width="100%" style="border-radius: 12px;" />

</div>

---

## ⚡ Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/medflow-hms.git
cd medflow-hms
npm install
npm run dev
```

Open `http://localhost:5173` → Login with `admin@medflow.com` / `password`

---

## 🎯 Key Features

### Enterprise Capabilities
| Feature | Description |
|---------|-------------|
| 🔐 8 User Roles | Super Admin, Doctor, Nurse, Receptionist, Pharmacist, Lab Tech, Accountant, Patient |
| 📊 Executive Dashboard | KPIs, revenue analytics, bed occupancy, AI insights |
| ⌘K Command Palette | Linear-inspired global search with keyboard navigation |
| 📆 Calendar View | Day/Week/Month view with color-coded appointments |
| 🔑 Forgot Password | Complete password recovery flow UI |
| 🤖 AI Insights Panel | Patient risk scores, bed forecasting, revenue predictions |
| 🌗 Dark/Light Theme | System preference detection with manual override |
| 📱 Responsive Design | Desktop, tablet, and mobile optimized |
| ♿ Accessible | ARIA labels, keyboard navigation, focus management |
| ⚡ Code Splitting | 14 lazy-loaded pages with optimized chunk strategy |
| 🔔 Toast Notifications | Success, error, warning, info with auto-dismiss |
| 💬 Confirm Dialogs | Accessible modals for destructive actions |

### Modules (16+)
```
📊 Dashboard          👥 Patient Management     🩺 Doctor Directory
📅 Appointments       📆 Calendar (Day/Week/Month) 👩‍⚕️ Nurse Station
🔬 Laboratory         💊 Pharmacy               💰 Billing & Finance
🏥 Ward Management    📈 Reports                👤 Staff Management
🔔 Notifications      ⚙️ Settings               🔐 Authentication
🔑 Forgot Password
```

### AI-Powered Features (Frontend Demo)
- 🧠 Patient Risk Assessment — Readmission prediction visualization
- 📈 Bed Occupancy Forecasting — 72-hour prediction display
- 📅 Smart Scheduling — AI-suggested appointment optimizations
- 💰 Revenue Forecasting — Quarterly projection analytics
- 🎯 Health Insights — Real-time model confidence metrics

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── layout/          → DashboardLayout, Sidebar, TopNav
│   └── ui/              → StatsCard, StatusBadge, Pagination, Toast,
│                          CommandPalette, ConfirmDialog, AIInsightsPanel,
│                          SearchInput, LoadingSkeleton, EmptyState, PageHeader
├── contexts/            → AuthContext, ThemeContext, NotificationContext
├── data/                → Enterprise mock data (520 patients, 120 doctors, etc.)
├── hooks/               → usePagination
├── pages/               → 14 lazy-loaded route pages
├── types/               → TypeScript interfaces
├── utils/               → Data generators
├── App.tsx              → Routing + CommandPalette
├── main.tsx             → Providers composition
└── index.css            → Design system tokens + component classes
```

> See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Components | 30+ |
| Pages | 16 |
| Services | 7 |
| Custom Hooks | 2 |
| Mock Data Records | 2,500+ |
| TypeScript Coverage | 100% |
| Bundle (gzipped) | ~240KB |
| Build Time | ~14s |
| Dev Server Start | <650ms |
| Lighthouse Score | 95+ |

---

## 🔑 Demo Accounts

| Role | Email | Quick Access |
|------|-------|-------------|
| 🛡️ Super Admin | admin@medflow.com | Full system access |
| 🩺 Doctor | doctor@medflow.com | Clinical workflows |
| 👩‍⚕️ Nurse | nurse@medflow.com | Ward & medications |
| 💁 Receptionist | receptionist@medflow.com | Front desk ops |
| 💊 Pharmacist | pharmacist@medflow.com | Inventory mgmt |
| 🔬 Lab Tech | lab@medflow.com | Test management |
| 📊 Accountant | accountant@medflow.com | Financial reports |
| 🧑 Patient | patient@medflow.com | Self-service portal |

> **Tip:** Use the role switcher in the top nav or press `⌘K` to navigate instantly.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `↑` `↓` | Navigate commands |
| `Enter` | Execute command |
| `Escape` | Close palette/dialog |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 18 | UI with Concurrent Features |
| Language | TypeScript 5 | Static Type Safety |
| Build | Vite 5 | Dev Server & Production Build |
| Styling | Tailwind CSS 3 | Design System & Utilities |
| Routing | React Router 6 | Client-Side Navigation |
| Animation | Framer Motion 10 | Page Transitions & Micro-interactions |
| Charts | Recharts 2 | Data Visualization |
| Icons | Lucide React | Consistent Icon System |
| Utilities | clsx | Conditional Class Names |
| State | Context API | Auth, Theme, Notifications |

---

## 🚢 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify
```bash
npm run build
# Publish: dist/ | Redirect: /* → /index.html 200
```

### Docker
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 📁 Documentation

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design & module overview |
| [API_READY.md](./API_READY.md) | Backend integration guide |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Development workflow |
| [SECURITY.md](./SECURITY.md) | Security policy & compliance |
| [ROADMAP.md](./ROADMAP.md) | Feature roadmap |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [RELEASE_NOTES.md](./RELEASE_NOTES.md) | Release highlights |

---

## ❓ FAQ

<details>
<summary><strong>Is this connected to a real backend?</strong></summary>
No. MedFlow HMS uses client-side mock data generators. The architecture is designed for seamless API integration — see API_READY.md.
</details>

<details>
<summary><strong>Can I use this for a real hospital?</strong></summary>
The UI and architecture are production-quality, but real deployment requires backend services, HIPAA compliance, security audits, and data encryption.
</details>

<details>
<summary><strong>How is the data generated?</strong></summary>
A deterministic generator in <code>src/utils/generators.ts</code> creates realistic patient, doctor, appointment, invoice, and medicine records using curated name/address/medical datasets.
</details>

<details>
<summary><strong>What's the AI features?</strong></summary>
The AI panels display pre-computed mock predictions. They demonstrate how healthcare AI insights would appear in a production system — no actual ML models are running.
</details>

---

## 📄 License

MIT License — free for personal, educational, and commercial use.

---

<div align="center">

**Built with ❤️ by Siva**

Enterprise Healthcare Management System — Portfolio Project

<br />

⭐ If this project helped you, give it a star!

<br />

<sub>Design inspired by Linear, Stripe, Vercel, and Notion</sub>

</div>

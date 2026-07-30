# API Integration Guide

## Overview

MedFlow HMS is architected for seamless backend integration. The mock data layer can be replaced with real API calls without modifying component logic.

## Current Architecture

```
Component → Data Import (Mock) → Render
```

## Target Architecture

```
Component → Custom Hook → API Service → Backend → Render
```

## Migration Strategy

### Step 1: Create Service Layer

```typescript
// src/services/api.ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    ...options,
  });
  if (!response.ok) throw new ApiError(response);
  return response.json();
}

export const patientService = {
  getAll: (params?: QueryParams) => request<PaginatedResponse<Patient>>('/patients', { params }),
  getById: (id: string) => request<Patient>(`/patients/${id}`),
  create: (data: CreatePatientDTO) => request<Patient>('/patients', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: UpdatePatientDTO) => request<Patient>(`/patients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (id: string) => request<void>(`/patients/${id}`, { method: 'DELETE' }),
};
```

### Step 2: Create Custom Hooks

```typescript
// src/hooks/usePatients.ts
export function usePatients(params?: QueryParams) {
  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    patientService.getAll(params)
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params]);

  return { data, loading, error };
}
```

### Step 3: Replace Imports in Pages

```diff
- import { patients } from '../data';
+ import { usePatients } from '../hooks/usePatients';

export default function Patients() {
- const filtered = useMemo(() => patients.filter(...), []);
+ const { data: patients, loading } = usePatients();
+ const filtered = useMemo(() => (patients || []).filter(...), [patients]);
}
```

## API Contracts

### Endpoints Expected

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /patients | List patients (paginated) |
| GET | /patients/:id | Get patient details |
| POST | /patients | Register patient |
| PATCH | /patients/:id | Update patient |
| DELETE | /patients/:id | Archive patient |
| GET | /doctors | List doctors |
| GET | /appointments | List appointments |
| POST | /appointments | Book appointment |
| GET | /invoices | List invoices |
| GET | /lab-tests | List lab tests |
| GET | /medicines | List pharmacy inventory |
| GET | /wards | Ward/bed status |
| GET | /dashboard/stats | KPI statistics |

### Query Parameters

```
?page=1&limit=10&sort=name&order=asc&search=john&status=active
```

### Response Format

```json
{
  "data": [...],
  "meta": {
    "total": 520,
    "page": 1,
    "limit": 10,
    "totalPages": 52
  }
}
```

## Authentication

The app expects JWT tokens stored in the Auth context. The service layer should attach the token to every request:

```typescript
function getAuthHeaders() {
  const token = localStorage.getItem('hms-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
VITE_APP_ENV=development
```

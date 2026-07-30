/**
 * Mock API Adapter
 *
 * Simulates backend responses using generated data.
 * Provides realistic latency, server-side pagination, filtering, and sorting.
 * Active when VITE_USE_MOCK=true in environment configuration.
 */
import { PaginatedRequest, PaginatedResponse } from './types';
import { patients, doctors, appointments, invoices, labTests, medicines } from '../data';
import { mockWards, mockBeds } from '../data/wards';
import { mockNurseTasks, mockMedicationSchedule } from '../data/nurse';
import { mockDashboardStats, revenueChartData, patientChartData, departmentData, bedOccupancyData, mockActivities } from '../data/dashboard';
import { mockNotifications } from '../data/notifications';

/** Simulates network latency (200-500ms) */
function simulateLatency(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
}

/**
 * Generic pagination, filtering, and sorting helper.
 * Mirrors typical REST API query behavior.
 */
function paginate<T>(
  data: T[],
  params: PaginatedRequest,
  searchFields: (keyof T)[] = []
): PaginatedResponse<T> {
  let filtered = [...data];

  // Full-text search across specified fields
  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter(item =>
      searchFields.some(field => String(item[field] ?? '').toLowerCase().includes(query))
    );
  }

  // Dynamic field filters (skip reserved params)
  const reserved = new Set(['page', 'limit', 'search', 'sortBy', 'sortOrder']);
  for (const [key, value] of Object.entries(params)) {
    if (reserved.has(key) || !value || value === 'all') continue;
    filtered = filtered.filter(item => String((item as Record<string, unknown>)[key]) === String(value));
  }

  // Sort
  if (params.sortBy) {
    const field = params.sortBy as keyof T;
    const dir = params.sortOrder === 'desc' ? -1 : 1;
    filtered.sort((a, b) => String(a[field] ?? '').localeCompare(String(b[field] ?? '')) * dir);
  }

  // Paginate
  const page = params.page || 1;
  const limit = params.limit || 10;
  const total = filtered.length;

  return {
    data: filtered.slice((page - 1) * limit, page * limit),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  };
}

// ─── Public Mock API ─────────────────────────────────────────────────────────

export const mockApi = {
  // Patients
  async getPatients(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(patients, params, ['name', 'email', 'id', 'phone'] as never[]);
  },
  async getPatientById(id: string) {
    await simulateLatency();
    return patients.find(p => p.id === id) || null;
  },

  // Doctors
  async getDoctors(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(doctors, params, ['name', 'specialization', 'department'] as never[]);
  },
  async getDoctorById(id: string) {
    await simulateLatency();
    return doctors.find(d => d.id === id) || null;
  },

  // Appointments
  async getAppointments(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(appointments, params, ['patientName', 'doctorName', 'id'] as never[]);
  },

  // Invoices
  async getInvoices(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(invoices, params, ['patientName', 'id'] as never[]);
  },

  // Lab Tests
  async getLabTests(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(labTests, params, ['patientName', 'testName', 'doctorName'] as never[]);
  },

  // Medicines
  async getMedicines(params: PaginatedRequest = {}) {
    await simulateLatency();
    return paginate(medicines, params, ['name', 'manufacturer', 'category'] as never[]);
  },

  // Wards & Beds
  async getWards() { await simulateLatency(); return mockWards; },
  async getBeds() { await simulateLatency(); return mockBeds; },

  // Nurse
  async getNurseTasks() { await simulateLatency(); return mockNurseTasks; },
  async getMedicationSchedule() { await simulateLatency(); return mockMedicationSchedule; },

  // Dashboard (aggregated)
  async getDashboardStats() {
    await simulateLatency();
    return {
      stats: mockDashboardStats,
      revenueChart: revenueChartData,
      patientChart: patientChartData,
      departmentData,
      bedOccupancy: bedOccupancyData,
      activities: mockActivities,
    };
  },

  // Notifications
  async getNotifications() { await simulateLatency(); return mockNotifications; },
};

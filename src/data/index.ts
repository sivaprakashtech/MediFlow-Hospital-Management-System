/**
 * Enterprise Data Layer
 *
 * Uses module-level caching. Data generates once on first import.
 * Since all pages are lazy-loaded, this only executes when a page
 * that imports this module is first visited.
 */
import { generatePatients, generateDoctors, generateAppointments, generateInvoices, generateLabTests, generateMedicines } from '../utils/generators';

// Generated data — cached at module level.
// Because all consumer pages are lazy-loaded via React.lazy(),
// this code only runs when the first data-consuming page mounts.
export const patients = generatePatients(520);
export const doctors = generateDoctors(120);
export const appointments = generateAppointments(1200, patients, doctors);
export const invoices = generateInvoices(500, patients);
export const labTests = generateLabTests(300, patients, doctors);
export const medicines = generateMedicines(100);

// Static data (no generation overhead)
export { mockUsers } from './users';
export { mockNotifications } from './notifications';
export { mockDashboardStats, revenueChartData, patientChartData, departmentData, bedOccupancyData, mockActivities } from './dashboard';
export { mockWards, mockBeds } from './wards';
export { mockNurseTasks, mockMedicationSchedule } from './nurse';

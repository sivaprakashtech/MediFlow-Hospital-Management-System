import { DashboardStats, Activity, ChartData } from '../types';

export const mockDashboardStats: DashboardStats = {
  totalPatients: 2847,
  totalDoctors: 48,
  todayAppointments: 156,
  bedOccupancy: 78,
  revenue: 284500,
  emergencyCases: 12,
  pendingLabTests: 34,
  lowStockMedicines: 8,
};

export const revenueChartData: ChartData[] = [
  { name: 'Jan', value: 245000, expenses: 180000 },
  { name: 'Feb', value: 268000, expenses: 195000 },
  { name: 'Mar', value: 284500, expenses: 201000 },
  { name: 'Apr', value: 298000, expenses: 210000 },
  { name: 'May', value: 312000, expenses: 215000 },
  { name: 'Jun', value: 325000, expenses: 222000 },
  { name: 'Jul', value: 310000, expenses: 218000 },
  { name: 'Aug', value: 335000, expenses: 230000 },
  { name: 'Sep', value: 348000, expenses: 240000 },
  { name: 'Oct', value: 362000, expenses: 248000 },
  { name: 'Nov', value: 375000, expenses: 255000 },
  { name: 'Dec', value: 390000, expenses: 262000 },
];

export const patientChartData: ChartData[] = [
  { name: 'Jan', value: 120, outpatient: 95, inpatient: 25 },
  { name: 'Feb', value: 145, outpatient: 112, inpatient: 33 },
  { name: 'Mar', value: 162, outpatient: 125, inpatient: 37 },
  { name: 'Apr', value: 178, outpatient: 140, inpatient: 38 },
  { name: 'May', value: 195, outpatient: 152, inpatient: 43 },
  { name: 'Jun', value: 210, outpatient: 165, inpatient: 45 },
];

export const departmentData: ChartData[] = [
  { name: 'Cardiology', value: 340 },
  { name: 'Neurology', value: 280 },
  { name: 'Orthopedics', value: 250 },
  { name: 'Pediatrics', value: 420 },
  { name: 'Dermatology', value: 180 },
  { name: 'Surgery', value: 150 },
  { name: 'Emergency', value: 310 },
];

export const bedOccupancyData: ChartData[] = [
  { name: 'General', value: 85, total: 120 },
  { name: 'ICU', value: 18, total: 20 },
  { name: 'Emergency', value: 12, total: 15 },
  { name: 'Pediatric', value: 22, total: 30 },
  { name: 'Maternity', value: 15, total: 25 },
  { name: 'Surgical', value: 28, total: 35 },
];

export const mockActivities: Activity[] = [
  {
    id: 'act-001',
    type: 'appointment',
    title: 'Appointment Completed',
    description: 'Dr. James Wilson completed consultation with David Thompson',
    timestamp: '2024-03-15T09:30:00Z',
    user: 'Dr. James Wilson',
  },
  {
    id: 'act-002',
    type: 'admission',
    title: 'New Admission',
    description: 'Robert Chen admitted to ICU Ward - Bed 5',
    timestamp: '2024-03-15T08:45:00Z',
    user: 'Emily Carter',
  },
  {
    id: 'act-003',
    type: 'lab_result',
    title: 'Lab Results Published',
    description: 'Complete Blood Count results for Sarah Johnson',
    timestamp: '2024-03-15T08:15:00Z',
    user: 'Robert Taylor',
  },
  {
    id: 'act-004',
    type: 'prescription',
    title: 'Prescription Updated',
    description: 'New prescription issued for Michael Rodriguez',
    timestamp: '2024-03-15T07:50:00Z',
    user: 'Dr. James Wilson',
  },
  {
    id: 'act-005',
    type: 'discharge',
    title: 'Patient Discharged',
    description: 'Olivia Martinez discharged from General Ward',
    timestamp: '2024-03-14T17:30:00Z',
    user: 'Emily Carter',
  },
  {
    id: 'act-006',
    type: 'payment',
    title: 'Payment Received',
    description: 'Invoice #INV-2024-045 - $1,250 received',
    timestamp: '2024-03-14T16:00:00Z',
    user: 'Jennifer Adams',
  },
  {
    id: 'act-007',
    type: 'appointment',
    title: 'Appointment Scheduled',
    description: 'Sophia Lee booked appointment with Dr. Andrew Kim',
    timestamp: '2024-03-14T15:20:00Z',
    user: 'Michael Brown',
  },
  {
    id: 'act-008',
    type: 'lab_result',
    title: 'Test Requested',
    description: 'MRI scan requested for William Park',
    timestamp: '2024-03-14T14:10:00Z',
    user: 'Dr. Maria Garcia',
  },
];

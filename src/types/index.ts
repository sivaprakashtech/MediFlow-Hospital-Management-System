export type UserRole = 
  | 'super_admin'
  | 'doctor'
  | 'nurse'
  | 'receptionist'
  | 'pharmacist'
  | 'lab_technician'
  | 'accountant'
  | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  phone?: string;
  joinDate: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  insuranceId?: string;
  allergies: string[];
  medicalHistory: MedicalRecord[];
  registeredDate: string;
  status: 'active' | 'discharged' | 'critical';
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  experience: number;
  qualification: string;
  availability: DoctorAvailability[];
  consultationFee: number;
  rating: number;
  patientsHandled: number;
  avatar?: string;
  status: 'available' | 'in_consultation' | 'off_duty';
}

export interface DoctorAvailability {
  day: string;
  startTime: string;
  endTime: string;
  maxPatients: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  type: 'consultation' | 'follow_up' | 'emergency' | 'routine_checkup';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
  type: 'consultation' | 'surgery' | 'lab_test' | 'emergency';
}

export interface Ward {
  id: string;
  name: string;
  type: 'general' | 'icu' | 'emergency' | 'pediatric' | 'maternity' | 'surgical';
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  floor: number;
}

export interface Bed {
  id: string;
  wardId: string;
  wardName: string;
  bedNumber: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  testName: string;
  testType: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  requestDate: string;
  completionDate?: string;
  results?: string;
  urgency: 'normal' | 'urgent' | 'critical';
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  unitPrice: number;
  minStock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  insuranceClaim?: boolean;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  bedOccupancy: number;
  revenue: number;
  emergencyCases: number;
  pendingLabTests: number;
  lowStockMedicines: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface Activity {
  id: string;
  type: 'appointment' | 'admission' | 'discharge' | 'lab_result' | 'prescription' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon?: string;
}

export interface NurseTask {
  id: string;
  patientId: string;
  patientName: string;
  task: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed';
  dueTime: string;
  assignedNurse: string;
  ward: string;
}

export interface MedicationSchedule {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  time: string;
  ward: string;
  bed: string;
  administered: boolean;
  administeredBy?: string;
  administeredAt?: string;
}

import { Ward, Bed } from '../types';

export const mockWards: Ward[] = [
  { id: 'ward-001', name: 'General Ward A', type: 'general', totalBeds: 40, occupiedBeds: 32, availableBeds: 8, floor: 1 },
  { id: 'ward-002', name: 'General Ward B', type: 'general', totalBeds: 40, occupiedBeds: 35, availableBeds: 5, floor: 1 },
  { id: 'ward-003', name: 'General Ward C', type: 'general', totalBeds: 40, occupiedBeds: 28, availableBeds: 12, floor: 2 },
  { id: 'ward-004', name: 'ICU', type: 'icu', totalBeds: 20, occupiedBeds: 18, availableBeds: 2, floor: 3 },
  { id: 'ward-005', name: 'Emergency Ward', type: 'emergency', totalBeds: 15, occupiedBeds: 12, availableBeds: 3, floor: 1 },
  { id: 'ward-006', name: 'Pediatric Ward', type: 'pediatric', totalBeds: 30, occupiedBeds: 22, availableBeds: 8, floor: 2 },
  { id: 'ward-007', name: 'Maternity Ward', type: 'maternity', totalBeds: 25, occupiedBeds: 15, availableBeds: 10, floor: 2 },
  { id: 'ward-008', name: 'Surgical Ward', type: 'surgical', totalBeds: 35, occupiedBeds: 28, availableBeds: 7, floor: 3 },
];

export const mockBeds: Bed[] = [
  { id: 'bed-001', wardId: 'ward-004', wardName: 'ICU', bedNumber: 'ICU-01', status: 'occupied', patientId: 'pat-005', patientName: 'Robert Chen', admissionDate: '2024-03-10' },
  { id: 'bed-002', wardId: 'ward-004', wardName: 'ICU', bedNumber: 'ICU-02', status: 'occupied', patientId: 'pat-003', patientName: 'Michael Rodriguez', admissionDate: '2024-03-12' },
  { id: 'bed-003', wardId: 'ward-004', wardName: 'ICU', bedNumber: 'ICU-03', status: 'available' },
  { id: 'bed-004', wardId: 'ward-004', wardName: 'ICU', bedNumber: 'ICU-04', status: 'occupied', patientId: 'pat-007', patientName: 'William Park', admissionDate: '2024-03-14' },
  { id: 'bed-005', wardId: 'ward-004', wardName: 'ICU', bedNumber: 'ICU-05', status: 'maintenance' },
  { id: 'bed-006', wardId: 'ward-001', wardName: 'General Ward A', bedNumber: 'GA-01', status: 'occupied', patientId: 'pat-001', patientName: 'David Thompson', admissionDate: '2024-03-13' },
  { id: 'bed-007', wardId: 'ward-001', wardName: 'General Ward A', bedNumber: 'GA-02', status: 'available' },
  { id: 'bed-008', wardId: 'ward-001', wardName: 'General Ward A', bedNumber: 'GA-03', status: 'occupied', patientId: 'pat-002', patientName: 'Sarah Johnson', admissionDate: '2024-03-14' },
  { id: 'bed-009', wardId: 'ward-005', wardName: 'Emergency Ward', bedNumber: 'ER-01', status: 'reserved' },
  { id: 'bed-010', wardId: 'ward-005', wardName: 'Emergency Ward', bedNumber: 'ER-02', status: 'occupied', patientId: 'pat-008', patientName: 'Sophia Lee', admissionDate: '2024-03-15' },
];

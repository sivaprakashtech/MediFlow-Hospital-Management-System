import { NurseTask, MedicationSchedule } from '../types';

export const mockNurseTasks: NurseTask[] = [
  { id: 'task-001', patientId: 'pat-005', patientName: 'Robert Chen', task: 'Check vital signs', priority: 'critical', status: 'pending', dueTime: '2024-03-15T08:00:00', assignedNurse: 'Emily Carter', ward: 'ICU' },
  { id: 'task-002', patientId: 'pat-001', patientName: 'David Thompson', task: 'Administer medication', priority: 'high', status: 'in_progress', dueTime: '2024-03-15T08:30:00', assignedNurse: 'Emily Carter', ward: 'General Ward A' },
  { id: 'task-003', patientId: 'pat-003', patientName: 'Michael Rodriguez', task: 'Blood glucose monitoring', priority: 'high', status: 'pending', dueTime: '2024-03-15T09:00:00', assignedNurse: 'Emily Carter', ward: 'ICU' },
  { id: 'task-004', patientId: 'pat-002', patientName: 'Sarah Johnson', task: 'Change IV fluids', priority: 'medium', status: 'completed', dueTime: '2024-03-15T07:30:00', assignedNurse: 'Emily Carter', ward: 'General Ward A' },
  { id: 'task-005', patientId: 'pat-007', patientName: 'William Park', task: 'Wound dressing change', priority: 'medium', status: 'pending', dueTime: '2024-03-15T10:00:00', assignedNurse: 'Emily Carter', ward: 'ICU' },
  { id: 'task-006', patientId: 'pat-008', patientName: 'Sophia Lee', task: 'Discharge preparation', priority: 'low', status: 'pending', dueTime: '2024-03-15T11:00:00', assignedNurse: 'Emily Carter', ward: 'Emergency Ward' },
  { id: 'task-007', patientId: 'pat-005', patientName: 'Robert Chen', task: 'Post-surgery assessment', priority: 'critical', status: 'pending', dueTime: '2024-03-15T12:00:00', assignedNurse: 'Emily Carter', ward: 'ICU' },
];

export const mockMedicationSchedule: MedicationSchedule[] = [
  { id: 'sched-001', patientId: 'pat-005', patientName: 'Robert Chen', medication: 'Atorvastatin 40mg', dosage: '1 tablet', frequency: 'Once daily', time: '08:00', ward: 'ICU', bed: 'ICU-01', administered: true, administeredBy: 'Emily Carter', administeredAt: '2024-03-15T08:05:00' },
  { id: 'sched-002', patientId: 'pat-005', patientName: 'Robert Chen', medication: 'Clopidogrel 75mg', dosage: '1 tablet', frequency: 'Once daily', time: '08:00', ward: 'ICU', bed: 'ICU-01', administered: true, administeredBy: 'Emily Carter', administeredAt: '2024-03-15T08:05:00' },
  { id: 'sched-003', patientId: 'pat-001', patientName: 'David Thompson', medication: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'Once daily', time: '09:00', ward: 'General Ward A', bed: 'GA-01', administered: false },
  { id: 'sched-004', patientId: 'pat-003', patientName: 'Michael Rodriguez', medication: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', time: '08:00', ward: 'ICU', bed: 'ICU-02', administered: true, administeredBy: 'Emily Carter', administeredAt: '2024-03-15T08:10:00' },
  { id: 'sched-005', patientId: 'pat-003', patientName: 'Michael Rodriguez', medication: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', time: '20:00', ward: 'ICU', bed: 'ICU-02', administered: false },
  { id: 'sched-006', patientId: 'pat-007', patientName: 'William Park', medication: 'Gabapentin 300mg', dosage: '1 capsule', frequency: 'Three times daily', time: '08:00', ward: 'ICU', bed: 'ICU-04', administered: false },
  { id: 'sched-007', patientId: 'pat-002', patientName: 'Sarah Johnson', medication: 'Sumatriptan 50mg', dosage: '1 tablet', frequency: 'As needed', time: '10:00', ward: 'General Ward A', bed: 'GA-03', administered: false },
];

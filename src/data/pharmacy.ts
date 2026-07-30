import { Medicine } from '../types';

export const mockMedicines: Medicine[] = [
  { id: 'med-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', manufacturer: 'Pfizer', batchNumber: 'BT-2024-001', expiryDate: '2025-06-15', quantity: 15, unitPrice: 12.50, minStock: 50, status: 'low_stock' },
  { id: 'med-002', name: 'Metformin 500mg', category: 'Anti-diabetic', manufacturer: 'Merck', batchNumber: 'BT-2024-002', expiryDate: '2025-09-20', quantity: 250, unitPrice: 8.75, minStock: 100, status: 'in_stock' },
  { id: 'med-003', name: 'Lisinopril 10mg', category: 'Antihypertensive', manufacturer: 'AstraZeneca', batchNumber: 'BT-2024-003', expiryDate: '2025-12-10', quantity: 180, unitPrice: 15.00, minStock: 80, status: 'in_stock' },
  { id: 'med-004', name: 'Atorvastatin 40mg', category: 'Statins', manufacturer: 'Pfizer', batchNumber: 'BT-2024-004', expiryDate: '2025-08-25', quantity: 320, unitPrice: 22.00, minStock: 100, status: 'in_stock' },
  { id: 'med-005', name: 'Omeprazole 20mg', category: 'Proton Pump Inhibitors', manufacturer: 'AstraZeneca', batchNumber: 'BT-2024-005', expiryDate: '2025-04-30', quantity: 0, unitPrice: 9.50, minStock: 60, status: 'out_of_stock' },
  { id: 'med-006', name: 'Sumatriptan 50mg', category: 'Migraine', manufacturer: 'GlaxoSmithKline', batchNumber: 'BT-2024-006', expiryDate: '2025-11-15', quantity: 45, unitPrice: 35.00, minStock: 30, status: 'in_stock' },
  { id: 'med-007', name: 'Gabapentin 300mg', category: 'Anticonvulsants', manufacturer: 'Pfizer', batchNumber: 'BT-2024-007', expiryDate: '2025-07-20', quantity: 22, unitPrice: 18.50, minStock: 40, status: 'low_stock' },
  { id: 'med-008', name: 'Clopidogrel 75mg', category: 'Antiplatelet', manufacturer: 'Sanofi', batchNumber: 'BT-2024-008', expiryDate: '2025-10-05', quantity: 150, unitPrice: 28.00, minStock: 60, status: 'in_stock' },
  { id: 'med-009', name: 'Metoprolol 50mg', category: 'Beta-blockers', manufacturer: 'AstraZeneca', batchNumber: 'BT-2024-009', expiryDate: '2025-05-18', quantity: 8, unitPrice: 14.00, minStock: 50, status: 'low_stock' },
  { id: 'med-010', name: 'Ibuprofen 400mg', category: 'NSAIDs', manufacturer: 'Johnson & Johnson', batchNumber: 'BT-2024-010', expiryDate: '2026-01-30', quantity: 500, unitPrice: 6.50, minStock: 200, status: 'in_stock' },
  { id: 'med-011', name: 'Prednisone 10mg', category: 'Corticosteroids', manufacturer: 'Merck', batchNumber: 'BT-2024-011', expiryDate: '2025-08-12', quantity: 120, unitPrice: 11.00, minStock: 40, status: 'in_stock' },
  { id: 'med-012', name: 'Ciprofloxacin 500mg', category: 'Antibiotics', manufacturer: 'Bayer', batchNumber: 'BT-2024-012', expiryDate: '2025-03-28', quantity: 5, unitPrice: 16.75, minStock: 30, status: 'low_stock' },
];

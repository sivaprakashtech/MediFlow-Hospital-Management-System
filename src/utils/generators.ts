// Enterprise data generator utilities
const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Angela', 'Eric', 'Shirley', 'Jonathan', 'Anna', 'Stephen', 'Brenda', 'Larry', 'Pamela', 'Justin', 'Emma', 'Scott', 'Nicole', 'Brandon', 'Helen', 'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra', 'Frank', 'Rachel', 'Alexander', 'Carolyn', 'Patrick', 'Janet', 'Jack', 'Catherine', 'Dennis', 'Maria', 'Jerry', 'Heather'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'];
const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Surgery', 'Emergency', 'Oncology', 'Radiology', 'Gastroenterology', 'Urology', 'Pulmonology', 'Endocrinology', 'Nephrology', 'Psychiatry', 'Ophthalmology'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const allergies = ['Penicillin', 'Sulfa drugs', 'Aspirin', 'Ibuprofen', 'Latex', 'Shellfish', 'Peanuts', 'Codeine', 'Morphine', 'Tetracycline', 'Eggs', 'Soy', 'Tree nuts', 'Contrast dye', 'None'];
const cities = ['Springfield', 'Chicago', 'Evanston', 'Naperville', 'Aurora', 'Rockford', 'Joliet', 'Peoria', 'Schaumburg', 'Champaign'];
const streets = ['Oak St', 'Maple Ave', 'Pine Rd', 'Cedar Ln', 'Elm St', 'Birch Dr', 'Walnut Blvd', 'Spruce Ct', 'Willow Way', 'Cherry Hill'];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMultiple<T>(arr: T[], min: number, max: number): T[] {
  const count = rand(min, max);
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateDate(startYear: number, endYear: number): string {
  const year = rand(startYear, endYear);
  const month = String(rand(1, 12)).padStart(2, '0');
  const day = String(rand(1, 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generatePhone(): string {
  return `+1 (${rand(200, 999)}) ${rand(100, 999)}-${String(rand(0, 9999)).padStart(4, '0')}`;
}

function generateEmail(first: string, last: string): string {
  const domains = ['email.com', 'gmail.com', 'outlook.com', 'yahoo.com', 'mail.com'];
  return `${first.toLowerCase()}.${last.toLowerCase()}@${pick(domains)}`;
}

export function generatePatients(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const first = pick(firstNames);
    const last = pick(lastNames);
    const statuses: Array<'active' | 'discharged' | 'critical'> = ['active', 'active', 'active', 'active', 'discharged', 'critical'];
    return {
      id: `pat-${String(i + 1).padStart(4, '0')}`,
      name: `${first} ${last}`,
      email: generateEmail(first, last),
      phone: generatePhone(),
      dateOfBirth: generateDate(1940, 2006),
      gender: pick(['male', 'female', 'other'] as const),
      bloodGroup: pick(bloodGroups),
      address: `${rand(100, 9999)} ${pick(streets)}, ${pick(cities)}, IL ${rand(60000, 62999)}`,
      emergencyContact: generatePhone(),
      insuranceId: Math.random() > 0.3 ? `INS-${rand(2020, 2024)}-${String(rand(1, 9999)).padStart(4, '0')}` : undefined,
      allergies: Math.random() > 0.4 ? pickMultiple(allergies.filter(a => a !== 'None'), 1, 3) : [],
      medicalHistory: [],
      registeredDate: generateDate(2021, 2024),
      status: pick(statuses),
    };
  });
}

export function generateDoctors(count: number) {
  const specializations = departments;
  const qualifications = ['MD, FACC', 'MD, PhD', 'MD, MS', 'MD, DCH', 'MD, FAAD', 'MD, FACS', 'MD, FRCS', 'MD, DM', 'MBBS, MD', 'MD, DNB'];
  const statuses: Array<'available' | 'in_consultation' | 'off_duty'> = ['available', 'available', 'in_consultation', 'off_duty'];

  return Array.from({ length: count }, (_, i) => {
    const first = pick(firstNames);
    const last = pick(lastNames);
    const spec = pick(specializations);
    return {
      id: `doc-${String(i + 1).padStart(3, '0')}`,
      name: `Dr. ${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@medflow.com`,
      phone: generatePhone(),
      specialization: spec,
      department: spec,
      experience: rand(3, 30),
      qualification: pick(qualifications),
      availability: [
        { day: 'Monday', startTime: '09:00', endTime: '17:00', maxPatients: rand(15, 25) },
        { day: 'Wednesday', startTime: '09:00', endTime: '17:00', maxPatients: rand(15, 25) },
        { day: 'Friday', startTime: '09:00', endTime: '15:00', maxPatients: rand(10, 20) },
      ],
      consultationFee: rand(150, 500),
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
      patientsHandled: rand(200, 5000),
      status: pick(statuses),
    };
  });
}

export function generateAppointments(count: number, patients: Array<{id: string; name: string}>, doctors: Array<{id: string; name: string; department: string}>) {
  const statuses: Array<'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'> = ['scheduled', 'scheduled', 'completed', 'completed', 'completed', 'in_progress', 'cancelled', 'no_show'];
  const types: Array<'consultation' | 'follow_up' | 'emergency' | 'routine_checkup'> = ['consultation', 'consultation', 'follow_up', 'follow_up', 'routine_checkup', 'emergency'];
  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  return Array.from({ length: count }, (_, i) => {
    const patient = pick(patients);
    const doctor = pick(doctors);
    return {
      id: `apt-${String(i + 1).padStart(4, '0')}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date: generateDate(2024, 2024),
      time: pick(times),
      duration: pick([15, 20, 30, 30, 45, 60]),
      status: pick(statuses),
      type: pick(types),
      notes: Math.random() > 0.6 ? 'Follow-up required' : undefined,
    };
  });
}

export function generateInvoices(count: number, patients: Array<{id: string; name: string}>) {
  const statuses: Array<'paid' | 'pending' | 'overdue' | 'cancelled'> = ['paid', 'paid', 'paid', 'pending', 'pending', 'overdue', 'cancelled'];
  const services = ['Consultation', 'Lab Tests', 'X-Ray', 'MRI Scan', 'CT Scan', 'Ultrasound', 'ECG', 'Blood Work', 'Surgery', 'Physical Therapy', 'Medication', 'ICU Stay', 'Emergency Care', 'Vaccination'];

  return Array.from({ length: count }, (_, i) => {
    const patient = pick(patients);
    const itemCount = rand(1, 5);
    const items = Array.from({ length: itemCount }, () => {
      const qty = rand(1, 4);
      const price = rand(50, 2000);
      return { description: pick(services), quantity: qty, unitPrice: price, total: qty * price };
    });
    const subtotal = items.reduce((s, item) => s + item.total, 0);
    const tax = Math.round(subtotal * 0.08);
    const discount = Math.random() > 0.7 ? Math.round(subtotal * 0.05) : 0;
    const status = pick(statuses);
    return {
      id: `INV-2024-${String(i + 1).padStart(4, '0')}`,
      patientId: patient.id,
      patientName: patient.name,
      date: generateDate(2024, 2024),
      dueDate: generateDate(2024, 2024),
      items,
      subtotal,
      tax,
      discount,
      total: subtotal + tax - discount,
      status,
      paymentMethod: status === 'paid' ? pick(['Credit Card', 'Insurance', 'Cash', 'Bank Transfer']) : undefined,
      insuranceClaim: Math.random() > 0.5,
    };
  });
}

export function generateLabTests(count: number, patients: Array<{id: string; name: string}>, doctors: Array<{id: string; name: string}>) {
  const testNames = ['Complete Blood Count', 'Lipid Panel', 'Metabolic Panel', 'Thyroid Function', 'HbA1c', 'Liver Function', 'Kidney Function', 'Urinalysis', 'Cardiac Enzymes', 'MRI Brain', 'CT Scan Chest', 'X-Ray Spine', 'Ultrasound Abdomen', 'ECG', 'Blood Culture', 'Allergy Panel', 'HIV Test', 'Hepatitis Panel', 'Coagulation Panel', 'Electrolytes'];
  const testTypes = ['Hematology', 'Biochemistry', 'Radiology', 'Immunology', 'Microbiology', 'Clinical Pathology', 'Cardiology'];
  const statuses: Array<'pending' | 'in_progress' | 'completed' | 'cancelled'> = ['pending', 'in_progress', 'completed', 'completed', 'completed'];
  const urgencies: Array<'normal' | 'urgent' | 'critical'> = ['normal', 'normal', 'normal', 'urgent', 'critical'];

  return Array.from({ length: count }, (_, i) => {
    const patient = pick(patients);
    const doctor = pick(doctors);
    const status = pick(statuses);
    return {
      id: `lab-${String(i + 1).padStart(4, '0')}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      testName: pick(testNames),
      testType: pick(testTypes),
      status,
      requestDate: generateDate(2024, 2024),
      completionDate: status === 'completed' ? generateDate(2024, 2024) : undefined,
      results: status === 'completed' ? 'Results within normal range. No abnormalities detected.' : undefined,
      urgency: pick(urgencies),
    };
  });
}

export function generateMedicines(count: number) {
  const medicines = ['Amoxicillin', 'Metformin', 'Lisinopril', 'Atorvastatin', 'Omeprazole', 'Sumatriptan', 'Gabapentin', 'Clopidogrel', 'Metoprolol', 'Ibuprofen', 'Prednisone', 'Ciprofloxacin', 'Azithromycin', 'Losartan', 'Amlodipine', 'Levothyroxine', 'Albuterol', 'Sertraline', 'Escitalopram', 'Pantoprazole', 'Furosemide', 'Warfarin', 'Insulin Glargine', 'Tamsulosin', 'Montelukast', 'Rosuvastatin', 'Duloxetine', 'Venlafaxine', 'Tramadol', 'Hydrocodone'];
  const dosages = ['5mg', '10mg', '20mg', '25mg', '50mg', '100mg', '200mg', '250mg', '500mg'];
  const categories = ['Antibiotics', 'Anti-diabetic', 'Antihypertensive', 'Statins', 'NSAIDs', 'Proton Pump Inhibitors', 'Anticonvulsants', 'Beta-blockers', 'Corticosteroids', 'Antiplatelet', 'Antidepressants', 'Bronchodilators'];
  const manufacturers = ['Pfizer', 'Merck', 'AstraZeneca', 'Novartis', 'Roche', 'Johnson & Johnson', 'Sanofi', 'GlaxoSmithKline', 'Bayer', 'Abbott', 'Eli Lilly', 'Bristol-Myers Squibb'];

  return Array.from({ length: count }, (_, i) => {
    const quantity = rand(0, 600);
    const minStock = rand(30, 100);
    const status: 'in_stock' | 'low_stock' | 'out_of_stock' = quantity === 0 ? 'out_of_stock' : quantity < minStock ? 'low_stock' : 'in_stock';
    return {
      id: `med-${String(i + 1).padStart(3, '0')}`,
      name: `${pick(medicines)} ${pick(dosages)}`,
      category: pick(categories),
      manufacturer: pick(manufacturers),
      batchNumber: `BT-2024-${String(rand(100, 999))}`,
      expiryDate: generateDate(2025, 2027),
      quantity,
      unitPrice: Number((rand(3, 80) + Math.random()).toFixed(2)),
      minStock,
      status,
    };
  });
}

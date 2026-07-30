import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FlaskConical, FileText, Clock, AlertCircle, X } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import { useToast } from '../components/ui/Toast';
import { usePagination } from '../hooks/usePagination';
import { labTests as initialLabTests, patients, doctors } from '../data';
import { LabTest } from '../types';

const TEST_NAMES = ['Complete Blood Count', 'Lipid Panel', 'Metabolic Panel', 'Thyroid Function', 'HbA1c', 'Liver Function', 'Kidney Function', 'Urinalysis', 'Cardiac Enzymes', 'MRI Brain', 'CT Scan Chest', 'X-Ray Spine', 'Ultrasound Abdomen', 'ECG', 'Blood Culture', 'Allergy Panel'];
const TEST_TYPES = ['Hematology', 'Biochemistry', 'Radiology', 'Immunology', 'Microbiology', 'Clinical Pathology', 'Cardiology'];
const SAMPLE_TYPES = ['Blood', 'Urine', 'Stool', 'Sputum', 'CSF', 'Tissue', 'Swab', 'N/A (Imaging)'];

interface FormData {
  patientId: string;
  doctorId: string;
  testName: string;
  testType: string;
  urgency: 'normal' | 'urgent' | 'critical';
  sampleType: string;
  requestDate: string;
  notes: string;
}

const initialForm: FormData = {
  patientId: '',
  doctorId: '',
  testName: '',
  testType: '',
  urgency: 'normal',
  sampleType: '',
  requestDate: new Date().toISOString().split('T')[0],
  notes: '',
};

export default function Laboratory() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [labTests, setLabTests] = useState<LabTest[]>(initialLabTests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const { success, error: showError } = useToast();

  const filtered = useMemo(() => {
    return labTests.filter((test) => {
      const matchSearch = test.patientName.toLowerCase().includes(search.toLowerCase()) ||
        test.testName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || test.status === statusFilter;
      const matchUrgency = urgencyFilter === 'all' || test.urgency === urgencyFilter;
      return matchSearch && matchStatus && matchUrgency;
    });
  }, [search, statusFilter, urgencyFilter, labTests]);

  const { currentPage, pageSize, totalPages, paginatedRange, goToPage, changePageSize } = usePagination({
    totalItems: filtered.length,
    initialPageSize: 12,
  });

  const paginatedTests = filtered.slice(paginatedRange.start, paginatedRange.end);

  const stats = useMemo(() => ({
    total: labTests.length,
    pending: labTests.filter(t => t.status === 'pending').length,
    inProgress: labTests.filter(t => t.status === 'in_progress').length,
    completed: labTests.filter(t => t.status === 'completed').length,
    critical: labTests.filter(t => t.urgency === 'critical').length,
  }), [labTests]);

  // Form handlers
  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.patientId) newErrors.patientId = 'Patient is required';
    if (!form.doctorId) newErrors.doctorId = 'Requesting doctor is required';
    if (!form.testName) newErrors.testName = 'Test name is required';
    if (!form.testType) newErrors.testType = 'Test category is required';
    if (!form.sampleType) newErrors.sampleType = 'Sample type is required';
    if (!form.requestDate) newErrors.requestDate = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showError('Validation Error', 'Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));

    const selectedPatient = patients.find(p => p.id === form.patientId);
    const selectedDoctor = doctors.find(d => d.id === form.doctorId);

    const newTest: LabTest = {
      id: `lab-${Date.now()}`,
      patientId: form.patientId,
      patientName: selectedPatient?.name || 'Unknown',
      doctorId: form.doctorId,
      doctorName: selectedDoctor?.name || 'Unknown',
      testName: form.testName,
      testType: form.testType,
      status: 'pending',
      requestDate: form.requestDate,
      urgency: form.urgency,
    };

    setLabTests(prev => [newTest, ...prev]);
    setSubmitting(false);
    setIsModalOpen(false);
    setForm(initialForm);
    setErrors({});
    success('Test Requested', `${form.testName} for ${selectedPatient?.name} has been submitted successfully.`);
  };

  const handleCloseModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laboratory"
        subtitle={`${labTests.length} test records · ${stats.critical} critical urgency`}
        breadcrumb={['Dashboard', 'Laboratory']}
        actions={
          <button onClick={() => setIsModalOpen(true)} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Test Request</span>
          </button>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Tests', value: stats.total, icon: FlaskConical, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-950/40' },
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-950/40' },
          { label: 'In Progress', value: stats.inProgress, icon: FlaskConical, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40' },
          { label: 'Completed', value: stats.completed, icon: FileText, color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10' },
          { label: 'Critical', value: stats.critical, icon: AlertCircle, color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-950/40' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput value={search} onChange={(v) => { setSearch(v); goToPage(1); }} placeholder="Search by patient or test name..." className="flex-1" />
          <div className="flex gap-3">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); goToPage(1); }} className="input-field w-auto text-sm" aria-label="Status filter">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select value={urgencyFilter} onChange={(e) => { setUrgencyFilter(e.target.value); goToPage(1); }} className="input-field w-auto text-sm" aria-label="Urgency filter">
              <option value="all">All Urgency</option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                <th className="table-header">Test Name</th>
                <th className="table-header">Patient</th>
                <th className="table-header hidden lg:table-cell">Requested By</th>
                <th className="table-header hidden md:table-cell">Type</th>
                <th className="table-header">Urgency</th>
                <th className="table-header">Status</th>
                <th className="table-header hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTests.map((test) => (
                <tr key={test.id} className="table-row">
                  <td className="table-cell">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{test.testName}</p>
                  </td>
                  <td className="table-cell text-sm text-gray-700 dark:text-gray-300">{test.patientName}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400 hidden lg:table-cell">{test.doctorName}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">{test.testType}</td>
                  <td className="table-cell">
                    <StatusBadge status={test.urgency === 'critical' ? 'critical' : test.urgency === 'urgent' ? 'pending' : 'active'} />
                  </td>
                  <td className="table-cell"><StatusBadge status={test.status} /></td>
                  <td className="table-cell text-sm text-gray-500 hidden sm:table-cell">{test.requestDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={goToPage} onPageSizeChange={changePageSize} />
      </motion.div>

      {/* ─── New Test Request Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              onClick={handleCloseModal}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-dark-800 rounded-2xl shadow-elevated border border-gray-200/80 dark:border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40">
                      <FlaskConical className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-white">New Test Request</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Submit a laboratory test order</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Patient */}
                    <div>
                      <label htmlFor="patient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Patient <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="patient"
                        value={form.patientId}
                        onChange={(e) => updateField('patientId', e.target.value)}
                        className={`input-field ${errors.patientId ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      >
                        <option value="">Select patient...</option>
                        {patients.slice(0, 50).map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                        ))}
                      </select>
                      {errors.patientId && <p className="text-xs text-danger-500 mt-1">{errors.patientId}</p>}
                    </div>

                    {/* Doctor */}
                    <div>
                      <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Requesting Doctor <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="doctor"
                        value={form.doctorId}
                        onChange={(e) => updateField('doctorId', e.target.value)}
                        className={`input-field ${errors.doctorId ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      >
                        <option value="">Select doctor...</option>
                        {doctors.slice(0, 30).map(d => (
                          <option key={d.id} value={d.id}>{d.name} — {d.department}</option>
                        ))}
                      </select>
                      {errors.doctorId && <p className="text-xs text-danger-500 mt-1">{errors.doctorId}</p>}
                    </div>

                    {/* Test Name */}
                    <div>
                      <label htmlFor="testName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Test Name <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="testName"
                        value={form.testName}
                        onChange={(e) => updateField('testName', e.target.value)}
                        className={`input-field ${errors.testName ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      >
                        <option value="">Select test...</option>
                        {TEST_NAMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.testName && <p className="text-xs text-danger-500 mt-1">{errors.testName}</p>}
                    </div>

                    {/* Test Category */}
                    <div>
                      <label htmlFor="testType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Test Category <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="testType"
                        value={form.testType}
                        onChange={(e) => updateField('testType', e.target.value)}
                        className={`input-field ${errors.testType ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      >
                        <option value="">Select category...</option>
                        {TEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.testType && <p className="text-xs text-danger-500 mt-1">{errors.testType}</p>}
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority <span className="text-danger-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {(['normal', 'urgent', 'critical'] as const).map(level => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => updateField('urgency', level)}
                            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                              form.urgency === level
                                ? level === 'critical'
                                  ? 'bg-danger-50 dark:bg-danger-500/10 border-danger-300 dark:border-danger-700 text-danger-700 dark:text-danger-400 ring-1 ring-danger-500/20'
                                  : level === 'urgent'
                                    ? 'bg-warning-50 dark:bg-warning-500/10 border-warning-300 dark:border-warning-700 text-warning-700 dark:text-warning-400 ring-1 ring-warning-500/20'
                                    : 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-400 ring-1 ring-primary-500/20'
                                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-dark-700'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sample Type */}
                    <div>
                      <label htmlFor="sampleType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sample Type <span className="text-danger-500">*</span>
                      </label>
                      <select
                        id="sampleType"
                        value={form.sampleType}
                        onChange={(e) => updateField('sampleType', e.target.value)}
                        className={`input-field ${errors.sampleType ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      >
                        <option value="">Select sample type...</option>
                        {SAMPLE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.sampleType && <p className="text-xs text-danger-500 mt-1">{errors.sampleType}</p>}
                    </div>

                    {/* Request Date */}
                    <div>
                      <label htmlFor="requestDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Requested Date <span className="text-danger-500">*</span>
                      </label>
                      <input
                        id="requestDate"
                        type="date"
                        value={form.requestDate}
                        onChange={(e) => updateField('requestDate', e.target.value)}
                        className={`input-field ${errors.requestDate ? 'border-danger-400 dark:border-danger-600 ring-1 ring-danger-500/20' : ''}`}
                      />
                      {errors.requestDate && <p className="text-xs text-danger-500 mt-1">{errors.requestDate}</p>}
                    </div>

                    {/* Notes - Full width */}
                    <div className="md:col-span-2">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Clinical Notes <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="notes"
                        value={form.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        rows={3}
                        className="input-field resize-none"
                        placeholder="Additional instructions or clinical context..."
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-dark-850 border-t border-gray-100 dark:border-gray-700/50 flex-shrink-0">
                  <button
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary gap-2 min-w-[140px]"
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FlaskConical className="w-4 h-4" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

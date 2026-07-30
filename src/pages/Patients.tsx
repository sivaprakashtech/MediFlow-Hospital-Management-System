import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Eye, Edit, Trash2, Phone, Mail, ArrowUpDown } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { TableSkeleton } from '../components/ui/LoadingSkeleton';
import { useToast } from '../components/ui/Toast';
import { useService } from '../hooks/useService';
import { patientService } from '../services';
import { Patient } from '../types';
import { PaginatedResponse } from '../services/types';

type SortField = 'name' | 'registeredDate' | 'status';
type SortDir = 'asc' | 'desc';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { success } = useToast();

  // Consume service instead of raw data
  const fetchPatients = useCallback(
    () => patientService.getAll({
      page,
      limit: pageSize,
      search: search || undefined,
      sortBy: sortField,
      sortOrder: sortDir,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      gender: genderFilter !== 'all' ? genderFilter : undefined,
    }),
    [page, pageSize, search, sortField, sortDir, statusFilter, genderFilter]
  );

  const { data: response, loading, refetch } = useService<PaginatedResponse<Patient>>(fetchPatients, [fetchPatients]);

  const paginatedPatients = response?.data || [];
  const totalItems = response?.meta.total || 0;
  const totalPages = response?.meta.totalPages || 1;

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleDelete = async () => {
    await patientService.delete(deleteTarget || '');
    success('Patient Removed', 'Patient record has been archived successfully.');
    setDeleteTarget(null);
    refetch();
  };

  const handleExport = () => {
    success('Export Started', `Exporting ${totalItems} patient records as CSV.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Management"
        subtitle={`${totalItems.toLocaleString()} total patients${loading ? ' · Loading...' : ''}`}
        breadcrumb={['Dashboard', 'Patients']}
        actions={
          <button onClick={() => success('Registration', 'Patient registration form opened.')} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Register Patient</span>
          </button>
        }
      />

      {/* Filters Bar */}
      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email, or ID..."
            className="flex-1"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="input-field w-auto"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="discharged">Discharged</option>
              <option value="critical">Critical</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => { setGenderFilter(e.target.value); setPage(1); }}
              className="input-field w-auto"
              aria-label="Filter by gender"
            >
              <option value="all">All Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button onClick={handleExport} className="btn-secondary gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={pageSize} />
      ) : (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                <th className="table-header">
                  <button onClick={() => toggleSort('name')} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Patient <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="table-header">Contact</th>
                <th className="table-header">Blood</th>
                <th className="table-header">Gender</th>
                <th className="table-header">
                  <button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Status <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="table-header">
                  <button onClick={() => toggleSort('registeredDate')} className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Registered <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{patient.name}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5 truncate max-w-[200px]">
                        <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" /> {patient.email}
                      </p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 flex-shrink-0" aria-hidden="true" /> {patient.phone}
                      </p>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-md">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{patient.gender}</span>
                  </td>
                  <td className="table-cell">
                    <StatusBadge status={patient.status} />
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(patient.registeredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => success('Patient Profile', `Viewing ${patient.name}'s medical profile.`)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-primary-600 transition-colors" aria-label={`View ${patient.name}`}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => success('Edit Mode', `Editing ${patient.name}'s records.`)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-warning-600 transition-colors" aria-label={`Edit ${patient.name}`}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(patient.id)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-danger-600 transition-colors" aria-label={`Delete ${patient.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
        />
      </motion.div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Patient Record"
        message="Are you sure you want to delete this patient record? This action will archive the record and cannot be easily undone."
        confirmText="Delete Record"
        variant="danger"
      />
    </div>
  );
}

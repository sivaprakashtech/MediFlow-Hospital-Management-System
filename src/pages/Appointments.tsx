import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar as CalIcon, Clock, Stethoscope } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import { useToast } from '../components/ui/Toast';
import { usePagination } from '../hooks/usePagination';
import { appointments as allAppointments } from '../data';

export default function Appointments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { success } = useToast();

  const filtered = useMemo(() => {
    return allAppointments.filter((apt) => {
      const matchSearch = apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        apt.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchType = typeFilter === 'all' || apt.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [search, statusFilter, typeFilter]);

  const { currentPage, pageSize, totalPages, paginatedRange, goToPage, changePageSize } = usePagination({
    totalItems: filtered.length,
    initialPageSize: 15,
  });

  const paginatedApts = filtered.slice(paginatedRange.start, paginatedRange.end);

  const stats = useMemo(() => ({
    total: allAppointments.length,
    scheduled: allAppointments.filter(a => a.status === 'scheduled').length,
    inProgress: allAppointments.filter(a => a.status === 'in_progress').length,
    completed: allAppointments.filter(a => a.status === 'completed').length,
    cancelled: allAppointments.filter(a => a.status === 'cancelled').length,
  }), []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle={`${allAppointments.length.toLocaleString()} total appointments`}
        breadcrumb={['Dashboard', 'Appointments']}
        actions={
          <button onClick={() => success('Booking', 'Appointment booking form opened.')} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Book Appointment</span>
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Scheduled', value: stats.scheduled, color: 'text-primary-600 dark:text-primary-400' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-warning-600 dark:text-warning-400' },
          { label: 'Completed', value: stats.completed, color: 'text-success-600 dark:text-success-400' },
          { label: 'Cancelled', value: stats.cancelled, color: 'text-danger-600 dark:text-danger-400' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            value={search}
            onChange={(v) => { setSearch(v); goToPage(1); }}
            placeholder="Search by patient, doctor, or ID..."
            className="flex-1"
          />
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); goToPage(1); }}
              className="input-field w-auto text-sm"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no_show">No Show</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); goToPage(1); }}
              className="input-field w-auto text-sm"
              aria-label="Filter by type"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="follow_up">Follow Up</option>
              <option value="emergency">Emergency</option>
              <option value="routine_checkup">Routine Checkup</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointment List */}
      <div className="card overflow-hidden">
        <div className="divide-y divide-gray-100/80 dark:divide-gray-700/40">
          {paginatedApts.map((apt) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-gray-50/60 dark:hover:bg-dark-700/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center flex-shrink-0">
                  <CalIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{apt.patientName}</h4>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Stethoscope className="w-3 h-3" aria-hidden="true" /> {apt.doctorName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalIcon className="w-3 h-3" aria-hidden="true" /> {apt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" aria-hidden="true" /> {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:ml-auto pl-15 sm:pl-0">
                <span className="badge badge-neutral capitalize text-[10px]">{apt.type.replace('_', ' ')}</span>
                <span className="text-xs text-gray-400 font-medium">{apt.duration}min</span>
                <button onClick={() => success('Details', `Viewing appointment ${apt.id} for ${apt.patientName}.`)} className="btn-secondary text-xs py-2 px-3">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />
      </div>
    </div>
  );
}

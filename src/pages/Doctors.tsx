import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Clock, Users, MapPin } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import StatusBadge from '../components/ui/StatusBadge';
import { useToast } from '../components/ui/Toast';
import { doctors as allDoctors } from '../data';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } };

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departments = useMemo(() => [...new Set(allDoctors.map(d => d.department))].sort(), []);
  const { success } = useToast();

  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((doc) => {
      const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(search.toLowerCase());
      const matchDept = deptFilter === 'all' || doc.department === deptFilter;
      const matchStatus = statusFilter === 'all' || doc.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [search, deptFilter, statusFilter]);

  // Show first 24 for performance
  const displayDoctors = filteredDoctors.slice(0, 24);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor Directory"
        subtitle={`${allDoctors.length} specialists across ${departments.length} departments`}
        breadcrumb={['Dashboard', 'Doctors']}
        actions={
          <button onClick={() => success('Coming Soon', 'Doctor registration will be available in the next release.')} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Doctor</span>
          </button>
        }
      />

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or specialization..."
            className="flex-1"
          />
          <div className="flex gap-3">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="input-field w-auto text-sm"
              aria-label="Filter by department"
            >
              <option value="all">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field w-auto text-sm"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in_consultation">In Consultation</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
        </div>
        {filteredDoctors.length !== allDoctors.length && (
          <p className="text-xs text-gray-500 mt-3">
            Showing {displayDoctors.length} of {filteredDoctors.length} results
          </p>
        )}
      </div>

      {/* Doctor Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        {displayDoctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            variants={item}
            className="card card-hover p-6 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-primary-500/20">
                  {doctor.name.split(' ').slice(1).map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{doctor.specialization}</p>
                </div>
              </div>
              <StatusBadge status={doctor.status} variant="dot" />
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" /> Rating
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">{doctor.rating}/5.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Experience
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{doctor.experience} yrs</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" /> Patients
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{doctor.patientsHandled.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Dept
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{doctor.department}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900 dark:text-white">${doctor.consultationFee}</span>
                <span className="text-xs text-gray-400 ml-1">/ visit</span>
              </div>
              <button onClick={() => success('Profile Loaded', `Viewing ${doctor.name}'s complete profile.`)} className="btn-primary text-xs py-2 px-4">View Profile</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

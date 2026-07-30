import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Mail, Phone, Calendar, Eye, Edit, MoreVertical } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import SearchInput from '../components/ui/SearchInput';
import { useToast } from '../components/ui/Toast';
import { mockUsers } from '../data';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } };

export default function StaffManagement() {
  const [search, setSearch] = useState('');
  const { success } = useToast();

  const filteredStaff = mockUsers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase()) ||
    (s.department || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        subtitle={`${mockUsers.length} team members across all departments`}
        breadcrumb={['Dashboard', 'Staff']}
        actions={
          <button onClick={() => success('Coming Soon', 'Staff registration form will be available in the next release.')} className="btn-primary gap-2">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        }
      />

      <div className="card p-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, role, or department..." className="max-w-md" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredStaff.map((staff) => (
          <motion.div
            key={staff.id}
            variants={item}
            className="card card-hover p-5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-primary-500/20">
                  {staff.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{staff.name}</h4>
                  <p className="text-xs text-primary-600 dark:text-primary-400 font-medium capitalize">{staff.role.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => success('Profile Viewed', `Viewing ${staff.name}'s profile details.`)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-primary-600 transition-colors"
                  aria-label={`View ${staff.name}`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => success('Edit Mode', `Editing ${staff.name}'s information.`)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-warning-600 transition-colors"
                  aria-label={`Edit ${staff.name}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">{staff.email}</span>
              </div>
              {staff.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  <span>{staff.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                <span>Joined {new Date(staff.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded-md">{staff.department || 'General'}</span>
              <span className="flex items-center gap-1.5 text-[11px] text-success-600">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500" />Active
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

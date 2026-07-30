import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Pill, AlertCircle, CheckCircle2, Clock, User } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import { useToast } from '../components/ui/Toast';
import { mockNurseTasks, mockMedicationSchedule } from '../data/nurse';
import clsx from 'clsx';

export default function NurseStation() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'medications'>('tasks');
  const [administered, setAdministered] = useState<Set<string>>(new Set());
  const { success, info } = useToast();

  const handleAdminister = (id: string, patientName: string, medication: string) => {
    setAdministered(prev => new Set(prev).add(id));
    success('Medication Administered', `${medication} administered to ${patientName}.`);
  };

  const priorityColor = {
    critical: 'border-l-danger-500 bg-danger-50/50 dark:bg-danger-500/5',
    high: 'border-l-warning-500 bg-warning-50/50 dark:bg-warning-500/5',
    medium: 'border-l-primary-500 bg-primary-50/50 dark:bg-primary-500/5',
    low: 'border-l-gray-300 dark:border-l-gray-600 bg-gray-50/50 dark:bg-gray-900/20',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nurse Station"
        subtitle="Manage daily tasks and medication schedules"
        breadcrumb={['Dashboard', 'Nurse Station']}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-danger-50 dark:bg-danger-500/10">
              <AlertCircle className="w-4 h-4 text-danger-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockNurseTasks.filter(t => t.priority === 'critical').length}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">Critical Tasks</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warning-50 dark:bg-warning-500/10">
              <Clock className="w-4 h-4 text-warning-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockNurseTasks.filter(t => t.status === 'pending').length}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">Pending</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success-50 dark:bg-success-500/10">
              <CheckCircle2 className="w-4 h-4 text-success-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockNurseTasks.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">Completed</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40">
              <Pill className="w-4 h-4 text-primary-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {mockMedicationSchedule.filter(m => !m.administered && !administered.has(m.id)).length}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">Pending Meds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-dark-800 rounded-xl w-fit" role="tablist">
        <button
          onClick={() => setActiveTab('tasks')}
          className={clsx('px-4 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'tasks' ? 'bg-white dark:bg-dark-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700')}
          role="tab"
          aria-selected={activeTab === 'tasks'}
        >
          <ClipboardList className="w-4 h-4 inline mr-2" aria-hidden="true" />Daily Tasks
        </button>
        <button
          onClick={() => setActiveTab('medications')}
          className={clsx('px-4 py-2 rounded-lg text-sm font-medium transition-all', activeTab === 'medications' ? 'bg-white dark:bg-dark-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700')}
          role="tab"
          aria-selected={activeTab === 'medications'}
        >
          <Pill className="w-4 h-4 inline mr-2" aria-hidden="true" />Medication Schedule
        </button>
      </div>

      {/* Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-3" role="tabpanel">
          {mockNurseTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              className={clsx('card p-4 border-l-4', priorityColor[task.priority])}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{task.task}</h4>
                    <p className="text-xs text-gray-500">{task.patientName} • {task.ward}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-13 sm:ml-0">
                  <span className="text-xs text-gray-400">
                    {new Date(task.dueTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                  <StatusBadge status={task.status} />
                  {task.status === 'pending' && (
                    <button
                      onClick={() => { info('Task Started', `Starting: ${task.task} for ${task.patientName}`); }}
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Medication Schedule */}
      {activeTab === 'medications' && (
        <div className="card overflow-hidden" role="tabpanel">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                  <th className="table-header">Patient</th>
                  <th className="table-header">Medication</th>
                  <th className="table-header hidden md:table-cell">Dosage</th>
                  <th className="table-header">Time</th>
                  <th className="table-header hidden sm:table-cell">Ward/Bed</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockMedicationSchedule.map((med) => {
                  const isAdministered = med.administered || administered.has(med.id);
                  return (
                    <tr key={med.id} className="table-row">
                      <td className="table-cell text-sm font-medium text-gray-900 dark:text-white">{med.patientName}</td>
                      <td className="table-cell text-sm text-gray-600 dark:text-gray-300">{med.medication}</td>
                      <td className="table-cell text-sm text-gray-600 dark:text-gray-300 hidden md:table-cell">{med.dosage}</td>
                      <td className="table-cell text-sm text-gray-600 dark:text-gray-300">{med.time}</td>
                      <td className="table-cell text-sm text-gray-600 dark:text-gray-300 hidden sm:table-cell">{med.ward} / {med.bed}</td>
                      <td className="table-cell">
                        {isAdministered ? (
                          <span className="badge badge-success">Administered</span>
                        ) : (
                          <button
                            onClick={() => handleAdminister(med.id, med.patientName, med.medication)}
                            className="btn-primary text-xs py-1.5 px-3"
                          >
                            Administer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

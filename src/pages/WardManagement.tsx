import { motion } from 'framer-motion';
import { BedDouble, Users, AlertCircle, CheckCircle, Plus, RefreshCw } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import { useToast } from '../components/ui/Toast';
import { mockWards, mockBeds } from '../data/wards';

export default function WardManagement() {
  const { success, info } = useToast();
  const totalBeds = mockWards.reduce((sum, w) => sum + w.totalBeds, 0);
  const occupiedBeds = mockWards.reduce((sum, w) => sum + w.occupiedBeds, 0);
  const availableBeds = mockWards.reduce((sum, w) => sum + w.availableBeds, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ward Management"
        subtitle={`${totalBeds} total beds · ${availableBeds} available · ${Math.round((occupiedBeds / totalBeds) * 100)}% occupancy`}
        breadcrumb={['Dashboard', 'Ward Management']}
        actions={
          <div className="flex gap-3">
            <button onClick={() => { info('Refreshing', 'Bed status updated from central system.'); }} className="btn-secondary gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={() => success('Allocation', 'New bed allocation form opened.')} className="btn-primary gap-2">
              <Plus className="w-4 h-4" /> Allocate Bed
            </button>
          </div>
        }
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40">
              <BedDouble className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{totalBeds}</p>
              <p className="text-[11px] text-gray-500 font-medium">Total Beds</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40">
              <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{occupiedBeds}</p>
              <p className="text-[11px] text-gray-500 font-medium">Occupied</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-success-50 dark:bg-success-500/10">
              <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{availableBeds}</p>
              <p className="text-[11px] text-gray-500 font-medium">Available</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warning-50 dark:bg-warning-500/10">
              <AlertCircle className="w-5 h-5 text-warning-600 dark:text-warning-400" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.round((occupiedBeds / totalBeds) * 100)}%</p>
              <p className="text-[11px] text-gray-500 font-medium">Occupancy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockWards.map((ward, index) => {
          const occupancyPercent = Math.round((ward.occupiedBeds / ward.totalBeds) * 100);
          return (
            <motion.div
              key={ward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="card card-hover p-5 cursor-pointer"
              onClick={() => info('Ward Details', `Viewing ${ward.name} — Floor ${ward.floor}`)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{ward.name}</h3>
                <span className="text-[10px] uppercase font-semibold text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-0.5 rounded-md">
                  F{ward.floor}
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Occupancy</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{occupancyPercent}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancyPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-2 rounded-full ${
                      occupancyPercent > 90 ? 'bg-danger-500' : occupancyPercent > 70 ? 'bg-warning-500' : 'bg-primary-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-400">{ward.occupiedBeds}/{ward.totalBeds} beds</span>
                  <span className="text-success-600 font-semibold">{ward.availableBeds} free</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bed Detail Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100/80 dark:border-gray-700/40 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">ICU & Emergency Beds</h3>
            <p className="text-xs text-gray-500 mt-0.5">Real-time bed allocation status</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-gray-100/80 dark:border-gray-700/40 bg-gray-50/50 dark:bg-dark-850/50">
                <th className="table-header">Bed #</th>
                <th className="table-header">Ward</th>
                <th className="table-header">Patient</th>
                <th className="table-header hidden sm:table-cell">Admission Date</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBeds.map((bed) => (
                <tr key={bed.id} className="table-row">
                  <td className="table-cell font-mono text-sm font-semibold text-gray-900 dark:text-white">{bed.bedNumber}</td>
                  <td className="table-cell text-sm text-gray-600 dark:text-gray-400">{bed.wardName}</td>
                  <td className="table-cell text-sm text-gray-700 dark:text-gray-300">{bed.patientName || <span className="text-gray-400">—</span>}</td>
                  <td className="table-cell text-sm text-gray-500 hidden sm:table-cell">{bed.admissionDate || '—'}</td>
                  <td className="table-cell"><StatusBadge status={bed.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

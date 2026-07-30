import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Shield, Stethoscope, Heart, Users, FlaskConical, Pill, DollarSign, User, RotateCcw, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { useToast } from './Toast';
import clsx from 'clsx';

const roles: { role: UserRole; label: string; icon: typeof Shield; color: string; desc: string }[] = [
  { role: 'super_admin', label: 'Super Admin', icon: Shield, color: 'from-indigo-500 to-purple-600', desc: 'Full system access' },
  { role: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'from-blue-500 to-cyan-600', desc: 'Clinical workflows' },
  { role: 'nurse', label: 'Nurse', icon: Heart, color: 'from-pink-500 to-rose-600', desc: 'Ward management' },
  { role: 'receptionist', label: 'Receptionist', icon: Users, color: 'from-emerald-500 to-teal-600', desc: 'Front desk ops' },
  { role: 'lab_technician', label: 'Lab Technician', icon: FlaskConical, color: 'from-amber-500 to-orange-600', desc: 'Test management' },
  { role: 'pharmacist', label: 'Pharmacist', icon: Pill, color: 'from-violet-500 to-purple-600', desc: 'Inventory control' },
  { role: 'accountant', label: 'Accountant', icon: DollarSign, color: 'from-green-500 to-emerald-600', desc: 'Financial reports' },
  { role: 'patient', label: 'Patient', icon: User, color: 'from-sky-500 to-blue-600', desc: 'Self-service portal' },
];

export default function DemoModePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, switchRole } = useAuth();
  const { success, info } = useToast();

  const handleSwitch = (role: UserRole, label: string) => {
    switchRole(role);
    success('Role Switched', `Now viewing as ${label}. Navigation and permissions updated.`);
  };

  const handleReset = () => {
    switchRole('super_admin');
    info('Demo Reset', 'All data restored to default state.');
  };

  const currentRole = roles.find(r => r.role === user?.role);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[80] flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-violet-600 text-white text-sm font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:scale-105 active:scale-95"
        whileHover={{ y: -2 }}
        aria-label="Open demo mode panel"
      >
        <Play className="w-4 h-4" />
        <span className="hidden sm:inline">Demo Mode</span>
        {currentRole && (
          <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-md text-[10px] font-bold">
            {currentRole.label}
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[81]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark-900 shadow-2xl z-[82] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">Demo Mode</h2>
                    <p className="text-[11px] text-gray-500">Switch roles to explore features</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Current Role */}
              {currentRole && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-dark-800/50 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Active Role</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${currentRole.color} flex items-center justify-center shadow-sm`}>
                      <currentRole.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{currentRole.label}</p>
                      <p className="text-[11px] text-gray-500">{currentRole.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Role Grid */}
              <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Switch Role</p>
                <div className="space-y-2">
                  {roles.map(({ role, label, icon: Icon, color, desc }) => (
                    <button
                      key={role}
                      onClick={() => handleSwitch(role, label)}
                      className={clsx(
                        'w-full flex items-center gap-3.5 p-3.5 rounded-xl border transition-all active:scale-[0.98]',
                        user?.role === role
                          ? 'bg-primary-50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800 ring-1 ring-primary-500/20'
                          : 'border-gray-200/80 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-dark-800 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className={clsx('text-sm font-medium', user?.role === role ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white')}>{label}</p>
                        <p className="text-[11px] text-gray-500">{desc}</p>
                      </div>
                      {user?.role === role && (
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-800 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Demo Data
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-3">⌘K for quick navigation</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

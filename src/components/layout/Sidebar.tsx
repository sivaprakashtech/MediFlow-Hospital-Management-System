import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, UserCog, Calendar, CalendarDays, Stethoscope,
  FlaskConical, Pill, Receipt, BedDouble, FileBarChart,
  Bell, Settings, LogOut, X, ClipboardList,
  Heart, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['super_admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician', 'accountant', 'patient'] },
  { label: 'Patients', path: '/patients', icon: Users, roles: ['super_admin', 'doctor', 'nurse', 'receptionist'] },
  { label: 'Doctors', path: '/doctors', icon: Stethoscope, roles: ['super_admin', 'receptionist', 'patient'] },
  { label: 'Appointments', path: '/appointments', icon: Calendar, roles: ['super_admin', 'doctor', 'nurse', 'receptionist', 'patient'], badge: 5 },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays, roles: ['super_admin', 'doctor', 'nurse', 'receptionist'] },
  { label: 'Nurse Station', path: '/nurse', icon: ClipboardList, roles: ['super_admin', 'nurse'] },
  { label: 'Laboratory', path: '/laboratory', icon: FlaskConical, roles: ['super_admin', 'doctor', 'lab_technician'] },
  { label: 'Pharmacy', path: '/pharmacy', icon: Pill, roles: ['super_admin', 'pharmacist', 'doctor'] },
  { label: 'Billing', path: '/billing', icon: Receipt, roles: ['super_admin', 'accountant', 'receptionist', 'patient'] },
  { label: 'Ward Management', path: '/ward-management', icon: BedDouble, roles: ['super_admin', 'nurse', 'receptionist'] },
  { label: 'Reports', path: '/reports', icon: FileBarChart, roles: ['super_admin', 'accountant'] },
  { label: 'Staff Management', path: '/staff', icon: UserCog, roles: ['super_admin'] },
  { label: 'Notifications', path: '/notifications', icon: Bell, roles: ['super_admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician', 'accountant', 'patient'] },
  { label: 'Settings', path: '/settings', icon: Settings, roles: ['super_admin', 'doctor', 'nurse', 'receptionist', 'pharmacist', 'lab_technician', 'accountant', 'patient'] },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-50 h-full w-[var(--sidebar-width)] bg-white dark:bg-dark-900 border-r border-gray-200/80 dark:border-gray-800/60 transition-transform duration-300 ease-spring lg:translate-x-0 lg:static lg:z-0 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 dark:border-gray-800/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm shadow-primary-500/30">
              <Heart className="w-4.5 h-4.5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">MedFlow</h1>
              <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-[0.15em]">Enterprise HMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin" aria-label="Sidebar navigation">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={clsx(
                  'sidebar-item group',
                  isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary-50 dark:bg-primary-950/40 rounded-xl border border-primary-100/60 dark:border-primary-900/40"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] relative z-10 flex-shrink-0" aria-hidden="true" />
                <span className="relative z-10 flex-1">{item.label}</span>
                {item.badge && (
                  <span className="relative z-10 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-primary-600 text-white text-[9px] font-bold rounded-md">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 relative z-10 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800/60 flex-shrink-0">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700/60 transition-colors group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-primary-500/30">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-400 hover:text-danger-500 transition-all"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

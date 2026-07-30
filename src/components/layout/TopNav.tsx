import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Sun, Moon, Search, X, Command } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface TopNavProps {
  onMenuClick: () => void;
}

const roleLabels: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  doctor: 'Doctor',
  nurse: 'Nurse',
  receptionist: 'Receptionist',
  pharmacist: 'Pharmacist',
  lab_technician: 'Lab Technician',
  accountant: 'Accountant',
  patient: 'Patient',
};

export default function TopNav({ onMenuClick }: TopNavProps) {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, notifications, markAsRead } = useNotifications();
  const { user, switchRole } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 glass-nav" role="banner">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-72 lg:w-80 pl-10 pr-20 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200/80 dark:border-gray-700/60 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
              aria-label="Search patients, doctors, appointments"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-gray-600 rounded-md">
                <Command className="w-2.5 h-2.5" aria-hidden="true" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Mobile search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 md:hidden transition-colors"
            aria-label="Toggle search"
          >
            {searchOpen ? <X className="w-5 h-5 text-gray-600" /> : <Search className="w-5 h-5 text-gray-600" />}
          </button>

          {/* Role Switcher (Demo) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-200/80 dark:border-gray-700/60 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
              aria-expanded={showRoleSwitcher}
              aria-haspopup="listbox"
              aria-label="Switch user role"
            >
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" aria-hidden="true" />
              {user ? roleLabels[user.role] : 'Role'}
            </button>
            <AnimatePresence>
              {showRoleSwitcher && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRoleSwitcher(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-dark-800 border border-gray-200/80 dark:border-gray-700/60 rounded-2xl shadow-elevated py-2 z-50"
                    role="listbox"
                  >
                    <p className="px-4 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Switch Role (Demo)</p>
                    {Object.entries(roleLabels).map(([role, label]) => (
                      <button
                        key={role}
                        onClick={() => {
                          switchRole(role as UserRole);
                          setShowRoleSwitcher(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          user?.role === role
                            ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50/60 dark:bg-primary-900/20'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                        }`}
                        role="option"
                        aria-selected={user?.role === role}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-400 hover:text-amber-500 transition-colors" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 hover:text-primary-600 transition-colors" />
              )}
            </motion.div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label={`Notifications. ${unreadCount} unread`}
              aria-expanded={showNotifications}
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-danger-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-dark-900"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-[340px] bg-white dark:bg-dark-800 border border-gray-200/80 dark:border-gray-700/60 rounded-2xl shadow-elevated z-50 overflow-hidden"
                    role="dialog"
                    aria-label="Notifications"
                  >
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h3>
                      <span className="text-[11px] font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-md">{unreadCount} new</span>
                    </div>
                    <div className="overflow-y-auto max-h-80 scrollbar-thin divide-y divide-gray-50 dark:divide-gray-700/40">
                      {notifications.slice(0, 5).map((notif) => (
                        <button
                          key={notif.id}
                          onClick={() => markAsRead(notif.id)}
                          className={`w-full px-5 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors ${
                            !notif.read ? 'bg-primary-50/40 dark:bg-primary-900/10' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 flex-shrink-0" aria-hidden="true" />
                            )}
                            <div className={!notif.read ? '' : 'pl-5'}>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-gray-400 mt-1">
                                {new Date(notif.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700/60">
                      <button className="w-full text-center text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold ml-1 shadow-sm shadow-primary-500/30 cursor-pointer hover:shadow-md transition-shadow">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-800/60 px-4 py-3"
          >
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                autoFocus
                aria-label="Search"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

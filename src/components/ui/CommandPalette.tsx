import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, Users, Stethoscope, Calendar, FlaskConical, Pill, Receipt, BedDouble, FileBarChart, Settings, Bell, ClipboardList, UserCog, Brain, Zap, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: typeof Search;
  action: () => void;
  category: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands: CommandItem[] = useMemo(() => [
    { id: 'dashboard', label: 'Go to Dashboard', description: 'Executive overview', icon: LayoutDashboard, action: () => navigate('/dashboard'), category: 'Navigation' },
    { id: 'patients', label: 'Patient Management', description: 'View all patients', icon: Users, action: () => navigate('/patients'), category: 'Navigation' },
    { id: 'doctors', label: 'Doctor Directory', description: 'Browse specialists', icon: Stethoscope, action: () => navigate('/doctors'), category: 'Navigation' },
    { id: 'appointments', label: 'Appointments', description: 'Schedule & manage', icon: Calendar, action: () => navigate('/appointments'), category: 'Navigation' },
    { id: 'nurse', label: 'Nurse Station', description: 'Tasks & medications', icon: ClipboardList, action: () => navigate('/nurse'), category: 'Navigation' },
    { id: 'laboratory', label: 'Laboratory', description: 'Test results & requests', icon: FlaskConical, action: () => navigate('/laboratory'), category: 'Navigation' },
    { id: 'pharmacy', label: 'Pharmacy', description: 'Inventory management', icon: Pill, action: () => navigate('/pharmacy'), category: 'Navigation' },
    { id: 'billing', label: 'Billing & Finance', description: 'Invoices & payments', icon: Receipt, action: () => navigate('/billing'), category: 'Navigation' },
    { id: 'wards', label: 'Ward Management', description: 'Bed occupancy', icon: BedDouble, action: () => navigate('/ward-management'), category: 'Navigation' },
    { id: 'reports', label: 'Reports & Analytics', description: 'Performance metrics', icon: FileBarChart, action: () => navigate('/reports'), category: 'Navigation' },
    { id: 'staff', label: 'Staff Management', description: 'Team & roles', icon: UserCog, action: () => navigate('/staff'), category: 'Navigation' },
    { id: 'notifications', label: 'Notifications', description: 'Alerts & messages', icon: Bell, action: () => navigate('/notifications'), category: 'Navigation' },
    { id: 'settings', label: 'Settings', description: 'Preferences', icon: Settings, action: () => navigate('/settings'), category: 'Navigation' },
    { id: 'ai-insights', label: 'AI Health Insights', description: 'Predictive analytics', icon: Brain, action: () => navigate('/dashboard'), category: 'AI Features' },
    { id: 'ai-risk', label: 'AI Risk Assessment', description: 'Patient risk scores', icon: Zap, action: () => navigate('/patients'), category: 'AI Features' },
  ], [navigate]);

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(c => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [query, commands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && filtered[selectedIndex]) { filtered[selectedIndex].action(); setIsOpen(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-white dark:bg-dark-800 rounded-2xl shadow-elevated border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 border-b border-gray-100 dark:border-gray-700/50">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyNav}
                  placeholder="Search commands, pages, features..."
                  className="flex-1 py-4 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none"
                  aria-label="Search commands"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-dark-700 border border-gray-200 dark:border-gray-600 rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto scrollbar-thin py-2">
                {filtered.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm text-gray-500">No results found for "{query}"</p>
                  </div>
                ) : (
                  <>
                    {['Navigation', 'AI Features'].map(category => {
                      const items = filtered.filter(c => c.category === category);
                      if (items.length === 0) return null;
                      return (
                        <div key={category}>
                          <p className="px-5 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{category}</p>
                          {items.map((cmd) => {
                            const globalIdx = filtered.indexOf(cmd);
                            return (
                              <button
                                key={cmd.id}
                                onClick={() => { cmd.action(); setIsOpen(false); }}
                                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                  globalIdx === selectedIndex ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
                                }`}
                              >
                                <cmd.icon className="w-4 h-4 flex-shrink-0 opacity-60" aria-hidden="true" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{cmd.label}</p>
                                  {cmd.description && <p className="text-[11px] opacity-60 truncate">{cmd.description}</p>}
                                </div>
                                {globalIdx === selectedIndex && (
                                  <span className="text-[10px] text-primary-500 font-medium">↵</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-dark-850/50">
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded">↑↓</kbd> Navigate</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded">↵</kbd> Select</span>
                  <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-700 rounded">Esc</kbd> Close</span>
                </div>
                <span className="text-[10px] text-gray-400">{filtered.length} results</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

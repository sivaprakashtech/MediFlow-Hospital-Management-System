import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useToast } from '../components/ui/Toast';
import { appointments } from '../data';
import clsx from 'clsx';

type ViewMode = 'day' | 'week' | 'month';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7AM - 6PM
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const statusColors: Record<string, string> = {
  scheduled: 'bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-800 dark:text-primary-300',
  in_progress: 'bg-warning-100 dark:bg-warning-900/30 border-warning-300 dark:border-warning-700 text-warning-800 dark:text-warning-300',
  completed: 'bg-success-100 dark:bg-success-900/30 border-success-300 dark:border-success-700 text-success-800 dark:text-success-300',
  cancelled: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 line-through',
  emergency: 'bg-danger-100 dark:bg-danger-900/30 border-danger-300 dark:border-danger-700 text-danger-800 dark:text-danger-300',
};

export default function CalendarView() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 15)); // March 15, 2024
  const { success } = useToast();

  // Get appointments for the current week
  const weekAppointments = useMemo(() => {
    return appointments.filter(a => {
      const d = new Date(a.date);
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return d >= weekStart && d <= weekEnd;
    }).slice(0, 50); // Limit for perf
  }, [currentDate]);

  const navigateWeek = (dir: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + dir * 7);
    setCurrentDate(newDate);
  };

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDates = getWeekDates();

  // Map appointments to day/hour grid
  const getApptsForSlot = (dayIdx: number, hour: number) => {
    const date = weekDates[dayIdx];
    const dateStr = date.toISOString().split('T')[0];
    return weekAppointments.filter(a => {
      if (a.date !== dateStr) return false;
      const aptHour = parseInt(a.time.split(':')[0]);
      return aptHour === hour;
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointment Calendar"
        subtitle="Visual schedule management"
        breadcrumb={['Dashboard', 'Appointments', 'Calendar']}
      />

      {/* Controls */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigateWeek(-1)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors" aria-label="Previous week">
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white min-w-[180px] text-center">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} — {weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <button onClick={() => navigateWeek(1)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors" aria-label="Next week">
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-dark-800 rounded-xl">
            {(['day', 'week', 'month'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={clsx(
                  'px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                  viewMode === mode ? 'bg-white dark:bg-dark-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="hidden lg:flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary-400" />Scheduled</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning-400" />In Progress</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-success-400" />Completed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-danger-400" />Emergency</span>
          </div>
        </div>
      </div>

      {/* Week View Grid */}
      {viewMode === 'week' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Day Headers */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-100 dark:border-gray-700/40">
                <div className="p-3" />
                {weekDates.map((date, i) => {
                  const isToday = date.toDateString() === new Date(2024, 2, 15).toDateString();
                  return (
                    <div key={i} className={clsx('p-3 text-center border-l border-gray-100 dark:border-gray-700/40', isToday && 'bg-primary-50/50 dark:bg-primary-900/10')}>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase">{DAYS[i]}</p>
                      <p className={clsx('text-lg font-bold mt-0.5', isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white')}>{date.getDate()}</p>
                    </div>
                  );
                })}
              </div>

              {/* Time Grid */}
              <div className="relative">
                {HOURS.map(hour => (
                  <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-gray-50 dark:border-gray-800/40 min-h-[60px]">
                    <div className="p-2 text-[10px] font-medium text-gray-400 text-right pr-3 pt-1">
                      {hour > 12 ? `${hour - 12}PM` : hour === 12 ? '12PM' : `${hour}AM`}
                    </div>
                    {Array.from({ length: 7 }, (_, dayIdx) => {
                      const slotApts = getApptsForSlot(dayIdx, hour);
                      return (
                        <div key={dayIdx} className="border-l border-gray-50 dark:border-gray-800/40 p-0.5 relative min-h-[60px]">
                          {slotApts.map(apt => (
                            <button
                              key={apt.id}
                              onClick={() => success('Appointment', `${apt.patientName} — ${apt.time} with ${apt.doctorName}`)}
                              className={clsx(
                                'w-full text-left px-2 py-1 rounded-md border text-[10px] leading-tight mb-0.5 truncate transition-all hover:scale-[1.02] hover:shadow-sm',
                                statusColors[apt.type === 'emergency' ? 'emergency' : apt.status]
                              )}
                            >
                              <span className="font-semibold block truncate">{apt.patientName}</span>
                              <span className="opacity-70 truncate">{apt.time}</span>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Day/Month placeholders with content */}
      {viewMode === 'day' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          <div className="space-y-2">
            {weekAppointments.filter(a => a.date === currentDate.toISOString().split('T')[0]).slice(0, 15).map(apt => (
              <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-dark-700/40 border border-gray-100 dark:border-gray-700/30 hover:border-primary-200 dark:hover:border-primary-800 transition-colors cursor-pointer" onClick={() => success('Appointment', `${apt.patientName} at ${apt.time}`)}>
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{apt.patientName}</p>
                  <p className="text-xs text-gray-500">{apt.time} • {apt.doctorName} • {apt.department}</p>
                </div>
                <span className={clsx('text-[10px] font-semibold px-2 py-1 rounded-md', statusColors[apt.status])}>{apt.status.replace('_', ' ')}</span>
              </div>
            ))}
            {weekAppointments.filter(a => a.date === currentDate.toISOString().split('T')[0]).length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">No appointments for this day.</p>
            )}
          </div>
        </motion.div>
      )}

      {viewMode === 'month' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase py-2">{d}</div>)}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 4 + 1; // Offset for March 2024 starting on Friday
              const isValid = day >= 1 && day <= 31;
              const dateStr = isValid ? `2024-03-${String(day).padStart(2, '0')}` : '';
              const dayApts = isValid ? appointments.filter(a => a.date === dateStr).length : 0;
              const isToday = day === 15;
              return (
                <div key={i} className={clsx('aspect-square p-1 rounded-lg text-center flex flex-col items-center justify-center gap-0.5 transition-colors', isValid ? 'hover:bg-gray-50 dark:hover:bg-dark-700/50 cursor-pointer' : '', isToday && 'bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-200 dark:ring-primary-800')}>
                  {isValid && (
                    <>
                      <span className={clsx('text-xs font-medium', isToday ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300')}>{day}</span>
                      {dayApts > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

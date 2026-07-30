import { motion } from 'framer-motion';
import { Check, CheckCheck, Info, AlertTriangle, XCircle, CheckCircle, Trash2, Bell } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { useNotifications } from '../contexts/NotificationContext';
import { useToast } from '../components/ui/Toast';
import clsx from 'clsx';

const typeIcons = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle };
const typeColors = {
  info: 'text-primary-600 bg-primary-50 dark:bg-primary-500/10',
  success: 'text-success-600 bg-success-50 dark:bg-success-500/10',
  warning: 'text-warning-600 bg-warning-50 dark:bg-warning-500/10',
  error: 'text-danger-600 bg-danger-50 dark:bg-danger-500/10',
};

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, removeNotification, unreadCount } = useNotifications();
  const { success } = useToast();

  const handleMarkAllRead = () => {
    markAllAsRead();
    success('All Read', 'All notifications marked as read.');
  };

  const handleRemove = (id: string) => {
    removeNotification(id);
    success('Removed', 'Notification dismissed.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        breadcrumb={['Dashboard', 'Notifications']}
        actions={
          <button onClick={handleMarkAllRead} disabled={unreadCount === 0} className="btn-secondary gap-2 disabled:opacity-40">
            <CheckCheck className="w-4 h-4" /> Mark All Read
          </button>
        }
      />

      {notifications.length === 0 ? (
        <div className="card p-16 flex flex-col items-center justify-center">
          <div className="p-4 bg-gray-100 dark:bg-dark-700 rounded-2xl mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All caught up!</h3>
          <p className="text-sm text-gray-500 mt-1">No notifications to display.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((notif, index) => {
            const Icon = typeIcons[notif.type];
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className={clsx(
                  'card p-4 flex items-start gap-4 transition-all group',
                  !notif.read && 'ring-1 ring-primary-200/60 dark:ring-primary-800/40 bg-primary-50/20 dark:bg-primary-900/5'
                )}
              >
                <div className={clsx('p-2.5 rounded-xl flex-shrink-0', typeColors[notif.type])}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{notif.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{notif.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5">
                        {new Date(notif.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-primary-600 transition-colors"
                          aria-label="Mark as read"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(notif.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 hover:text-danger-600 transition-colors"
                        aria-label="Dismiss notification"
                        title="Dismiss"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {!notif.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0 mt-1" aria-label="Unread" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

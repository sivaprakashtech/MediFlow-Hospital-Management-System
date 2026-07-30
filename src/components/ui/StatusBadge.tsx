import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot' | 'outline';
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { color: string; bg: string; dot: string; ring: string }> = {
  active: { color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', dot: 'bg-success-500', ring: 'ring-success-500/20' },
  available: { color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', dot: 'bg-success-500', ring: 'ring-success-500/20' },
  completed: { color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', dot: 'bg-success-500', ring: 'ring-success-500/20' },
  paid: { color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', dot: 'bg-success-500', ring: 'ring-success-500/20' },
  in_stock: { color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10', dot: 'bg-success-500', ring: 'ring-success-500/20' },
  scheduled: { color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10', dot: 'bg-primary-500', ring: 'ring-primary-500/20' },
  in_progress: { color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10', dot: 'bg-primary-500 animate-pulse', ring: 'ring-primary-500/20' },
  in_consultation: { color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-500/10', dot: 'bg-primary-500 animate-pulse', ring: 'ring-primary-500/20' },
  pending: { color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10', dot: 'bg-warning-500', ring: 'ring-warning-500/20' },
  low_stock: { color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10', dot: 'bg-warning-500', ring: 'ring-warning-500/20' },
  reserved: { color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10', dot: 'bg-warning-500', ring: 'ring-warning-500/20' },
  critical: { color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', dot: 'bg-danger-500 animate-pulse', ring: 'ring-danger-500/20' },
  cancelled: { color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', dot: 'bg-danger-500', ring: 'ring-danger-500/20' },
  overdue: { color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', dot: 'bg-danger-500', ring: 'ring-danger-500/20' },
  out_of_stock: { color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', dot: 'bg-danger-500', ring: 'ring-danger-500/20' },
  no_show: { color: 'text-danger-600 dark:text-danger-400', bg: 'bg-danger-50 dark:bg-danger-500/10', dot: 'bg-danger-500', ring: 'ring-danger-500/20' },
  discharged: { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', dot: 'bg-gray-400', ring: 'ring-gray-500/10' },
  off_duty: { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', dot: 'bg-gray-400', ring: 'ring-gray-500/10' },
  maintenance: { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', dot: 'bg-gray-400', ring: 'ring-gray-500/10' },
  occupied: { color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', dot: 'bg-violet-500', ring: 'ring-violet-500/20' },
};

export default function StatusBadge({ status, variant = 'default', size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', dot: 'bg-gray-400', ring: 'ring-gray-500/10' };
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  if (variant === 'dot') {
    return (
      <span className={clsx('inline-flex items-center gap-2 font-medium', config.color, size === 'sm' ? 'text-xs' : 'text-sm')}>
        <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', config.dot)} aria-hidden="true" />
        {label}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span className={clsx('inline-flex items-center px-2.5 py-1 rounded-lg ring-1 font-semibold', config.color, config.ring, size === 'sm' ? 'text-[10px]' : 'text-xs')}>
        {label}
      </span>
    );
  }

  return (
    <span
      className={clsx('badge ring-1', config.bg, config.color, config.ring)}
      role="status"
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
}

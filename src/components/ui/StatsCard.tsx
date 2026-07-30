import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  delay?: number;
  trend?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-primary-600 dark:text-primary-400',
  iconBg = 'bg-primary-50 dark:bg-primary-950/40',
  delay = 0,
  trend,
}: StatsCardProps) {
  const TrendIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card card-hover p-6 group"
      role="article"
      aria-label={`${title}: ${value}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 tracking-tight">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight leading-none">
              {value}
            </p>
          </div>
          {change && (
            <div className="flex items-center gap-1.5">
              <div
                className={clsx(
                  'flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-semibold',
                  {
                    'bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-400': changeType === 'positive',
                    'bg-danger-50 dark:bg-danger-500/10 text-danger-600 dark:text-danger-400': changeType === 'negative',
                    'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400': changeType === 'neutral',
                  }
                )}
              >
                <TrendIcon className="w-3 h-3" />
                {trend && <span>{trend > 0 ? '+' : ''}{trend}%</span>}
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">{change}</span>
            </div>
          )}
        </div>
        <div className={clsx('p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110', iconBg)}>
          <Icon className={clsx('w-5 h-5', iconColor)} aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

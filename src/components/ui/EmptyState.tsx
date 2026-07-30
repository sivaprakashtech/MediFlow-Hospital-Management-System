import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, image, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-16 px-4"
      role="status"
    >
      {image ? (
        <div className="relative w-32 h-32 mb-6 rounded-2xl overflow-hidden opacity-60">
          <img src={image} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-800 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-xl scale-150" />
          <div className="relative p-5 bg-gray-100 dark:bg-dark-700 rounded-2xl">
            <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm leading-relaxed">
        {description}
      </p>
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-6 gap-2">
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

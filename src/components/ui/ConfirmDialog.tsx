import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmDialogProps) {
  const variantStyles = {
    danger: { btn: 'btn-danger', icon: 'bg-danger-50 dark:bg-danger-500/10 text-danger-600' },
    warning: { btn: 'bg-warning-500 hover:bg-warning-600 text-white font-medium rounded-xl px-4 py-2.5 text-sm transition-all', icon: 'bg-warning-50 dark:bg-warning-500/10 text-warning-600' },
    info: { btn: 'btn-primary', icon: 'bg-primary-50 dark:bg-primary-500/10 text-primary-600' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-elevated border border-gray-200/80 dark:border-gray-700/50 w-full max-w-md overflow-hidden"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby="dialog-desc"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${variantStyles[variant].icon}`}>
                    <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 id="dialog-title" className="text-base font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                    <p id="dialog-desc" className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                      {message}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-400 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-dark-850 border-t border-gray-100 dark:border-gray-700/50">
                <button onClick={onClose} className="btn-secondary">
                  {cancelText}
                </button>
                <button onClick={() => { onConfirm(); onClose(); }} className={variantStyles[variant].btn}>
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

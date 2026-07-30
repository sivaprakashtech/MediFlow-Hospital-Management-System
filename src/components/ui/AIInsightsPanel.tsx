import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, BedDouble, Calendar, DollarSign, Sparkles } from 'lucide-react';

const insights = [
  {
    id: 'risk',
    title: 'Patient Risk Score',
    description: '3 patients flagged high-risk for readmission within 30 days',
    metric: '94.2%',
    metricLabel: 'Model Accuracy',
    icon: AlertTriangle,
    color: 'text-danger-600 dark:text-danger-400',
    bg: 'bg-danger-50 dark:bg-danger-500/10',
    trend: 'up',
  },
  {
    id: 'bed',
    title: 'Bed Occupancy Forecast',
    description: 'Predicted 92% occupancy by Thursday. Consider early discharges.',
    metric: '92%',
    metricLabel: '72hr Prediction',
    icon: BedDouble,
    color: 'text-warning-600 dark:text-warning-400',
    bg: 'bg-warning-50 dark:bg-warning-500/10',
    trend: 'up',
  },
  {
    id: 'appointment',
    title: 'Appointment Suggestions',
    description: 'AI recommends rescheduling 5 afternoon slots to reduce wait times',
    metric: '18min',
    metricLabel: 'Avg Wait Reduction',
    icon: Calendar,
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50 dark:bg-primary-950/40',
    trend: 'down',
  },
  {
    id: 'revenue',
    title: 'Revenue Forecast',
    description: 'Q2 projected revenue: $1.42M (+12% vs Q1). Insurance claims optimized.',
    metric: '$1.42M',
    metricLabel: 'Q2 Projection',
    icon: DollarSign,
    color: 'text-success-600 dark:text-success-400',
    bg: 'bg-success-50 dark:bg-success-500/10',
    trend: 'up',
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } };

export default function AIInsightsPanel() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm shadow-violet-500/20">
            <Brain className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Insights</h3>
            <p className="text-[11px] text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" aria-hidden="true" /> Powered by MedFlow Intelligence
            </p>
          </div>
        </div>
        <span className="text-[10px] font-medium text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-500/10 px-2 py-1 rounded-md ring-1 ring-success-500/20">
          Live
        </span>
      </div>

      {/* Insight Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            variants={item}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-gray-50/80 dark:bg-dark-700/40 border border-gray-100/80 dark:border-gray-700/30 hover:border-primary-200 dark:hover:border-primary-900/40 transition-all group cursor-pointer"
          >
            <div className={`p-2.5 rounded-xl ${insight.bg} flex-shrink-0 group-hover:scale-105 transition-transform`}>
              <insight.icon className={`w-4 h-4 ${insight.color}`} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{insight.metric}</p>
                  <p className="text-[9px] text-gray-400">{insight.metricLabel}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{insight.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Confidence */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/40">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=100&q=80"
            alt=""
            className="w-5 h-5 rounded object-cover opacity-60"
            aria-hidden="true"
          />
          <span className="text-[11px] text-gray-400">Model confidence: 96.8%</span>
        </div>
        <span className="text-[11px] text-gray-400">Updated 2 min ago</span>
      </div>
    </div>
  );
}

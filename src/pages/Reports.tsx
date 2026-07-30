import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileBarChart, Download, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import PageHeader from '../components/ui/PageHeader';
import { useToast } from '../components/ui/Toast';
import { revenueChartData, patientChartData } from '../data/dashboard';

export default function Reports() {
  const { success } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = async (type: string) => {
    setExporting(type);
    await new Promise(r => setTimeout(r, 1500));
    setExporting(null);
    success('Report Exported', `${type} report has been generated and downloaded.`);
  };

  const reports = [
    { title: 'Daily Operations', desc: 'Patient admissions, discharges, and appointments for today', icon: FileBarChart, color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-950/40' },
    { title: 'Monthly Revenue', desc: 'Billing, collections, and outstanding amounts for this month', icon: DollarSign, color: 'text-success-600 dark:text-success-400', bg: 'bg-success-50 dark:bg-success-500/10' },
    { title: 'Patient Analytics', desc: 'Demographics, visit patterns, and satisfaction metrics', icon: Users, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40' },
    { title: 'Performance Report', desc: 'Doctor utilization, wait times, and department efficiency', icon: TrendingUp, color: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-50 dark:bg-warning-500/10' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive hospital performance metrics"
        breadcrumb={['Dashboard', 'Reports']}
        actions={
          <button onClick={() => handleExport('Full')} className="btn-primary gap-2">
            <Download className="w-4 h-4" />
            {exporting === 'Full' ? 'Generating...' : 'Export All'}
          </button>
        }
      />

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="card card-hover p-5 cursor-pointer group"
            onClick={() => handleExport(report.title)}
          >
            <div className={`p-3 rounded-xl w-fit ${report.bg} mb-4 group-hover:scale-110 transition-transform`}>
              <report.icon className={`w-5 h-5 ${report.color}`} aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{report.title}</h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{report.desc}</p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Download className="w-3 h-3" /> Download Report
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">12-month revenue overview</p>
            </div>
            <button onClick={() => handleExport('Revenue')} className="btn-secondary text-xs py-1.5 px-3 gap-1.5">
              <Download className="w-3 h-3" /> CSV
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="rptRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#rptRevenue)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Patient Volume</h3>
              <p className="text-xs text-gray-500 mt-0.5">6-month admission trends</p>
            </div>
            <button onClick={() => handleExport('Patient')} className="btn-secondary text-xs py-1.5 px-3 gap-1.5">
              <Download className="w-3 h-3" /> CSV
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={patientChartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="outpatient" fill="#6366f1" radius={[6, 6, 0, 0]} name="Outpatient" />
              <Bar dataKey="inpatient" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Inpatient" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

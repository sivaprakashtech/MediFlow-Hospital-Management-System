import { motion } from 'framer-motion';
import {
  Users, Stethoscope, Calendar, BedDouble, DollarSign,
  AlertTriangle, FlaskConical, Pill, TrendingUp,
  Activity, Clock, ArrowUpRight, Zap,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import StatsCard from '../components/ui/StatsCard';
import AIInsightsPanel from '../components/ui/AIInsightsPanel';
import StatusBadge from '../components/ui/StatusBadge';
import { mockDashboardStats, revenueChartData, patientChartData, departmentData, mockActivities, bedOccupancyData } from '../data/dashboard';
import { appointments } from '../data';
import { useAuth } from '../contexts/AuthContext';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const stats = mockDashboardStats;
  const todayAppointments = appointments.filter((a) => a.date === '2024-03-15').slice(0, 8);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Header */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl">
        {/* Hero Banner with Hospital Image */}
        <div className="relative h-[180px] sm:h-[200px]">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/80 to-primary-900/60" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 h-full px-6 sm:px-8 py-6">
            <div>
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1">Hospital Command Center</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Good morning, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-sm text-white/60 mt-1.5 max-w-md">
                Here's today's operational overview for MedFlow Hospital.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                <Clock className="w-4 h-4 text-white/70" aria-hidden="true" />
                <span className="text-sm text-white/80 font-medium">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <button className="px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-sm font-medium rounded-xl ring-1 ring-white/20 transition-all flex items-center gap-2 active:scale-[0.97]">
                <Zap className="w-4 h-4" /> Generate Report
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Primary KPI Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients.toLocaleString()}
          change="from last month"
          changeType="positive"
          trend={12.5}
          icon={Users}
          iconColor="text-primary-600 dark:text-primary-400"
          iconBg="bg-primary-50 dark:bg-primary-950/40"
          delay={0}
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments.toString()}
          change="from yesterday"
          changeType="positive"
          trend={8}
          icon={Calendar}
          iconColor="text-violet-600 dark:text-violet-400"
          iconBg="bg-violet-50 dark:bg-violet-950/40"
          delay={0.08}
        />
        <StatsCard
          title="Bed Occupancy"
          value={`${stats.bedOccupancy}%`}
          change="5 beds available"
          changeType="neutral"
          icon={BedDouble}
          iconColor="text-cyan-600 dark:text-cyan-400"
          iconBg="bg-cyan-50 dark:bg-cyan-950/40"
          delay={0.16}
        />
        <StatsCard
          title="Revenue (MTD)"
          value={`$${(stats.revenue / 1000).toFixed(0)}K`}
          change="from last month"
          changeType="positive"
          trend={18.2}
          icon={DollarSign}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/40"
          delay={0.24}
        />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
        <StatsCard title="Active Doctors" value={stats.totalDoctors.toString()} change="6 on duty" changeType="neutral" icon={Stethoscope} iconColor="text-indigo-600 dark:text-indigo-400" iconBg="bg-indigo-50 dark:bg-indigo-950/40" delay={0.3} />
        <StatsCard title="Emergency Cases" value={stats.emergencyCases.toString()} change="from yesterday" changeType="positive" trend={-14} icon={AlertTriangle} iconColor="text-danger-600 dark:text-danger-400" iconBg="bg-danger-50 dark:bg-danger-950/40" delay={0.36} />
        <StatsCard title="Pending Lab Tests" value={stats.pendingLabTests.toString()} change="12 urgent" changeType="negative" icon={FlaskConical} iconColor="text-warning-600 dark:text-warning-400" iconBg="bg-warning-50 dark:bg-warning-950/40" delay={0.42} />
        <StatsCard title="Low Stock" value={stats.lowStockMedicines.toString()} change="action needed" changeType="negative" icon={Pill} iconColor="text-orange-600 dark:text-orange-400" iconBg="bg-orange-50 dark:bg-orange-950/40" delay={0.48} />
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-7 gap-5">
        {/* Revenue Chart - Wider */}
        <div className="lg:col-span-4 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Monthly revenue vs expenses trend</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-success-50 dark:bg-success-500/10">
              <TrendingUp className="w-3.5 h-3.5 text-success-600" aria-hidden="true" />
              <span className="text-xs font-semibold text-success-600 dark:text-success-400">+18.2%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bed Occupancy */}
        <div className="lg:col-span-3 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Bed Occupancy</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ward-wise occupancy rates</p>
            </div>
          </div>
          <div className="space-y-4">
            {bedOccupancyData.map((ward) => {
              const percent = Math.round(((ward.value as number) / (ward.total as number)) * 100);
              return (
                <div key={ward.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{ward.name}</span>
                    <span className="text-gray-500">{ward.value}/{ward.total} <span className="text-gray-400">({percent}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-2 rounded-full ${
                        percent > 90 ? 'bg-danger-500' : percent > 75 ? 'bg-warning-500' : 'bg-primary-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Second Charts Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Patient Statistics */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Patient Statistics</h3>
              <p className="text-xs text-gray-500 mt-0.5">Outpatient vs inpatient admissions</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary-500" aria-hidden="true" />Outpatient</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-violet-500" aria-hidden="true" />Inpatient</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={patientChartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-100 dark:text-gray-800" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="outpatient" fill="#6366f1" radius={[6, 6, 0, 0]} name="Outpatient" />
              <Bar dataKey="inpatient" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Inpatient" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Load */}
        <div className="card p-6">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Department Distribution</h3>
          <p className="text-xs text-gray-500 mb-4">Patient load by department</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {departmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            {departmentData.map((dept, i) => (
              <div key={dept.name} className="flex items-center gap-2 text-[11px]">
                <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[i] }} aria-hidden="true" />
                <span className="text-gray-600 dark:text-gray-400 truncate">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Today's Appointments */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
              <p className="text-xs text-gray-500 mt-0.5">{todayAppointments.length} appointments scheduled</p>
            </div>
            <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2.5">
            {todayAppointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-gray-50/80 dark:bg-dark-700/40 border border-gray-100/80 dark:border-gray-700/30 hover:border-primary-200 dark:hover:border-primary-900/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{apt.patientName}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{apt.time} • {apt.doctorName}</p>
                </div>
                <StatusBadge status={apt.status} variant="outline" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="card p-6">
          <AIInsightsPanel />
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <p className="text-xs text-gray-500 mt-0.5">Latest operations</p>
            </div>
            <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-1">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex gap-3.5 py-3 border-b border-gray-100/80 dark:border-gray-700/30 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">{activity.description}</p>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
